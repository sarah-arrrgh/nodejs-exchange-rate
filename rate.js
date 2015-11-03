
// Problem: We need a simple way to check the exchange rate between NZD and other currencies
// Solution: Use Node.js to connect to the fixer.io API to get rate informtation to print out

var http = require("http")

// Print the rate
function printRate(baseCurrency, currencyName, currencyRate){
  var rate = "Currently the " + baseCurrency + " rate against the " + currencyName + " is " + currencyRate + "."
  console.log(rate)
}

// Print the error message
function printError(error){
    console.error("Error: " + error.message)
}

function getRate(base, compare) {
  var request = http.get("http://api.fixer.io/latest?base=" + base + "&symbols=" + compare, function(response) {
    var body = ""

    // Read the data
    response.on("data", function(chunk){
      body += chunk
    })

    response.on("end", function(){
      if((response.statusCode) === 200){
        try {
          // Parse the data
          var data = JSON.parse(body)
          // Print the data
          printRate(base, compare, data.rates[compare])
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
  request.on("error", printError)
}

module.exports.get = getRate
