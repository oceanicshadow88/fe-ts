import React, { useState } from 'react';
import { updateProject } from '../../../../../api/projects/projects';

export default function useHandleStarClick(projectId: string) {
  // TODO: this is base on user not
  const [isStarred, ToggleStar] = useState(true);
  const handleStarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    ToggleStar(!isStarred);
    if (isStarred) {
      updateProject(projectId, { star: false });
    } else {
      updateProject(projectId, { star: true });
    }
  };

  return [isStarred, handleStarClick] as const;
}
