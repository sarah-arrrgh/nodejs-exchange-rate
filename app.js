// Problem: We need a simple way to check the exchange rate between NZD and other currencies
// Solution: Use Node.js to connect to the fixer.io API to get rate informtation to print out

// Connect to the API URL http://api.fixer.io/latest?symbols=USD,GBP&base=NZD
// Parse the data
// Print the data

var http = require("http")

var base = "NZD"
var rate1 = "CAD"
var rate2 = "USD"


// Print the rate
function printRate(baseCurrency, currencyName, currencyRate){
  var rate = "Currently the " + baseCurrency + " rate against the " + currencyName + " is " + currencyRate + "."
  console.log(rate)
}

// Print the error message
function printError(error){
    console.error("Error: " + error.message)
}


var request = http.get("http://api.fixer.io/latest?base=" + base + "&symbols=" + rate1 + "," + rate2, function(response) {
    var body = ""
    console.dir("Status Code: " + response.statusCode)

    // Read the data
    response.on("data", function(chunk){
      body += chunk
    })

    response.on("end", function(){
      if((response.statusCode) === 200){
        try {
          var data = JSON.parse(body)
          printRate(base, rate1, data.rates[rate1])
        } catch(error){
          // Parse error
          printError(error)
        }
      } else {
        // Status code error
        printError({message: "There was an error getting the exchange rate for " + base + ". [" + http.STATUS_CODES[response.statusCode] + "]"})
      }
    })
      

  })

// This doesn't work... 4th video
request.on("error", printError)


