import * as React from "react";
import styled, { withTheme } from "styled-components";
import { setConfiguration, Row, Col } from "react-grid-system";
import { IconTitle } from "../../atoms/IconTitle/IconTitle";

setConfiguration({
  gutterWidth: 20,
});

export interface DownloadsProps {
  title: string;
  subtitle: string;
  downloads: JSX.Element[];
}

const Icon1 = () => (
  <svg viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5013 19.1668H9.83464C10.0556 19.1668 10.2676 19.079 10.4239 18.9228C10.5802 18.7665 10.668 18.5545 10.668 18.3335V8.3335C10.668 8.11248 10.5802 7.90052 10.4239 7.74424C10.2676 7.58796 10.0556 7.50016 9.83464 7.50016H1.5013C1.28029 7.50016 1.06833 7.58796 0.912046 7.74424C0.755766 7.90052 0.667969 8.11248 0.667969 8.3335V18.3335C0.667969 18.5545 0.755766 18.7665 0.912046 18.9228C1.06833 19.079 1.28029 19.1668 1.5013 19.1668ZM2.33464 9.16683H9.0013V17.5002H2.33464V9.16683ZM12.3346 15.0002V5.8335H4.83464C4.61362 5.8335 4.40166 5.7457 4.24538 5.58942C4.0891 5.43314 4.0013 5.22118 4.0013 5.00016C4.0013 4.77915 4.0891 4.56719 4.24538 4.41091C4.40166 4.25463 4.61362 4.16683 4.83464 4.16683H13.168C13.389 4.16683 13.6009 4.25463 13.7572 4.41091C13.9135 4.56719 14.0013 4.77915 14.0013 5.00016V15.0002C14.0013 15.2212 13.9135 15.4331 13.7572 15.5894C13.6009 15.7457 13.389 15.8335 13.168 15.8335C12.947 15.8335 12.735 15.7457 12.5787 15.5894C12.4224 15.4331 12.3346 15.2212 12.3346 15.0002ZM17.3346 1.66683V12.5002C17.3346 12.7212 17.2468 12.9331 17.0906 13.0894C16.9343 13.2457 16.7223 13.3335 16.5013 13.3335C16.2803 13.3335 16.0683 13.2457 15.912 13.0894C15.7558 12.9331 15.668 12.7212 15.668 12.5002V2.50016H8.16797C7.94696 2.50016 7.73499 2.41237 7.57871 2.25609C7.42243 2.0998 7.33464 1.88784 7.33464 1.66683C7.33464 1.44582 7.42243 1.23385 7.57871 1.07757C7.73499 0.921293 7.94696 0.833496 8.16797 0.833496H16.5013C16.7223 0.833496 16.9343 0.921293 17.0906 1.07757C17.2468 1.23385 17.3346 1.44582 17.3346 1.66683Z" />
  </svg>
);

export const Downloads: React.FC<DownloadsProps> = (props) => {
  const { title, subtitle, downloads } = props;

  return (
    <React.Fragment>
      <IconTitle
        level={4}
        title={title}
        subtitle={subtitle}
        icon={<Icon1 />}
        as={"h4"}
      />
      <Row>
        {downloads.map((download) => (
          <Col xs={12} md={4}>
            {download}
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

const NewDownloads = styled(Downloads)<DownloadsProps>``;

export default withTheme(NewDownloads);
