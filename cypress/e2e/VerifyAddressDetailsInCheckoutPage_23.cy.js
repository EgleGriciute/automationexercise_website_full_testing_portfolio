/// <reference types="cypress"/>

describe("$23_VerifyAddressDetailsInCheckoutPage", () => {

    it("should verify address details in checkout page", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Click 'Signup / Login' button:
        // 5. Fill all details in Signup and create account:
        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button:
        // 7. Verify ' Logged in as username' at top:

        cy.registerUser();

        // 8. Add products to cart:

        cy.addProductToCart();
        cy.addProductToCart();
        cy.addProductToCart();

        // 9. Click 'Cart' button:
        // 10. Verify that cart page is displayed:

        cy.clickAddToCartBtn();

        // 11. Click Proceed To Checkout:
        cy.get("a.check_out").click();

        // 12. Verify that the delivery address is same address filled at the time registration of account:
        // 13. Verify that the billing address is same address filled at the time registration of account:

        // Read .env file before performing address assertions:

        cy.readFile("cypress/fixtures/.env").then((envData) => {
            envData.split("\n").forEach((line) => {
                const [key, value] = line.split("=");
                if (key && value) {
                    Cypress.env(key.trim(), value.trim());
                }
            });
        }).then(() => {
            const address1 = Cypress.env('ADDRESS1');
            cy.get("ul#address_invoice > li:nth-child(4)").should("have.text", address1);

            const address2 = Cypress.env('ADDRESS2');
            cy.get("ul#address_invoice > li:nth-child(5)").should("have.text", address2);
        });

        // 14. Click 'Delete Account' button:
        // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button:

        cy.deleteAccount();

    });
});



