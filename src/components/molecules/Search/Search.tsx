import * as React from "react";
import styled, { withTheme } from "styled-components";
import { ReactNode, useRef } from "react";
import { Input } from "../../../";
import chroma from "chroma-js";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

interface StyledSearchProps {
  mobile?: boolean;
}

export interface SearchProps extends StyledSearchProps {
  onSearch: (value: string) => void;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  filterOptions: () => void;
  children: ReactNode;
  icon?: ReactNode;
}

const StyledSearch = styled("div")<StyledSearchProps>`
  position: relative;
  width: 100%;

  .lsm-input .input-and-fieldset input:not(:focus) ~ .fieldset {
    border-color: transparent;
  }

  .search-input-wrapper {
    position: relative;
  }

  .search-input-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    appearance: none;
    border: none;
    background-color: transparent;
    cursor: pointer;

    svg path {
      fill: ${({ theme }) =>
        theme.mode == "light" ? theme.gray1 : theme.white};
    }
  }

  .search-input-options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 0;
    overflow: hidden;
    display: none;
    background-color: ${({ theme }) =>
      theme.mode == "light" ? theme.gray5 : theme.gray1};
    border: 1px solid
      ${({ theme }) =>
        theme.mode == "light"
          ? chroma(theme.gray3).alpha(0.5).css()
          : chroma(theme.white).alpha(0.6).css()};
    border-top: none;
    box-sizing: border-box;

    > * {
      padding: 15px;
      cursor: pointer;
    }

    &.active {
      display: block;
      height: auto;
    }
  }
`;

const IconSearch = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2.82715C4.68629 2.82715 2 5.51344 2 8.82715C2 12.1409 4.68629 14.8271 8 14.8271C11.3137 14.8271 14 12.1409 14 8.82715C14 5.51344 11.3137 2.82715 8 2.82715ZM0 8.82715C0 4.40887 3.58172 0.827148 8 0.827148C12.4183 0.827148 16 4.40887 16 8.82715C16 10.6759 15.3729 12.3781 14.3199 13.7328L19.7071 19.12C20.0976 19.5106 20.0976 20.1437 19.7071 20.5343C19.3166 20.9248 18.6834 20.9248 18.2929 20.5343L12.9056 15.147C11.551 16.2001 9.84871 16.8271 8 16.8271C3.58172 16.8271 0 13.2454 0 8.82715Z"
        fill="#4A4A4A"
      />
    </svg>
  );
};

export const Search: React.FC<SearchProps> = (props) => {
  const { children, onSearch, onChange, onSubmit, filterOptions, icon } = props;
  const [value, setValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const childrenList = React.Children.toArray(children);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsFocused(false));

  const toggleFocus = () => {
    setIsFocused(!isFocused);
  };

  const filterChildren = (childrenList: ReactNode[]) => {
    return childrenList
      .filter((child) => {
        if (React.isValidElement(child)) {
          if (typeof filterOptions === "function") {
            return filterOptions();
          } else {
            return child.props.children
              .toLowerCase()
              .includes(value.toLowerCase());
          }
        }
        return false;
      })
      .map((child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onClick: () => {
              onChange(child.props.children);
              toggleFocus();
              setValue(child.props.children);
            },
          });
        }
        return child;
      });
  };

  return (
    <StyledSearch ref={ref}>
      <div className="search-input-wrapper">
        <Input
          placeholder="Select a person"
          onChange={(e: { target: { value: string } }) => {
            const { value } = e.target;
            setValue(value);
            onSearch(value);
          }}
          value={value}
          onKeyDown={(e: { key: string }) =>
            e.key === "Enter" && onSubmit(value)
          }
          onFocus={() => toggleFocus()}
        />
        <button
          type={"button"}
          className={"search-input-button"}
          onClick={() => {
            onSubmit(value);
          }}
        >
          {icon || <IconSearch />}
        </button>
      </div>
      <div className={`search-input-options ${isFocused ? "active" : ""}`}>
        {filterChildren(childrenList)}
      </div>
    </StyledSearch>
  );
};

export default withTheme(styled(Search)<SearchProps>``);
