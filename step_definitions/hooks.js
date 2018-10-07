'use strict';

let {After, Before, Status, BeforeAll} = require('cucumber');
let {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);
const fs = require('fs');

Before("@smoke", async () => {
    await browser.manage().deleteAllCookies();
    browser.ignoreSynchronization = true;
    browser.driver.manage().window().maximize(); 
    await browser.get(browser.baseUrl);
});

After(async function (testCase){
    if (testCase.result.status === Status.FAILED) {
        const screenShot = await browser.takeScreenshot();
        let decodedImage = new Buffer(screenShot, 'base64');
        return this.attach(decodedImage, 'image/png');
    }
});