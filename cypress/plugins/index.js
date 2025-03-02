// Import the Newman module
const newman = require('newman');

module.exports = (on, config) => {
    // Define a custom task called 'runNewman'
    on('task', {
        // The custom task that will run the Postman collection using Newman
        runNewman(collectionPath) {
            return new Promise((resolve, reject) => {
                // Run the Newman command, passing the path to your Postman collection
                newman.run({
                    collection: require(collectionPath), // Path to the exported Postman collection
                    reporters: ['cli'],  // CLI reporter to display results in console
                }, (err, summary) => {
                    // If there is an error, reject the promise
                    if (err) {
                        reject(err);
                    } else {
                        // Resolve the promise with the summary of the run
                        resolve(summary.run.stats);
                    }
                });
            });
        }
    });
};
