const { date } = require("../../lib/utils")

const member = require ("../models/member")

module.exports = {
    index(req, res) {
        
        member.all(function(members){
            res.render('members/index', { members })
        })

    },

    create(req, res) {
        res.render("members/create") 
    },

    edit(req, res) {
        member.find(req.params.id, function(member) {
            if (!member) return res.send("member not found!")

            member.birth = date(member.birth).iso


            return res.render("members/edit", { member })
        })
    },

    show(req, res) {
        member.find(req.params.id, function(member) {
            if (!member) return res.send("member not found!")

            member.birth = date(member.birth).birthday

            return res.render("members/show", { member })
        })
    },

    post(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            
            if (req.body[key] == "" )
                return res.send("Please fill all the fields!!")

        }

        member.create(req.body, function(member) {
            res.redirect(`members/${member.id}`)
        })
        
    },

    put(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            
            if (req.body[key] == "" )
                return res.send("Please fill all the fields!!")

        }

        console.log(req.body)

        member.update(req.body, function() {
            res.redirect(`members/${req.body.id}`)
        })
    },

    delete(req, res) {
        member.delete(req.body.id, function() {
            res.redirect("members/")
        })
    } 
}