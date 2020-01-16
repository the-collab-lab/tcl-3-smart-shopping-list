//normalized function
const normalizeName = name => {
  name = name.toLowerCase().trim();
  let normalizedName = '';
  let symbol = `.,;:!?"`;
  for (let i = 0; i < name.length; i++) {
    if (!symbol.includes(name[i])) {
      normalizedName += name.slice(i, i + 1);
    }
  }
  return normalizedName;
};
export default normalizeName;
