/// <reference types="cypress"/>

describe("$17_RemoveProductsFromCart", () => {

    it("should remove products from cart", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Add products to cart:

        cy.addProductToCart();
        cy.addProductToCart();

        // 5. Click 'Cart' button:
        // 6. Verify that cart page is displayed:

        cy.clickAddToCartBtn();

        // 7. Click 'X' button corresponding to particular product:
        cy.get(".cart_quantity_delete").click({ multiple: true });

        // 8. Verify that product is removed from the cart:
        cy.get(".overlay-content > a[data-product-id]").should('not.exist');

    });
});
