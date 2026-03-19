import useFetch from "../hook/useFetch.jsx";
import useProductsList from "../hook/useProductsList.jsx";

import {useEffect, useState} from "react";
import {Container, Card, Row, Button, Col} from "react-bootstrap";
import LoaderComponent from "../components/loader/LoaderComponent.jsx";

// Global context variables:
import {useCart} from "../context/CartContext.jsx";

export default function ProductList(){
    const {productList, isProductListLoading, fetchProducts} = useProductsList();

    const {addToCart} = useCart();
    function handleAddToCart(product){
        addToCart(product);
    }
    return (
        <Container>
            <h1 className='fw-bold'>Product List</h1>

            <Row xs={1} md={3}>

                {isProductListLoading?<LoaderComponent /> :
                    productList?.map( (product) =>
                            <Col key={product.id}>
                            <Card className={'m-auto'} key={product.id} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={product?.image??"no-image"} width='0' />
                                <Card.Body>
                                    <Card.Title>{product?.title??"no-title"}</Card.Title>
                                    <Card.Title>Price: {product?.price??"no-price-info"}</Card.Title>
                                    <Card.Text className={'overflow-hidden'}>{product?.description??"no-desc"}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button onClick={()=> {
                                        handleAddToCart(product)
                                    }}>Add to Cart</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                    ??<div>No Products</div>
                }
            </Row>
        </Container>
    );
}