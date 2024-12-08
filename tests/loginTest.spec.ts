import { test, expect } from "../test_fixture";


//test for valid credential might fail as profile name is constently changibg
const loginData = [
  { username: "Admin", password: "admin123", shouldLogin: true },
  { username: "Admin", password: "admin124", shouldLogin: false },
  { username: "admin", password: "admin123", shouldLogin: true },
  { username: "admin", password: "admin124", shouldLogin: false },
];

test.describe("Login Page Tests", () => {
  for (const user of loginData) {
    test(`should login with username: ${user.username} and password: ${user.password}`, async ({
      loginPage,
      homePage,
      page
    }) => {
      await loginPage.goto();
      await loginPage.login(user.username, user.password);
      if (user.shouldLogin) {

        // const loggedIn = await homePage.verifyName("Einar Rice");
        // expect(loggedIn).toBe(true);

        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')


      } else {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe("Invalid credentials");
      }
    });
  }
});


