import Editor from "../components/Editor.js";

let ed = new Editor();
it("detect URL 1", () => {
  expect(ed.detectURL("my www.devpools.kr ")).toEqual("www.devpools.kr");
});

it("detect URL 2", () => {
  expect(
    ed.detectURL(
      "http://www.devpools.kr는 www.github.com의 내용이 전부 궁금하다."
    )
  ).toEqual("http://www.devpools.kr");
});

it("detect URL 3", () => {
  expect(
    ed.detectURL("www.github.com에 관해서는 http://www.devpools.kr이 전문가다.")
  ).toEqual("http://www.devpools.kr");
});

it("detect URL 4", () => {
  expect(
    ed.detectURL(
      "https://www.devpools.kr와 http://www.devpools.kr, 그리고 www.devpools.kr 마지막으로 devpools.kr "
    )
  ).toEqual("https://www.devpools.kr");
});

it("hasValue 1", () => {
  expect(ed.hasValue(1)).toEqual(false);
});

it("hasValue 2", () => {
  expect(ed.hasValue(new Date())).toEqual(false);
});

it("hasValue 3", () => {
  expect(ed.hasValue("1")).toEqual(true);
});

it("hasValue 4", () => {
  expect(ed.hasValue()).toEqual(false);
});

it("hasValue 5", () => {
  expect(ed.hasValue({})).toEqual(false);
});

it("hasValue 1", () => {
  expect(ed.hasValue([])).toEqual(false);
});
