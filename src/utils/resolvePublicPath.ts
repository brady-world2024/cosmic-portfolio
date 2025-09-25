export const resolvePublicPath = (path?: string) => {
  if (!path) return "";
  const clean = path.replace(/^\/+/, ""); // remove leading slash(es)
  return `${import.meta.env.BASE_URL}${clean}`;
};
