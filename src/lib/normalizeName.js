//normalized function
const normalizeName = name => {
  return (
    name
      .replace(/[,.;:!-?]/g, '')
      // .replace(/[,.;:!?]/g, '')
      .toLowerCase()
      .replace(/\s+\s/g, ' ')
      .trim()
  );
};
export default normalizeName;
