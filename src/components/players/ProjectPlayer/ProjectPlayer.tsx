import React, { useCallback, useContext, useEffect, useState } from "react";
import styled, { withTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { API } from "@escolalms/sdk/lib";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import {
  addProject,
  removeProject,
  fetchProjects,
} from "@escolalms/sdk/lib/services/project";

import { DATETIME_FORMAT } from "../../../utils/utils";
import { Button } from "../../atoms/Button/Button";
import { Card } from "../../atoms/Card/Card";
import { Spin } from "../../atoms/Spin/Spin";
import { Title } from "../../atoms/Typography/Title";
import { Text } from "../../atoms/Typography/Text";
import { MarkdownRenderer } from "../../molecules/MarkdownRenderer/MarkdownRenderer";
import { Upload } from "../../molecules/Upload/Upload";

interface ProjectsData {
  data: API.ProjectFile[];
  loading: boolean;
}

interface ProjectsListProps {
  projects: ProjectsData;
  onDeleteSuccess?: () => void;
  onDeleteError?: () => void;
  className?: string;
}

export interface ProjectPlayerProps {
  course_id: number;
  topic: API.TopicProject;
  onSuccess?: () => void;
  onError?: () => void;
  className?: string;
}

const ProjectPlayerWrapper = styled.div`
  .project-player__upload-input {
    margin-bottom: 1em;
    .wrapper {
      .border img {
        display: none;
      }

      &::after {
        padding-top: 0;
        aspect-ratio: 16 / 3;
      }
    }
  }

  .project-player__projects-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;

    .project-card {
      width: 100%;
      max-width: 225px;

      .content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
    }
  }
`;

const IconBin = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 2C5 0.89543 5.89543 0 7 0H13C14.1046 0 15 0.895431 15 2V4H16.9897C16.9959 3.99994 17.0021 3.99994 17.0083 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H17.9311L17.0638 18.1425C16.989 19.1891 16.1182 20 15.0689 20H4.93112C3.88184 20 3.01096 19.1891 2.9362 18.1425L2.06888 6H1C0.447715 6 0 5.55228 0 5C0 4.44772 0.447715 4 1 4H2.99174C2.99795 3.99994 3.00414 3.99994 3.01032 4H5V2ZM7 4H13V2H7V4ZM4.07398 6L4.93112 18H15.0689L15.926 6H4.07398ZM8 8C8.55228 8 9 8.44772 9 9V15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15V9C7 8.44772 7.44772 8 8 8ZM12 8C12.5523 8 13 8.44772 13 9V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V9C11 8.44772 11.4477 8 12 8Z"
        fill="currentColor"
      />
    </svg>
  );
};

const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  onDeleteSuccess,
  onDeleteError,
  className,
}) => {
  const { t } = useTranslation();
  const { token, apiUrl } = useContext(EscolaLMSContext);
  const [isDeleting, setIsDeleting] = useState<number[]>([]);

  const onFileDeleteFactory = useCallback(
    (fileId: number) => () => {
      if (!token) return console.warn("noToken");
      setIsDeleting((prev) => [...prev, fileId]);
      removeProject(apiUrl, token, fileId)
        .then(() => onDeleteSuccess?.())
        .catch(() => onDeleteError?.())
        .finally(() =>
          setIsDeleting((prev) => prev.filter((id) => id !== fileId))
        );
    },
    [token, apiUrl]
  );

  return (
    <div className={className}>
      {projects.loading && !projects.data.length && <Spin />}
      {projects.data.map(({ id, created_at, topic_id }, i) => (
        <Card className="project-card" key={id}>
          <div className="project-card__details">
            <Text className="project-card__title">
              {t("ProjectPlayer.ProjectFile")}
              {` ${i + 1}`}
            </Text>
            <Text className="project-card__date">
              {format(new Date(created_at), DATETIME_FORMAT)}
            </Text>
          </div>
          <Button
            className="project-card__delete-btn"
            mode="icon"
            loading={isDeleting.includes(id)}
            onClick={onFileDeleteFactory(id)}
          >
            <IconBin />
          </Button>
        </Card>
      ))}
    </div>
  );
};

export const ProjectPlayer: React.FC<ProjectPlayerProps> = ({
  course_id,
  topic,
  onSuccess,
  onError,
  className,
}) => {
  const { token, apiUrl } = useContext(EscolaLMSContext);
  const [projects, setProjects] = useState<ProjectsData>({
    data: [],
    loading: false,
  });

  const [isUploading, setIsUploading] = useState(false);

  const refreshProjects = useCallback(() => {
    if (!token) return console.error("noToken");

    setProjects((prev) => ({ ...prev, loading: true }));
    fetchProjects(apiUrl, token, { course_id, topic_id: topic?.id })
      .then((res) => {
        if (res.success) {
          setProjects((prev) => ({
            ...prev,
            data: res.data,
          }));
        }
      })
      .catch((err) => console.warn(err))
      .finally(() => setProjects((prev) => ({ ...prev, loading: false })));
  }, [token, apiUrl, course_id, topic?.id]);

  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  const onProjectFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.currentTarget.files?.[0] || !token) return;

      setIsUploading(true);
      const body: API.AddProjectBody = {
        topic_id: topic?.id + "",
        file: e.currentTarget.files[0],
      };

      addProject(apiUrl, token, body)
        .then(() => {
          refreshProjects();
          onSuccess?.();
        })
        .catch(() => {
          onError?.();
        })
        .finally(() => {
          setIsUploading(false);
        });
    },
    [apiUrl, token, topic?.id, refreshProjects]
  );

  return (
    <ProjectPlayerWrapper
      className={"wellms-component" + ` ${className}`}
      data-testid="project-player"
    >
      <Title level={3} className="project-player__title">
        {topic?.title}
      </Title>
      {topic.description && (
        <MarkdownRenderer className="project-player__description">
          {topic.description}
        </MarkdownRenderer>
      )}
      <Upload
        className="project-player__upload-input"
        name="project_file"
        onChange={onProjectFileSelect}
        disabled={isUploading}
      />
      <ProjectsList
        className="project-player__projects-list"
        projects={projects}
        onDeleteSuccess={refreshProjects}
      />
    </ProjectPlayerWrapper>
  );
};

export default withTheme(styled(ProjectPlayer)<ProjectPlayerProps>``);
