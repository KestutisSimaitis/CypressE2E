
const profileMenuSelect = (valueToSelect, attributeToCheck) => {
    cy.get('.item-profile', {timeout: 10000})
        .click();

    cy.get('.profile-submenu')
        .as('profileSubMenu')
        .should('be.visible');

    cy.get('@profileSubMenu')
        .find('li > a')
        .filter(`[${attributeToCheck}="${valueToSelect}"]`)
        .should('be.visible')
        .click({force: true});
}

export default {
    profileMenuSelect
}