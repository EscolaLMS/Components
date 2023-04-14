import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { API } from "@escolalms/sdk/lib";
import { Title } from "../../../";

import { PersonalContent } from "./content/PersonalContent";
import { IncomingContent } from "./content/IncomingContent";

interface Props {
  task: API.Task & { has_notes: boolean };
  closeModal: () => void;
  onTaskStatusUpdateSuccess?: () => void;
  onTaskUpdateSuccess?: () => void;
  onTaskUpdateError?: () => void;
}

const Wrapper = styled.aside`
  max-width: 100%;
  max-height: calc(100vh - 60px);
  overflow: auto;
`;

export const TaskDetailsModal: React.FC<Props> = ({
  task,
  closeModal,
  onTaskUpdateSuccess,
  onTaskUpdateError,
  onTaskStatusUpdateSuccess,
}) => {
  const { t } = useTranslation();
  const isPersonal = task.created_by?.id === task.user?.id;
  console.log(isPersonal);
  return (
    <Wrapper>
      <Title>{t<string>("Tasks.EditTask")}</Title>

      {isPersonal ? (
        <PersonalContent
          taskForAction={task}
          onStatusUpdateSuccess={onTaskStatusUpdateSuccess}
          onSuccess={onTaskUpdateSuccess}
          onError={onTaskUpdateError}
          closeModal={closeModal}
        />
      ) : (
        <IncomingContent
          task={task}
          onTaskStatusUpdateSuccess={onTaskStatusUpdateSuccess}
        />
      )}
    </Wrapper>
  );
};
