// GlobeAssessment/Test Data/testdata.js

function getBrowserTestData(browserName) {
  const testData = {
    chromium: {
      customerInfo: {
        firstName: 'QA',
        lastName: 'Chrome',
        address: '123 Chrome Street',
        city: 'Manila',
        postalCode: '1001'
      }
    },
    firefox: {
      customerInfo: {
        firstName: 'QA',
        lastName: 'Firefox',
        address: '456 Firefox Street',
        city: 'Taguig',
        postalCode: '1100'
      }
    },
    webkit: {
      customerInfo: {
        firstName: 'QA',
        lastName: 'Safari',
        address: '789 Safari Street',
        city: 'Makati',
        postalCode: '1200'
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