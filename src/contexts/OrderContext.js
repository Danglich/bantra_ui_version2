import { createContext, useMemo, useState } from 'react';

export const OrderContext = createContext();
function OrderProvider({ children }) {
    //Với order item chứa {quantity , product, variation}
    const [orderItems, setOrderItems] = useState([]);

    const addOrderToPay = (orderItems) => {
        setOrderItems(orderItems);
    };

    const totalPrice = useMemo(() => {
        let totalPrice = 0;
        orderItems.forEach((item) => {
            totalPrice += item.variation.price * item.quantity;
        });

        return totalPrice;
    }, [orderItems]);

    const deleteOrderItems = (orderItem) => {
        setOrderItems((prev) =>
            prev.filter((item) => item.variation.id !== orderItem.variation.id),
        );
    };

    const changeQuantity = (orderItem) => {
        if (orderItem.quantity <= 0) deleteOrderItems(orderItem);
        else {
            setOrderItems((prev) => [
                ...prev.filter(
                    (item) => item.variation.id !== orderItem.variation.id,
                ),
                orderItem,
            ]);
        }
    };

    return (
        <OrderContext.Provider
            value={{
                orderItems,
                totalPrice,
                addOrderToPay,
                deleteOrderItems,
                changeQuantity,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export default OrderProvider;
