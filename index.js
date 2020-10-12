const yargs = require('yargs')

//********************* Reading the log file ********************************/
// Makes sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME')
  process.exit(1)
}

//**** Read the file and print its contents. ****/
var fs = require('fs'),
  filename = process.argv[2]

let log = fs.readFileSync(filename, 'utf8', function (err, data) {
  if (err) throw err
  console.log('data txt:', data)
})
//console.log('filename:', filename)
console.log(log)

//**** Split the log into lines in a array ****/
const logArray = log.split(/\r?\n/)
//console.log('logArray:', logArray)

//**** Search options ****/
const options = yargs
  .usage('Usage: -s <Search for start & end dates>')
  .option('s', {
    alias: 'search',
    describe: 'Search start date in this format "2019-03-01 10:30:00" ',
    type: 'string',
    demandOption: true,
  })
  .option('e', {
    alias: 'end',
    describe: 'Search end date in this format "2019-03-01 10:30:00"',
    type: 'string',
    demandOption: true,
  }).argv

if (options.search) {
  console.log(`Searching for these dates: ${options.search} - ${options.end}`)
} else {
  console.log("Didn't match any dates in the list")
}

/***** Filter the array on spec. dates ****/
let startDate = new Date(`${options.search}`)
let endDate = new Date(`${options.end}`)

let filtered = logArray.filter(
  (d) =>
    new Date(d.substr(1, 19)) >= startDate &&
    new Date(d.substr(1, 19)) <= endDate
)
console.log('filteredArray:', filtered)

let results = []
//**** Counting no of uniq visitors ****/
const countVisitors = () => {
  const filterContact = () => {
    const contact = /contact/,
      contactFilter = filtered.filter((str) => {
        return contact.test(str)
      })
    //console.log('contactfilter', contactFilter)

    let contactUsers = contactFilter.map((objects, index, array) => {
      // + makes the strings become numbers
      return +objects.slice(40, 46)
    })
    //console.log('contactusers', contactUsers)

    if (contactUsers) {
      let unique = contactUsers.filter((item, i, ar) => ar.indexOf(item) === i)
      const noOfContactVisitors = unique.length
      results.push(noOfContactVisitors)
      //console.log('noOfUniqueContactVisitors', noOfContactVisitors)
    }
  }
  filterContact()

  const home = /home/,
    homeFilter = filtered.filter((str) => {
      return home.test(str)
    })
  //console.log('homefilter', homeFilter)

  let homeUsers = homeFilter.map((objects, index, array) => {
    return +objects.slice(40, 46)
  })
  //console.log('homeusers', homeUsers)
  if (homeUsers) {
    let unique = homeUsers.filter((item, i, ar) => ar.indexOf(item) === i)
    const noOfHomeVisitors = unique.length
    results.push(noOfHomeVisitors)
    //console.log('noOfUniqueHomeVisitors', noOfHomeVisitors)
  }
}
countVisitors()

//**** Counting no. of pageviews  ****/
let numberOfHomeViews = (filtered.join(' ').match(/home.html/g) || []).length
results.push(numberOfHomeViews)
//console.log('numberOfHomeViews:', numberOfHomeViews)

let numberOfContactViews = (filtered.join(' ').match(/contact.html/g) || [])
  .length
results.push(numberOfContactViews)
//console.log('numberOfContactViews:', numberOfContactViews)

//**** Pick the urls from the array ****/
const urls = () => {
  const url = logArray.map((Objects, index, arr) => {
    return Objects.slice(25, 38)
  })
  //console.log('url:', url)
  if (url) {
    const contact = url.find((a) => a.includes('contact'))
    results.unshift(contact)
    //console.log(contact)
  }
  if (url) {
    const home = url.find((a) => a.includes('home'))
    results.splice(3, 0, home)
    //console.log(home)
  }
}
urls()
//console.log('results:', results)

//**** Add the results to the resultLog ****/

let resultLog = []
for (let i = 0; i < results.length - 1; i += 3) {
  resultLog.push({
    url: results[i],
    pageViews: results[i + 1],
    Visitors: results[i + 2],
  })
}
//console.log('resultLog:', resultLog)
console.table(resultLog)

//***** Send the result back to a new file *****/
fs.writeFile('report.txt', JSON.stringify(resultLog), 'utf8', function (err) {
  if (err) {
    return console.log(err)
  }
  console.log('The file was saved!')
})

//**** Read file result ****/
const result = fs.readFile('report.txt', 'utf8', function read(err, data) {
  if (err) {
    throw err
  } else {
    //console.log(data)
  }
})
//console.table(result)
