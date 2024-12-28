import React, { useState, useEffect } from 'react';

const FilterPanel = ({ onFilterChange, supermarketsList = [] }) => {
    const [sortBy, setSortBy] = useState('');
    const [selectedSupermarkets, setSelectedSupermarkets] = useState([]);

    // Handle sort by change (ascending or descending)
    const handleSortChange = (event) => {
        const value = event.target.value;
        setSortBy(value);
    };

    // Handle supermarket selection change (filter by supermarkets)
    const handleSupermarketChange = (event) => {
        const value = event.target.value;
        setSelectedSupermarkets(prevState =>
            prevState.includes(value)
                ? prevState.filter((item) => item !== value)
                : [...prevState, value]
        );
    };

    // Trigger filter change on state update
    useEffect(() => {
        onFilterChange({ sortBy, supermarkets: selectedSupermarkets });
    }, [sortBy, selectedSupermarkets, onFilterChange]);  // Ensure it triggers when either changes

    return (
        <div className="filter-panel">
            <h3>Filter and Sort</h3>
            
            {/* Sort by Price */}
            <div className="filter-option">
                <label>Sort By Price: </label>
                <select value={sortBy} onChange={handleSortChange}>
                    <option value="">Select</option>
                    <option value="asc">Price (Low to High)</option>
                    <option value="desc">Price (High to Low)</option>
                </select>
            </div>

            {/* Supermarket Filter */}
            <div className="filter-option">
                <label>Select Supermarkets: </label>
                <div>
                    {supermarketsList.map((supermarket) => (
                        <label key={supermarket}>
                            <input
                                type="checkbox"
                                value={supermarket}
                                onChange={handleSupermarketChange}
                            />
                            {supermarket}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
