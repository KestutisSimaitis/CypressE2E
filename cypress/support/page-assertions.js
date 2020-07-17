const verifyFieldNames = (container, fieldType, expectedNames) => {
    cy.get(container).find(fieldType)
        .should('have.length', expectedNames.length)
        .each(($el, i) => {
            cy.wrap($el.attr('name')).should('eq', expectedNames[i])
        });
}

const verifyFieldValues = (container, fieldType, expectedValues) =>{
    cy.get(container)
        .find(fieldType)
        .should('have.length', expectedValues.length)
        .each(($el, i) => {
            cy.wrap($el).should('have.value', expectedValues[i])
        });
}

const verifyDropDownFieldValues = (container, fieldType, expectedValues) =>{
    cy.get(container)
        .find(fieldType)
        .should('have.length', expectedValues.length)
        .each(($el, i) => {
            cy.wrap($el).invoke('text').then((text) => {
                expect(text.replace(/\u00a0/g, ' ')).equal(expectedValues[i]);
            });
        });
}

export default {
    verifyFieldNames,
    verifyFieldValues,
    verifyDropDownFieldValues
}