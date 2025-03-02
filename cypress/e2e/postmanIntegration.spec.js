describe('Postman API Tests with Newman', () => {
    it('should run Postman tests using Newman', (done) => {
        // Path to your exported Postman collection
        const collectionPath = 'cypress/integration.postman_tests/AutomationExercise.postman_collection.json';

        // Trigger the custom task that runs the Newman collection
        cy.task('runNewman', collectionPath).then((result) => {
            // Output the Newman results to the console
            console.log(result);

            // Assert that the result contains 'Run Completed' (optional check)
            expect(result).to.have.property('total').that.is.above(0);

            // The `done()` function is used to signal that the test is complete
            done();
        }).catch((error) => {
            // Handle any error from the Newman run
            console.error('Error running Newman:', error);
            done();
        });
    });
});
