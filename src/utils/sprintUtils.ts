export const getSprintById = (id: string, projectDetails: any) => {
  const result = projectDetails.sprints.find((item) => item.id === id);
  if (!result) {
    return null;
  }
  return result;
};
