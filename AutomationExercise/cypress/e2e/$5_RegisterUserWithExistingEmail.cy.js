/// <reference types="cypress" />

describe("$5_RegisterUserWithExistingEmail", () => {

    it("$5_RegisterUserWithExistingEmail", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.registerUser().then(() => {

            // Gather credential data:
            const registeredName = Cypress.env('user').name;
            const registeredEmail = Cypress.env('user').email;

            // Log out after registration:
            cy.get("a[href='/logout']").click();

            // 4. Click on 'Signup / Login' button:
            cy.get("[href='/login']").click();

            // 5. Verify 'New User Signup!' is visible:
            cy.get(".signup-form h2").should("be.visible");

            // 6. Enter name and already registered email address:
            cy.get("[data-qa='signup-name']").type(registeredName);
            cy.get("[data-qa='signup-email']").type(registeredEmail);

            // 7. Click 'Signup' button:
            cy.get("[data-qa='signup-button']").click();

            // 8. Verify error 'Email Address already exist!' is visible:
            cy.xpath("//*[text()='Email Address already exist!']").should("be.visible");

        });
    });

});
