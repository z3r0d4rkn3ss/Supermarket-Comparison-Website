import React from 'react';

const ProductList = ({ data }) => {
    return (
        <div className="product-list">
            <h2>Products and Prices</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>ASDA</th>
                        <th>Sainsbury's</th>
                        <th>Aldi</th>
                        <th>Tesco</th>
                        <th>Iceland</th>
                        <th>Morrisons</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product}</td>
                            <td>{item.asda_price}</td>
                            <td>{item.sainsburys_price}</td>
                            <td>{item.aldi_price}</td>
                            <td>{item.tesco_price}</td>
                            <td>{item.iceland_price}</td>
                            <td>{item.morrisons_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
