import { faker } from '@faker-js/faker';
import 'cypress-xpath';

Cypress.Commands.add("registerUser", () => {

    const user = {
        id: faker.string.uuid(),
        sex: faker.person.sex(),
        name: faker.person.fullName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        company: faker.company.name(),
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        state: faker.location.state(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number({ style: 'international' }),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 20 })
    };

    // Store user in Cypress environment variable:
    Cypress.env('user', user);

    // 1. Launch browser:
    cy.visit('/');
    // 2. Navigate to url 'http://automationexercise.com':
    cy.url().should('eq', 'https://automationexercise.com/');

    // 3. Verify that home page is visible successfully:
    cy.get('body').should('be.visible');

    // 4. Click on 'Signup / Login' button:

    cy.get("[href='/login']").click();

    // 5. Verify 'New User Signup!' is visible:
    cy.get(".signup-form h2").should("have.text", "New User Signup!");

    // 6. Enter name and email address:
    cy.get("[data-qa='signup-name']").type(user.name);
    cy.get("[data-qa='signup-email']").type(user.email);

    // 7. Click 'Signup' button:
    cy.get("[data-qa='signup-button']").click();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible:
    cy.get(".login-form > h2 b")
        .should("have.text", "Enter Account Information");

    // 9. Fill details: Title, Name, Email, Password, Date of birth:
    if (user.sex === "male") {
        cy.get("#uniform-id_gender1").click();
        cy.get("#id_gender1").should('be.checked'); // Ensure the 'male' gender is selected
    } else {
        cy.get("#uniform-id_gender2").click();
        cy.get("#id_gender2").should('be.checked'); // Ensure the 'female' gender is selected
    }

    cy.get("[data-qa='name']").clear().type(user.name);
    cy.get("[data-qa='email']").clear({ force: true }).type(user.email, { force: true });
    cy.get("[data-qa='password']").type(user.password);

    cy.get("[data-qa='days']").select("18");
    cy.get("[data-qa='months']").select("7");
    cy.get("[data-qa='years']").select("1994");

    // 10. Select checkbox 'Sign up for our newsletter!':
    cy.get("#newsletter").click();

    // 11. Select checkbox 'Receive special offers from our partners!':
    cy.get("#optin").click();

    // 12. Fill details: First name, Last name, Company, Address, Address2, Country,
    // State, City, Zipcode, Mobile Number:
    cy.get("#first_name").type(user.firstName);
    cy.get("#last_name").type(user.lastName);
    cy.get("#company").type(user.company);
    cy.get("#address1").type(user.address1);
    cy.get("#address2").type(user.address2);

    cy.get("#country")
        .find("option")
        .then(options => {
            const randomIndex = Math.floor(Math.random() * options.length);
            const randomOption = options[randomIndex].innerText;
            cy.get("#country").select(randomOption);
        });

    cy.get("#state").type(user.state);
    cy.get("#city").type(user.city);
    cy.get("#zipcode").type(user.zipCode);
    cy.get("#mobile_number").type(user.phoneNumber);

    // 13. Click 'Create Account button':
    cy.get("[data-qa='create-account']").click();
    cy.url().should('include', '/account');

    // 14. Verify that 'ACCOUNT CREATED!' is visible:
    cy.contains("Account Created!").should("be.visible");

    // 15. Click 'Continue' button:
    cy.get("[data-qa='continue-button']").click();

    // 16. Verify that 'Logged in as username' is visible:
    cy.get("ul.nav li:last-child a").should("be.visible");
    cy.location('href').should('match', /https:\/\/(www\.)?automationexercise\.com\//);
});

Cypress.Commands.add("deleteAccount", () => {
    // 17. Click 'Delete Account' button:
    cy.get("ul.nav li > a[href='/delete_account']").click();

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button:
    cy.url().should('include', '/delete_account');
    cy.get("h2 > b").should("have.text", "Account Deleted!");

    cy.get("[data-qa='continue-button']").click();
    cy.url().should('include', '/');
})
