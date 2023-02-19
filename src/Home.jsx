import React, { useEffect, useState } from "react";
import { cleanHTML, debounce, highlight } from "./utils.js";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState();

  // handle input change
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // create search method
  const search = debounce(async (value) => {
    if (!value) return;
    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${value}`;
      const response = await fetch(url);
      const result = await response.json();

      // set data
      setData({
        term: value,
        results: result.query.search,
      });
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    search(searchTerm);
  }, [searchTerm]);

  return (
    <div className="container">
      <div className="title">
        <h1>Wikipedia Search</h1>
        <img src="./wikipedia-logo.svg" alt="wikipedia" className="logo" />
      </div>

      <form className="form-control" foc="true">
        {/* <div> */}
        <input
          type="text"
          name="searchTerm"
          value={searchTerm}
          autoFocus
          onChange={handleChange}
          placeholder="Find anything..."
        />
        {/* </div> */}
      </form>
      <div className="search-result">
        {data &&
          data.results.map((result) => {
            // render styled title and snippet
            const title = highlight(cleanHTML(result?.title), searchTerm);
            const snippet = highlight(cleanHTML(result?.snippet), searchTerm);
            return (
              <div key={result.timestamp}>
                <h2>
                  <a
                    href={`https://en.wikipedia.org/?curid=${result.pageid}`}
                    target="_blank"
                  >
                    {title}
                  </a>
                </h2>

                <div>{snippet}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
