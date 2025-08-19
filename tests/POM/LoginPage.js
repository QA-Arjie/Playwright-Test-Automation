class LoginPage {
    constructor(page) {
        this.page = page
        this.URL = 'https://www.saucedemo.com/'
        this.usernameInput = '[data-test="username"]'
        this.passwordInput = '[data-test="password"]'
        this.loginButton = '[data-test="login-button"]'
    }

    async GoToLogInPage()
    {
        await this.page.goto(this.URL)
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton)

    }
}
module.exports = { LoginPage };