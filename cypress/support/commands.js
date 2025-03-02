import { faker } from '@faker-js/faker';
import 'cypress-xpath';

// Global error handling:
Cypress.on('uncaught:exception', (err) => {
    console.log('Caught an uncaught exception:', err.message);
    return false;
});

// File download plugin:
require('cypress-downloadfile/lib/downloadFileCommand');

Cypress.Commands.add("verifyHomePageIsVisible", () => {

    // 1. Launch browser:
    cy.visit('/');

    // 2. Navigate to url 'http://automationexercise.com':
    cy.url().should('eq', 'https://automationexercise.com/');

    // 3. Verify that home page is visible successfully:
    cy.get('body').should('be.visible');
});

Cypress.Commands.add("registerUser", () => {

    function getRandomMonth() {
        const month = Math.floor(Math.random() * 12) + 1;
        return month.toString().padStart(2, '0');
    }

    // Generate user data:
    const user = {
        id: faker.string.uuid(),
        sex: faker.person.sex(),
        name: faker.person.fullName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 20 }),
        company: faker.company.name(),
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        state: faker.location.state(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number({ style: 'international' }),
        creditCardNumber: faker.finance.creditCardNumber(),
        creditCardCVC: faker.finance.creditCardCVV(),
        month: getRandomMonth(),
        year: faker.number.int({ min: 2030, max: 2035 }),
        textArea: faker.lorem.text()
    };

    // Start Registration Process:
    cy.get("[href='/login']").click();
    cy.get(".signup-form h2").should("have.text", "New User Signup!");
    cy.get("[data-qa='signup-name']").type(user.name);
    cy.get("[data-qa='signup-email']").type(user.email);
    cy.get("[data-qa='signup-button']").click();
    cy.get(".login-form > h2 b").should("have.text", "Enter Account Information");

    // Select Gender:
    if (user.sex === "male") {
        cy.get("#uniform-id_gender1").click();
        cy.get("#id_gender1").should('be.checked');
    } else {
        cy.get("#uniform-id_gender2").click();
        cy.get("#id_gender2").should('be.checked');
    }

    // Fill Form Data:
    cy.get("[data-qa='name']").clear().type(user.name);
    cy.get("[data-qa='email']").clear({ force: true }).type(user.email, { force: true });
    cy.get("[data-qa='password']").type(user.password);
    cy.get("[data-qa='days']").select("18");
    cy.get("[data-qa='months']").select("7");
    cy.get("[data-qa='years']").select("1994");

    cy.get("#newsletter").click();
    cy.get("#optin").click();

    // Address Information:
    cy.get("#first_name").type(user.firstName);
    cy.get("#last_name").type(user.lastName);
    cy.get("#company").type(user.company);
    cy.get("#address1").type(user.address1);
    cy.get("#address2").type(user.address2);

    cy.get("#country").find("option").then(options => {
        const randomIndex = Math.floor(Math.random() * options.length);
        cy.get("#country").select(options[randomIndex].innerText);
    });

    cy.get("#state").type(user.state);
    cy.get("#city").type(user.city);
    cy.get("#zipcode").type(user.zipCode);
    cy.get("#mobile_number").type(user.phoneNumber);

    // Create Account:
    cy.get("[data-qa='create-account']").click();
    cy.url().should('include', '/account');
    cy.contains("Account Created!").should("be.visible");
    cy.get("[data-qa='continue-button']").click();
    cy.get("ul.nav li:last-child a").should("be.visible");

    // Reset Cypress environment variables:
    Cypress.env({});

    // Write to `.env` file:
    const envContent = Object.entries(user)
        .map(([key, value]) => `${key.toUpperCase()}=${value}`)
        .join("\n");

    cy.writeFile("cypress/fixtures/.env", envContent).then(() => {
        cy.readFile("cypress/fixtures/.env").then((envData) => {
            envData.split("\n").forEach((line) => {
                const [key, value] = line.split("=");
                if (key && value) {
                    Cypress.env(key.trim(), value.trim());
                }
            });
        });
    });

    // Explicitly Store Values in Cypress Environment:
    Cypress.env("EMAIL", user.email);
    Cypress.env("PASSWORD", user.password);
    Cypress.env("NAME", user.name);
    Cypress.env("TEXTAREA", user.textArea);
    Cypress.env("ADDRESS1", user.address1);
    Cypress.env("ADDRESS2", user.address2);
});
;

Cypress.Commands.add("logoutUser", () => {
    cy.get("a[href='/logout']").click();
})

