/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-wait-for-side-effects */
import "@testing-library/jest-dom";
import "@testing-library/react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import JokePage from "../JokePage";

// jest.setTimeout(30000);
describe("JokePage", () => {
  const MockJoke = () => {
    return <JokePage />;
  };
  describe("async categories", () => {
    const categoryList = [
      "Christmas",
      "Spooky",
      "Programming",
      "Pun",
      "Dark",
      "Misc",
    ];
    categoryList.map(async (eachCategory) => {
      test("async", async () => {
        render(<JokePage />);
        console.log(<JokePage />);
        await waitFor(
          async () => {
            const element = await screen.findByTestId(eachCategory);
            expect(element).toBeInTheDocument();
            fireEvent.change(element, {
              target: { value: eachCategory, checked: true },
            });
            expect(element.value).toEqual(eachCategory);
            expect(element.checked).toEqual(true);
          },
          { timeout: 3000 }
        );
      });
    });
  });
  describe("categories", () => {
    test("any category", () => {
      render(<MockJoke />);
      const element = screen.getByTestId("any-category");
      expect(element).toBeInTheDocument();
      expect(element.checked).toEqual(true);
      fireEvent.change(element, { target: { checked: false } });
      expect(element.checked).toEqual(false);
    });
    test("custom category", () => {
      render(<MockJoke />);
      const element = screen.getByTestId("custom-category");
      expect(element).toBeInTheDocument();
      expect(element.checked).toEqual(false);
      fireEvent.change(element, { target: { checked: true } });
      expect(element.checked).toEqual(true);
    });
  });
  describe("language", () => {
    const languages = ["en", "cs", "de", "pt", "es", "fr"];
    languages.map((eachLanguage) => {
      test("language-dropdown", () => {
        render(<MockJoke />);
        const element = screen.getByTestId("language-dropdown");
        expect(element).toBeInTheDocument();
        fireEvent.change(element, { target: { selected: eachLanguage } });
        expect(element.selected).toEqual(eachLanguage);
      });
    });
  });
  describe("search input", () => {
    test("search input", () => {
      render(<MockJoke />);
      const element = screen.getByTestId("searching");
      expect(element).toBeInTheDocument();
      fireEvent.change(element, { target: { value: "abc" } });
      expect(element.value).toEqual("abc");
    });
  });
  describe("range check", () => {
    test("min-range", () => {
      render(<MockJoke />);
      const element = screen.getByTestId("min-range");
      expect(element).toBeInTheDocument();
      fireEvent.change(element, { target: { value: 1 } });
      expect(element.value).toEqual("1");
    });
    test("max-range", () => {
      render(<MockJoke />);
      const element = screen.getByTestId("max-range");
      expect(element).toBeInTheDocument();
      fireEvent.change(element, { target: { value: 1 } });
      expect(element.value).toEqual("1");
    });
  });
  describe("amount check", () => {
    test("joke amount", () => {
      render(<MockJoke />);
      const element = screen.getByTestId("amount");
      expect(element).toBeInTheDocument();
      fireEvent.change(element, { target: { value: 1 } });
      expect(element.value).toEqual("1");
    });
  });
  describe("flags check", () => {
    const flagList = [
      "nsfw",
      "religious",
      "racist",
      "political",
      "sexist",
      "explicit",
    ];
    flagList.map(async (eachFlag) => {
      test("flags", async () => {
        render(<MockJoke />);
        await waitFor(
          async () => {
            const element = await screen.findByTestId(eachFlag);
            expect(element).toBeInTheDocument();
            fireEvent.change(element, {
              target: { value: eachFlag, checked: true },
            });
            expect(element.value).toEqual(eachFlag);
            expect(element.checked).toEqual(true);
          },
          { timeout: 5000 }
        );
      });
    });
  });
  describe("type test", () => {
    const typeList = ["single", "twopart"];
    typeList.map((eachType) => {
      test("type", async () => {
        render(<MockJoke />);
        await waitFor(
          async () => {
            const element = await screen.findByTestId(eachType);
            expect(element).toBeInTheDocument();
          },
          { timeout: 5000 }
        );
      }, 10000);
    });
  });
  describe("final url testing", () => {
    let url = "Url : https://v2.jokeapi.dev/joke/";
    test("url test", () => {
      render(<MockJoke />);
      const urlElement = screen.getByTestId("urltest");
      expect(urlElement).toBeInTheDocument();
    });
    test("url test for any category", () => {
      render(<MockJoke />);
      const urlElement = screen.getByTestId("urltest");
      const anyElement = screen.getByTestId("any-category");
      fireEvent.change(anyElement, { target: { checked: true } });
      expect(anyElement.checked).toEqual(true);
      url += "Any";
      expect(urlElement.textContent).toEqual(url);
    });
  });
  // test("url test for custom category", async () => {
  //   render(<MockJoke />);
  //   const urlElement = screen.getByTestId("urltest");
  //   const customElement = screen.getByTestId("custom-category");
  //   fireEvent.change(customElement, { target: { checked: true } });
  //   await waitFor(
  //     async () => {
  //       const categoryElement = await screen.findByTestId("Christmas");
  //       fireEvent.change(categoryElement, { target: { checked: true } });
  //       url += categoryElement.value;
  //       expect(urlElement.textContent).toEqual(url);
  //     },
  //     { timeout: 5000 }
  //   );
  // }, 10000);
});
