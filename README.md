# Cypress-spellchecker
This is a Cypress custom file download command.

This repository is used to check common spelling error on a webpage. 

## Installation

Install the module.

```shell
npm install Cypress-spellchecker
```

Add the following line to `cypress/support/commands.js`.

```javascript
require('Cypress-spellchecker/src/spellCheckCommand')
```

### For Cypress 10 and above 
Add the following lines to `cypress.config.js`.
```javascript
const { defineConfig } = require('cypress')
const spellcheck = require('Cypress-spellchecker/src/spellCheck')

module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
        spellcheck(on)
      }
    }
  })
```

## Example of basic command 
```javascript
cy.spellCheck('https://en.wikipedia.org/wiki/Wikipedia:Lists_of_common_misspellings')
```

## With Filename

```javascript
cy.spellCheck('https://en.wikipedia.org/wiki/Wikipedia:Lists_of_common_misspellings','filename')
```
