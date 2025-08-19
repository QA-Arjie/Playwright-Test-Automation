class LoginPage {
    constructor(page) {
        this.page = page;
        this.URL = 'https://demo.spreecommerce.org/';
        this.AccntBtn = page.getByRole('navigation', { name: 'Top' }).getByRole('button').nth(2);
        this.LoginEmailInput = page.getByRole('textbox', { name: 'Email', exact: true });
        this.LoginPassInput = page.getByRole('textbox', { name: 'Password' });
        this.LoginBtn = page.getByRole('button', { name: 'Login' });
    }
    async gotoURL() {
        await this.page.goto(this.URL)
    }

    async gotoLogin(LoginEmail, LoginPassword) {
        await this.AccntBtn.click()
        await this.LoginEmailInput.fill(LoginEmail)
        await this.LoginPassInput.fill(LoginPassword)
        await this.LoginBtn.click()
    }

}

module.exports = { LoginPage }