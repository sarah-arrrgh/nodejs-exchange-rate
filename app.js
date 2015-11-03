var rate = require("./rate")

var base = process.argv[2]
var compare = process.argv[3]

rate.get(base, compare)
