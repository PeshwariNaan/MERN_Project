import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from '../components/Rating.component';


//Lesson 8 - We started using 'a tags' like the copied text below and we switched to <Link /> because React is a single page app and we don't want the page to reload in it's entirety. Change the a tags to Link and change the href => to=
const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                   <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as='h3' >${product.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product

// return (
//     <Card className='my-3 p-3 rounded'>
//         <a href={`/product?${product.id}`}>
//             <Card.Img src={product.image} variant='top'/>
//         </a>
//         <Card.Body>
//             <a href={`/product/${product.id}`}>
//                 <Card.Title as='div'>
//                     <strong>{product.name}</strong>
//                 </Card.Title>
//             </a>
//             <Card.Text as='div'>
//                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
//             </Card.Text>
//             <Card.Text as='h3' >${product.price}</Card.Text>
//         </Card.Body>
//     </Card>
// )