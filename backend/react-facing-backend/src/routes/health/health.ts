export enum HealthStatus {
  healthy = "healthy",
  error = "error",
}

export const health = async () => {
  console.log("Retrieving health data...");
  const statuses = {
    server: HealthStatus.healthy,
  };
  return statuses;
};
