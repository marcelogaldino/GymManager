const express = require("express")
const routes = express.Router()

const instructors = require("./instructors")

routes.get("/", function(req, res){
    res.redirect("/instructors")
})

routes.get("/instructors", function(req, res){
    res.render("instructors/index")
})

routes.get("/instructors/create", function(req, res){
    res.render("instructors/create")
})

routes.post("/instructors", instructors.post)

routes.get("/members", function(req, res){
    res.render("members")
})

module.exports = routes