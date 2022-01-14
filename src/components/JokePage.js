import React, { useState, useEffect, useRef } from "react";
import "./JokePage.css";

function JokePage() {
  let ref = useRef({});
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = "https://v2.jokeapi.dev/info";
      const response = await fetch(url);
      const data = await response.json();
      ref.current = data;
      console.log(data);
      const languageUrl = "https://v2.jokeapi.dev/languages";
      const languageResponse = await fetch(languageUrl);
      const languageData = await languageResponse.json();

      //setCategory([...category, jokeData.jokes.categories]);
    }
    fetchData();
  }, []);
  console.log(ref.current);
  return (
    <div className="bg-container">
      .
      <div className="joke-form-container">
        <div className="joke-category">
          <div className="category-instruction">
            <p>
              Select <span>category/categories</span>
            </p>
          </div>
          <div className="category-container">
            <div className="any-container">
              <label>
                <input type="radio" name="category" />
                Any
              </label>
            </div>
            <div className="custom-cnotainer">
              <label>
                <input type="radio" name="category" />
                Custom :
              </label>
              {}
            </div>
          </div>
        </div>
        <div className="joke-language">
          <div className="language-instruction">
            <p>
              Select <span>language</span>:
            </p>
          </div>
          <div className="language-container">
            <select className="language-dropdown">
              <option>english</option>
            </select>
          </div>
        </div>
        <div className="joke-flag">
          <div className="flag-instruction">
            <p>
              Select <span>flags </span>to blacklist:
            </p>
          </div>
          <div className="flag-container">
            <p>(Optional) </p>
            {}
          </div>
        </div>
        <div className="joke-format">
          <div className="format-instruction">
            <p>
              Select <span>response format</span>:
            </p>
          </div>
          <div className="format-container"></div>
        </div>
        <div className="joke-type">
          <div className="type-instruction">
            <p>
              Select at least one <span>Joke type</span>:
            </p>
          </div>
          <div className="type-container"></div>
        </div>
        <div className="joke-search">
          <div className="search-instruction">
            <p>Search for a joke that</p>
            <p>
              contains <span>this search string</span>:
            </p>
          </div>
          <div className="search-container"></div>
        </div>
        <div className="joke-range">
          <div className="range-instruction">
            <p>Search for a joke</p>
            <p>
              in this <span>ID range</span>:
            </p>
          </div>
          <div className="range-container">
            (Optional)
            <label className="range-from-label">
              From :
              <input type="text" />
            </label>
            <label className="range-to-label">
              From :
              <input type="text" />
            </label>
          </div>
        </div>
        <div className="joke-amount">
          <div className="amount-instruction">
            <p>
              <span>Amount</span> of jokes:
            </p>
          </div>
          <div className="amount-container">
            <input className="amount-input" type="text" />
          </div>
        </div>
        <div className="button-container">
          <p>Url : </p>
          <button className="button">Reset Form</button>
          <button className="button">Send Request</button>
        </div>
      </div>
    </div>
  );
}

export default JokePage;
