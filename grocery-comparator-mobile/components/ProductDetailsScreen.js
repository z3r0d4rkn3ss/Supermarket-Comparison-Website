// grocery-comparator-mobile/components/ProductDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import apiService from '../services/apiService';

const ProductDetailsScreen = ({ route }) => {
  const [product, setProduct] = useState(null);
  const { productId } = route.params;

  useEffect(() => {
    apiService.getProductDetails(productId)
      .then(response => setProduct(response.data))
      .catch(error => console.log(error));
  }, [productId]);

  if (!product) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>Price: £{product.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
