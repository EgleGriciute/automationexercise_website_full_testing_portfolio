/// <reference types="cypress"/>

describe("$12_AddProductsInCart", () => {

    it("should add products in cart", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Click 'Products' button:
        cy.get("a[href='/products']").click();

        // 5. Hover over first product and click 'Add to cart':

        cy.get('.features_items .col-sm-4').first()
            .find('.single-products')
            .trigger('mouseover')
            .find("a[data-product-id='1']").first()
            .click();

        // 6. Click 'Continue Shopping' button:
        cy.get(("[data-dismiss='modal']")).click();

        // 7. Hover over second product and click 'Add to cart':

        cy.get('.features_items .col-sm-4').eq(1)
            .find('.single-products')
            .trigger('mouseover')
            .find("a[data-product-id='2']").first()
            .click();

        // 8. Click 'View Cart' button:
        cy.xpath("//u[text()='View Cart']").click();

        // 9. Verify both products are added to Cart:

        cy.get("a[href='/product_details/1']")
            .should("exist")
            .and("be.visible")

        cy.get("a[href='/product_details/2']")
            .should("exist")
            .and("be.visible")

        cy.get("table#cart_info_table > tbody > tr").should("have.length", "2");

        // 10. Verify their prices, quantity and total price:

        const productIds = ["#product-1", "#product-2"];

        productIds.forEach((productId) => {

            cy.get(`${productId} > td.cart_price > p`)
                .invoke("text")
                .then((price) => {
                    expect(price.trim()).to.contain("Rs.");
                });

            cy.get(`${productId} > td.cart_quantity > button`)
                .invoke("text")
                .should("contain", "1");

            cy.get(`${productId} > td.cart_total`)
                .invoke("text")
                .then((totalPrice) => {
                    expect(totalPrice.trim()).to.contain("Rs.");
                });
        });
    })
})