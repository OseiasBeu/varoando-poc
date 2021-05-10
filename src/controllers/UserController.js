const Users = require('../models/Users');

class UserController {
    async index(req, res) {
        const users = await Users.find();

        /*
            Temos que criar uma lista de likes e dislikes
            Não podemos exibir os perfis que o usuário já deu like e os que ele já deu dislike
        */

        res.json(users);
    }

    async show(req, res) {
        res.json({ users: 'View' });
    }

    async store(req, res) {
        const { name, birthdate, gender, phoneNumber } = req.body;

        const userExists = await Users.findOne({ phoneNumber });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const user = await Users.create({
            name,
            birthdate,
            gender,
            phoneNumber
        });

        res.json({
            name: user.name,
            birthdate: user.birthdate,
            gender: user.gender,
            phoneNumber: user.phoneNumber
        });



        /*
        const { name, phone, email, password, admin } = req.body;

        const userExists = await UsersRepository.findByEmail(email);

        if(userExists) {
            return res.status(400).json({ error: 'This e-mail is already in use.' });
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const user = await UsersRepository.store({
            name,
            phone,
            email,
            password: passwordHash,
            admin
        });

        delete user.password;

        res.json(user);
        */
    }

    async update(req, res) {
        res.json({ users: 'Update' });
    }

    async delete(req, res) {
        res.json({ users: 'Delete' });
    }
}

module.exports = new UserController();
