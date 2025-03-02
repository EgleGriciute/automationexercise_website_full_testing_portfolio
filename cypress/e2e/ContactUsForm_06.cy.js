/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';
import 'cypress-file-upload';

describe("$6_ContactUsForm", () => {

    it("should fill in 'Contact us' Form", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        // 4. Click on 'Contact Us' button:
        cy.get("[href='/contact_us']").click();

        // 5. Verify 'GET IN TOUCH' is visible:
        cy.get(".contact-form h2").should("have.text", "Get In Touch");

        // 6. Enter name, email, subject and message:

        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            subject: faker.lorem.word(10),
            message: faker.lorem.paragraph()
        };

        cy.xpath("//form[@id='contact-us-form']//input[@data-qa='name']").type(user.name);
        cy.xpath("//form[@id='contact-us-form']//input[@data-qa='email']").type(user.email);

        cy.xpath("//form[@id='contact-us-form']//input[@data-qa='subject']")
            .type(user.subject);

        cy.xpath("//form[@id='contact-us-form']//textarea[@data-qa='message']")
            .type(user.message);

        // 7. Upload file:
        cy.xpath("//input[@type='file' and @name='upload_file']").attachFile("filesToUpload/test.txt");

        // 8. Click 'Submit' button:
        cy.get("[data-qa='submit-button']").click();

        // 9. Click OK button:

        // Cypress automatically clicks "OK" on alerts, though possible solution could be:

        cy.on('window:confirm', (text) => {
            expect(text).to.equal('Press OK to proceed!');
            return true;
        });

        // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible:

        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Success! Your details have been submitted successfully.');
        });

        // 11. Click 'Home' button and verify that landed to home page successfully:

        cy.get("ul.nav > li > [href='/']").click();
        cy.url().should('eq', 'https://automationexercise.com/');

    })

})