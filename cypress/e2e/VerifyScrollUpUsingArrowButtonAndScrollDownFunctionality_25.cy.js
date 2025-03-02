/// <reference types="cypress"/>

describe("$25_VerifyScrollUpUsingArrowButtonAndScrollDownFunctionality", () => {

    it("should verify scroll up using arrow button and scroll down functionality", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        //4. Scroll down page to bottom:
        cy.scrollTo("bottom");

        // 5. Verify 'SUBSCRIPTION' is visible:

        cy.get(".single-widget h2")
            .should("exist")
            .and("be.visible");

        // 6. Click on arrow at bottom right side to move upward:

        cy.get("#scrollUp")
            .click()
            .wait(1000);

        // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen:

        // Check if the page is at the top (scroll position = 0):

        cy.window().then((scroll) => {

            const scrollPosition = scroll.scrollY;
            expect(scrollPosition).to.equal(0);

            cy.xpath("//*[contains(text(), 'Full-Fledged practice website for Automation Engineers')]")
                .should("exist")
                .and("be.visible");

        });

    })

})