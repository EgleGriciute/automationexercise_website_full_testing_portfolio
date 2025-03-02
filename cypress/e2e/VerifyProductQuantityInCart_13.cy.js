/// <reference types="cypress" />

describe("$13_VerifyProductQuantityInCart", () => {

    it("should verify product quantity in cart", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Click 'View Product' for any product on home page:
        cy.xpath("//a[contains(text(),'View Product')]").its("length").then((length) => {

            const randomIndex = Math.floor(Math.random() * length);
            cy.xpath("//a[contains(text(),'View Product')]").eq(randomIndex).click();
        })

        // 5. Verify product detail is opened:
        cy.url().should("contain", "/product_details/");

        cy.get(".product-details")
            .should("exist")
            .and("be.visible");

        cy.get(".product-details").within(() => {
            // Check for specific elements within the product details section:
            cy.get(".product-information").should("exist").and("be.visible");
            cy.get(".product-information h2").should("exist").and("be.visible");
            cy.get(".product-information p").should("exist").and("be.visible");
        });

        // 6. Increase quantity to 4:

        cy.get("#quantity")
            .clear()
            .type("4");

        // 7. Click 'Add to cart' button:
        cy.get(".btn.btn-default.cart").click();

        // 8. Click 'View Cart' button:
        cy.xpath("//u[text()='View Cart']").click();

        // 9. Verify that product is displayed in cart page with exact quantity:

        cy.url().should("contain", "/view_cart");

        cy.get(".cart_info .cart_description")
            .should("be.visible");

        cy.get(".cart_quantity button")
            .should("have.text", "4");

        cy.get(".cart_quantity")
            .should("contain", "4");
    })

})
