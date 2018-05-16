'use strict';

const expect = require('chai').expect;
const world = require('../po/world');
const utils = require("./utils/utils");
const EC = protractor.ExpectedConditions;
let {Then, When, Given} = require('cucumber');
const DEFAULT_STEP_TIMEOUT = 60 * 1000;
const parser = require('./utils/poParser');

When(/^I remember text of "([^"]*)" element as "([^"]*)"$/, (element, saveAs) => {
    return utils.textRememberer(element, saveAs);
});

Then(/^Remembered text as "([^"]*)" should be (different then|equal to) "([^"]*)"$/, (firstValue, expected, secondValue) => {
    return utils.textHelper(firstValue, expected, secondValue);
});