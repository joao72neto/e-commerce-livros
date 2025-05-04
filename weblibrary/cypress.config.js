const { defineConfig } = require("cypress");
const { resetarPovoarBanco } = require('./backend/model/database/modelReset');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
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
