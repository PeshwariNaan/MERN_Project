import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../../components/Message';
import { addToCart, removeFromCart } from '../../actions/cartActions';

const CartScreen = ({match, location, history}) => {

  const productId = match.params.id;

    //The qty using the search.location will get us the actual quantity that the user specified on the add to cart. We have to cast it to a number because it is a string 
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    
    const dispatch = useDispatch();

    const cart = useSelector( state => state.cart);
    const {cartItems} = cart;
    console.log(cartItems);


//Lesson 34 - Remember to change back if we have issues in the future - The call to addToCart is made from the products page when we hit add to cart - also it doesn't seem like the quantity is being added and the url changed a lot - Now changed to the original until I can understand what is going on...
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    //Just remember that item.product refers to the id of the product - poorly named in the lesson :(
    return (
        <Row>
           <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>     Go Back</Link></Message> : (
            <ListGroup variant='flush'>
                {cartItems.map(item => (
                    <ListGroup.Item key={item.product}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>{item.price}</Col>
                            <Col md={2}>
                            <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                      {[...Array(item.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                <i className='fas fa-trash'></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
           </Col>
           <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items 
                            </h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkOutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
           </Col>
          
        </Row>
    )
}

export default CartScreen
