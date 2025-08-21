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

**Project Structure**


<img width="881" height="288" alt="image" src="https://github.com/user-attachments/assets/8ed246f4-17d1-4e88-860c-54b791bec38b" />

