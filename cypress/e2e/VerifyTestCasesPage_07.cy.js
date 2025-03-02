/// <reference types="cypress"/>

describe("$7_VerifyTestCasesPage", () => {

    it("should verify test cases page", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Click on 'Test Cases' button:
        cy.get("ul.nav > li> a[href='/test_cases']").click();

        // 5. Verify user is navigated to test cases page successfully:
        cy.url().should("include", "/test_cases");
    })
})