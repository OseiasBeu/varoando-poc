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

        console.log(userData.likes);

        if (targetLikePosition >=0) {
            userData.likes.splice(targetLikePosition, 1);
        }

        userData.blocked.push(target);
        await userData.save();

        res.sendStatus(202);
    }
}

module.exports = new ActionController();
