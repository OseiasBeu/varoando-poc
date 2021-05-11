const Users = require('../models/Users');
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()


class AuthController {
    async register(req, res){
        const { name, email, plain_password, birthdate, gender, phoneNumber } = req.body;
        const password = await bcrypt.hash(plain_password, 10);
        const userExists = await Users.findOne({ email });

        if (userExists) {
            return res.status(403).json({ error: 'Usuário já existe!' });
        }

        const user = await Users.create({
            name,
            email, 
            password,
            birthdate,
            gender,
            phoneNumber
        });

        res.json({
            name: user.name,
            email: user.email,
        });
    }
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

    async verificar(req, res, next){
        const token = req.headers['access-token']

        if (!token){
        res.status(401)
        res.send({
            auth: false,
            message: 'O token está em branco'
        })
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {

        if (err){
            res.status(500)
            res.send({
            auth: false,
            message: 'Falha de autenticação'
            })
        } else {
            next()
        }
        })
    }

    async logoff(req, res) {
        res.status(200)
        res.send({
            auth: false,
            token: null
        })
    }
}

module.exports = new AuthController();
