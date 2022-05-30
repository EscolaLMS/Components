import * as React from "react";
import styled, { withTheme } from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";

interface PdfPlayerProps {
  url: string;
  onLoad?: () => void;
}

export const PdfPlayer: React.FunctionComponent<PdfPlayerProps> = ({
  url,
  onLoad,
}): React.ReactElement => {
  const [allPages, setAllPages] = React.useState<number | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  React.useEffect(() => {
    if (currentPage === allPages) {
      onLoad && onLoad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPages, currentPage]);

  if (!url) {
    return <p>Document not found.</p>;
  }

  return (
    <div className="pdf-wrapper">
      {isMounted && url && (
        <Document
          loading="Loading..."
          onLoadSuccess={({ numPages }) => setAllPages(numPages)}
          file={url}
        >
          <Page pageNumber={currentPage} />
        </Document>
      )}

      {allPages && allPages > 1 && (
        <div className="pagination-area">
          <p>
            <strong>{currentPage}</strong> of <strong>{allPages}</strong>
          </p>

          <div>
            <button
              disabled={!(currentPage > 1)}
              className="nav-btn-modal"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <i className="bx bx-chevrons-left"></i>
            </button>
            <button
              disabled={!(allPages > currentPage)}
              className="nav-btn-modal"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <i className="bx bx-chevrons-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withTheme(styled(PdfPlayer)<PdfPlayerProps>``);
