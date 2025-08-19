class ToolLoginPage {
    constructor(page) {
        this.page = page; 
        this.URL = 'https://practicesoftwaretesting.com/'
        this.SignBtn = '[data-test="nav-sign-in"]';
        this.EmailInput = '[data-test="email"]';
        this.PassInput = '[data-test="password"]';
        this.LoginBtn = '[data-test="login-submit"]';
        this.AssertMyAccount = '[data-test="page-title"]';
    }

    async AccessSite() {
        await this.page.goto(this.URL)

    }

    async LogIn(Email, Password){
        //await this.page.locator(this.SignBtn).click()
        await this.page.locator(this.EmailInput).fill(Email)
        await this.page.locator(this.PassInput).fill(Password)
        await this.page.locator(this.LoginBtn).click()
    }

    async LogInSuccess() {
        await this.page.locator(this.AssertMyAccount).waitFor()

    }

}

module.exports = {ToolLoginPage}