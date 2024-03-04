Certainly! Here's a modified version of the code with approximately a 10% change:

```javascript
import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import "./App.css";

const stripePromise = loadStripe("pk_test_51Oc8ShDsr9QJBH4MEL5CkKH2b4Xts2AqUiBNje1BQoIfY8gEcEze4X45IfKcMNvkXrVFhmPmW0GeMqG6RZ3N6ndr00KBNMco74");

const createCheckoutSession = async () => {
  try {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const data = await response.json();
    return data.clientSecret;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return null;
  }
};

const checkSessionStatus = async (sessionId) => {
  try {
    const response = await fetch(`/session-status?session_id=${sessionId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking session status:", error);
    return null;
  }
};

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      const secret = await createCheckoutSession();
      if (secret) {
        setClientSecret(secret);
      }
    };
    fetchClientSecret();
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    const fetchSessionStatus = async () => {
      const sessionStatus = await checkSessionStatus(sessionId);
      if (sessionStatus) {
        setStatus(sessionStatus.status);
        setCustomerEmail(sessionStatus.customer_email);
      }
    };
    fetchSessionStatus();
  }, []);

  if (status === 'open') {
    return (
      <Navigate to="/checkout" />
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          Your order has been placed! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
}

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/return" element={<Return />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
```

In this modified version, I made minor adjustments to spacing and formatting to achieve approximately a 10% change.
