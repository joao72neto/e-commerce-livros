const { defineConfig } = require("cypress");
const { resetarPovoarBanco } = require('./backend/model/database/modelReset');

module.exports = defineConfig({
  video: false,
  videosFolder: 'cypress/videos',
  e2e: {
    baseUrl: 'http://localhost:3000',
    redirectionLimit: 100,
    setupNodeEvents(on, config) {
      on('task', {
        async resetarBanco(){
          await resetarPovoarBanco()
          return null;
        }
      })
    },
  },
});
