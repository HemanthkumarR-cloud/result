const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
exports.getMenuItems = async (req, res, next) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json({
            success: true,
            message: 'Menu items fetched successfully',
            data: menuItems,
            status: 200
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create menu item
// @route   POST /api/menu
// @access  Public
exports.createMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Menu item created successfully',
            data: menuItem,
            status: 201
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update menu item (Replace)
// @route   PUT /api/menu/:id
// @access  Public
exports.updateMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            overwrite: true
        });

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found',
                status: 404
            });
        }

        res.status(200).json({
            success: true,
            message: 'Menu item replaced successfully',
            data: menuItem,
            status: 200
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Partial update menu item
// @route   PATCH /api/menu/:id
// @access  Public
exports.patchMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found',
                status: 404
            });
        }

        res.status(200).json({
            success: true,
            message: 'Menu item updated successfully',
            data: menuItem,
            status: 200
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Public
exports.deleteMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found',
                status: 404
            });
        }

        res.status(200).json({
            success: true,
            message: 'Menu item deleted successfully',
            data: {},
            status: 200
        });
    } catch (error) {
        next(error);
    }
};

// Handle HEAD and OPTIONS
exports.handleHead = (req, res) => {
    res.status(200).end();
};

exports.handleOptions = (req, res) => {
    res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(200).send('GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
};
