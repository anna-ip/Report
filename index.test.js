// Here should the Jest test go!

//Do a couple of tests, either to pull the spec function out of the index.js and test that specific function or to refactor the code into smaller components and test the components.

//Trying Unit test and Jest with a mockup test:

//this function is not case sensitive bcs of the regex
// function filterByTerm(inputArr, searchTerm) {
//   const regex = new RegExp(searchTerm, 'i')
//   return inputArr.filter(function (arrayElement) {
//     return arrayElement.url.match(regex)
//   })
// }

// describe('Filter function', () => {
//   test('it should filter by a search term (link)', () => {
//     const input = [
//       { id: 1, url: 'https://www.url1.dev' },
//       { id: 2, url: 'https://www.url2.dev' },
//       { id: 3, url: 'https://www.link3.dev' },
//     ]

//     const output = [{ id: 3, url: 'https://www.link3.dev' }]

//     expect(filterByTerm(input, 'link')).toEqual(output)
//     expect(filterByTerm(input, 'LINK')).toEqual(output) // New test
//   })
// })
