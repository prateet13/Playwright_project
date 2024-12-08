import { test as base, Browser, Page, BrowserContext, expect, chromium } from '@playwright/test';
import { LoginPage } from './POM/LoginPage';
import { HomePage } from './POM/HomePage';

// Extend the base test to include custom fixtures
type MyFixtures = {
  browser: Browser;
  page: Page;
  context: BrowserContext;
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<MyFixtures>({

  browser: async ({}, use) => {
    const browser = await chromium.launch();
    await use(browser);
    await browser.close();
  },

  page: async ({ browser, context }, use) => {
    const page = await browser.newPage();
    await use(page);
  },

  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  }
});

// test.describe('Authentication', () => {
//   test('login and save session', async ({ page }) => {
//     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//     await page.getByPlaceholder('Username').fill('Admin');
//     await page.getByPlaceholder('Password').fill('admin123');
//     await page.getByRole('button', { name: 'Login' }).click()
//     // Ensure successful login
//     await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");

//     // Save login session for reuse
//     const cookies = await page.context().cookies();
//     const localStorage = await page.evaluate(() => JSON.stringify(localStorage));
    
//     // Store the cookies and localStorage in global variables for reuse
//     globalThis.savedCookies = cookies;
//     globalThis.savedLocalStorage = localStorage;
//   });
// });

export { expect } from '@playwright/test';
