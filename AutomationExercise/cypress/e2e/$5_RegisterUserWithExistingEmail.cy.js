/// <reference types="cypress" />

describe("$5_RegisterUserWithExistingEmail", () => {

    beforeEach(() => {
        // Navigate to the login page before each test:
        cy.visit('/');
    });

    it("Should register a new user", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.registerUser().then(() => {
            cy.get("a[href='/logout']").click();
        });
    });

    it("Should show an error when registering with an existing email", () => {

        // Retrieve data:
        const registeredName = Cypress.env('user').name;
        const registeredEmail = Cypress.env('user').email;

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
