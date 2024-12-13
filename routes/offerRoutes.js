const express = require('express');
const { sendOfferLetter } = require('../controllers/offerController');

const router = express.Router();

router.post('/send-offer', sendOfferLetter);

module.exports = router;
