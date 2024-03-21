import React, { useCallback, useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { course as fetchCourses } from "@escolalms/sdk/lib/services/courses";
import { API } from "@escolalms/sdk/lib";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { Button, Search as InputSearch } from "../../..";
import styled from "styled-components";

const SearchWrapper = styled.div`
  min-width: 300px;

  input {
    border-radius: 21px !important;
    background-color: ${({ theme }) => theme.gray4} !important;
  }
  .fieldset {
    border-radius: 21px !important;
  }
`;

const ItemButton = styled(Button)`
  padding: 10px !important;
  justify-content: flex-start;
  border: none;
  border-radius: ${({ theme }) => theme.buttonRadius}px;
  &:hover {
    background-color: ${({ theme }) => theme.gray4} !important;
    color: ${({ theme }) => theme.textColor};
    border-radius: ${({ theme }) => theme.buttonRadius}px;
  }
`;

export const SearchCourses: React.FC<{
  onItemSelected: (item: API.Course) => void;
  onInputSubmitted: (phrase: string) => void;
  mobile?: boolean;
}> = ({ onItemSelected, onInputSubmitted }) => {
  const abortController = useRef<AbortController>();
  const [fetching, setFetching] = useState(false);
  const [foundCourses, setFoundCourses] = useState<API.Course[]>([]);
  const { apiUrl } = useContext(EscolaLMSContext);

  const setCoursesFromResponse = useCallback(
    (responseCourses: API.Course[]) => {
      setFoundCourses((prevCourses) =>
        [...prevCourses, ...responseCourses].filter(
          (course, index, arr) =>
            arr.findIndex((fcourse) => fcourse.id === course.id) === index
        )
      );
    },
    []
  );

  const fetch = useCallback((search?: string) => {
    setFetching(true);
    if (abortController.current) {
      abortController.current.abort();
    }

    abortController.current = new AbortController();
    fetchCourses
      .bind(null, apiUrl)(
        { title: search },
        { signal: abortController.current && abortController.current.signal }
      )
      .then((response) => {
        if (response && response.success) {
          setCoursesFromResponse(response.data);
        }
      })
      .catch(() => setFetching(false))
      .finally(() => setFetching(false));
  }, []);

  const onSearch = useCallback((val: string) => {
    fetch(val);
  }, []);
  const onSubmit = useCallback((val: string) => onInputSubmitted(val), []);
  const { t } = useTranslation();
  return (
    <SearchWrapper>
      <InputSearch
        loading={fetching}
        onSearch={onSearch}
        onSubmit={onSubmit}
        placeholder={t<string>("Search.Placeholder")}
      >
        {foundCourses.map((course) => (
          <ItemButton
            block
            mode="white"
            key={course.id}
            onClick={() => {
              onItemSelected(course);
            }}
          >
            {course.title}
          </ItemButton>
        ))}
      </InputSearch>
    </SearchWrapper>
  );
};

export default SearchCourses;
