import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../../components/Rating.component";
import {
  listProductDetails,
  createProductReview,
} from "../../actions/productActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Meta from '../../components/Meta';
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => {
    return state.productDetails;
  });
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => {
    return state.productReviewCreate;
  });
  const { success: reviewSuccess, error: reviewError } = productReviewCreate;

  useEffect(() => {
    if(reviewSuccess) {
      alert('review submitted!')
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, reviewSuccess]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, {
      rating,
      comment
    }))
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
        <>
        <Meta title={product.name} />
          <Row>
            <Col className="product-page-section" md={6}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
              />
            </Col>
            <Col className="product-page-section" md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  Price: ${product.price}
                </ListGroupItem>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col className="product-page-section" md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col className="product-page-section">Price:</Col>
                      <Col className="product-page-section">
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col className="product-page-section">Status:</Col>
                      <Col className="product-page-section">
                        {product.countInStock > 0
                          ? "In stock"
                          : "Out of stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="product-page-section">Qty</Col>
                        <Col className="product-page-section">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[
                              ...Array(product.countInStock).keys(),
                            ].map((x) => (
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
                    <Button
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {reviewError && <Message variant="danger">{reviewError}</Message>}
              {product.reviews.length === 0 && (
                <Message>Be the first to leave a review</Message>
              )}
              <ListGroup variannt="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {userInfo ? (
                    <Form onSubmit={reviewSubmitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="0">Select...</option>
                          <option value="1">Poor</option>
                          <option value="2">Fair</option>
                          <option value="3">Good</option>
                          <option value="4">Very Good</option>
                          <option value="5">Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit Review
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
