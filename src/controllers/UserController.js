const Users = require('../models/Users');

class UserController {
    async index(req, res) {
        const { user } = req.headers;

        // const users = await Users.find().select(['-__v', '-_id']);
        const users = await Users.find({
            $and: [
                { phoneNumber: { $ne: user }}
            ]
        }).select(['-__v', '-_id']);

        /*
            Temos que criar uma lista de likes e dislikes
            Não podemos exibir os perfis que o usuário já deu like e os que ele já deu dislike (ou mostrar o status de gostei nao gostei)
        */

        res.json(users);
    }

    async show(req, res) {
        const { id } = req.params;

        const user = await Users.findOne({ phoneNumber: id }).select(['-__v', '-_id']);

        if (!user) {
            return res.status(404).json({ error: 'This user does not exist.' });
        }

        res.json(user);
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
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, birthdate, gender, phoneNumber } = req.body;

        const user = await Users.findOne({ phoneNumber: id }).select(['-__v', '-_id']);

        if (!user) {
            return res.status(404).json({ error: 'This user does not exist.' });
        }

        const updatedUser = await Users.findOneAndUpdate({ phoneNumber: id }, {
            name,
            birthdate,
            gender,
            phoneNumber
        }, {
            new: true
        }).select(['-__v', '-_id']);

        res.json(updatedUser);
    }

    async delete(req, res) {
        const { id } = req.params;

        const deleteOp = await Users.findOneAndDelete({ phoneNumber: id });

        res.sendStatus(202);
    }
}

module.exports = new UserController();
