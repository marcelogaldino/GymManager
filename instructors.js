// create

exports.post = function(req, res){
    const keys = Object.keys(req.body)
    
    for (key of keys) {
        
        if (req.body[key] == "" )
            return res.send("Please fill all the fields!!")

    }

    res.send(req.body)
}

// update

// delete