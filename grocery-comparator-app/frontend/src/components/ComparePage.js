import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import FilterPanel from './FilterPanel';

const ComparePage = () => {
    const [comparisonData, setComparisonData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComparisonData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/compare_prices'); // Call to backend API
                const data = await response.json();
                setComparisonData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching comparison data:", error);
            }
        };

        fetchComparisonData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="compare-page">
            <h1>Supermarket Price Comparison</h1>
            <FilterPanel />
            <ProductList data={comparisonData} />
        </div>
    );
};

export default ComparePage;
