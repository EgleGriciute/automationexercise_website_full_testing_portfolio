/// <reference types="cypress" />

describe("$3_LoginUserWithIncorrectEmailAndPassword", () => {

    it("$3_LoginUserWithIncorrectEmailAndPassword", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:
        // 4. Click on 'Signup / Login' button:
        // 5. Verify 'Login to your account' is visible:

        cy.registerUser().then(() => {

            // Gather credential data:
            const registeredEmail = Cypress.env('user').email;
            const registeredPassword = Cypress.env('user').password;

            // Log out after registration
            cy.get("a[href='/logout']").click();

            // 4. Click on 'Signup / Login' button:
            cy.get("[href='/login']").click();

            // 5. Verify 'Login to your account' is visible:
            cy.get(".login-form h2").should("be.visible");

            // 6. Enter incorrect email address and password:
            cy.get("[data-qa='login-email']").type("*" + registeredEmail);
            cy.get("[data-qa='login-password']").type("*" + registeredPassword);

            // 7. Click on 'Login' button:
            cy.get("[data-qa='login-button']").click();

            // 8. Verify error 'Your email or password is incorrect!' is visible:
            cy.xpath("//p[text()='Your email or password is incorrect!']").should("be.visible");

        });
    });

});
