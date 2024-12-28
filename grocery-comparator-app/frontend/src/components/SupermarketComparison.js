import React, { useState, useEffect } from 'react';

const SupermarketComparison = () => {
    const [comparisonData, setComparisonData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComparisonData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/compare_prices'); // Backend API
                const data = await response.json();
                setComparisonData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchComparisonData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Supermarket Price Comparison</h1>
            <ul>
                {comparisonData.map((item, index) => (
                    <li key={index}>
                        <strong>{item.product}</strong>: {item.price} at {item.supermarket}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SupermarketComparison;
