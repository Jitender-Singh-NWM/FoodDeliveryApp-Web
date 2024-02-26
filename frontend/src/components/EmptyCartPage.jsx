import React from 'react';

const EmptyCartPage = () => {
  const handleExploreMenu = () => {
    // Implement logic to redirect users to the menu page
    // Example: history.push('/menu');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Your Cart is Empty</h2>
      <p>Add items to your cart by exploring our menu.</p>
      <img 
        src="C:\Users\s560071\OneDrive - nwmissouri.edu\Documents\GitHub\FoodDeliveryApp-Web\Images\emptyplate.webp" 
        alt="Empty Plate" 
        style={{ width: '200px', opacity: '0.7', marginBottom: '20px' }} 
      />
      <button onClick={handleExploreMenu} style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer' }}>
        Explore Menu
      </button>
      <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#888' }}>Discover delicious dishes and fill up your cart!</p>
    </div>
  );
};

export default EmptyCartPage;
