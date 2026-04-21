import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const PROMO_CODES = {
        ostad10: 10,
        ostad5: 5
    };

    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState("");
    const [discountPct, setDiscountPct] = useState(0);

    // ✅ ADD TO CART
    function addToCart(product) {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);

            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { ...product, quantity: 1 }];
        });
    }

    // ✅ UPDATE QUANTITY (clean version)
    function updateQuantity(id, delta) {    //delta means changes: -1, -1 etc
        setCartItems(prev =>
            prev.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + delta }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    }

    function removeFromCart(id) {
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    function clearCart() {
        setCartItems([]);
        setAppliedCoupon(null);
        setDiscountPct(0);
        setCouponError("");
    }

    // ✅ APPLY COUPON
    function applyCoupon(code) {
        if (appliedCoupon) {
            setCouponError("Coupon already applied");
            return;
        }

        const discount = PROMO_CODES[code.toLowerCase()];

        if (!discount) {
            setCouponError("Invalid coupon code!");
            return;
        }

        setAppliedCoupon(code);
        setDiscountPct(discount);
        setCouponError("");
    }

    // ✅ DERIVED VALUES (NO STATE!) : Reason- absolute values gula useState e ache, jokhon absolute gula change hoy tokhon react e rerender hoy
    const subTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const discountPrice = subTotal * (discountPct / 100);
    const finalTotal = subTotal - discountPrice;

    return (
        <CartContext.Provider value={{
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
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}