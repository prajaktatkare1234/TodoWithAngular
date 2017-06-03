var express = require('express');
var router = express.Router();

router.use('/sign_up', require('./sign_up'));
router.use('/sign_in', require('./sign_in'));
router.use('/user_info', require('./authenticate'), require('./user_info'));
router.use('/logout', require('./logout'));
router.use('/data_card',require('./authenticate'),require('./data_card'));
router.use('/get_data_card',require('./authenticate'),require('./get_data_card'));
router.use('/update_data_card',require('./update_data_card'));
router.use('/delete_data_card',require('./delete_data_card'));
router.use('/get_card_notes',require('./get_card_notes'));
router.use('/reminder',require('./reminder'));
router.use('/delete_reminder',require('./delete_reminder'));
router.use('/bgcolor',require('./bgcolor'));
router.use('/archive',require('./archive'));
router.use('/pinup',require('./pinup'));










module.exports = router;
