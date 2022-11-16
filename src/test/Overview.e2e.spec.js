//import * as app from '../framework/index.js'
//import signIn from '../framework/signIn';

const signIn = require('../framework/signIn');

const { chromium } = require('playwright');
const pw = require('playwright-core')
const { expect } = require('@playwright/test');

const helper = require('../config/auth.helper');
const locator_selector = require('../config/locator.helper');
const { credentials } = helper;
const { credentials_wrong } = helper;
const { test } = require('mocha');
const { selectors } = locator_selector.page.login;
const PAGE_URL = require ('../config/vikunja_url')

let page, browser, context, name_test, task_name_from_list;

const name_task = 'Test_Add_Task';

describe('Vikunja:Current task', () => {
  jest.setTimeout(150000);
  beforeEach(async function() {
    browser = await chromium.launch({
      headless: false,
      slowMo: 1000
    });
    context = await browser.newContext();
    page = await context.newPage(PAGE_URL)

    await signIn.logIn(page);
  })

  afterEach(async function() {
    await page.screenshot({ path: `screenshots/UI_Test_${name_test}.png` })
    await browser.close()
  })

  it('Add new task', async () => {   
    name_test = "Add new task";

    await page.goto(PAGE_URL); 
    await page.mainFrame().waitForSelector('.card-content');

    await page.locator(selectors.addTask).fill(name_task);
    await page.click(selectors.AddButton);

    page.locator(selectors.TaskList).textContent().then((text) => {              
        expect(text.includes(name_task)).toBeTruthy();
      });
  }) 
  
  it('Check checkbox task', async () => {   
    name_test = "Check checkbox task";

    await page.goto(PAGE_URL); 
    await page.mainFrame().waitForSelector('.card-content');

    await page.click(selectors.AnyTaskChekbox);
    expect(page.locator('a[class="done tasktext"]')).toBeVisible();

  }) 

  it('Check mark task', async () => {   
    name_test = "Check mark task";

    await page.goto(PAGE_URL); 
    await page.mainFrame().waitForSelector('.card-content');

    await page.click(selectors.UnMarkTask);

    expect(page.locator(selectors.MarkTask)).toBeVisible();
  }) 

  it('Go to task', async () => {   
    name_test = "Go to task";

    await page.goto(PAGE_URL); 
    await page.mainFrame().waitForSelector('.card-content');

    task_name_from_list = await page.locator(selectors.TaskList).textContent();
    const titleTest = task_name_from_list.split(" ", 2);

    await page.click(selectors.AnyTask);
    //await page.mainFrame().waitForSelector('.card-content');
    await page.waitForLoadState('networkidle');

    const title = await page.title();
    expect(title).toEqual(titleTest[1] + ' | Vikunja');
  }) 

  it('Change name task', async () => {   
    name_test = "Change name task";

    await page.goto(PAGE_URL); 
    await page.mainFrame().waitForSelector('.card-content');

    await page.locator(selectors.addTask).fill(name_task);
    await page.click(selectors.AddButton);

    await page.click(selectors.EditTask);
    await page.locator('input[id=tasktext]').fill('New_name_for_this_task');
    await page.click('button[class="base-button base-button--type-button button is-primary is-fullwidth"]');

    page.locator(selectors.TaskList).textContent().then((text) => {              
        expect(text.includes('New_name_for_this_task')).toBeTruthy();
      });
  }) 
});