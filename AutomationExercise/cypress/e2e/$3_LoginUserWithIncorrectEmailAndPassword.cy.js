/// <reference types="cypress" />

describe("$3_LoginUserWithIncorrectEmailAndPassword", () => {


    beforeEach(() => {

        // Navigate to the login page before each test:

        cy.visit("/");
    });

    it("should display an error when logging in with incorrect credentials", () => {

        cy.registerUser().then(() => {

            // 1. Launch browser:
            // 2. Navigate to url 'http://automationexercise.com':
            // 3. Verify that home page is visible successfully:

            cy.verifyHomePageIsVisible();

            const { email, password } = Cypress.env("user");

            // Log out after registration:
            cy.get("a[href='/logout']").click();

            // 4. Click on 'Signup / Login' button:
            cy.get("[href='/login']").click();

            // 5. Verify 'Login to your account' is visible:
            cy.get(".login-form h2").should("be.visible");

            // 6. Enter incorrect email address and password:
            cy.get("[data-qa='login-email']").type(`*${email}`);
            cy.get("[data-qa='login-password']").type(`*${password}`);

            // 7. Click 'login' button:
            cy.get("[data-qa='login-button']").click();

            // 8. Verify error 'Your email or password is incorrect!' is visible:
            cy.xpath("//p[text()='Your email or password is incorrect!']").should("be.visible");
        });
    });
});
