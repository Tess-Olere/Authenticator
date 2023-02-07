const router = require('express').Router();

const {register, login, getregisterpage, getloginpage, getdashboard } = require('../controller/newUser');

router.post('/register', register)
router.post('/login', login)
router.get('/register', getregisterpage)
router.get('/login', getloginpage)
router.get('/dashboard', getdashboard)

module.exports = router;