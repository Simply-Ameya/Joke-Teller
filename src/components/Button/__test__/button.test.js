import Button from './../Button'

console.log(Button(2,3))

test("first test", () => {
  const value = Button(2,3)
  expect(value).toBe(5)
});

