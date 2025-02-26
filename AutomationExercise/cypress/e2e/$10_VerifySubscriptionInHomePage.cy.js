/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

describe("$10_VerifySubscriptionInHomePage", () => {

    it("should verify subscription in home page", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Scroll down to footer:
        cy.get("#footer").scrollIntoView();

        // 5. Verify text 'SUBSCRIPTION':

        cy.xpath("//*[text()='Subscription']")
            .should("exist")
            .and("be.visible")
            .and("have.text", "Subscription");

        // 6. Enter email address in input and click arrow button:

        const randomEmailAddress = faker.internet.email();

        cy.get("#susbscribe_email").type(randomEmailAddress);
        cy.get("#subscribe").click();

        // 7. Verify success message 'You have been successfully subscribed!' is visible:

        cy.get("#success-subscribe")
            .invoke("text")
            .then((text) => {
                expect(text.trim()).to.equal("You have been successfully subscribed!");
            });
    })
})