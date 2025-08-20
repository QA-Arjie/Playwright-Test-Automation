class SignupPage {
    constructor(page) {
    this.page = page;
    this.URL = 'https://demo.spreecommerce.org/';
    this.AccntBtn = page.getByRole('navigation', { name: 'Top' }).getByRole('button').nth(2);
    this.SignUp = page.getByRole('link', { name: 'Sign Up' });
    this.EmailInput = page.getByRole('textbox', { name: 'Email', exact: true });
    this.PasswordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    this.PassConfirmationInput = page.getByRole('textbox', { name: 'Password Confirmation' });
    this.SignupBtn = page.getByRole('button', { name: 'Sign Up' });
    this.ProfileBtn = page.locator('.hidden > a').first();
    this.LogoutBtn = page.getByRole('button', { name: 'Log out' });


    }
    async goToURL() {
        await this.page.goto(this.URL)
    }
    async goToSignUp() {
        await this.AccntBtn.click()
        await this.SignUp.waitFor({ state: 'visible', timeout: 60000 });
        await this.SignUp.click({ timeout: 60000 });
    }
    async RegSignUp(Email, Password, PassConfirmation) {
        await this.EmailInput.fill(Email)
        await this.PasswordInput.fill(Password)
        await this.PassConfirmationInput.fill(PassConfirmation)
        await this.SignupBtn.click()
    }
    async GotoProfile() {
        await this.ProfileBtn.click()
    }
    async Logout() {
        await this.ProfileBtn.click()
        await this.LogoutBtn.click()

    }

}

module.exports = { SignupPage }