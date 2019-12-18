const fs = require("fs")
const data = require("../data.json")
const Intl = require("intl")

const { age, date } = require("../utils")

exports.index = function(req, res) {
    res.render("members/index", { members: data.members })
}

exports.create = function(req, res){
    res.render("members/create")
}

// Receive PARAMS from get in some URL
exports.edit = function(req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return member.id == id

    })

    if (!foundMember) return res.send("Member not found")
    
    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    } 

    res.render("members/edit", { member })

}

// Receive PARAMS from GET in some URL
exports.show = function(req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return member.id == id

    })

    if (!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
        services: foundMember.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundMember.created_at)
    }

    res.render("members/show", { member })
}

// CREATE data structure for data from POST. All data from post can be accessed using req.body
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    
    for (key of keys) {
        
        if (req.body[key] == "" )
            return res.send("Please fill all the fields!!")

    }

    let { avatar_url, name, birth, gender, services } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.members.length + 1)
    

    data.members.push({
        id,
        avatar_url,
        name,
        gender,
        services,
        birth,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error")
        }

        res.redirect("/members")
    })

}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex) {
        if ( member.id == id ) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null ,2), function(err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/members/${id}`)
    })

}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(function(member) {
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null ,2), function(err) {
        if (err) return res.send("Write error!")

        return res.redirect("/members")
    })

}