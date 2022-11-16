// src/test/RankingHolder_spec.ts

const playwright = require('playwright');
const pw = require('playwright-core')
const { expect } = require('@playwright/test');
//const { expect } = require('chai')
//const { expect } = require('playwright')
const puppeteer = require('puppeteer');
//const expect = chai.expect;

const helper = require('../config/auth.helper');
const locator_selector = require('../config/locator.helper');
const { credentials } = helper;
const { credentials_wrong } = helper;
const { test } = require('mocha');
const { selectors } = locator_selector.page.login;
const before_test  = require('../framework/beforeEach');
const after_test  = require('../framework/afterEach');

let page, browser, context, name_test

describe('Vikunja:login', () => {
  beforeEach(async function() {
    const before = await before_test.beforeEachTest();
    page = before.page;
    browser = before.browser;
  })

  afterEach(async function() {
    jest.setTimeout(10000)
    //sconsole.log('this',this.currentTest, this.currentTest?.title);
    await after_test.AfterEachTest(page, browser, name_test);
  })


  it('should exists', async () => {
    name_test = "should exists";
    await page.goto('https://try.vikunja.io/login');
    
    const title = await page.title();
    expect(title).toEqual('Login | Vikunja');
  })

  it('should successfully login and redirect to main page', async() => {

    name_test = "should successfully login and redirect to main page";
    await page.goto('https://try.vikunja.io/login'); // загружаем страницу

    await page.locator(selectors.login).fill(credentials.login); // вводим юзернейм
    await page.locator(selectors.password).fill(credentials.password); // вводим пароль

    await page.click(selectors.loginBtn); // нажали на кнопку войти

    await page.waitForLoadState('networkidle'); // network idle
   
    const title = await page.title() // title
    
    expect(title).toEqual('Current Tasks | Vikunja')
  })

  it('forgot pass', async () => {
    name_test = "forgot pass";
    await page.goto('https://try.vikunja.io/login');
    
    await page.click(selectors.forgotPass); 

    const title = await page.title();
    expect(title).toEqual('Reset your password | Vikunja');
  })


  it('should error login', async() => {

    name_test = "should error login";
    await page.goto('https://try.vikunja.io/login'); // загружаем страницу

    await page.locator(selectors.login).fill(credentials_wrong.login); // вводим юзернейм
    await page.locator(selectors.password).fill(credentials_wrong.password); // вводим пароль

    await page.click(selectors.loginBtn); // нажали на кнопку войти

    page.locator('[class="message danger"]').textContent().then((text) => {
      expect(text).toEqual('Wrong username or password.');
    });
  })

  it('should view pass', async() => {

    name_test = "should view pass";
    await page.goto('https://try.vikunja.io/login'); // загружаем страницу

    await page.click(selectors.view); // нажали на кнопку войти

    const labelValue = await page.locator('[aria-label]').getAttribute('aria-label');
    expect(labelValue).toEqual('Hide the password');
  })

  it('create account page', async () => {
    name_test = "create account pag";
    await page.goto('https://try.vikunja.io/login');
    
    await page.click(selectors.createAccount); 

    const title = await page.title();
    expect(title).toEqual('Create account | Vikunja');
  })

  it('check ckick on checkbox', async () => {
    name_test = "check ckick on checkbox";
    await page.goto('https://try.vikunja.io/login');
    
    await page.click(selectors.checkboxStayLog);

    expect(page.locator(selectors.checkboxStayLog)).toBeChecked();
  })
});