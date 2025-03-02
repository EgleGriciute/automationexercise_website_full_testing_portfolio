/// <reference types="cypress"/>

describe("$22_AddToCartFromRecommendedItems", () => {

    it("should add To Cart From Recommended Items", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':

        cy.verifyHomePageIsVisible();

        // 3. Scroll to bottom of page:
        cy.get(".recommended_items").scrollIntoView();

        // 4. Verify 'RECOMMENDED ITEMS' are visible:

        it("should verify 'RECOMMENDED ITEMS' are visible", () => {

            cy.get(
                ".carousel-inner .item.active .col-sm-4 .productinfo > p")
                .should("exist")
                .and("be.visible");

            // Create a set to store product names:
            const productNames = new Set();

            // Loop through carousel slides (2 slides with 3 items each):

            for (let i = 0; i < 2; i++) {

                // Get all product names in the current carousel slide:
                cy.get(".carousel-inner .item.active .col-sm-4 .productinfo > p").each((item) => {

                    const productName = item.text().trim();

                    // Add product names to the set (to ensure uniqueness):
                    productNames.add(productName);
                });

                // Click the 'next' button to reveal the next set of items:
                cy.get("#recommended-item-carousel .right").click();

                // Wait for the carousel transition to complete (adjust time if necessary):
                cy.wait(2000);
            }

            // Print all the product names to the console:
            cy.wrap([...productNames]).each((productName) => {
                cy.log('Product Name:', productName);
            });

            // Verify that the names are correctly extracted:
            cy.wrap([...productNames]).should('have.length', 6);

        });


        // 5. Click on 'Add To Cart' on Recommended product:
        cy.get(
            ".carousel-inner .item.active .col-sm-4 .productinfo > a").eq(0).click();

        // 6. Click on 'View Cart' button:

        cy.contains("View Cart")
            .should("be.visible")
            .click();

        // 7. Verify that product is displayed in cart page:

        cy.get('.cart_description > h4 a').should('be.visible');

    })
});