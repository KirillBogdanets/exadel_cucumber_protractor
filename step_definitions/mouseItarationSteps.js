'use strict';

const expect = require('chai').expect;
const world = require('../po/world');
const utils = require("./utils/utils");
const EC = protractor.ExpectedConditions;
let { Then, When, Given } = require('cucumber');
const DEFAULT_STEP_TIMEOUT = 60 * 1000;
const parser = require('./utils/poParser');

When(/^I scroll to the "([^"]*)" element$/, (element) => {
    return utils.scrollToTheElementHelper(element);
});

When(/^I scroll down page by (\d+) pixels$/, (pixels) => {
    return browser.executeScript(`window.scrollBy(0,'${pixels}');`);
});

Then(/^I click "([^"]*)" element with JS$/, (element) => {
    return browser.executeScript("arguments[0].click()", parser.parser(element));
});

Then(/^I click "([^"]*)" element$/, async (element) => {
    await browser.wait(EC.elementToBeClickable(parser.parser(element)), DEFAULT_STEP_TIMEOUT)
    return await parser.parser(element).click();
});

When(/^I hover mouse over "([^"]*)"$/, async (alias) => {
    await browser.actions().mouseMove(parser.parser(alias)).perform();
});