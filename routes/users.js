const router = require('express').Router();
const controller = require('../controllers/users');
const profileEditValidator = require('../middlewares/validators/profileEdit');

router.get('/me', controller.getProfile);
router.patch('/me', profileEditValidator.profileEdit, controller.updateUser);

module.exports = router;
