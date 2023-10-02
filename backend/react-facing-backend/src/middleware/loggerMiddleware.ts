export const logRequest = (opts: any, result: any) => {
  const start = Date.now();
  const durationMs = Date.now() - start;
  const meta = { path: opts.path, type: opts.type, durationMs };
  result.ok
    ? console.log("OK request timing:", meta)
    : console.error("Non-OK request timing", meta);
};
