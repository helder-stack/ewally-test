const express = require('express')
const app = express()
const bp = require('body-parser')

const {validateBoleto} = require("./boletoService")

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

app.get('/boleto/:barCode', async (req, res)=>{

    res.send(await validateBoleto(req.params.barCode, res))

});

app.listen(3000, (error)=> (error) ? console.error(error) : console.log("Server is running..."))