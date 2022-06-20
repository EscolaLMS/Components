import * as React from "react";
import styled, { withTheme } from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";
import { Button, Text } from "../../..";
import { useTranslation } from "react-i18next";

interface PdfPlayerProps {
  url: string;
  onLoad?: () => void;
}

const StyledWrapper = styled("div")`
  max-width: 90%;

  .pagination-area {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
  }
`;

export const PdfPlayer: React.FunctionComponent<PdfPlayerProps> = ({
  url,
  onLoad,
}): React.ReactElement => {
  const [allPages, setAllPages] = React.useState<number | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isMounted, setIsMounted] = React.useState(false);
  const { t } = useTranslation();

  React.useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  React.useEffect(() => {
    if (currentPage === allPages) {
      onLoad && onLoad();
    }
  }, [allPages, currentPage]);

  if (!url) {
    return <p>{t<string>("PdfPlayer.notFound")}</p>;
  }

  return (
    <StyledWrapper>
      {isMounted && url && (
        <Document
          loading={t<string>("Loading")}
          onLoadSuccess={({ numPages }) => setAllPages(numPages)}
          file={url}
        >
          <Page pageNumber={currentPage} />
        </Document>
      )}

      {allPages && allPages > 1 && (
        <div className="pagination-area">
          <Text>
            <strong>{currentPage}</strong> {t<string>("PdfPlayer.of")}{" "}
            <strong>{allPages}</strong>
          </Text>

          <div>
            <Button
              mode="secondary"
              disabled={!(currentPage > 1)}
              className="nav-btn-modal"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              {t<string>("Prev")}
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              mode="secondary"
              disabled={!(allPages > currentPage)}
              className="nav-btn-modal"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              {t<string>("Next")}
            </Button>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
};

export default withTheme(styled(PdfPlayer)<PdfPlayerProps>``);
