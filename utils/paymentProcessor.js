exports.processPayment = async (amount) => {
  // Simulate payment processing
  return new Promise(resolve => {
    setTimeout(() => {
      // In a real application, you would integrate with a payment gateway here
      const success = Math.random() > 0.1; // Simulate occasional payment failures
      resolve({ success: success });
    }, 500); // Simulate a short processing delay
  });
};