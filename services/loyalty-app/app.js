const express = require('express')
const app = express()
const port = 8080

app.get('/members', (req, res) => {
  res.json({
    "members": [
      {
        "name" : "Kevin Ford",
        "start_date" : "01/05/2019",
        "balance" : 584,
        "level" : "gold"
      },
      {
        "name" : "Json Lee",
        "start_date" : "05/21/2020",
        "balance" : 584,
        "level" : "silver"
      },
      {
        "name" : "Pablo",
        "start_date" : "02/21/2021",
        "balance" : 584,
        "level" : "bronze"
      }
    ]
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
