
const helper = require('../config/auth.helper');
const { credentials } = helper;
const { credentials_wrong } = helper;
const playwright = require('playwright');

const locator_selector = require('../config/locator.helper');
const { selectors } = locator_selector.page.login;
const { test } = require('mocha');

module.exports = {
            
      logIn :async (page) => {

        await page.goto('https://try.vikunja.io/login');

        await page.locator(selectors.login).fill(credentials.login); 
        await page.locator(selectors.password).fill(credentials.password); 
        await page.click(selectors.loginBtn);

        await page.waitForLoadState('networkidle');

        //console.log("test проверка что заходит сюда")
      },
}