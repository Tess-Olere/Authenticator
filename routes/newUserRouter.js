const router = require('express').Router();

const {logout, register, login, getregisterpage, getloginpage, getdashboard } = require('../controller/newUser');
const requiredAuthProcess = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/register', getregisterpage)
router.get('/login', getloginpage)
router.get('/dashboard', requiredAuthProcess, getdashboard)
router.get('/logout', logout)

module.exports = router;