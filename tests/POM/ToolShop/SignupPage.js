class SignupPage {
    constructor(page) {
        this.page = page;
        this.URL = 'https://practicesoftwaretesting.com/'
        this.SignBtn = '[data-test="nav-sign-in"]';
        this.RegLink = '[data-test="register-link"]';
        this.RegFNameInput = '[data-test="first-name"]';
        this.RegLNameInput = '[data-test="last-name"]';
        this.DateOBInput = '[data-test="dob"]';
        this.AddressInput = '[data-test="street"]';
        this.PostalCodeInput = '[data-test="postal_code"]';
        this.CityInput = '[data-test="city"]';
        this.StateInput = '[data-test="state"]';
        this.CountryInput = '[data-test="country"]';
        this.PhoneInput = '[data-test="phone"]';
        this.RegEmailInput = '[data-test="email"]';
        this.RegPassInput = '[data-test="password"]';
        this.RegBtn = '[data-test="register-submit"]';

    }

    async goToHomePage () {
        await this.page.goto(this.URL)

    }

    async Registration(RegFName, RegLName, DateOB, Address, PostalCode, City, State, Phone, RegEmail, RegPass) {
        await this.page.locator(this.SignBtn).click()
        await this.page.locator(this.RegLink).click()
        await this.page.locator(this.RegFNameInput).fill(RegFName)
        await this.page.locator(this.RegLNameInput).fill(RegLName)
        await this.page.locator(this.DateOBInput).fill(DateOB)
        await this.page.locator(this.AddressInput).fill(Address)
        await this.page.locator(this.PostalCodeInput).fill(PostalCode)
        await this.page.locator(this.CityInput).fill(City)
        await this.page.locator(this.StateInput).fill(State)
        await this.page.locator(this.CountryInput).selectOption('Austria')
        await this.page.locator(this.PhoneInput).fill(Phone)
        await this.page.locator(this.RegEmailInput).fill(RegEmail)
        await this.page.locator(this.RegPassInput).fill(RegPass)
        await this.page.locator(this.RegBtn).click()
    }

}

module.exports = {SignupPage}