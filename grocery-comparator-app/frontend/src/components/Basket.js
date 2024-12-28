import React, { useEffect, useState } from 'react';

const Basket = () => {
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        const fetchBasket = async () => {
            const response = await fetch('/api/basket', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
            });
            const data = await response.json();
            setBasket(data.basket);
        };
        fetchBasket();
    }, []);

    const removeItem = async (productId) => {
        const response = await fetch('/api/basket', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId }),
        });
        if (response.ok) {
            setBasket(basket.filter(item => item.productId !== productId));
        }
    };

    return (
        <div>
            <h2>Your Basket</h2>
            {basket.length === 0 ? (
                <p>Your basket is empty.</p>
            ) : (
                <ul>
                    {basket.map((item) => (
                        <li key={item.productId}>
                            {item.productName} - {item.quantity}
                            <button onClick={() => removeItem(item.productId)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Basket;
