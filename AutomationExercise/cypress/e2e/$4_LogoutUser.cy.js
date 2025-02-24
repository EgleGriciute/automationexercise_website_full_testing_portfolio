/// <reference types="cypress" />

describe("$4_LogoutUser", () => {

    it("$4_LogoutUser", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.registerUser().then(() => {

            // Gather credential data:
            const registeredEmail = Cypress.env('user').email;
            const registeredPassword = Cypress.env('user').password;

            // Log out after registration:
            cy.get("a[href='/logout']").click();

            // 4. Click on 'Signup / Login' button:
            cy.get("[href='/login']").click();

            // 5. Verify 'Login to your account' is visible:
            cy.get(".login-form h2").should("be.visible");

            // 6. Enter correct email address and password:
            cy.get("[data-qa='login-email']").type(registeredEmail);
            cy.get("[data-qa='login-password']").type(registeredPassword);

            // 7. Click on 'Login' button:
            cy.get("[data-qa='login-button']").click();

            // 8. Verify that 'Logged in as username' is visible:
            cy.get("ul > li:nth-child(10)").should("contain.text", Cypress.env('user').name);

            // 9. Click 'Logout' button:
            cy.get("a[href='/logout']").click();

            // 10. Verify that user is navigated to login page:
            cy.location('pathname').should("eq", "/login");

        });
    });

});
