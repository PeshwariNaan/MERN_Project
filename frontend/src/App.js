
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/Header.component';
import Footer from './components/Footer.component';
import Homescreen from './screens/Homescreen/Homescreen.screen';
import ProductScreen from './screens/ProductScreen/ProductScreen.screen';
import CartScreen from './screens/CartScreen/CartScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';

const App = () => {
  return (
    <Router>    
      <Header />
      <main className="py-3">
        <Container>          
          <Route path='/login' component={LoginScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/' component={Homescreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
