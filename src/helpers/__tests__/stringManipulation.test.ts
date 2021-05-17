import { desanitizeName, sanitizeName } from "../stringManipulation";

it("should change nidoran-male to Nidoran Male", () => {
  let input = "nidoran-male";
  let expectedResult = "Nidoran Male";

  expect(sanitizeName(input)).toEqual(expectedResult);
});

it("should change pikachu to Pikachu", () => {
  let input = "pikachu";
  let expectedResult = "Pikachu";

  expect(sanitizeName(input)).toEqual(expectedResult);
});

it("should change Nidoran Male to nidoran-male", () => {
  let input = "nidoran-male";
  let expectedResult = "Nidoran Male";

  expect(desanitizeName(input)).toEqual(expectedResult);
});
