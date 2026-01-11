/**
 * Split large text into smaller chunks
 * @param {string} text
 * @param {number} chunkSize
 * @returns {string[]}
 */
const chunkText = (text, chunkSize = 2000) => {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    chunks.push(text.slice(start, start + chunkSize));
    start += chunkSize;
  }

  return chunks;
};

export default chunkText;