Cypress.Commands.add("loginUserWithCorrectEmailAndPassword", () => {

    const email = Cypress.env('EMAIL');
    const password = Cypress.env('PASSWORD');
    const name = Cypress.env('NAME');

    // Click on 'Signup / Login' button:
    cy.get("ul.nav > li> a[href='/login']").click();

    // Verify 'Login to your account' is visible:
    cy.get(".login-form h2").should("be.visible");

    // Enter correct email address and password:
    cy.get("[data-qa='login-email']").type(email);
    cy.get("[data-qa='login-password']").type(password);

    // Click 'login' button:
    cy.get("[data-qa='login-button']").click();

    // Verify that 'Logged in as username' is visible:
    cy.contains(`Logged in as ${name}`).should("be.visible");

});

Cypress.Commands.add("loginUserWithIncorrectEmailAndPassword", () => {

    const email = Cypress.env('EMAIL');
    const password = Cypress.env('PASSWORD');

    // Click on 'Signup / Login' button:
    cy.get("[href='/login']").click();

    // Verify 'Login to your account' is visible:
    cy.get(".login-form h2").should("be.visible");

    // Enter incorrect email address and password:
    cy.get("[data-qa='login-email']").type(`*${email}`)
    cy.get("[data-qa='login-password']").type(`*${password}`)

    // Click 'login' button:
    cy.get("[data-qa='login-button']").click();

    // Verify error 'Your email or password is incorrect!' is visible:
    cy.xpath("//p[text()='Your email or password is incorrect!']").should("be.visible");

});

Cypress.Commands.add("deleteAccount", () => {

    // Click 'Delete Account' button:
    cy.get("ul.nav li > a[href='/delete_account']").click();

    // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button:
    cy.url().should('include', '/delete_account');
    cy.get("h2 > b").should("have.text", "Account Deleted!");

    cy.get("[data-qa='continue-button']").click();
    cy.url().should('include', '/');
});

Cypress.Commands.add("addProductToCart", () => {

    cy.get(".overlay-content > a[data-product-id]").its("length").then((length) => {

        // Ensure length does not exceed 44 (max index is 43):
        const maxLength = Math.min(length, 44);

        // Generate a random index within the valid range:
        const randomIndex = Math.floor(Math.random() * maxLength);
        cy.get(".overlay-content > a[data-product-id]").eq(randomIndex).click({ force: true });

        // Click on 'Continue' button:
        cy.get(("[data-dismiss='modal']")).click();

    });
})

Cypress.Commands.add("clickAddToCartBtn", () => {

    cy.get("ul.nav > li > a[href='/view_cart']").click();
    cy.url().should("contain", "/view_cart");
})

Cypress.Commands.add("payAndConfirmOrder", () => {

    // Click 'Cart' button:
    cy.get("ul.nav > li > a[href='/view_cart']").click();

    // Verify that cart page is displayed:
    cy.url().should("contain", "/view_cart");

    // Click Proceed To Checkout:
    cy.get("a.check_out").click();

    // Verify Address Details and Review Your Order:

    cy.xpath("//*[contains(text(),'Address Details')]")
        .should("exist")
        .and("be.visible")

    cy.xpath("//*[contains(text(),'Review Your Order')]")
        .should("exist")
        .and("be.visible")

    // Enter description in comment text area and click 'Place Order':

    const randomProductDescription = faker.commerce.productDescription();

    cy.get("textarea[name='message']").type(randomProductDescription);
    cy.get("a[href='/payment']").click();

    // Enter payment details: Name on Card, Card Number, CVC, Expiration date:

    // name, creditCardNumber, creditCardCVC, month, year

    const name = Cypress.env('NAME');
    const creditCardNumber = Cypress.env('CREDITCARDNUMBER');
    const creditCardCVC = Cypress.env('CREDITCARDCVC');
    const month = Cypress.env('MONTH');
    const year = Cypress.env('YEAR');

    cy.get("input[name='name_on_card']").type(name);
    cy.get("input[name='card_number']").type(creditCardNumber);
    cy.get("input[name='cvc']").type(creditCardCVC);
    cy.get("input[name='expiry_month']").type(month);
    cy.get("input[name='expiry_year']").type(year);

    // Click 'Pay and Confirm Order' button:
    // Verify success message 'Your order has been placed successfully!':

    cy.get("[data-qa='pay-button']").click().then(() => {
        cy.get('.alert-success')
            .should('exist');
    });

});

Cypress.Commands.add("verifyAllProductsPage", () => {

    // Click on 'Products' button:
    cy.get("a[href='/products']").click();

    // Verify user is navigated to ALL PRODUCTS page successfully:
    cy.url().should("include", "/products");

})

// API commands:

Cypress.Commands.add('checkResponseTime', (response) => {
    expect(response.duration).to.be.lessThan(1000);
});
