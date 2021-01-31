import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap';

//import products from '../../products';
import Product from '../../components/Product.component';
import axios from 'axios';

//Lesson 12: We are fetching the product data but that is coming from the port 5000. We added  "proxy": "http://127.0.0.1:5000" to the package.json in the frontend so we are able to communicate with the backend


const Homescreen = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const {data} = await axios.get('/api/products')

            setProducts(data)
        }
        fetchProducts()
    }, [])

    return (
        <>
            <h1>Latest products</h1>            
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product 
                        product={product}
                       />
                    </Col>
                ))}
            </Row>
            
        </>
    )
}

export default Homescreen
