const historyModel = require("../models/history");
const userModel = require("../models/profile")

const historyController = {
    // create: async (req, res) => {
    //     const request = {
    //         ...req.body
    //     }
        
    //     return historyModel
    //     .add(request)
    //     .then(result => {
    //         return res.status(200).send({message: "success", data: result})
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // },

    create: async(req, res) => {
        const request = {
            ...req.body
        }
        try{
            const resultUserById = await userModel.getDetail(request).then(res => res.json)
            console.log(resultUserById)
            if(resultUserById.balance < request.amount) {
                return res.status(500).send({
                    message: "your balance is not valid"
                })
            }
            // const result = await historyModel.updateBalance(request)
            return res.status(201).send({data: result})
        } catch(error) {
            return res.status(500).send(error)
        }
    },

    getAll : (req, res) => {
        return historyModel
        .get(req.query)
        .then(result => {
            return res.status(200).send({message:"success", data : result})
    })
    .catch(err => {
        return res.status(500).send({message:"error on server side"})
    })
    },

    removeAll : (req, res) => {
        return historyModel
        .removeAll()
        .then(result => {
            console.log()
            return res.status(200).send({message:"success", data : result})
        })
        .catch(err => {
            return res.status(500).send({message:"error on server side"})
        })
    }

}

module.exports = historyController;