const fs = require("fs")
const data = require("./data.json")
const Intl = require("intl")

const { age } = require("./utils")

// Receive PARAMS from a GET in some URL
exports.show = function(req, res) {
    const { id } = req.params

    const foundIstructor = data.instructors.find(function(instructor) {
        return instructor.id == id

    })

    if (!foundIstructor) return res.send("Instructor not found")

    const instructor = {
        ...foundIstructor,
        age: age(foundIstructor.birth),
        services: foundIstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundIstructor.created_at)
    }

    res.render("instructors/show", { instructor })
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
    const id = Number(data.instructors.length + 1)
    

    data.instructors.push({
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

        res.redirect("/instructors")
    })

    // res.send(req.body)
}
