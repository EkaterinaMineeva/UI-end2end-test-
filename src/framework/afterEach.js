const playwright = require('playwright');
const { chromium } = require('playwright');
const PAGE_URL = require ('../config/vikunja_url');
let page, browser, context; 

module.exports = {
            
      AfterEachTest :async (page, browser, name_test) => {
        await page.screenshot({ path: `screenshots/UI_Test_${name_test}.png` })
        await browser.close()    
      }
}