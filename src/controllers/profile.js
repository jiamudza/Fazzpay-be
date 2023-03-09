const userModel = require('../models/profile')

const userController = {
    get:(req, res) => {
        return userModel
        .get(req.query)
        .then(result => {
            return res.status(200).send({message : "success", data : result})
        })
        .catch(err => {
            return res.status(500).send({ message: "internal server error" });
        })
    },

    getDetail:(req, res) => {
        return userModel
        .getDetail(req.params.id)
        .then(result => {
                return res.status(200).send({message:"success", data : result})
        })
        .catch(err => {
            return res.status(500).send({message:"error on server side"})
        })
    },

    update: (req, res) => {
        const request = {
            ...req.body,
            id: req.params.id
        };

        return userModel
        .update(request)
        .then(result => {
            res.status(200).send({message:"data updated" , data : result})
        }) 
        .catch(err => {
            console.log(err)
            return res.status(500).send({message:"error on server side"})
        })
        
    },

    add: (req, res) => {
        return userModel
        .add(req.body)
        .then(result => {
            console.log(result)
            return res.status(200).send({message: "add row success", data: result})
        })
        .catch(err => {
            console.log(err);
            return res.json(err)
        })
    },

    remove: (req, res) => {
        return userModel
        .remove(req.params.id)
        .then(result => {
            // console.log(result)
            return res.status(200).send({message: `data from ${req.params.id} is deleted`})
        })
        .catch(err => {
            // console.log(err)
            return res.status(500).send({message: err})
        })
    }
}

module.exports= userController