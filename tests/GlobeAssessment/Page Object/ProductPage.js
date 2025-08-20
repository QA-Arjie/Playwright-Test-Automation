class ProductPage {
    constructor(page) {
        this.page = page;
        this.ShopAll = page.getByLabel('Top').getByRole('link', { name: 'Shop All' });
        this.Fashion = page.getByRole('link', { name: 'Fashion', exact: true });
        this.Wellness = page.getByRole('link', { name: 'Wellness' });
        this.NewArrival = page.getByRole('link', { name: 'New Arrivals', exact: true });
        this.Sale = page.getByRole('link', { name: 'Sale', exact: true });
        this.SelectedProduct = page.getByRole('link', { name: 'Sale Blue Polo Shirt $34.99 $' }); // Change Product Here
        this.SizeBtn = page.locator('#product-variant-picker').getByRole('button', { name: 'Please choose Size' });
        this.SelectSize = page.locator('#product-variant-picker label').filter({ hasText: 'M' }) // Change Text for Size S, M or L
        this.Quantity = page.locator('.increase-quantity');
        this.TypeQuantity = page.locator('#quantity');
        this.AddCartBtn = page.getByRole('button', { name: 'Add To Cart' });
        this.CheckoutBtn = page.getByRole('link', { name: 'Checkout' });
    }

    async AddtoCart() {
        //await this.Fashion.click()
       // await this.Wellness.click()
        //await this.NewArrival.click()
        await this.ShopAll.click()
        await this.SelectedProduct.click()
        await this.SizeBtn.click()
        await this.SelectSize.click()
        await this.TypeQuantity.click()
        await this.TypeQuantity.fill('')
        await this.TypeQuantity.fill('2') // Change Quantity Here 
        await this.AddCartBtn.click()
    }
    async CheckoutOrder() {
         await this.CheckoutBtn.click()

    }

}

module.exports = { ProductPage }