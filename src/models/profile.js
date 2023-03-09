const db = require('../../helper/connection')
const { v4: uuidv4 } = require("uuid");

const userModel = {
    get: function(queryParams) {
        console.log(queryParams);
        return new Promise((resolve, reject) => {
            db.query(`select * from users`, (err, result) => {
                if(err) {
                    // console.log(err.message)
                    return reject(err.message)
                } else {
                    console.log(result.rows)
                    return resolve(result.rows)
                }
            })
        })
    },

    getDetail : (id) => {
        return new Promise((resolve, reject) => {
            db.query(`select * from users where id = '${id}'`, (err, result) => {
                if(err) {
                    return reject(err.message)
                } else {
                    return resolve(result.rows[0])
                }
            })
        })

    },

    update: ({ id, name, img, phone, balance }) => {
        return new Promise((resolve, reject) => {
          db.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
            if (err) {
              return reject(err.message);
            } else {
              db.query(
                `UPDATE users SET name='${
                  name || result.rows[0].name
                }', img='${img || result.rows[0].img}',
                phone='${phone || result.rows[0].phone}',
                balance='${balance || result.rows[0].balance}'
                   WHERE id='${id}'`,
                (err, result) => {
                  if (err) {
                    return reject(err.message);
                  } else {
                    return resolve({ id, name, phone, img });
                  }
                }
              );
            }
          });
        });
      },

      add: ({id, name, img, phone }) => {
        return new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO users (id, name, img, phone) VALUES ('${uuidv4()}','${name}','${img}','${phone}')`,
            (err, result) => {
              if (err) {
                // console.log(err.message)
                return reject(err.message);
              } else {
                console.log(result)
                return resolve({ id, name, phone });
              }
            }
          );
        });
      },

      remove: (id) => {
        return new Promise((resolve, reject) => {
          db.query(`DELETE from users where id='${id}'`, (err, result) => {
            if(err) {
              
              return reject({message: err.message})
            } else {
              console.log(id)
              return resolve("success deleted")
            }
          })
        })
      }
}

module.exports = userModel