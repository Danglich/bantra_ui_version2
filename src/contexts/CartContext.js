import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const CartContext = createContext();

function CartContextProvider({ children }) {
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem('cartItems')) || [],
    );

    const [showCart, setShowCart] = useState(false);
    const [totalPrice, setTotalPrice] = useState(
        JSON.parse(localStorage.getItem('totalPrice')) || 0,
    );
    const [totalQuantities, setTotalQuantities] = useState(
        JSON.parse(localStorage.getItem('totalQuantities')) || 0,
    );

    let foudCartItem;

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    }, [totalPrice]);

    useEffect(() => {
        localStorage.setItem(
            'totalQuantities',
            JSON.stringify(totalQuantities),
        );
    }, [totalQuantities]);

    const onAdd = (product, quantity) => {
        const checkProductInCartItem = cartItems.find(
            (item) => item.product._id === product._id,
        );
        setTotalPrice((prev) => prev + quantity * product.price);
        setTotalQuantities((prev) => prev + quantity);

        if (checkProductInCartItem) {
            const updateItems = cartItems.map((item) => {
                if (item.product._id === product._id) {
                    return {
                        product: product,
                        quantity: item.quantity + quantity,
                    };
                } else {
                    return { ...item };
                }
            });
            setCartItems(updateItems);
        } else {
            setCartItems([
                ...cartItems,
                { product: product, quantity: quantity },
            ]);
        }
    };

    const onRemove = (product, quantity) => {
        foudCartItem = cartItems.find(
            (item) => item.product._id === product._id,
        );

        if (foudCartItem) {
            const newCartItems = cartItems.filter(
                (item) => item.product._id !== foudCartItem.product._id,
            );
            setCartItems(newCartItems);
            setTotalQuantities((prev) => prev - foudCartItem.quantity);
            setTotalPrice((prev) =>
                quantity
                    ? prev - foudCartItem.product.price * quantity
                    : prev - foudCartItem.product.price,
            );
        }
    };

    const toggleQuantity = (cartItem, type, quantityCurrent) => {
        if (type === 'asc') {
            foudCartItem = cartItems.find(
                (item) => item.product._id === cartItem.product._id,
            );
            const newCartItems = cartItems.filter(
                (item) => item.product._id !== foudCartItem.product._id,
            );

            setCartItems([
                ...newCartItems,
                { ...foudCartItem, quantity: foudCartItem.quantity + 1 },
            ]);
            setTotalQuantities((prev) => prev + 1);
            setTotalPrice((prev) => prev + foudCartItem.product.price);
        }
        if (type === 'dec') {
            if (quantityCurrent === 1) {
                onRemove(cartItem.product);
            } else {
                foudCartItem = cartItems.find(
                    (item) => item.product._id === cartItem.product._id,
                );
                const newCartItems = cartItems.filter(
                    (item) => item.product._id !== foudCartItem.product._id,
                );

                setCartItems([
                    ...newCartItems,
                    { ...foudCartItem, quantity: foudCartItem.quantity - 1 },
                ]);
                setTotalQuantities((prev) => prev - 1);
                setTotalPrice((prev) => prev - foudCartItem.product.price);
            }
        }
    };

    const resetCart = useCallback(() => {
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
    }, []);

    const toggleShowCart = useCallback(() => {
        setShowCart(!showCart);
    }, [showCart]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totalPrice,
                totalQuantities,
                showCart,
                toggleShowCart,
                toggleQuantity,
                onAdd,
                onRemove,
                resetCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
