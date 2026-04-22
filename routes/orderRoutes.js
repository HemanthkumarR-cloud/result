const express = require('express');
const router = express.Router();
const {
    getOrders,
    placeOrder,
    updateOrder,
    patchOrder,
    deleteOrder,
    handleHead,
    handleOptions
} = require('../controllers/orderController');

router.route('/')
    .get(getOrders)
    .post(placeOrder)
    .head(handleHead)
    .options(handleOptions);

router.route('/:id')
    .put(updateOrder)
    .patch(patchOrder)
    .delete(deleteOrder)
    .head(handleHead)
    .options(handleOptions);

module.exports = router;
