/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";

describe("$11_VerifySubscriptionInCartPage", () => {

    it("should verify subscription in cart page", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Click 'Cart' button:
        cy.clickAddToCartBtn();

        // 5. Scroll down to footer:
        cy.get("#footer").scrollIntoView();

        // 6. Verify text 'SUBSCRIPTION':

        cy.xpath("//*[text()='Subscription']")
            .should("exist")
            .and("be.visible")
            .and("have.text", "Subscription");

        // 7. Enter email address in input and click arrow button:

        const randomEmailAddress = faker.internet.email();

        cy.get("#susbscribe_email").type(randomEmailAddress);
        cy.get("#subscribe").click();

        // 8. Verify success message 'You have been successfully subscribed!' is visible:

        cy.get("#success-subscribe")
            .invoke("text")
            .then((text) => {
                expect(text.trim()).to.equal("You have been successfully subscribed!");
            });

    })
})