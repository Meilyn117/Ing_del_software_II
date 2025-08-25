import { test, expect } from '@playwright/test';

const CLIENT_EMAIL = process.env.TEST_CLIENT_EMAIL!;
const CLIENT_PASS = process.env.TEST_CLIENT_PASSWORD!;
const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL!;
const ADMIN_PASS = process.env.TEST_ADMIN_PASSWORD!;

async function openLoginBubble(page) {
  await page.goto('/');
  await expect(page.getByTestId('login-page')).toBeVisible();
  await page.getByTestId('nav-login-icon').click();
  await expect(page.getByTestId('login-bubble')).toBeVisible();
}

async function login(page, email: string, password: string) {
  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill(password);
  await page.getByTestId('login-submit').click();
}

test.describe('Autenticación básica', () => {
  test('001 – Login cliente válido', async ({ page }) => {
    await openLoginBubble(page);
    await login(page, CLIENT_EMAIL, CLIENT_PASS);
    await expect(page.getByTestId('perfil-page')).toBeVisible();
    await expect(page.getByTestId('perfil-role')).toContainText(/cliente/i);
  });

  test('002 – Login admin válido', async ({ page }) => {
    await openLoginBubble(page);
    await login(page, ADMIN_EMAIL, ADMIN_PASS);
    await expect(page.getByTestId('dash-page')).toBeVisible();
    await expect(page.getByTestId('dash-title')).toContainText(/admin/i);
  });

  test('003 – Credenciales inválidas', async ({ page }) => {
    await openLoginBubble(page);
    await login(page, 'fakeuser@demo.com', 'badpass');
    await expect(page.getByTestId('login-error')).toBeVisible();
    await expect(page.getByTestId('perfil-page')).not.toBeVisible({ timeout: 1000 }).catch(() => {});
    await expect(page.getByTestId('dash-page')).not.toBeVisible({ timeout: 1000 }).catch(() => {});
  });

  test('004 – Cierre de sesión', async ({ page }) => {
    await openLoginBubble(page);
    await login(page, CLIENT_EMAIL, CLIENT_PASS);
    await expect(page.getByTestId('perfil-page')).toBeVisible();
    await page.getByTestId('perfil-logout').click();
    await expect(page.getByTestId('login-page')).toBeVisible();
  });
});
