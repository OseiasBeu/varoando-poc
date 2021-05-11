const Users = require('../models/Users');
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()


class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        console.log(user)
        // bcrypt.hash(password, 10).then((res) => console.log(res));
   
        if (!user){        
            console.log(user)
            res.status(500)
            res.json({
              auth: false,
              "message": "Internal Server Error"
            })      
          } else if (user){
            bcrypt.compare(password, user.password, (err, resp) => {
              if (user){
                const usuario = user.email
                jwt.sign({usuario}, process.env.SECRET, {expiresIn: '365d'}, (err, token) => {
                  res.status(200)
                  res.json({
                    auth: true,
                    token: token
                  })
                })
              } else {
                res.status(403)
                res.json({
                  auth: false,
                  message: "E-mail e/ou senhas incorreto(s)"
                })
              }
            })
          } else {
            res.status(403)
            res.json({
              auth: false,
              message: "E-mail e/ou senhas incorreto(s)"
            })
          }
    }
}

module.exports = new AuthController();
