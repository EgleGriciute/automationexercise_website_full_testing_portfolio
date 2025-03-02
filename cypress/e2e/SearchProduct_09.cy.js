/// <reference types="cypress"/>

describe("$9_SearchProduct", () => {

    it("should search product", () => {

        // 1. Launch browser
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Click on 'Products' button:
        // 5. Verify user is navigated to ALL PRODUCTS page successfully:

        cy.verifyAllProductsPage();

        // 6. Enter product name in search input and click search button:
        cy.get(".panel-body > ul > li > a").then($elements => {

            // Extract the text from each element into an array:
            const productNames = $elements.map((index, element) => Cypress.$(element).text()).get();

            // Select a random product name:
            const randomProductName = productNames[Math.floor(Math.random() * productNames.length)];

            // Type the random product name into the input field:
            cy.get("#search_product").type(randomProductName);

            // Click the search button:
            cy.get("#submit_search").click();

            // 7. Verify 'SEARCHED PRODUCTS' is visible:
            cy.xpath("//h2[text()='Searched Products']")
                .should("exist")
                .and("be.visible");

            // 8. Verify all the products related to search are visible:
            cy.get(".features_items").find(".product-image-wrapper").should("have.length.greaterThan", 0);
        })
    })
})