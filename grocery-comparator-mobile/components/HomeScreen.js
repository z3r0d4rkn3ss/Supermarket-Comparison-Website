// grocery-comparator-mobile/components/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import apiService from '../services/apiService';  // Service to interact with backend

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your backend API
    apiService.getProducts()
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View>
      <Text>Welcome to the Grocery Comparator App!</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - £{item.price}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
            />
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
