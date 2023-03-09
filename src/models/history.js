const { v4: uuidv4 } = require("uuid");
const db = require('../../helper/connection');
const userModel = require("./profile");

const historyModel = {

    add: ({sender_id, receiver_id, amount, time}) => {
        return new Promise((resolve, reject) => {
            db.query(`update users set balance = balance - $1 where id = $2`,
            [amount, sender_id],
            (err, result) => {
                if(err) {
                    return reject(err.message)
                } else {
                    db.query(`update users set balance = balance + $1 where id = $2`,
                    [amount, receiver_id],
                    (err, result) => {
                        if(err){
                            return reject(err.message)
                        } else{
                            db.query(`insert into history(transaction_id, sender_id, receiver_id, amount, time) values($1, $2, $3, $4, $5)`,
                            [uuidv4(), sender_id, receiver_id, amount, new Date()],
                            (err, result) => {
                                if(err) {
                                    return reject(err.message)
                                } else{
                                    return resolve(result.rows)
                                }
                            })
                        }
                    })
                }
            })
        })
    },

    get: (queryParams) => {
        return new Promise((resolve, reject) => {
            db.query(`select users.name, users.id, users.balance, users.img, history.sender_id, history.receiver_id, history.transaction_id, history.amount from users inner join history on history.sender_id=users.id `, (err, result) => {
                if(err) {
                    return reject(err)
                } else {
                    return resolve(result.rows)
                }
            })
        })
    },

    removeAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`delete from history`, (err, result)=> {
                if(err) {
                    return reject(err)
                } else {
                    return resolve(result.rows)
                }
            })
        })
    }
    // add: ({sender_id, receiver_id, transaction_id, amount, time}) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`insert into history(sender_id, receiver_id, transaction_id, amount, time) values($1, $2, $3, $4, $5)`,
    //         [])
    //     })
    // }
}

module.exports = historyModel