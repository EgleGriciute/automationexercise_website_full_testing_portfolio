/// <reference types="cypress"/>

describe("$26_VerifyScrollUpWithoutArrowButtonAndScrollDownFunctionality", () => {

    it("should verify scroll up without using arrow button and scroll down functionality", () => {

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

        // 6. Scroll up page to top:
        cy.scrollTo("top");

        // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen:

        cy.window().then((scroll) => {

            const scrollPosition = scroll.scrollY;
            expect(scrollPosition).to.equal(0);

            cy.xpath("//*[contains(text(), 'Full-Fledged practice website for Automation Engineers')]")
                .should("exist")
                .and("be.visible");

        });
    })
})