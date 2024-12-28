import React, { useState } from 'react';

const FilterPanel = ({ onFilterChange }) => {
    const [sortBy, setSortBy] = useState('');
    const [selectedSupermarkets, setSelectedSupermarkets] = useState([]);

    const handleSortChange = (event) => {
        const value = event.target.value;
        setSortBy(value);
        onFilterChange({ sortBy: value, supermarkets: selectedSupermarkets });
    };

    const handleSupermarketChange = (event) => {
        const value = event.target.value;
        setSelectedSupermarkets(prevState =>
            prevState.includes(value)
                ? prevState.filter((item) => item !== value)
                : [...prevState, value]
        );
        onFilterChange({ sortBy, supermarkets: selectedSupermarkets });
    };

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
                    <label>
                        <input
                            type="checkbox"
                            value="ASDA"
                            onChange={handleSupermarketChange}
                        />
                        ASDA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Sainsbury's"
                            onChange={handleSupermarketChange}
                        />
                        Sainsbury's
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Aldi"
                            onChange={handleSupermarketChange}
                        />
                        Aldi
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Tesco"
                            onChange={handleSupermarketChange}
                        />
                        Tesco
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Iceland"
                            onChange={handleSupermarketChange}
                        />
                        Iceland
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Morrisons"
                            onChange={handleSupermarketChange}
                        />
                        Morrisons
                    </label>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
