/// <reference types="cypress"/>

describe("$8_VerifyAllProductsAndProductDetailPage", () => {

    it("should verify all products and product detail page", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Click on 'Products' button:
        // 5. Verify user is navigated to ALL PRODUCTS page successfully:

        cy.verifyAllProductsPage();

        // 6. The products list is visible:
        cy.get('.features_items', { timeout: 10000 })
            .should('exist')
            .and('be.visible')
            .and('have.length.greaterThan', 0);

        // 7. Click on 'View Product' of first product:
        cy.get("a[href='/product_details/1']").click();

        // 8. User is landed to product detail page:
        cy.url().should("contain", "/product_details/");

        // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand:

        // Product name:
        cy.get(".product-information h2")
            .should("exist")
            .and("be.visible");

        // Category:
        cy.xpath("//p[contains(text(), 'Category')]")
            .should("exist")
            .and("be.visible");

        // Price: 
        cy.xpath("//span[contains(text(), 'Rs.')]")
            .should("exist")
            .and("be.visible");

        // Availability:
        cy.xpath("//div[@class='product-information']//p[contains(.,'Availability')]")
            .should("exist")
            .and("be.visible");

        // Condition:
        cy.xpath("//div[@class='product-information']//p[contains(.,'Condition')]")
            .should("exist")
            .and("be.visible");

        // Brand:
        cy.xpath("//div[@class='product-information']//p[contains(.,'Brand')]")
            .should("exist")
            .and("be.visible");

    })
})