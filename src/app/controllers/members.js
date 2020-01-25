const { date } = require("../../lib/utils")

const Member = require ("../models/member")

module.exports = {
    index(req, res) {
        
        Member.all(function(members){
            res.render('members/index', { members })
        })

    },

    create(req, res) {

        Member.instructorsSelectOptions(function(options) {
            res.render("members/create", { instructorOptions: options })
        })

    },
    
    show(req, res) {
        Member.find(req.params.id, function(member) {
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
        
        Member.create(req.body, function(member) {
            res.redirect(`members/${member.id}`)
        })
        
    },
    
    edit(req, res) {        
        Member.find(req.params.id, function(member) {
            if (!member) return res.send("member not found!")

            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions(function(options) {
                return res.render("members/edit", { member, instructorOptions: options })
            })            
        })
    },

    put(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            
            if (req.body[key] == "" )
                return res.send("Please fill all the fields!!")

        }

        Member.update(req.body, function() {
            res.redirect(`members/${req.body.id}`)
        })
    },

    delete(req, res) {
        Member.delete(req.body.id, function() {
            res.redirect("members/")
        })
    } 
}