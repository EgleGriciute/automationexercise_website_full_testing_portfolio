/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";

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
        cy.get("ul.nav > li > a[href='/view_cart']").click();

        // 6. Verify that cart page is displayed:
        cy.url().should("contain", "/view_cart");

        // 7. Click Proceed To Checkout:
        cy.get("a.check_out").click();

        // 8. Click 'Register / Login' button:

        cy.get(".modal-body > p > a").should("contain", "Register / Login")
            .and("be.visible")
            .click();

        // 9. Fill all details in Signup and create account:
        // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button:
        // 11. Verify ' Logged in as username' at top:

        cy.registerUser().then(() => {

            // 12.Click 'Cart' button:
            cy.get("ul.nav > li > a[href='/view_cart']").click();

            // 13. Click 'Proceed To Checkout' button:
            cy.get("a.check_out").click();

            // 14. Verify Address Details and Review Your Order:

            cy.xpath("//*[contains(text(),'Address Details')]")
                .should("exist")
                .and("be.visible")

            cy.xpath("//*[contains(text(),'Review Your Order')]")
                .should("exist")
                .and("be.visible")

            // 15. Enter description in comment text area and click 'Place Order':

            const randomProductDescription = faker.commerce.productDescription();

            cy.get("textarea[name='message']").type(randomProductDescription);
            cy.get("a[href='/payment']").click();

            // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date:

            const { name, creditCardNumber, creditCardCVC, month, year } = Cypress.env('user');

            cy.get("input[name='name_on_card']").type(name);
            cy.get("input[name='card_number']").type(creditCardNumber);
            cy.get("input[name='cvc']").type(creditCardCVC);
            cy.get("input[name='expiry_month']").type(month);
            cy.get("input[name='expiry_year']").type(year);

            // 17. Click 'Pay and Confirm Order' button:
            // 18. Verify success message 'Your order has been placed successfully!':

            cy.get("[data-qa='pay-button']").click().then(() => {
                cy.get('.alert-success')
                    .should('exist');
            });

            // 19. Click 'Delete Account' button:
            // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button:

            cy.deleteAccount();

        });
    })
})

