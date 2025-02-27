/// <reference types="cypress"/>

describe("$16_PlaceOrderLoginBeforeCheckout", () => {

    before(() => {
        // Register a user before running the test as prerequisite:
        cy.visit("/");
        cy.registerUser();
        cy.logoutUser();
    })

    it("should place order login before checkout", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Click 'Signup / Login' button:
        // 5. Fill email, password and click 'Login' button:
        // 6. Verify 'Logged in as username' at top:

        cy.loginUserWithCorrectEmailAndPassword();

        // 7. Add products to cart:

        cy.addProductToCart();
        cy.addProductToCart();
        cy.addProductToCart();

        // 8. Click 'Cart' button:
        // 9. Verify that cart page is displayed:
        // 10. Click Proceed To Checkout:
        // 11. Verify Address Details and Review Your Order:
        // 12. Enter description in comment text area and click 'Place Order':
        // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date:
        // 14. Click 'Pay and Confirm Order' button:
        // 15. Verify success message 'Your order has been placed successfully!':

        cy.payAndConfirmOrder();

        // 16. Click 'Delete Account' button:
        // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button:

        cy.deleteAccount();

    })
})