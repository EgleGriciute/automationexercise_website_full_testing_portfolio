/// <reference types="cypress"/>

describe("$14_PlaceOrderRegisterWhileCheckout", () => {

    it("should place order and register while checkout", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Add products to cart:

        cy.addProductToCart();
        cy.addProductToCart();

        // 5. Click 'Cart' button:
        // 6. Verify that cart page is displayed:

        cy.clickAddToCartBtn();

        // 7. Click Proceed To Checkout:
        cy.get("a.check_out").click();

        // 8. Click 'Register / Login' button:

        cy.get(".modal-body > p > a").should("contain", "Register / Login")
            .and("be.visible")
            .click();

        // 9. Fill all details in Signup and create account:
        // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button:
        // 11. Verify ' Logged in as username' at top:

        cy.registerUser();

        // 12.Click 'Cart' button:
        // 13. Click 'Proceed To Checkout' button:
        // 14. Verify Address Details and Review Your Order:
        // 15. Enter description in comment text area and click 'Place Order':
        // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date:
        // 17. Click 'Pay and Confirm Order' button:
        // 18. Verify success message 'Your order has been placed successfully!':

        cy.payAndConfirmOrder();

        // 19. Click 'Delete Account' button:
        // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button:

        cy.deleteAccount();

    })
});

