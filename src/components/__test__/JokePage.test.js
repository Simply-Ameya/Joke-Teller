import "@testing-library/jest-dom";
import "@testing-library/react";
import {
  render,
  screen,
  waitFor,
  runs,
  fireEvent,
  getByTestId,
} from "@testing-library/react";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { mount, shallow } from "enzyme";
import JokePage from "../JokePage";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure } from "enzyme";

const saas = new Adapter();
configure({ adapter: saas });

const MockJoke = () => {
  return <JokePage />;
};
jest.setTimeout(30000);

describe("JokePage", () => {
  // test("async", async () => {
  //   render(<MockJoke />);
  //   const list = await waitFor(async () => {
  //     const wrapper = shallow(<MockJoke />);
  //     const x = wrapper.find(".custom-container");
  //     console.log("x", x);
  //   }, 8000);
  //   console.log("ameya", list);
  //   const element = await screen.findByTestId("Christmas");

  //   console.log(element);
  //   expect(element).toBeInTheDocument();
  // });
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
    test("language-dropdown", () => {
      render(<MockJoke />);
      const languages = ["en", "cs", "de", "pt", "es", "fr"];
      const element = screen.getByTestId("language-dropdown");
      expect(element).toBeInTheDocument();
      languages.map((eachLanguage) => {
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
});
