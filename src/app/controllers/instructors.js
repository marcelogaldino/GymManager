const { date, age } = require("../../lib/utils")

const instructor = require('../models/instructor')

module.exports = {
    index(req, res) {
        
        instructor.all(function(instructors){
            res.render('instructors/index', { instructors })
        })

    },

    create(req, res) {
        res.render("instructors/create") 
    },

    edit(req, res) {
        instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("Instructor not found!")

            instructor.birth = date(instructor.birth).iso
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/edit", { instructor })
        })
    },

    show(req, res) {
        instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("Instructor not found!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        })
    },

    post(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            
            if (req.body[key] == "" )
                return res.send("Please fill all the fields!!")

        }

        instructor.create(req.body, function(instructor) {
            res.redirect(`instructors/${instructor.id}`)
        })
        
    },

    put(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            
            if (req.body[key] == "" )
                return res.send("Please fill all the fields!!")

        }

        instructor.update(req.body, function() {
            res.redirect(`instructors/${req.body.id}`)
        })
    },

    delete(req, res) {
        instructor.delete(req.body.id, function() {
            res.redirect("instructors/")
        })
    } 
}