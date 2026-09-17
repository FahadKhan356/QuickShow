// Build a full TMDB image URL from a relative path (e.g. "/abc.jpg")
export const tmdbImage = (path, size = 'w500') => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/')) return `https://image.tmdb.org/t/p/${size}${path}`;
  return path;
};

export default tmdbImage;