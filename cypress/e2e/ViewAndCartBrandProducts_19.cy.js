/// <reference types="cypress"/>

describe("$19_ViewAndCartBrandProducts", () => {

    it("should view and cart brand products", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':

        cy.verifyHomePageIsVisible();

        // 3. Click on 'Products' button:
        cy.get("a[href='/products']").click();

        // 4. Verify that Brands are visible on left side bar:
        cy.xpath("//h2[contains(text(),'Brands')]")
            .should("exist")
            .and("be.visible");

        // 5. Click on any brand name:
        cy.get(".brands-name .nav-stacked li  > a ").then((items) => {

            const brandNameIndex = Math.floor(Math.random() * items.length);
            cy.wrap(items[brandNameIndex]).click();

            // 6. Verify that user is navigated to brand page and brand products are displayed:

            const brandPageText = items.eq(brandNameIndex).attr("href");

            cy.url().then((currentUrl) => {

                cy.wrap(currentUrl.replace(/%20/g, " ")).should("include", brandPageText);

                cy.get(".productinfo > p").should("be.visible");

            });
        })

        // 7. On left side bar, click on any other brand link:
        cy.xpath("//a[contains(@href, '/brand_products/')]").then((items) => {

            const randomBrandIndex = Math.floor(Math.random() * items.length);

            // Get the brand name and href attribute before clicking:
            cy.wrap(items.eq(randomBrandIndex)).click();

            const brandPageText = items.eq(randomBrandIndex).attr("href");

            // 8. Verify that user is navigated to that brand page and can see products:

            cy.url().then((currentUrl) => {

                cy.wrap(currentUrl.replace(/%20/g, " ")).should("include", brandPageText);

                cy.get(".productinfo > p").should("be.visible");
                cy.get('h2.title').should('be.visible');
                cy.get('.features_items').should('be.visible');
                cy.get('.productinfo').should('exist');

            })
        });
    });

})
