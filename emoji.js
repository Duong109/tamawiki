// emote.js

const EMOTES = {
  gem: "/emotes/gem.png",
  michirusmug: "/emotes/michirusmug.png",
  mogicrazy: "/emotes/mogicrazy.png",
  monk: "/emotes/monk.png",
  red_angry: "/emotes/red_angry.png",
  stupan: "/emotes/stupan.png",
  tuh: "/emotes/tuh.png",
};

/**
 * Replace :emote: with images
 * @param {string} text
 * @param {object} options
 */
export function emote(text, options = {}) {
  const {
    size = 30,
    className = "emote",
    fallback = true
  } = options;

  return text.replace(/:([a-zA-Z0-9_]+):/g, (match, name) => {
    if (!EMOTES[name]) return fallback ? match : "";

    return `<img
      src="${EMOTES[name]}"
      alt="${name}"
      class="${className}"
      style="width:${size}px;height:${size}px;vertical-align:middle;"
    >`;
  });
}
