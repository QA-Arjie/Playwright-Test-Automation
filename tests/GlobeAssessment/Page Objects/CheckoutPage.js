class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.SelectCountry = page.getByLabel('Country', { exact: true });
        this.FirstnameInput = page.getByRole('textbox', { name: 'First name' });
        this.LastnameInput = page.getByRole('textbox', { name: 'Last name' });
        this.AddressInput = page.getByRole('textbox', { name: 'Street and house number' });
        this.CityInput = page.getByRole('textbox', { name: 'City' });
        this.PostalCodeInput = page.getByRole('textbox', { name: 'Postal Code' });
        this.ContinueBtn = page.getByRole('button', { name: 'Save and Continue' });
        this.stripeIframe = page.frameLocator('iframe[title="Secure payment input frame"]')
        //  (Inside iframe) 
        this.cardNumberField = this.stripeIframe.locator('#Field-numberInput');
        this.expiryField = this.stripeIframe.locator('input[name="expiry"]');
        this.cvcField = this.stripeIframe.locator('input[name="cvc"]');
        this.PayBtn = page.getByRole('button', { name: 'Pay now' });
        
    }
     async CustomerInformation(Firstname, Lastname, Address, City, PostalCode) {
        await this.SelectCountry.selectOption({ label: 'Philippines' });
        await this.FirstnameInput.fill(Firstname);
        await this.LastnameInput.fill(Lastname);
        await this.AddressInput.fill(Address)
        await this.CityInput.fill(City)
        await this.PostalCodeInput.fill(PostalCode)
    }
    async ContinueButton() {
         await this.ContinueBtn.click()
    }
    async DeliveryMethod(shippingOptionLabel) {
        await this.page.getByRole('radio', { name: shippingOptionLabel }).check();
    }
// Wait for Stripe iframe to load
    async waitForStripeIframe() {
        await this.page.waitForSelector('iframe[title="Secure payment input frame"]', { timeout: 20000 });
    }
       async fillCardNumber(cardNumber) {
        await this.waitForStripeIframe();
        await this.cardNumberField.waitFor({ state: 'visible' });
        await this.cardNumberField.fill(cardNumber);
    }
     // Fill expiry date
    async fillExpiryDate(expiry) {
        await this.expiryField.waitFor({ state: 'visible' });
        await this.expiryField.fill(expiry);
    }
     // Fill CVC
    async fillCVC(cvc) {
        await this.cvcField.waitFor({ state: 'visible' });
        await this.cvcField.fill(cvc);
    }
    async PayOrder() {
       await this.PayBtn.scrollIntoViewIfNeeded({timeout: 40000});
       await this.PayBtn.click({timeout: 50000})
    }

}

module.exports = { CheckoutPage }