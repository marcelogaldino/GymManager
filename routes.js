const express = require("express")
const routes = express.Router()

routes.get("/", function(req, res){
    res.redirect("/instructors")
})

routes.get("/instructors", function(req, res){
    res.render("instructors/index")
})

routes.get("/instructors/create", function(req, res){
    res.render("instructors/create")
})

routes.post("/instructors", function(req, res){
    res.send("recebido")
})

routes.get("/members", function(req, res){
    res.render("members")
})

module.exports = routes