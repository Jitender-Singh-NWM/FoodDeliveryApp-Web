import React from 'react';
import { Card, Button } from 'antd';
// import 'antd/dist/antd.css'; // Import the default Ant Design styles

const FoodCard = ({ foodItem }) => {
  const { Meta } = Card;

  return (
    <Card
      hoverable
      style={{ width: 180,height:120 }}
      cover={<img alt={foodItem.name} src={foodItem.imageUrl} />}
    >
      <Meta title={foodItem.name} description={`$${foodItem.price}`} />
      <Button type="primary" style={{ marginTop: '10px' }}>
        Add to Cart
      </Button>
    </Card>
  );
};

export default FoodCard;
