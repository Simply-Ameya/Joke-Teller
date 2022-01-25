import React, { useState, useEffect, useRef } from "react";
import "./JokePage.css";
function JokePage() {
  const languageObjectList = useRef([]);
  const [category, setCategory] = useState([]);
  const [custom, setCustom] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [flags, setFlags] = useState([]);
  const [selectedFlags, setSelectedFlags] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [term, setTerm] = useState("");
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(1368);
  const [range, setRange] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fetchUrl, setFetchUrl] = useState("https://v2.jokeapi.dev/joke/");
  const [jokeData, setJokeData] = useState([]);
  const [joke, setJoke] = useState("");
  const [jokeList, setJokeList] = useState([]);
  const [delivery, setDelivery] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const url = "https://v2.jokeapi.dev/info";
      const response = await fetch(url);
      const data = await response.json();
      const languageUrl = "https://v2.jokeapi.dev/languages";
      const languageResponse = await fetch(languageUrl);
      const languageData = await languageResponse.json();
      data && setCategory(data.jokes.categories.splice(1).sort());
      // setTimeout(() => {
      //   console.log("category", category);
      // });
      languageData && setLanguageList(languageData.jokeLanguages);
      data && setFlags(data.jokes.flags);
      data && setTypeList(data.jokes.types);
      data && setRange(data.jokes.idRange);
    }
    fetchData();
  }, []);
  useEffect(() => {
    const selectedFormat = "";
    let url = "https://v2.jokeapi.dev/joke/";
    if (custom === true) {
      url += "Any";
    } else {
      selectedCategory.map((each) => {
        url += each + ",";
      });
      url = url.slice(0, url.length - 1);
    }
    if (selectedLanguage !== "") {
      url += "?lang=" + selectedLanguage;
    }
    if (JSON.stringify(selectedFlags) !== "[]") {
      if (selectedLanguage !== "") {
        url += "&";
      } else {
        url += "?";
      }
      url += "blacklistFlags=";
      selectedFlags.map((each) => {
        url += each + ",";
      });
      url = url.slice(0, url.length - 1);
    }
    if (selectedFormat === "" || selectedFormat === "json") {
      url = url;
    } else {
      if (selectedLanguage !== "" || JSON.stringify(selectedFlags) !== "[]") {
        url += "&";
      } else {
        url += "?";
      }
      url += "format=" + selectedFormat;
    }
    if (selectedType.length < 2 && selectedType.length > 0) {
      if (
        selectedLanguage === "" &&
        JSON.stringify(selectedFlags) === "[]" &&
        (selectedFormat === "" || selectedFormat === "json")
      ) {
        url += "?";
      } else {
        url += "&";
      }
      selectedType.map((each) => (url += "type=" + each));
    }
    if (term !== "") {
      if (
        selectedLanguage === "" &&
        JSON.stringify(selectedFlags) === "[]" &&
        (selectedFormat === "" || selectedFormat === "json") &&
        selectedType.length !== 1
      ) {
        url += "?";
      } else {
        url += "&";
      }
      url += "contains=" + term;
    }
    if (
      minRange > 0 ||
      (selectedLanguage && maxRange < range[selectedLanguage][1])
    ) {
      if (
        selectedLanguage === "" &&
        JSON.stringify(selectedFlags) === "[]" &&
        (selectedFormat === "" || selectedFormat === "json") &&
        selectedType.length !== 1 &&
        term === ""
      ) {
        url += "?";
      } else {
        url += "&";
      }
      url += "idRange=" + minRange + "-" + maxRange;
    }
    if (amount !== 1) {
      if (
        selectedLanguage === "" &&
        JSON.stringify(selectedFlags) === "[]" &&
        (selectedFormat === "" || selectedFormat === "json") &&
        selectedType.length !== 1 &&
        term === "" &&
        minRange === 0 &&
        maxRange === (range[selectedLanguage] && range[selectedLanguage][1])
      ) {
        url += "?";
      } else {
        url += "&";
      }
      url += "amount=" + amount;
    }
    setFetchUrl(url);
  }, [
    fetchUrl,
    selectedCategory,
    selectedLanguage,
    selectedFlags,
    selectedType,
    term,
    minRange,
    maxRange,
    amount,
    custom,
    range,
  ]);
  const getLanguageNames = (arr) => {
    languageObjectList.current = arr.map((each) => {
      if (each === "en") {
        return { language: "en", fullName: "English" };
      } else if (each === "cs") {
        return { language: "cs", fullName: "Czech" };
      } else if (each === "de") {
        return { language: "de", fullName: "German" };
      } else if (each === "es") {
        return { language: "es", fullName: "Spanish" };
      } else if (each === "fr") {
        return { language: "fr", fullName: "French" };
      } else if (each === "pt") {
        return { language: "pt", fullName: "Portuguese" };
      }
      return { language: "en", fullName: "English" };
    });
  };
  getLanguageNames(languageList);
  return (
    <div className="bg-container">
      {/* .<div data-testid="Christmas"></div> */}
      <div className="joke-form-container">
        <div className="joke-category">
          <div className="category-instruction">
            <p>
              Select <span>category/categories</span>
            </p>
          </div>
          <div
            className={
              custom === false && selectedCategory.length === 0
                ? "error category-container"
                : "category-container"
            }
          >
            <div className="any-container">
              <label>
                <input
                  data-testid="any-category"
                  type="radio"
                  name="category"
                  checked={custom}
                  onChange={() => {
                    setCustom(true);
                  }}
                />
                Any
              </label>
            </div>
            <div className="custom-container">
              <label>
                <input
                  data-testid="custom-category"
                  type="radio"
                  name="category"
                  onClick={() => {
                    setCustom(false);
                  }}
                />
                Custom :
              </label>
              {category.map((each) => {
                return (
                  <label className="categories" key={category.indexOf(each)}>
                    <input
                      data-testid={each}
                      value={each}
                      type="checkbox"
                      name={each}
                      disabled={custom}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const newList = selectedCategory;
                          newList.push(e.target.value);
                          setSelectedCategory(newList);
                        } else {
                          const newList = selectedCategory;

                          newList.splice(newList.indexOf(e.target.value), 1);
                          setSelectedCategory(newList);
                        }
                        let url = "https://v2.jokeapi.dev/joke/";
                        selectedCategory.map((each) => {
                          url += each + ",";
                        });
                        url = url.slice(0, url.length - 1);
                        setFetchUrl(url);
                      }}
                    />
                    {each}
                  </label>
                );
              })}
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
            <select
              data-testid="language-dropdown"
              className="language-dropdown"
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                range[e.target.value] && setMaxRange(range[e.target.value][1]);
              }}
            >
              {languageObjectList.current &&
                languageObjectList.current.map((each) => {
                  return (
                    <option
                      data-testid="select-option"
                      key={each.language}
                      value={each.language}
                    >
                      {each.language} - {each.fullName}
                    </option>
                  );
                })}
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
            {flags &&
              flags.map((each) => {
                return (
                  <label key={flags.indexOf(each)}>
                    <input
                      data-testid={each}
                      type="checkbox"
                      name={each}
                      value={each}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const newList = selectedFlags;
                          newList.push(e.target.value);
                          setSelectedFlags(newList);
                        } else {
                          const newList = selectedFlags;

                          newList.splice(newList.indexOf(e.target.value), 1);
                          setSelectedFlags(newList);
                        }
                        let url = fetchUrl + "blacklistFlags=";
                        selectedFlags.map((each) => {
                          url += each + ",";
                        });
                        url = url.slice(0, url.length - 1);
                        setFetchUrl(url);
                      }}
                    />
                    {each}
                  </label>
                );
              })}
          </div>
        </div>
        <div className="joke-type">
          <div className="type-instruction">
            <p>
              Select at least one <span>Joke type</span>:
            </p>
          </div>
          <div className="type-container">
            {typeList &&
              typeList.map((each) => {
                return (
                  <label key={typeList.indexOf(each)}>
                    <input
                      data-testid={each}
                      type="checkbox"
                      value={each}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const newList = selectedType;
                          newList.push(e.target.value);
                          setSelectedType(newList);
                        } else {
                          const newList = selectedType;

                          newList.splice(newList.indexOf(e.target.value), 1);
                          setSelectedType(newList);
                        }
                        let url = fetchUrl;
                        if (
                          selectedType.length < 2 &&
                          selectedType.length > 0
                        ) {
                          selectedType.map(
                            (each) => (url += "type=" + each + ",")
                          );
                          url.slice(0, url.length - 1);
                        } else {
                          url += " ";
                        }
                        setFetchUrl(url);
                      }}
                    />
                    {each}
                  </label>
                );
              })}
          </div>
        </div>
        <div className="joke-search">
          <div className="search-instruction">
            <p>Search for a joke that</p>
            <p>
              contains <span>this search string</span>:
            </p>
          </div>
          <div className="search-container">
            <input
              data-testid="searching"
              type="text"
              placeholder="(optional)"
              onChange={(e) => {
                setTerm(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="joke-range">
          <div className="range-instruction">
            <p>Search for a joke</p>
            <p>
              in this <span>ID range</span>:
            </p>
          </div>
          <div
            className={
              minRange <= maxRange ? "range-container" : "error range-container"
            }
          >
            (Optional)
            <label className="range-from-label">
              From :
              <input
                data-testid="min-range"
                type="number"
                min="0"
                max="1368"
                value={minRange}
                onChange={(e) => {
                  setMinRange(e.target.value);
                }}
              />
            </label>
            <label className="range-to-label">
              To :
              <input
                data-testid="max-range"
                type="number"
                min="0"
                max={maxRange}
                value={maxRange}
                onChange={(e) => {
                  setMaxRange(e.target.value);
                }}
              />
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
            <input
              data-testid="amount"
              className="amount-input"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="button-container">
          <p data-testid="urltest">Url : {fetchUrl}</p>
          <button
            className="button"
            onClick={() => {
              if (window.confirm("Do you really want to reset the form ?")) {
                window.location.reload();
              }
            }}
          >
            Reset Form
          </button>
          <button
            data-testid="submit-button"
            className="button"
            onClick={async () => {
              const url = fetchUrl;
              const response = await fetch(url);
              const data = await response.json();
              setDelivery(false);
              if (amount === 1) {
                setJokeData(data);
                if (data.type === "single") {
                  setJoke(data.joke);
                } else {
                  setJoke(data.setup);
                }
              } else {
                const jokes = data.jokes.map((each) => {
                  if (each.type === "twopart") {
                    return {
                      ...joke,
                      setup: each.setup,
                      delivery: each.delivery,
                      showDelivery: false,
                    };
                  } else {
                    return { ...joke, joke: each.joke };
                  }
                });
                setJokeList(jokes);
              }
            }}
          >
            Send Request
          </button>
        </div>
        <div className="result-container">
          <div className="result-heading-container">
            <h1 className="result-heading">Result</h1>
          </div>
          <div className="joke-container">
            {joke}
            {amount === 1 ? (
              <>
                {jokeData.type === undefined || jokeData.type === "single" ? (
                  <></>
                ) : (
                  <>
                    {delivery === false ? (
                      <>
                        <button onClick={() => setDelivery(true)}>
                          Delivery
                        </button>
                      </>
                    ) : (
                      <>
                        <p> {jokeData.delivery}</p>
                        <button onClick={() => setDelivery(false)}>
                          Undeliver
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {jokeList.map((each) => {
                  if (each.joke) {
                    return <p>{each.joke}</p>;
                  } else {
                    return (
                      <>
                        <p>{each.setup}</p>
                        {each.showDelivery ? (
                          <>
                            <p>{each.delivery}</p>
                            <button
                              onClick={() => {
                                setDelivery(true);
                                const jokes = jokeList.map((eachJoke) => {
                                  if (eachJoke.setup === each.setup) {
                                    return { ...eachJoke, showDelivery: false };
                                  } else {
                                    return { ...eachJoke };
                                  }
                                });
                                console.log(jokes);
                                setJokeList(jokes);
                              }}
                            >
                              undeliver
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setDelivery(true);
                                const jokes = jokeList.map((eachJoke) => {
                                  if (eachJoke.setup === each.setup) {
                                    return { ...eachJoke, showDelivery: true };
                                  } else {
                                    return { ...eachJoke };
                                  }
                                });
                                console.log(jokes);
                                setJokeList(jokes);
                              }}
                            >
                              delivery
                            </button>
                          </>
                        )}
                      </>
                    );
                  }
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default JokePage;
