/// <reference types="cypress" />

describe("$3_LoginUserWithIncorrectEmailAndPassword", () => {

    before(() => {
        // Register a user before running the test as prerequisite:
        cy.visit("/");
        cy.registerUser();
        cy.logoutUser();
    });

    it("should display an error when logging in with incorrect credentials", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Click on 'Signup / Login' button
        // 5. Verify 'Login to your account' is visible
        // 6. Enter incorrect email address and password
        // 7. Click 'login' button
        // 8. Verify error 'Your email or password is incorrect!' is visible

        cy.loginUserWithIncorrectEmailAndPassword();

    });
});

