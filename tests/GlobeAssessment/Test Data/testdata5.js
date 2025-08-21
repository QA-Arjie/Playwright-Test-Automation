// GlobeAssessment/Test Data/testdata.js

function getBrowserTestData(browserName) {
  const testData = {
    chromium: {
      customerInfo: {
        firstName: 'QA',
        lastName: 'Chrome',
        address: '123 Chrome Street',
        city: 'Manila',
        postalCode: '1001',
        productName: 'Dotted Shirt',
        quantity: '2',
        size: "S",
        price: '54.99',
        shippingOption: 'Premium Delivery in 2-3',
        shippingPrice: '10'
      }
    },
    firefox: {
      customerInfo: {
        firstName: 'QA',
        lastName: 'Firefox',
        address: '456 Firefox Street',
        city: 'Taguig',
        postalCode: '1100',
        productName: 'Red Polo Shirt',
        quantity: '3',
        size: 'L',
        price: '34.99',
        shippingOption: 'Next Day Delivery in 1-2',
        shippingPrice: '10'
      }
    },
    webkit: {
      customerInfo: {
        firstName: 'QA',
        lastName: 'Safari',
        address: '789 Safari Street',
        city: 'Makati',
        postalCode: '1200',
        productName: 'Short Sleeve Printed Shirt',
        quantity: '1',
        size: 'M',
        price: '59.99',
        shippingOption: 'Standard Delivery in 3-5',
        shippingPrice: '5'
      }
    }
  };
  
  return testData[browserName] || testData.chromium;
}

// Keep the original for backward compatibility  
const customerInfo = {
  firstName: 'QA',
  lastName: 'Testing',
  address: '123 Street',
  city: 'Manila',
  postalCode: '1243'
};

module.exports = { 
  customerInfo,
  getBrowserTestData 
};