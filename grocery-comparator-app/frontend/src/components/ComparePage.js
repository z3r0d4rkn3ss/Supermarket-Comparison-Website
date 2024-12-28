import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import FilterPanel from './FilterPanel';

const ComparePage = () => {
    const [comparisonData, setComparisonData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComparisonData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/compare_prices');
                if (!response.ok) {
                    throw new Error('Failed to fetch comparison data');
                }
                const data = await response.json();
                setComparisonData(data);
            } catch (error) {
                console.error("Error fetching comparison data:", error);
                setComparisonData([]);  // Optionally handle no data state
            } finally {
                setLoading(false);
            }
        };

        fetchComparisonData();
    }, []);

    if (loading) return <div className="spinner"></div>;

    if (!comparisonData.length) {
        return <div>No products available for comparison.</div>;
    }

    return (
        <div className="compare-page">
            <h1>Supermarket Price Comparison</h1>
            <FilterPanel data={comparisonData} /> {/* Pass data to FilterPanel if necessary */}
            <ProductList data={comparisonData} />
        </div>
    );
};

export default ComparePage;
