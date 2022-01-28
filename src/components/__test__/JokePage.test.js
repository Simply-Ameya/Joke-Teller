/* eslint-disable jest/no-conditional-expect */
import "@testing-library/jest-dom";
import "@testing-library/react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import JokePage from "../JokePage";
const MockJoke = () => {
  return <JokePage />;
};
describe("JokePage", () => {
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
        render(<MockJoke />);
        let element;
        await waitFor(
          async () => {
            element = await screen.findByTestId(eachCategory);
            expect(element).toBeInTheDocument();
          },
          { timeout: 5000 }
        );
        fireEvent.click(element);
        expect(element.value).toEqual(eachCategory);
        expect(element.checked).toEqual(true);
      }, 10000);
    });
  });
  describe("categories", () => {
    test("any category", () => {
      render(<MockJoke />);
      const element = screen.getByTestId("any-category");
      const customElement = screen.getByTestId("custom-category");
      expect(element).toBeInTheDocument();
      expect(element.checked).toEqual(true);
      fireEvent.click(customElement);
      expect(element.checked).toEqual(false);
    });
    test("custom category", () => {
      render(<MockJoke />);
      const element = screen.getByTestId("custom-category");
      expect(element).toBeInTheDocument();
      expect(element.checked).toEqual(false);
    });
  });
  describe("language", () => {
    const languages = ["en", "cs", "de", "pt", "es", "fr"];
    languages.map((eachLanguage) => {
      test("language-dropdown", async () => {
        render(<MockJoke />);
        const element = screen.getByTestId("language-dropdown");
        expect(element).toBeInTheDocument();
        await waitFor(
          () => {
            expect(element.value).toEqual("cs");
          },
          { timeout: 3000 }
        );
        fireEvent.change(element, {
          target: { value: eachLanguage },
        });
        expect(element.value).toEqual(eachLanguage);
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
        let element;
        await waitFor(
          async () => {
            element = await screen.findByTestId(eachFlag);
            expect(element).toBeInTheDocument();
          },
          { timeout: 5000 }
        );
        fireEvent.click(element);
        expect(element.value).toEqual(eachFlag);
        expect(element.checked).toEqual(true);
      }, 10000);
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
    test("url test", () => {
      render(<MockJoke />);
      const urlElement = screen.getByTestId("urltest");
      expect(urlElement).toBeInTheDocument();
    });
    test("url test for any category", () => {
      let url = "Url : https://v2.jokeapi.dev/joke/";
      render(<MockJoke />);
      const urlElement = screen.getByTestId("urltest");
      const anyElement = screen.getByTestId("any-category");
      fireEvent.click(anyElement);
      const customElement = screen.getByTestId("custom-category");
      fireEvent.click(customElement);
      expect(anyElement.checked).toEqual(false);
      fireEvent.click(anyElement);
      expect(anyElement.checked).toEqual(true);
      url += "Any";
      expect(urlElement.textContent).toEqual(url);
    });
    const testids = [
      "Christmas",
      "Spooky",
      "Dark",
      "Misc",
      "Programming",
      "Pun",
      "nsfw",
      "religious",
      "political",
      "racist",
      "sexist",
      "explicit",
      "single",
      "twopart",
    ];
    testids.map((eachId) => {
      test("url test for custom category", async () => {
        render(<MockJoke />);
        let categoryElement;
        const customElement = screen.getByTestId("custom-category");
        fireEvent.click(customElement);
        await waitFor(
          async () => {
            categoryElement = await screen.findByTestId(eachId);
          },
          { timeout: 5000 }
        );
        fireEvent.click(categoryElement);
        const urlElement = await screen.findByTestId("urltest");
        expect(urlElement.textContent).toContain(eachId);
      }, 10000);
    });
    test("testing url for input search", () => {
      render(<MockJoke />);
      const searchElement = screen.getByTestId("searching");
      fireEvent.change(searchElement, { target: { value: "abc" } });
      const urlElement = screen.getByTestId("urltest");
      expect(urlElement.textContent).toContain("abc");
    });
    test("testing url for input min range", () => {
      render(<MockJoke />);
      const searchElement = screen.getByTestId("min-range");
      fireEvent.change(searchElement, { target: { value: 2 } });
      const urlElement = screen.getByTestId("urltest");
      expect(urlElement.textContent).toContain("2");
    });
    test("testing url for input max range", () => {
      render(<MockJoke />);
      const searchElement = screen.getByTestId("max-range");
      const minRange = screen.getByTestId("min-range");
      fireEvent.change(minRange, { target: { value: 1 } });
      fireEvent.change(searchElement, { target: { value: 3 } });
      const urlElement = screen.getByTestId("urltest");
      expect(urlElement.textContent).toContain("3");
    });
    test("testing url for input amount", () => {
      render(<MockJoke />);
      const searchElement = screen.getByTestId("amount");
      const minElement = screen.getByTestId("min-range");
      fireEvent.change(minElement, { target: { value: 1 } });
      fireEvent.change(searchElement, { target: { value: 4 } });
      const urlElement = screen.getByTestId("urltest");
      expect(urlElement.textContent).toContain("4");
    });
    const languages = ["en", "cs", "de", "pt", "es", "fr"];
    languages.map((eachLanguage) => {
      test("testing for languages in url", async () => {
        render(<MockJoke />);
        const languageElement = screen.getByTestId("language-dropdown");
        const urlElement = screen.getByTestId("urltest");
        await waitFor(
          async () => {
            expect(languageElement.value).toEqual("cs");
          },
          { timeout: 5000 }
        );
        fireEvent.change(languageElement, { target: { value: eachLanguage } });
        expect(languageElement.value).toEqual(eachLanguage);
        expect(urlElement.textContent).toContain(eachLanguage);
      });
    });
  });
  describe("test to check if range changes with change in language", () => {
    const maxRangesList = [
      { language: "en", range: "319" },
      { language: "cs", range: "3" },
      { language: "de", range: "35" },
      { language: "es", range: "6" },
      { language: "fr", range: "999" },
      { language: "pt", range: "1" },
    ];
    maxRangesList.map((eachRange) => {
      test("changing or not", async () => {
        render(<MockJoke />);
        const maxRange = screen.getByTestId("max-range");
        const languageElement = screen.getByTestId("language-dropdown");
        await waitFor(
          async () => {
            expect(languageElement.value).toEqual("cs");
          },
          { timeout: 4000 }
        );
        fireEvent.change(languageElement, {
          target: { value: eachRange.language },
        });
        expect(maxRange.value).toEqual(eachRange.range);
      });
    });
  });
  describe("submit button testing", () => {
    test("submit", async () => {
      render(<MockJoke />);
      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toBeInTheDocument();
      const jokeContainer = screen.getByTestId("joke-container");
      expect(jokeContainer).toBeInTheDocument();
      fireEvent.click(submitButton);
      await waitFor(
        async () => {
          expect(jokeContainer.textContent).toContain(" ");
        },
        { timeout: 3000 }
      );
      console.log(jokeContainer.textContent);
      if (jokeContainer.textContent.endsWith("Delivery")) {
        const deliveryButtonElement = screen.getByTestId("delivery-button");
        // eslint-disable-next-line jest/no-conditional-expect
        expect(deliveryButtonElement).toBeInTheDocument();
        expect(screen.getAllByText("Delivery")).toHaveLength(1);
        fireEvent.click(deliveryButtonElement);
        const jokeDelivery = screen.getByTestId("joke-delivery");
        expect(jokeDelivery).toBeInTheDocument();
        expect(jokeDelivery.textContent).toContain(" ");
        console.log(jokeDelivery.textContent);
      }
    });
  });
  describe("multiple jokes", () => {
    test("multiple jokes render ?", async () => {
      render(<MockJoke />);
      const amountElement = screen.getByTestId("amount");
      const submitElement = screen.getByTestId("submit-button");
      const jokeContainer = screen.getByTestId("joke-container");
      const languageElement = screen.getByTestId("language-dropdown");
      await waitFor(
        async () => {
          expect(languageElement.value).toEqual("cs");
        },
        { timeout: 8000 }
      );
      fireEvent.change(languageElement, { target: { value: "en" } });
      fireEvent.change(amountElement, { target: { value: 3 } });
      fireEvent.click(submitElement);
      await waitFor(
        async () => {
          expect(jokeContainer.textContent).toContain(" ");
        },
        { timeout: 8000 }
      );
      await waitFor(
        async () => {
          expect(jokeContainer.textContent).toContain(" ");
        },
        { timeout: 8000 }
      );
      console.log(jokeContainer);
      expect(jokeContainer.childElementCount).toBe(3);
      if (expect(screen.getAllByTestId("multi-container").length) > 1) {
        const multiDeliveryButton = screen.getAllByTestId(
          "multi-delivery-button"
        );
        fireEvent.click(multiDeliveryButton);
        const multiDeliveryElement = screen.getByTestId("multi-delivery");
        expect(multiDeliveryElement).toBeInTheDocument();
      }
    }, 10000);
  });
});
