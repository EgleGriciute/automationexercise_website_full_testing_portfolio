/// <reference types="cypress"/>

describe("$18_ViewCategoryProducts", () => {

    it("should show category products", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':

        cy.verifyHomePageIsVisible();

        // 3. Verify that categories are visible on left side bar:

        cy.get(".panel-group .panel-title a").each((category) => {

            // Get the text content of each category:
            const categoryText = category.text().trim();

            // Verify that the element is visible and contains text:
            cy.wrap(category)
                .should('be.visible')
                .and('contain.text', categoryText);

            // Additional verification that the text is not empty:
            expect(categoryText).to.not.be.empty;
        });

        // 4. Click on 'Women' category:
        cy.xpath("//a[@href='#Women']").click();

        // 5. Click on any category link under 'Women' category, for example - Dress:

        cy.get("div#Women a[href*='category_products']").then((links) => {

            // Generate a random index based on the number of links found:
            const randomIndex = Math.floor(Math.random() * links.length);

            // Click on the random subcategory:
            cy.wrap(links[randomIndex]).click();

        });

        // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS':

        it('should display the correct category page text', () => {
            cy.contains("Women - Tops Products")
                .should("be.visible")
                .then((messageCategoryProducts) => {
                    expect(messageCategoryProducts.text()).to.equal("Women - Tops Products");
                });
        });

        // 7. On left side bar, click on any sub-category link of 'Men' category:

        cy.get("a[href='#Men']").click();
        cy.get("#Men a[href*='category_products']").should('be.visible');

        // Collect all links under 'Men' category that contain 'category_products' in the href:
        cy.get("#Men a[href*='category_products']").then((links) => {

            // Pick a random link from the list:
            const randomIndex = Math.floor(Math.random() * links.length);
            const randomSubcategory = links[randomIndex];

            // Click the randomly selected subcategory:
            cy.wrap(randomSubcategory).click();

            // 8. Verify that user is navigated to that category page:

            cy.wrap(randomSubcategory).invoke('attr', 'href').then((linkHrefValue) => {

                cy.url().should("contain", linkHrefValue);

            });

        })

    })
});
