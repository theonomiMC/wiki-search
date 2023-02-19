/* for better performance create debounce method
    to limit the number of times a function gets called
    to request data from API on every type.*/

const debounce = (fn, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

// create method that converts html tags from search result (if there's any) to plain text.
const cleanHTML = (html) => {
  let div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

// Highlight the search term
const highlight = (text, keyword) => {
  let reg = new RegExp(`(${keyword})`, "ig");
  const matched = text.split(reg);
  return (
    <span>
      {matched.map((word, i) => (
        <span
          key={i}
          style={
            word.toLowerCase() === keyword.toLowerCase()
              ? {
                  display: "inline-block",
                  padding: "3px 5px",
                  borderRadius: "4px",
                  background: "rgba(249, 221, 0, 0.87)",
                }
              : {}
          }
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export { debounce, highlight, cleanHTML };
