import React, {useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Table, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {listAllOrders} from '../../actions/orderActions';


const OrderListScreen = ({history}) => {
  const dispatch = useDispatch();  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListAll = useSelector(state => state.orderListAll);
  const {loading: orderLoading, error: orderListError, orders} = orderListAll;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else {
      history.push('/login')
    }    
  }, [dispatch, history, userInfo]);



  return (
    <>
      <h1>Orders</h1>
      {orderLoading ? (
        <Loader />
      ) : orderListError ? (
        <Message variant="danger">{orderListError}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user &&  order.user.name}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>${order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen
