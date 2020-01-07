const express = require("express")
const routes = express.Router()

const instructors = require("./app/controllers/instructors")
const members = require("./app/controllers/members")

routes.get("/", function(req, res){
    res.redirect("/instructors")
})

routes.get("/instructors", instructors.index)
routes.get("/instructors/create", instructors.create)
routes.post("/instructors", instructors.post)
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)
routes.get("/instructors/:id", instructors.show)
routes.get("/instructors/:id/edit", instructors.edit)


routes.get("/members", members.index)
routes.get("/members/create", members.create)
routes.post("/members", members.post)
routes.put("/members", members.put)
routes.delete("/members", members.delete)
routes.get("/members/:id", members.show)
routes.get("/members/:id/edit", members.edit)

module.exports = routes