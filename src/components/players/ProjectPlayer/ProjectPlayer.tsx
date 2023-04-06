import React from 'react';
import styled, { withTheme } from 'styled-components';

export interface ProjectPlayerProps {
}

export const ProjectPlayer: React.FC<ProjectPlayerProps> = () => {
  return (
    <>
hello world
    </>
  );
};

export default withTheme(styled(ProjectPlayer)<ProjectPlayerProps>``);