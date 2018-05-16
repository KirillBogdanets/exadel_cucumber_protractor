'use strict';

const expect = require('chai').expect;
const world = require('../po/world');
const utils = require("./utils/utils");
const EC = protractor.ExpectedConditions;
let { Then, When, Given } = require('cucumber');
const DEFAULT_STEP_TIMEOUT = 60 * 1000;
const parser = require('./utils/poParser');
let MemoryObject = require('./memory/memory');

Then(/^I wait (\d+) seconds$/, (number) => {
    let seconds = parseFloat(number);
    return browser.sleep(Math.floor(seconds * 1000));
});

Then(/^I enter "([^"]*)" text into "([^"]*)" element$/, (givenText, element) => {
    return parser.parser(element).sendKeys(givenText);
});

Then(/^I open "([^"]*)" url$/, (url) => {
    return url.includes("$") ?
    browser.get(MemoryObject.getter(url.replace("$", ""))) :
    browser.get(url);
});

When(/^I remember page url as "([^"]*)"$/, async (rememberAs) => {
    const url = await browser.getCurrentUrl();
    return MemoryObject.setter(rememberAs, url);
});

When(/^I add "([^"]*)" after "([^"]*)" into the remembered url "([^"]*)"$/, (addedValue, after, givenUrl) => {
    let url = MemoryObject.getter(givenUrl.replace("$", ""));
    let finalUrl = url.substr(0, url.indexOf(after) + after.length) + addedValue + url.substr(url.indexOf(after) + after.length);
    return url.includes(after) ?
        MemoryObject.setter(givenUrl.replace("$", ""), finalUrl) :
        new Error(`${url} in not contain ${after}`)
});

Then(/^I (Disable|Enable) protractor synchronization$/, (toggleArg) => {
    if (toggleArg === "Disable") {
        browser.ignoreSynchronization = true;
    } else {
        browser.ignoreSynchronization = false;
    }
    return true;
});
