import { Certificate } from "@escolalms/sdk/lib/types";
import React from "react";
import styled, { withTheme } from "styled-components";

const StyledCerificateCard = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.buttonRadius}px;
  padding: 15px;
  .title-wrapper {
    margin-bottom: 49px;
  }
  .title-wrapper,
  .date-wrapper {
    &__uptitle {
      margin-bottom: 6px;
    }
  }
`;

type Props = {
  certificate: Certificate;
  uptitle: React.ReactNode;
  title: React.ReactNode;
  dateUptitle: React.ReactNode;
  date: React.ReactNode;
  actions?: React.ReactNode;
};

export const CertificateCard: React.FC<Props> = ({
  uptitle,
  title,
  dateUptitle,
  date,
  actions,
}) => {
  return (
    <StyledCerificateCard className="certificate-card">
      <div className="title-wrapper">
        <div className="title-wrapper__uptitle">{uptitle}</div>
        {title}
      </div>
      <div className="date-wrapper">
        <div className="title-wrapper__uptitle">{dateUptitle}</div>
        {date}
      </div>
      {actions}
    </StyledCerificateCard>
  );
};

const NewCertificateCard = styled(CertificateCard)<Props>``;

export default withTheme(NewCertificateCard);
