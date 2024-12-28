import React from 'react';

const ProductList = ({ data, supermarkets }) => {
    return (
        <div className="product-list">
            <h2>Products and Prices</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        {supermarkets.map((supermarket) => (
                            <th key={supermarket}>{supermarket}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product}</td>
                            {supermarkets.map((supermarket) => (
                                <td key={supermarket}>
                                    {item[`${supermarket.toLowerCase()}_price`] || 'N/A'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
