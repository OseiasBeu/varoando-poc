const { Router } = require('express');

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');

const router = Router();

router.get('/', (req, res) => {
    res.json({ ok: true });
});

/* People */
router.get('/users', UserController.index);
router.post('/users', UserController.store);
router.get('/users/:id', UserController.show);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);


// Auth
router.post('/auth/login', AuthController.login)
router.get('/auth/logoff', AuthController.logoff)
router.post('/auth/register', AuthController.register)

module.exports = router;
