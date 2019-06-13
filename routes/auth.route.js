const express = require('express');
const { celebrate: validate, errors } = require('celebrate');
const expressJwt = require('express-jwt');
const paramValidation = require('../validations/auth.validation');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber);

router.use(errors());

module.exports = router;
