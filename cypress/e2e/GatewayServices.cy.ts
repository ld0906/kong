Cypress.on('uncaught:exception', (err, runnable) => {
    
    return false;
  });

describe('Gateway Services Testing', () => {

    // Before each test, access the default workspace page for KongManager.
    beforeEach(() => {
      cy.visit('http://localhost:8002/default/services');  
    });

  
    // Check the Elements if displayed properly.

    it('create a new gateway services', () => {

      // Generate the unique gateway service name
      const uniqueString = 'GatewayService_' + Date.now(); 

      const uniqueServiceName = uniqueString;

      cy.get('span').contains('Gateway Services');  // Check the Header for the page.
      cy.contains('a','New Gateway Service').click(); //Click "Create new gateway service" button.
      cy.get('input[name="name"]').type(uniqueServiceName);
      cy.get('input[name="url"]').type('http://example.com/' + uniqueServiceName);
      cy.contains('button','Save').click()
      
      cy.wait(3000);

      //Verify the gateway service newly created in the table list as below:
      cy.get('table')
        .contains('td',uniqueServiceName)
        .should('exist');

   
    });

    it('Create any additional entities associated with a Service', () => {

      // Create a additional entity to the service with name "GW_Service1"

      // Generate the unique route name
      const uniqueString = '/Route_' + Date.now(); 
      const uniqueRouteName = uniqueString;

      cy.get('table')
        .contains('td','GW_Service1')
        .click();
      
      cy.wait(2000);
      cy.visit('http://localhost:8002/default/services/328cbaa2-b5ce-488e-82a5-8b8f3e5452db/routes');
      cy.contains('a','New Route').click();
      cy.get('input[placeholder="Enter a path"]').type(uniqueRouteName);
      cy.contains('button','Save').click();
      cy.wait(3000);

      //Verify the newly created route if in the list.
      cy.get('table')
        .contains('td',uniqueRouteName)
        .should('exist');

      
      


    });






});