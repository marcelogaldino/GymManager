const { age, date } = require("../../lib/utils")

module.exports = {
    index(req,res) {
        res.render("members/index")
    },

    create(req,res) {
        res.render("members/create") 
    },

    edit(req,res) {
        return
    },

    show(req,res) {
        return
    },

    post(req,res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            
            if (req.body[key] == "" )
                return res.send("Please fill all the fields!!")

        }

        return
    },

    put(req,res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            
            if (req.body[key] == "" )
                return res.send("Please fill all the fields!!")

        }

        return
    },

    delete(req,res) {
        return
    } 
}