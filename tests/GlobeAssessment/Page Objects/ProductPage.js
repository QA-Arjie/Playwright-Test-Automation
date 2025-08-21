const { productName } = require("../Test Data/testdata2");

class ProductPage {
    constructor(page) {
        this.page = page;
        this.ShopAll = page.getByLabel('Top').getByRole('link', { name: 'Shop All' });
        this.SelectBtn = page.locator('#product-variant-picker').getByRole('button', { name: 'Please choose Size' });
        this.SelectQuantity = page.locator('#quantity');
        this.AddCartBtn = page.getByRole('button', { name: 'Add To Cart' });
        this.CheckoutBtn = page.getByRole('link', { name: 'Checkout' })
    }

 async AddtoCart(productName,size,quantity) {
    // Product 
    await this.ShopAll.click()
    const product = this.page.locator('.group.w-full.flex.flex-col', {hasText: productName});
    await product.click();
    // Size
    await this.SelectBtn.click()
    const SizeSelect = this.page.locator('#product-variant-picker label').filter({ hasText: size })
    await SizeSelect.click()
    // Quantity
    await this.SelectQuantity.dblclick()
    await this.page.locator('#quantity').fill(quantity)
    await this.AddCartBtn.click()
    }
    async Checkout() {
    await this.CheckoutBtn.click()
    }
}

module.exports = { ProductPage }