const fillFieldBySelector = (container, fieldSelector, stringToType) => {
    cy.get(container)
        .find(fieldSelector)
        .type('{selectall}{backspace}' + stringToType);
}

export default {
    fillFieldBySelector
}