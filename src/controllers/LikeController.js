const Users = require('../models/Users');

class LikeController {
    async store(req, res) {
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
}

module.exports = new LikeController();
