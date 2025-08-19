class FilterPage {
    constructor(page) {
        this.page = page;
        this.SortList = '[data-test="product-sort-container"]';
    }

    async Sorting(optionValue = 'za') {
        await this.page.locator(this.SortList).selectOption(optionValue)
    }

}

module.exports = { FilterPage }