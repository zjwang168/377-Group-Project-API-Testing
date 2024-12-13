const express = require('express');
const {
    fetchConversionRates,
    logConversion,
    getAllConversions
} = require('../controllers/conversionController');

const router = express.Router();

router.get('/rates', fetchConversionRates);
router.post('/log', logConversion);
router.get('/conversions', getAllConversions);

module.exports = router;