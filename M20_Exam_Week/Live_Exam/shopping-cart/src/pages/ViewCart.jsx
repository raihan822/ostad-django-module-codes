// src/pages/ViewCart.jsx
import { Container, Button, Card, Row, Col, InputGroup, Form } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ViewCart() {
    const {
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,

        applyCoupon,
        couponError,
        appliedCoupon,

        subTotal,
        discountPrice,
        finalTotal
    } = useCart();

    const [couponCode, setCouponCode] = useState("");

    function handleCheckout() {
        alert("Purchase successful!");
        clearCart();
    }

    return (
        <Container>
            <h1 className="fw-bold mb-4">Your Cart</h1>

            {cartItems.length === 0 && <p>Cart is empty</p>}

            <Row xs={1} md={2} lg={3}>
                {cartItems.map(item => (
                    <Col key={item.id}>
                        <Card className="mb-3">
                            <Card.Img
                                variant="top"
                                src={item.image}
                                style={{ height: "200px", objectFit: "contain" }}
                            />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>Price: ${item.price}</Card.Text>
                                <Card.Text>Quantity: {item.quantity}</Card.Text>
                                <Card.Text>
                                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                </Card.Text>

                                <div className="d-flex gap-2">
                                    <Button
                                        variant="secondary"
                                        onClick={() => updateQuantity(item.id, -1)}
                                    >
                                        -
                                    </Button>

                                    <Button
                                        variant="primary"
                                        onClick={() => addToCart(item)}
                                    >
                                        +
                                    </Button>

                                    <Button
                                        variant="danger"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {cartItems.length > 0 && (
                <div className="mt-4 mb-4">
                    <h4>Sub Total: ${subTotal.toFixed(2)}</h4>
                    <h4>Discount: -${discountPrice.toFixed(2)}</h4>
                    <h4>Total: ${finalTotal.toFixed(2)}</h4>

                    {/* Coupon Section */}
                    <InputGroup className="mt-3">
                        <Form.Control
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            disabled={appliedCoupon} // prevent reuse
                        />

                        <Button
                            variant="outline-primary"
                            onClick={() => applyCoupon(couponCode)}
                            disabled={appliedCoupon}
                        >
                            Apply
                        </Button>
                    </InputGroup>

                    {/* Messages */}
                    {couponError && (
                        <p className="text-danger mt-2">{couponError}</p>
                    )}

                    {appliedCoupon && (
                        <p className="text-success mt-2">
                            Coupon applied: {appliedCoupon}
                        </p>
                    )}

                    <div className="d-flex gap-3 mt-3">
                        <Button variant="success" onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>

                        <Button variant="outline-danger" onClick={clearCart}>
                            Clear Cart
                        </Button>
                    </div>
                </div>
            )}
        </Container>
    );
}