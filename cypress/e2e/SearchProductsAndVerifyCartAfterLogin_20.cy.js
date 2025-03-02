/// <reference types="cypress" />

describe("$20_SearchProductsAndVerifyCartAfterLogin", () => {

    before(() => {
        // Register a user before running the test as prerequisite:
        cy.visit("/");
        cy.registerUser();
        cy.logoutUser();
    })

    it("should search products and verify cart after login", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':

        cy.verifyHomePageIsVisible();

        // 3. Click on 'Products' button:
        // 4. Verify user is navigated to ALL PRODUCTS page successfully:

        cy.verifyAllProductsPage();

        // 5. Enter product name in search input and click search button:

        cy.get(".productinfo > p ").then((items) => {

            const randomIndex = Math.floor(Math.random() * items.length);
            const productName = items.eq(randomIndex).text().trim();

            // Type the product name into the search input:
            cy.get("input#search_product").type(productName);

            // Optionally, click the search button:
            cy.get("button#submit_search").click();

        })

        // 6. Verify 'SEARCHED PRODUCTS' is visible:
        cy.xpath("//*[contains(text(), 'Searched Products')]")
            .should("exist")
            .and("be.visible")


        // 7. Verify that all the products related to the search are visible:

        cy.get(".productinfo")
            .should("be.visible")
            .and("have.length.greaterThan", 0);

        // 8. Add those products to the cart:

        cy.get('.productinfo')
            .each((item) => {
                // Find the "Add to Cart" button inside each product and click it:
                cy.wrap(item).find('a').click();
            });

        // Click "Continue Shopping" to close the modal:

        cy.get('[data-dismiss="modal"]')
            .should('be.visible')
            .click();

        // 9. Click 'Cart' button and verify that products are visible in the cart:

        cy.clickAddToCartBtn();

        cy.xpath("//*[contains(@href, '/product_details')]")
            .should('be.visible');

        // 10. Click 'Signup / Login' button and submit login details:

        cy.loginUserWithCorrectEmailAndPassword();

        // 11. Again, go to Cart page:
        cy.visit("/view_cart");

        // 12. Verify that those products are visible in cart after login as well:
        cy.xpath("//*[contains(@href, '/product_details')]")
            .should('be.visible');

    })
})