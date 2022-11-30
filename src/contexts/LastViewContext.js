import { useCallback } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const LastViewContext = createContext();

function LastViewProvider({ children }) {
    const [products, setProducts] = useState([]);

    const handleAddLastView = useCallback(
        (product) => {
            if (products.length >= 4) {
                const newProducts = [...products];
                newProducts.shift();
                newProducts.unshift(product);
                setProducts(newProducts);
            } else {
                const newProducts = [...products];
                newProducts.unshift(product);
                setProducts(newProducts);
            }
        },
        [products],
    );

    return (
        <LastViewContext.Provider
            value={{ handleAddLastView, lastViews: products }}
        >
            {children}
        </LastViewContext.Provider>
    );
}

export default LastViewProvider;
