/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-wait-for-side-effects */
import "@testing-library/jest-dom";
import "@testing-library/react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import JokePage from "../JokePage";

const MockJoke = () => {
  return <JokePage />;
};
jest.setTimeout(30000);
describe("JokePage", () => {
  // describe("async categories", () => {
  //   const categoryList = [
  //     "Christmas",
  //     "Spooky",
  //     "Programming",
  //     "Pun",
  //     "Dark",
  //     "Misc",
  //   ];
  //   categoryList.map(async (eachCategory) => {
  //     test("async", async () => {
  //       render(<MockJoke />);
  //       await waitFor(
  //         async () => {
  //           const element = await screen.findByTestId(eachCategory);
  //           expect(element).toBeInTheDocument();
  //           fireEvent.change(element, {
  //             target: { value: eachCategory, checked: true },
  //           });
  //           expect(element.value).toEqual(eachCategory);
  //           expect(element.checked).toEqual(true);
  //         },
  //         { timeout: 5000 }
  //       );
  //     }, 10000);
  //   });
  // });
  // describe("categories", () => {
  //   test("any category", () => {
  //     render(<MockJoke />);
  //     const element = screen.getByTestId("any-category");
  //     expect(element).toBeInTheDocument();
  //     expect(element.checked).toEqual(true);
  //     fireEvent.change(element, { target: { checked: false } });
  //     expect(element.checked).toEqual(false);
  //   });
  //   test("custom category", () => {
  //     render(<MockJoke />);
  //     const element = screen.getByTestId("custom-category");
  //     expect(element).toBeInTheDocument();
  //     expect(element.checked).toEqual(false);
  //     fireEvent.change(element, { target: { checked: true } });
  //     expect(element.checked).toEqual(true);
  //   });
  // });
  // describe("language", () => {
  //   const languages = ["en", "cs", "de", "pt", "es", "fr"];
  //   languages.map((eachLanguage) => {
  //     test("language-dropdown", () => {
  //       render(<MockJoke />);
  //       const element = screen.getByTestId("language-dropdown");
  //       expect(element).toBeInTheDocument();
  //       fireEvent.change(element, { target: { selected: eachLanguage } });
  //       expect(element.selected).toEqual(eachLanguage);
  //     });
  //   });
  // });
  // describe("search input", () => {
  //   test("search input", () => {
  //     render(<MockJoke />);
  //     const element = screen.getByTestId("searching");
  //     expect(element).toBeInTheDocument();
  //     fireEvent.change(element, { target: { value: "abc" } });
  //     expect(element.value).toEqual("abc");
  //   });
  // });
  // describe("range check", () => {
  //   test("min-range", () => {
  //     render(<MockJoke />);
  //     const element = screen.getByTestId("min-range");
  //     expect(element).toBeInTheDocument();
  //     fireEvent.change(element, { target: { value: 1 } });
  //     expect(element.value).toEqual("1");
  //   });
  //   test("max-range", () => {
  //     render(<MockJoke />);
  //     const element = screen.getByTestId("max-range");
  //     expect(element).toBeInTheDocument();
  //     fireEvent.change(element, { target: { value: 1 } });
  //     expect(element.value).toEqual("1");
  //   });
  // });
  // describe("amount check", () => {
  //   test("joke amount", () => {
  //     render(<MockJoke />);
  //     const element = screen.getByTestId("amount");
  //     expect(element).toBeInTheDocument();
  //     fireEvent.change(element, { target: { value: 1 } });
  //     expect(element.value).toEqual("1");
  //   });
  // });
  // describe("flags check", () => {
  //   const flagList = [
  //     "nsfw",
  //     "religious",
  //     "racist",
  //     "political",
  //     "sexist",
  //     "explicit",
  //   ];
  //   flagList.map(async (eachFlag) => {
  //     test("flags", async () => {
  //       render(<MockJoke />);
  //       await waitFor(
  //         async () => {
  //           const element = await screen.findByTestId(eachFlag);
  //           expect(element).toBeInTheDocument();
  //           fireEvent.change(element, {
  //             target: { value: eachFlag, checked: true },
  //           });
  //           expect(element.value).toEqual(eachFlag);
  //           expect(element.checked).toEqual(true);
  //         },
  //         { timeout: 5000 }
  //       );
  //     }, 10000);
  //   });
  // });
  // describe("type test", () => {
  //   const typeList = ["single", "twopart"];
  //   typeList.map((eachType) => {
  //     test("type", async () => {
  //       render(<MockJoke />);
  //       await waitFor(
  //         async () => {
  //           const element = await screen.findByTestId(eachType);
  //           expect(element).toBeInTheDocument();
  //         },
  //         { timeout: 5000 }
  //       );
  //     }, 10000);
  //   });
  // });

  describe("final url testing", () => {
    //   test("url test", () => {
    //     render(<MockJoke />);
    //     const urlElement = screen.getByTestId("urltest");
    //     expect(urlElement).toBeInTheDocument();
    //   });
    //   test("url test for any category", () => {
    //     let url = "Url : https://v2.jokeapi.dev/joke/";
    //     render(<MockJoke />);
    //     const urlElement = screen.getByTestId("urltest");
    //     const anyElement = screen.getByTestId("any-category");
    //     fireEvent.click(anyElement);
    //     const customElement = screen.getByTestId("custom-category");
    //     fireEvent.click(customElement);
    //     expect(anyElement.checked).toEqual(false);
    //     fireEvent.click(anyElement);
    //     expect(anyElement.checked).toEqual(true);
    //     url += "Any";
    //     expect(urlElement.textContent).toEqual(url);
    //   });

    //   const testids = [
    //     "Christmas",
    //     "Spooky",
    //     "Dark",
    //     "Misc",
    //     "Programming",
    //     "Pun",
    //     "nsfw",
    //     "religious",
    //     "political",
    //     "racist",
    //     "sexist",
    //     "explicit",
    //     "single",
    //     "twopart",
    //   ];
    //   testids.map((eachId) => {
    //     test("url test for custom category", async () => {
    //       render(<MockJoke />);
    //       let categoryElement;

    //       const customElement = screen.getByTestId("custom-category");
    //       fireEvent.click(customElement);
    //       await waitFor(
    //         async () => {
    //           categoryElement = await screen.findByTestId(eachId);
    //         },
    //         { timeout: 5000 }
    //       );
    //       fireEvent.click(categoryElement);

    //       const urlElement = await screen.findByTestId("urltest");

    //       expect(urlElement.textContent).toContain(eachId);
    //     }, 10000);
    //   });
    // });

    // test("testing url for input search", () => {
    //   render(<MockJoke />);
    //   const searchElement = screen.getByTestId("searching");
    //   fireEvent.change(searchElement, { target: { value: "abc" } });
    //   const urlElement = screen.getByTestId("urltest");
    //   expect(urlElement.textContent).toContain("abc");
    // });
    // test("testing url for input min range", () => {
    //   render(<MockJoke />);
    //   const searchElement = screen.getByTestId("min-range");
    //   fireEvent.change(searchElement, { target: { value: 2 } });
    //   const urlElement = screen.getByTestId("urltest");
    //   expect(urlElement.textContent).toContain("2");
    // });
    // test("testing url for input max range", () => {
    //   render(<MockJoke />);
    //   const searchElement = screen.getByTestId("max-range");
    //   fireEvent.change(searchElement, { target: { value: 3 } });
    //   const urlElement = screen.getByTestId("urltest");
    //   expect(urlElement.textContent).toContain("3");
    // });
    // test("testing url for input amount", () => {
    //   render(<MockJoke />);
    //   const searchElement = screen.getByTestId("amount");
    //   const minElement = screen.getByTestId("min-range");
    //   fireEvent.change(minElement, { target: { value: 1 } });
    //   fireEvent.change(searchElement, { target: { value: 4 } });
    //   const urlElement = screen.getByTestId("urltest");
    //   expect(urlElement.textContent).toContain("4");
    // });
    test("testing for languages in url", async () => {
      render(<MockJoke />);
      const languageElement = screen.getByTestId("language-dropdown");
      fireEvent.change(languageElement, { target: { selected: "en" } });
      expect(languageElement.selected).toEqual("en");
      const urlElement = screen.getByTestId("urltest");
      expect(urlElement.textContent).toContain("en");
    });
  });
});
