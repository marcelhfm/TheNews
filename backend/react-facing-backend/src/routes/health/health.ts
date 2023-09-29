export enum HealthStatus {
  healthy = "healthy",
  error = "error",
}

export const health = async () => {
  const statuses = {
    server: HealthStatus.healthy,
  };
  return statuses;
};
