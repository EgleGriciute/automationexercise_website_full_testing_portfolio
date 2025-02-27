/// <reference types="cypress" />

describe("$2_LoginUserWithCorrectEmailAndPassword", () => {

    before(() => {
        // Register a user before running the test as prerequisite:
        cy.visit("/");
        cy.registerUser();
        cy.logoutUser();
    })

    it("should log in with correct credentials and verify user is logged in and delete account", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Click on 'Signup / Login' button:
        // 5. Verify 'Login to your account' is visible:
        // 6. Enter correct email address and password:
        // 7. Click 'login' button:
        // 8. Verify that 'Logged in as username' is visible:

        cy.loginUserWithCorrectEmailAndPassword();

        // 9. Click 'Delete Account' button:
        // 10. Verify that 'ACCOUNT DELETED!' is visible:

        cy.deleteAccount();

    });
});
