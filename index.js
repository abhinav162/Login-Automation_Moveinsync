import { By, Builder } from 'selenium-webdriver';
import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.DEMO_USERNAME;
const password = process.env.DEMO_PASSWORD;

const LoginAutomation = async () => {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log('[+] Opening DemoQA... ');
        await driver.get('https://demoqa.com/login');

        console.log('[+] Writing Username... ');
        await driver.findElement(By.id('userName')).sendKeys(username);

        console.log('[+] Writing Password... ');
        await driver.findElement(By.id('password')).sendKeys(password);

        const loginBtn = await driver.findElement(By.id('login'));

        console.log('[+] Logging In... ');
        await driver.executeScript("arguments[0].scrollIntoView()", loginBtn);
        await driver.executeScript("arguments[0].click()", loginBtn);

        await driver.sleep(2000);
        const url = await driver.getCurrentUrl();

        assert.strictEqual(url, 'https://demoqa.com/profile');
        console.log('[+] Login Successful');
    } catch (error) {
        console.error('[x] Login Failed');
    }
}

LoginAutomation();