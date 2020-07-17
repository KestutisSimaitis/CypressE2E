import login from "../support/login";
import assertions from "../support/page-assertions";
import navigation from "../support/page-navigation";
import interactions from "../support/page-interactions";

describe('Automated test', () => {

    const USER_PROFILE_URL = 'https://www.olybet.lt/user/profile';
    const PROFILE_TAB_CONTAINER = '[data-tab="profile-tab"]';

    it('is able to log in successfully', function () {
        login.login(Cypress.env("username"), Cypress.env("password"));
    });

    it('is able to change the language', () => {
        cy.visit('/?lang=lt');

        cy.get('.item-register', {timeout: 10000})
            .find('a')
            .as('registerLink')
            .should('contain.text', 'Užsiregistruokite');


        cy.get('.icon-header-flags-lt')
            .parents('li')
            .click({force: true});

        cy.get('.icon-header-flags-en', {timeout: 10000})
            .click({force: true});

        cy.url().should('eq', 'https://www.olybet.lt/?lang=en');

        cy.get('@registerLink')
            .should('be.visible')
            .contains('JOIN NOW');

    });

    it('is able to navigate to User Profile and verify User data', () => {
        login.login(Cypress.env("username"), Cypress.env("password"));

        navigation.profileMenuSelect(USER_PROFILE_URL, 'href');

        cy.url()
            .should('eq', USER_PROFILE_URL);

        const expectedTextFieldNames = [
            'firstName',
            'lastName',
            'personalCode',
            'birthday',
            'email',
            'username',
            'phone',
            'address',
            'city'
        ];

        const expectedDropDownFieldNames = [
            'country',
            'country'
        ];

        const expectedTextFieldValues = [
            'Test770086',
            'User770086',
            '30101010007',
            '1901-01-01',
            'assignmenttaskr@oit.lt',
            'assignmenttaskr@oit.lt',
            '*3701591623145',
            'n/a',
            'n/a'
        ];

        const expectedDropDownFieldValues = [
            'Lithuania',
            ' '
        ];
        
        assertions.verifyFieldNames(PROFILE_TAB_CONTAINER, 'input[type="text"]', expectedTextFieldNames);
        assertions.verifyFieldNames(PROFILE_TAB_CONTAINER, 'select[name="country"]', expectedDropDownFieldNames);
        assertions.verifyFieldValues(PROFILE_TAB_CONTAINER, 'input[type="text"]', expectedTextFieldValues);
        assertions.verifyDropDownFieldValues(PROFILE_TAB_CONTAINER, '.label', expectedDropDownFieldValues);
    });

    it('is able to change password', () => {
        login.login(Cypress.env("username"), Cypress.env("password"));

        cy.visit('/user/profile');

        cy.url()
            .should('eq', USER_PROFILE_URL);

        cy.get('.link')
            .not('.pull-right')
            .click();

        cy.get('#ora-modal-content', {timeout: 3000})
            .as('changePassModal');

        interactions.fillFieldBySelector('#ora-modal-content', 'input[name="current_password"]', Cypress.env("password"));
        interactions.fillFieldBySelector('#ora-modal-content', 'input[name="new_password"]', Cypress.env("newPassword"));

        cy.get('@changePassModal')
            .find('.button')
            .click();

        cy.get('@changePassModal')
            .find('.ico-success')
            .should('be.visible');
    });

    it('is able to log out', () => {
        login.login(Cypress.env("username"), Cypress.env("newPassword"));

        navigation.profileMenuSelect('User.logout();', 'onclick');

        cy.get('.item-register', {timeout: 10000})
            .should('be.visible');
    });

    it('is able to change back the password', () => {
        login.login(Cypress.env("username"), Cypress.env("newPassword"));

        cy.visit('/user/profile');

        cy.url()
            .should('eq', USER_PROFILE_URL);

        cy.get('.link')
            .not('.pull-right')
            .click();

        cy.get('#ora-modal-content', {timeout: 10000})
            .as('changePassModal');

        interactions.fillFieldBySelector('#ora-modal-content', 'input[name="current_password"]', Cypress.env("newPassword"));
        interactions.fillFieldBySelector('#ora-modal-content', 'input[name="new_password"]', Cypress.env("password"));

        cy.get('@changePassModal')
            .find('.button')
            .click();

        cy.get('@changePassModal')
            .find('.ico-success')
            .should('be.visible');
    });
});
