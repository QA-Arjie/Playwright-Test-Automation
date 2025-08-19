class CartPage {
    constructor(page) {
        this.page = page;
        this.AddCartBtn = '[data-test="add-to-cart-sauce-labs-backpack"]';
        this.CartIcon = '[data-test="shopping-cart-link"]';
        this.CheckoutBtn = '[data-test="checkout"]';
        this.FirstNameInput = '[data-test="firstName"]';
        this.LastNameInput = '[data-test="lastName"]';
        this.PostalCodeInput = '[data-test="postalCode"]';
        this.ContButton = '[data-test="continue"]';
        this.FinishBtn = '[data-test="finish"]';
        this.CompleteHeader = '[data-test="complete-header"]';
        this.Title = '[data-test="title"]';
    }

    async addItemToCart() {
        await this.page.locator(this.AddCartBtn).click()
    }
    
    async goToCart() {
        await this.page.locator(this.CartIcon).click()
        await this.page.locator(this.Title).waitFor()
    }

    async Checkout(FirstName, LastName, PostalCode) {
        await this.page.locator(this.CheckoutBtn).click()
        await this.page.locator(this.FirstNameInput).fill(FirstName)
        await this.page.locator(this.LastNameInput).fill(LastName)
        await this.page.locator(this.PostalCodeInput).fill(PostalCode)
        await this.page.locator(this.ContButton).click()
        await this.page.locator(this.Title).waitFor()
        await this.page.locator(this.FinishBtn).click()
    }

    async VerifyOrderComplete() {
        await this.page.locator(this.CompleteHeader).waitFor()
    }
}

module.exports = { CartPage };