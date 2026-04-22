const express = require('express');
const router = express.Router();
const {
    getMenuItems,
    createMenuItem,
    updateMenuItem,
    patchMenuItem,
    deleteMenuItem,
    handleHead,
    handleOptions
} = require('../controllers/menuController');

router.route('/')
    .get(getMenuItems)
    .post(createMenuItem)
    .head(handleHead)
    .options(handleOptions);

router.route('/:id')
    .put(updateMenuItem)
    .patch(patchMenuItem)
    .delete(deleteMenuItem)
    .head(handleHead)
    .options(handleOptions);

module.exports = router;
