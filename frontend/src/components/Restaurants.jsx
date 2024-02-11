import React from 'react';
import { useParams } from 'react-router-dom';
import { Card,Row,Col,Button,Steps } from 'antd';
import { useState } from 'react';

const Restaurants = ({ match }) => {
  console.log("match",match);
  const { Step } = Steps;
  const {restaurantname} = useParams();
      <h2>{restaurantname} Details</h2>

const foodItems = [
  { name: 'Cheese Cake', imageUrl: '/img/food-1.webp', price: 10.99,quantity:0 },
  { name: 'Potato Balls', imageUrl: '/img/food-2.webp', price: 7.99,quantity:0 },
  { name: 'Burger', imageUrl: '/img/food-3.webp', price: 9.99,quantity:0 },
  { name: 'Veg Salad', imageUrl: '/img/food-4.webp', price: 10.99,quantity:0 },
  { name: 'Icecream', imageUrl: '/img/food-5.webp', price: 2.99,quantity:0 },
  { name: 'Sushi', imageUrl: '/img/food-7.webp', price: 4.99,quantity:0 },
  { name: 'Spirals', imageUrl: '/img/food-8.webp', price: 5.99,quantity:0 },
  { name: 'Dry Fruits', imageUrl: '/img/food-6.webp', price: 10.99,quantity:0 },



  // Add more food items as needed
];
    const FoodCard = ({ foodItem, quantity, handleAdd, handleRemove }) => (
      <Card
        cover={<img alt="Food" src={foodItem.imageUrl} style={{ width: 220, height: 180 }} />}
        style={{ margin: '0 8px' }}
      >
        <Card.Meta title={foodItem.name} description = {Number((foodItem.price * itemQuantities[foodItem.name]).toFixed(2)) === 0 ? `$${foodItem.price.toFixed(2)}` : `$${(foodItem.price * itemQuantities[foodItem.name]).toFixed(2)}` }/>
        {itemQuantities[foodItem.name] === 0  ? (
          <Button type="primary" style={{ marginTop: '10px',background:"#FFFF00",color:"purple" }} onClick={handleAdd} >
            Add to Cart
          </Button>
        ) : (
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleRemove}>-</Button>
            <span style={{ margin: '0 10px' }}>{quantity}</span>
            <Button onClick={handleAdd}>+</Button>
          </div>
        )}
      </Card>
    );
  
    const [itemQuantities, setItemQuantities] = useState(
      foodItems.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {})
    );
  
    const handleAdd = (itemName) => {
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemName]: prevQuantities[itemName] + 1,
      }));
    };
  
    const handleRemove = (itemName) => {
      if (itemQuantities[itemName] > 0) {
        setItemQuantities((prevQuantities) => ({
          ...prevQuantities,
          [itemName]: prevQuantities[itemName] - 1,
        }));
      }
    };

  return (
<div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h2 className="mb-4">Welcome to {restaurantname} </h2>
        </div>
        <Row gutter={[16, 16]}>
          {foodItems.map((foodItem, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <FoodCard
                foodItem={foodItem}
                quantity={itemQuantities[foodItem.name]}
                handleAdd={() => handleAdd(foodItem.name)}
                handleRemove={() => handleRemove(foodItem.name)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};


export default Restaurants;
