const login = (username, password) => {
    cy.log(`login - username:${username}`);

    cy.visit('/?lang=lt');

    cy.get('.item-login')
        .click();

    cy.get('.user-login-block', {timeout: 1000})
        .as('loginForm')
        .should('be.visible');

    cy.get('@loginForm')
        .find('[id="user_login_username"]')
        .should('be.visible')
        .type('{selectall}{backspace}' + username, {force: true});

    cy.get('@loginForm')
        .find('[id="user_login_password"]')
        .should('be.visible')
        .type('{selectall}{backspace}' + password, {force: true});

    cy.get('@loginForm')
        .find('button')
        .click({force: true});

    cy.get('.item-profile', {timeout: 10000})
        .should('be.visible');

    cy.log('login successful');
}

export default {
    login
}