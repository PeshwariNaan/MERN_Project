import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';


//@desc Create new order
//@route POST /api/orders
//@access Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if(orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order Items')
      
  }else {
      const order = new Order({        
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })

      const createdOrder = await order.save()

      res.status(201).json(createdOrder)
  }
});

//@desc Get order by id
//@route GET /api/orders/:id
//@access Private
export const getOrderById = asyncHandler(async (req, res) => {

  //This code will add the name and email to the order we are fetching populate('user', 'name email') - Need to follow up on this command***
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  //The if statement was not in the original code - this code will check that the user is either an admin or make sure that the user that is logged in is the user that placed the order - stack overflow answer to this issue https://stackoverflow.com/questions/11060213/mongoose-objectid-comparisons-fail-inconsistently
  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
});

//@desc Update order to paid
//@route GET /api/orders/:id/pay
//@access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id);

  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
});

//@desc Update order to delivered
//@route GET /api/orders/:id/deliver
//@access Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id);

  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
});

//@desc get logged in users orders
//@route GET /api/orders/myorders
//@access Private
export const getMyOrders = asyncHandler(async (req, res) => {

  const orders = await Order.find({user: req.user._id});
  res.json(orders)
  
});

//@desc get all orders
//@route GET /api/orders
//@access Private/Admin
export const getOrders = asyncHandler(async (req, res) => {

  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders)
  
});