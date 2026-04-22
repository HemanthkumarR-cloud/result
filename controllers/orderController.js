const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('items.menuItemId');
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            data: orders,
            status: 200
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Place order
// @route   POST /api/orders
// @access  Public
exports.placeOrder = async (req, res, next) => {
    try {
        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Items cannot be empty',
                status: 400
            });
        }

        let totalAmount = 0;
        const processedItems = [];

        for (const item of items) {
            if (item.quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid quantity for item ${item.menuItemId}`,
                    status: 400
                });
            }

            const menuItem = await MenuItem.findById(item.menuItemId);
            if (!menuItem) {
                return res.status(404).json({
                    success: false,
                    message: `Menu item not found: ${item.menuItemId}`,
                    status: 404
                });
            }

            totalAmount += menuItem.price * item.quantity;
            processedItems.push({
                menuItemId: item.menuItemId,
                quantity: item.quantity
            });
        }

        const order = await Order.create({
            items: processedItems,
            totalPrice: totalAmount
        });

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: order,
            status: 201
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update order (Replace)
// @route   PUT /api/orders/:id
// @access  Public
exports.updateOrder = async (req, res, next) => {
    try {
        // Recalculate total if items are provided
        if (req.body.items) {
            let totalAmount = 0;
            for (const item of req.body.items) {
                const menuItem = await MenuItem.findById(item.menuItemId);
                if (!menuItem) {
                    return res.status(404).json({
                        success: false,
                        message: `Menu item not found: ${item.menuItemId}`,
                        status: 404
                    });
                }
                totalAmount += menuItem.price * item.quantity;
            }
            req.body.totalPrice = totalAmount;
        }

        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            overwrite: true
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
                status: 404
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order replaced successfully',
            data: order,
            status: 200
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Partial update order
// @route   PATCH /api/orders/:id
// @access  Public
exports.patchOrder = async (req, res, next) => {
    try {
        // If items are updated, recalculate total price
        if (req.body.items) {
            let totalAmount = 0;
            for (const item of req.body.items) {
                const menuItem = await MenuItem.findById(item.menuItemId);
                if (!menuItem) {
                    return res.status(404).json({
                        success: false,
                        message: `Menu item not found: ${item.menuItemId}`,
                        status: 404
                    });
                }
                totalAmount += menuItem.price * item.quantity;
            }
            req.body.totalPrice = totalAmount;
        }

        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
                status: 404
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order updated successfully',
            data: order,
            status: 200
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Public
exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
                status: 404
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
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
