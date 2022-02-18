const express = require('express');
const router = express.Router();
const {
    getAllTestProduct,
    getAllDynamicsProduct,
} = require('../controllers/product.controller')

router.route('/').get(getAllTestProduct);
router.route('/query').get(getAllDynamicsProduct);

module.exports = router;
