**Project Name** - Spree Commerce End to End Testing using Playwright

A comprehensive end-to-end testing suite built with Playwright for automated browser testing across Chromium, Firefox, and WebKit.

**//Note that .env file included here for test/demo purpose and to show how I handle password and other sensitive data//**

 **Features**
Cross-browser testing (Chromium, Firefox, WebKit)
Headless and headed execution modes
Parallel test execution
Auto-wait for elements

**Best Practices**
1. Implement Page Object Models for better maintainability
2. Use meaningful test descriptions and organize tests logically
3. Handle async operations with proper waits
4. Keep tests independent and avoid test interdependencies

**Installation**
1. Clone the repository:
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
2. Install dependencies:
    npm install
    npx playwright install

**Project Structure** 
├── GlobeAssessment/
│   ├── Page Objects                         # Page Object Models
│   ├── specs/                               # End-to-end tests
        ├──SpreeCommerceEnd2End.spec.js      # Spree Commerce End 2 End from User Registration to Ordering
        ├──SpreeCommerceLogin.spec.js        # This login functionality is designed to run independently
        ├──SpreeCommerceRegistration.spec.js # This Registration functionality is designed to run independently
│   ├── Test Data/                           # Test data is organized here
│   └── utils/                               # Environment Config
├── .env                                     # Store sensitive or configuration data outside code
├── .env.chromium                            # Stores environment variables specific to test runs using the Chromium browser only.
├── .env.firefox                             # Stores environment variables specific to test runs using the Firefox browser only.
├── .env.webkit                              # Stores environment variables specific to test runs using the Webkit browser only.
├── playwright.config.js                     # Playwright configuration            
└── package.json

**Running Tests**
Run all test: npx playwright test

Run in headed mode: npx playwright test --headed

Run specific test file: npx playwright test tests/SpreeCommerceEnd2End.spec.js

Run in debug mode: npx playwright test --debug --headed

Generate report: npx playwright show-report

Run test in specific browser: 
  npx playwright test --project=chromium
  npx playwright test --project=firefox
  npx playwright test --project=webkit

