import React, { useCallback, useState } from "react";
import styled, { withTheme } from "styled-components";
import { Spin, Link } from "../../..";
import { useTranslation } from "react-i18next";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  path?: string;
  url?: string;
  loading?: boolean;
  buttonTitle?: string;
}

const zIndexTop = 999;

const StyledDiv = styled("div")<InputProps>`
  width: 100%;
  text-align: center;
  position: relative;
  > a {
    margin-top: 0.5em;
  }
  > input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: ${zIndexTop};
    opacity: 0.001;
  }

  &:hover {
    .wrapper .border > svg {
      transform: scale(1.5);
      z-index: ${zIndexTop - 1};
    }
    img {
      transform: scale(1.1);
    }
    a:after {
      transform: scaleX(0);
      transform-origin: bottom left;
    }
  }

  .wrapper {
    width: 100%;
    position: relative;
    cursor: pointer;
    :after {
      content: "";
      padding-top: 100%;
      display: block;
    }

    .border,
    img,
    input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    img {
      display: block;
      object-fit: cover;
      z-index: ${zIndexTop - 1};
    }
    img,
    svg {
      transition: transform 0.5s ease-out;
    }
    .border {
      overflow: hidden;
      border-width: 1px;
      opacity: 1;
      border: ${({ theme }) =>
        `1px solid ${theme.mode !== "dark" ? theme.gray3 : theme.gray1}`};
      border-radius: ${({ theme }) => theme.cardRadius}px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      align-content: center;

      > svg {
        position: relative;
        z-index: ${zIndexTop - 2};
      }
    }
  }
`;

const UploadIcon = () => (
  <svg
    width="20"
    height="19"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 10.636V17.636C20 17.9012 19.8946 18.1556 19.7071 18.3431C19.5196 18.5306 19.2652 18.636 19 18.636H1C0.734784 18.636 0.48043 18.5306 0.292893 18.3431C0.105357 18.1556 0 17.9012 0 17.636V10.636C0 10.3708 0.105357 10.1164 0.292893 9.92888C0.48043 9.74134 0.734784 9.63599 1 9.63599C1.26522 9.63599 1.51957 9.74134 1.70711 9.92888C1.89464 10.1164 2 10.3708 2 10.636V16.636H18V10.636C18 10.3708 18.1054 10.1164 18.2929 9.92888C18.4804 9.74134 18.7348 9.63599 19 9.63599C19.2652 9.63599 19.5196 9.74134 19.7071 9.92888C19.8946 10.1164 20 10.3708 20 10.636V10.636ZM10 0.635986C9.73478 0.635986 9.48043 0.741343 9.29289 0.928879C9.10536 1.11642 9 1.37077 9 1.63599V5.63599H5C4.73478 5.63599 4.48043 5.74134 4.29289 5.92888C4.10536 6.11642 4 6.37077 4 6.63599C4 6.9012 4.10536 7.15556 4.29289 7.34309C4.48043 7.53063 4.73478 7.63599 5 7.63599H9V11.636C9 11.9012 9.10536 12.1556 9.29289 12.3431C9.48043 12.5306 9.73478 12.636 10 12.636C10.2652 12.636 10.5196 12.5306 10.7071 12.3431C10.8946 12.1556 11 11.9012 11 11.636V7.63599H15C15.2652 7.63599 15.5196 7.53063 15.7071 7.34309C15.8946 7.15556 16 6.9012 16 6.63599C16 6.37077 15.8946 6.11642 15.7071 5.92888C15.5196 5.74134 15.2652 5.63599 15 5.63599H11V1.63599C11 1.37077 10.8946 1.11642 10.7071 0.928879C10.5196 0.741343 10.2652 0.635986 10 0.635986V0.635986Z"
      fill="#4A4A4A"
    />
  </svg>
);

export const Upload: React.FC<InputProps> = (props) => {
  const { t } = useTranslation();

  const { onChange, url, loading, buttonTitle = t("Upload.button") } = props;

  const [src, setSrc] = useState<string | undefined>(url);

  const onInternalChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file: File = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setSrc(reader.result?.toString());
        reader.onerror = (error) => console.log("reading error", error);
      }
      if (onChange) {
        onChange(e);
      }
    },
    []
  );
  return (
    <StyledDiv>
      <input type="file" {...props} onChange={onInternalChange} />
      <div className="wrapper">
        <div className="border">
          {loading && <Spin />}
          {src && <img src={src} alt="Upload preview" />}
          <UploadIcon />
        </div>
      </div>
      {buttonTitle && <Link underline>{buttonTitle}</Link>}
    </StyledDiv>
  );
};

export default withTheme(styled(Upload)<InputProps>``);
