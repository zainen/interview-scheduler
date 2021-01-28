describe('should book and interview', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    
    cy.visit('/');

    cy.contains('li', 'Monday').should('have.class', 'day-list__item--selected');
  });
  it('can book a new appointment', () => {
    cy.get('[alt=Add]').first().click();

    cy.get('[data-testid=student-name-input]').type('Jeff');
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains('button', 'Save').click();

    cy.contains('.appointment__card--show', 'Jeff');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });
  it('should edit an interview', () => {
    cy.get('[alt="Edit"]').invoke('show').click();
    cy.get('[data-testid=student-name-input]').type("{backspace}{backspace}{backspace}{backspace}{backspace} Can't Type");
    cy.get('[alt=\'Tori Malcolm\']').click();
    cy.contains('Save').click();

    cy.contains('.appointment__card--show', 'Archie Can\'t Type');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });
  it('should delete an appointment', () => {
    cy.get('[alt=\'Delete\']').click({force: true});
    cy.contains('Confirm').click();

    cy.contains('DELETING').should('exist');
    cy.contains('DELETING').should('not.exist');
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});