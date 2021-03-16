
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/Header.component';
import Footer from './components/Footer.component';
import Homescreen from './screens/Homescreen/Homescreen.screen';
import ProductScreen from './screens/ProductScreen/ProductScreen.screen';
import CartScreen from './screens/CartScreen/CartScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen/OrderScreen';
import UserListScreen from './screens/UserListScreen/UserListScreen';
import UserEditScreen from './screens/UserEditScreen/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen/OrderListScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/search/:keyword" component={Homescreen} exact />
          <Route path="/page/:pageNumber" component={Homescreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={Homescreen}
            exact
          />
          <Route path="/" component={Homescreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
