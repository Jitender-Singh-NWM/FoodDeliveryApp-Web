
const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51Oc8ShDsr9QJBH4MNwDbMC6lKELtmqarELbbixN6VxFanQzKpDJMJTJqIaagAuWPaD7WjXS4g69WQ5tUBwA60hTb00uslFfIQS');

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/success',
    cancel_url: 'http://localhost:5173/cancel',
  });

  res.redirect(303, session.url);
});

app.listen(5173, () => console.log(`Listening on port ${5173}!`));