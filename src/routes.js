const { Router } = require('express');

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const ActionController = require('./controllers/ActionController');

const router = Router();

router.get('/', (req, res) => {
    res.json({ ok: true });
});

// Users
router.get('/users', UserController.index);
router.post('/users', UserController.store);
router.get('/users/:id', UserController.show);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

// Likes / Dislikes
router.post('/like/:id', ActionController.like);
router.post('/dislike/:id', ActionController.dislike);
router.post('/block/:id', ActionController.block);

// Auth
router.post('/auth/login', AuthController.login)
router.get('/auth/logoff', AuthController.logoff)
router.post('/auth/register', AuthController.register)

module.exports = router;
