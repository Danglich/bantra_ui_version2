import { useCallback, useContext, useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useMemo } from 'react';
import { message } from 'antd';
import { apiUrl } from '../constants';

export const CartContext = createContext();

function CartContextProvider({ children }) {
    const { user } = useContext(AuthContext);

    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem('cartItems')) || [],
    );

    // const cartItem = {
    //     product: null,
    //     quantity: 10,
    //     variation: null,
    // };

    useEffect(() => {
        if (user) {
            if (user) {
                axios
                    .get(`${apiUrl}/api/cart_items/${user.id}`)
                    .then((response) => {
                        let data = response.data;
                        let cartItems = data.map((item) => ({
                            product: item.productItem.product,
                            variation: item.productItem,
                            quantity: item.quantity,
                        }));

                        setCartItems(cartItems);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                setCartItems(JSON.parse(localStorage.getItem('cartItems')));
            }
        }
    }, [user]);

    const [showCart, setShowCart] = useState(false);

    let foudCartItem;

    useEffect(() => {
        if (!user) localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems, user]);

    const totalQuantities = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);
    }, [cartItems]);

    const onAdd = (product, productVariation, quantity) => {
        if (user) {
            axios
                .post(`${apiUrl}/api/cart_items`, {
                    product_id: productVariation.id,
                    quantity: quantity,
                })
                .then((response) => {
                    setCartItems((prev) => [
                        ...prev,
                        {
                            quantity: response.data.quantity,
                            variation: response.data.productItem,
                            product: response.data.productItem.product,
                        },
                    ]);
                    message.success('Đã thêm vào giỏ hàng thành công');
                    toggleShowCart();
                })
                .catch((error) => {
                    console.log(error);
                    message.error('Không thêm vào giỏ hàng thành công');
                });
        } else {
            const checkProductInCartItem = cartItems.find(
                (item) => item.variation.id === productVariation.id,
            );

            if (checkProductInCartItem) {
                const updateItems = cartItems.map((item) => {
                    if (item.variation.id === productVariation.id) {
                        return {
                            product: item.product,
                            variation: item.variation,
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
                    {
                        product: product,
                        variation: productVariation,
                        quantity: quantity,
                    },
                ]);
            }

            message.success('Đã thêm vào giỏ hàng thành công');
        }

        toggleShowCart();
    };

    const onRemove = (productVariationId) => {
        if (user) {
            axios
                .delete(`${apiUrl}/api/cart_items/${productVariationId}`)
                .catch((error) => {
                    console.log(error);
                    message.error('Xóa giỏ hàng đã bị lỗi');
                });
        }
        foudCartItem = cartItems.find(
            (item) => item.variation.id === productVariationId,
        );

        if (foudCartItem) {
            const newCartItems = cartItems.filter(
                (item) => item.variation.id !== productVariationId,
            );
            setCartItems(newCartItems);
        }
    };

    const resetCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const toggleShowCart = useCallback(() => {
        setShowCart(!showCart);
    }, [showCart]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                showCart,
                totalQuantities,
                toggleShowCart,
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
