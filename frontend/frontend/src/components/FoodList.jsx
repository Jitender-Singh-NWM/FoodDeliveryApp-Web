import React from 'react';
import FoodCard from './FoodCard'; // Adjust the import path accordingly

const foodItems = [
  { name: 'Pizza', imageUrl: 'url_to_pizza_image', price: 10.99 },
  { name: 'Burger', imageUrl: 'url_to_burger_image', price: 7.99 },
  // Add more food items as needed
];

const FoodList = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {foodItems.map((foodItem, index) => (
        <FoodCard key={index} foodItem={foodItem} />
      ))}
    </div>
  );
};

export default FoodList;
