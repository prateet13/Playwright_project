import { test, expect } from '../test_fixture';

test.beforeEach('',async({loginPage})=>{
  await loginPage.goto();
  await loginPage.login('Admin','admin123');
})

test('Verify user is logged in and on home page', async ({homePage,page }) => {
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  //not using bellow workflow as name is not constant
  // await homePage.verifyName("manda user")
  // const abc = await homePage.verifyUserLoggedIn();
  // expect(abc).toBe(true);
});

test('Verify side pannel', async({page, homePage})=>{
  // page.pause()
  await expect(page.getByLabel('sidepanel')).toBeVisible();
  // await expect(page.locator('.oxd-main-menu > li')).toHaveCount(12);
  await page.pause()
  await homePage.openLink('Admin');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers')
  await homePage.openLink('Maintenance');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/maintenance/purgeEmployee');
})

test('Verify logout', async({page,homePage})=>{
  await homePage.logout()
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
})

test('misc', async({homePage,page})=>{
  await homePage.openLink('Admin');
  await expect(page).toHaveTitle("OrangeHRM");
  await expect(page.getByRole('button', { name: 'Search' })).toHaveAttribute('type','submit');
  await expect(page.getByRole('button', { name: 'Search' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Search' })).toHaveCSS('background-color','rgb(51, 162, 153)');
  await expect(page.getByRole('button', { name: 'Search' })).toHaveText("Search")
})

test('search', async ({loginPage,page, homePage}) => {
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('Admin');
  await expect(page.locator('.oxd-main-menu > li')).toHaveCount(1);
})
