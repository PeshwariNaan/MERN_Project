
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/Header.component';
import Footer from './components/Footer.component';
import Homescreen from './screens/Homescreen/Homescreen.screen';
import ProductScreen from './screens/ProductScreen/ProductScreen.screen';



const App = () => {
  return (
    <Router>    
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={Homescreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
