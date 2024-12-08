import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  private page: Page;
  private name: Locator;
  private logoutButton: Locator;
  private ab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.name = page.locator('.oxd-userdropdown-tab');
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
    this.ab = page.getByRole('heading', { name: 'Dashboard' })
  }

  async verifyUserLoggedIn() {
    const logoutVisible = await this.ab.isVisible();
    return logoutVisible;
  }

  async verifyName(val: string) {
    const name = await this.name.innerText();
    return (val== name)?true:false;
  }

  async logout() {
    this.page.pause()
    // await this.page.getByRole('img', { name: 'profile picture' }).locator('i').click();
    await this.page.getByRole('banner').getByRole('img', { name: 'profile picture' }).click();

    await this.logoutButton.click();
  }

  async openLink(name: string) {
    this.page.locator('a').filter({ hasText: name }).click()
  }
}
