/// <reference types="cypress"/>

describe("$21_AddReviewOnProduct", () => {

    before(() => {
        // Register a user before running the test as prerequisite:
        cy.visit("/");
        cy.registerUser();
        cy.logoutUser();
    })

    it("should add review on product", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':

        cy.verifyHomePageIsVisible();

        // 3. Click on 'Products' button:
        // 4. Verify user is navigated to ALL PRODUCTS page successfully:

        cy.verifyAllProductsPage();

        // 5. Click on 'View Product' button:

        cy.xpath("//*[contains(text(), 'View Product')]").then((items) => {

            const randomIndex = Math.floor(Math.random() * items.length);
            cy.wrap(items.eq(randomIndex)).click();

        })

        // 6. Verify 'Write Your Review' is visible:

        cy.get("a[href='#reviews']")
            .should("exist")
            .and("be.visible");

        // 7. Enter name, email and review:

        cy.get("input#name").type(Cypress.env("NAME"));
        cy.get("input#email").type(Cypress.env("EMAIL"));

        cy.get("textarea#review").type(Cypress.env("TEXTAREA"));

        // 8. Click 'Submit' button:
        cy.get("button#button-review").click();

        // 9. Verify success message 'Thank you for your review.':

        cy.xpath("//*[contains(text(), 'Thank you for your review.')]")
            .should("exist")
            .and("be.visible");
    })
})