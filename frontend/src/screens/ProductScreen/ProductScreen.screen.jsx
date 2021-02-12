import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap';
import Rating from '../../components/Rating.component';
import {listProductDetails} from '../../actions/productActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';



    const ProductScreen = ({history,  match }) => {
const [qty, setQty] = useState(1);

      const dispatch = useDispatch();

      const productDetails = useSelector((state) => {
        return state.productDetails;
      });
      const { loading, error, product } = productDetails;

      useEffect(() => {
        dispatch(listProductDetails(match.params.id));
      }, [dispatch, match]);

      const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
      }

      return (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Row>
              <Col className='product-page-section'  md={6}>
                <Image
                  src={product && product.image}
                  alt={product && product.name}
                  fluid
                />
              </Col>
              <Col  className='product-page-section' md={3}>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h3>{product && product.name}</h3>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Rating
                      value={product && product.rating}
                      text={`${product && product.numReviews} reviews`}
                    />
                  </ListGroupItem>
                  <ListGroupItem>
                    Price: ${product && product.price}
                  </ListGroupItem>
                  <ListGroupItem>
                    Description: {product && product.description}
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col className='product-page-section'  md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      <Row>
                        <Col className='product-page-section' >Price:</Col>
                        <Col className='product-page-section' >
                          <strong>${product && product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col className='product-page-section' >Status:</Col>
                        <Col className='product-page-section' >
                          {product && product.countInStock > 0
                            ? "In stock"
                            : "Out of stock"}
                        </Col>
                      </Row>
                    </ListGroupItem>
                            {product && product.countInStock > 0 && (
                              <ListGroup.Item>
                                <Row>
                                  <Col className='product-page-section' >Qty</Col>
                                  <Col className='product-page-section' >
                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                      {[...Array(product && product.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            )}

                    <ListGroupItem>
                      <Button onClick={addToCartHandler} disabled={product && product.countInStock === 0}>
                        Add to Cart
                      </Button>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
        </>
      );
    };

export default ProductScreen;
