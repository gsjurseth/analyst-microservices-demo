const express = require('express')
const app = express()
var cors = require('cors')
const port = 8080

app.use(cors())

app.get('/offers', (req, res) => {
  res.json({
    "offers": [
      {
        "name" : "March Madness",
        "type" : "percent_discount",
        "amount" : 0.1
      },
       {
        "name" : "New Customer",
        "type" : "dollar_discount",
        "amount" : 10,
        "minimum_spend": 50
      }
    ]
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
