const Users = require('../models/Users');

class ActionController {
    async like(req, res) {
        const { user } = req.headers;
        const { id: target } = req.params;

        const targetExists = await Users.findOne({ phoneNumber: target });

        if (!targetExists) {
            return res.json({ error: 'Selected user does not exists.'});
        }

        const userData = await Users.findOne({ phoneNumber: user });
        userData.likes.push(target);
        await userData.save()

        const userLikePosition = targetExists.likes.indexOf(user);

        if (userLikePosition >= 0) {
            return res.status(200).json({ status: 'It is a match!' });
            // Nos outros APP's aparece uma notificacao para o outro usuário.
            // Acredito que devemos usar o socket.io para notificar.
        }

        res.sendStatus(202);
    }

    async dislike(req, res) {
        const { user } = req.headers;
        const { id: target } = req.params;

        const targetExists = await Users.findOne({ phoneNumber: target });

        if (!targetExists) {
            return res.json({ error: 'Selected user does not exists.'});
        }

        const userData = await Users.findOne({ phoneNumber: user });
        userData.dislikes.push(target);
        await userData.save()

        res.sendStatus(202);
    }

    async block(req, res) {
        const { user } = req.headers;
        const { id: target } = req.params;

        const targetExists = await Users.findOne({ phoneNumber: target });

        if (!targetExists) {
            return res.json({ error: 'Selected user does not exists.'});
        }

        const userData = await Users.findOne({ phoneNumber: user });
        
        const targetLikePosition = userData.likes.indexOf(target);

        if (targetLikePosition >=0) {
            userData.likes.splice(targetLikePosition, 1);
        }

        userData.blocked.push(target);
        await userData.save();

        res.sendStatus(202);
    }
}

module.exports = new ActionController();
