const playwright = require('playwright');
const { chromium } = require('playwright');
const PAGE_URL = require ('../config/vikunja_url');
let page, browser, context; 

module.exports = {
            
      beforeEachTest :async () => {
        browser = await chromium.launch({
            headless: false,
            slowMo: 1000
          });
        context = await browser.newContext();
        page = await context.newPage(PAGE_URL) 
        const before = {
            page,
            browser,
        };
        return before;    
      }
}