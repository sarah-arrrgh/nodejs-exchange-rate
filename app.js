// Problem: We need a simple way to check the exchange rate between NZD and other currencies
// Solution: Use Node.js to connect to the fixer.io API to get rate informtation to print out

// Connect to the API URL http://api.fixer.io/latest?symbols=USD,GBP&base=NZD
// Parse the data
// Print the data

var http = require("http")

var base = "NZD"
var rate1 = "CAD"
var rate2 = "USD"

var request = http.get("http://api.fixer.io/latest?base=" + base + "&symbols=" + rate1 + "," + rate2, function(response){
  var body = ""
  console.dir(response.statusCode)

  // Read the data
  response.on("data", function(chunk){
    body += chunk
  })

  response.on("end", function(){
    var data = JSON.parse(body)
    printRate(base, rate1, data.rates[rate1])
  })

})

// This doesn't work... 4th video
request.on("error", function(error){
  console.error(error.message)
})


// Print the rate
function printRate(baseCurrency, currencyName, currencyRate){
  var rate = "Currently the " + baseCurrency + " rate against the " + currencyName + " is " + currencyRate + "."
  console.log(rate)
}