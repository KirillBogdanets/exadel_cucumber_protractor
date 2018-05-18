'use strict';

const expect = require('chai').expect;
const world = require('../po/world');
const utils = require("./utils/utils");
const EC = protractor.ExpectedConditions;
let { Then, When, Given } = require('cucumber');
const DEFAULT_STEP_TIMEOUT = 60 * 1000;
const parser = require('./utils/poParser');
let MemoryObject = require('./memory/memory');

Given(/^I should be on "(.+)" page$/, async (pageName) => {
    browser.ignoreSynchronization = true;
    return expect(await browser.getCurrentUrl()).to.match(new RegExp(world[`${pageName}Url`]));
});

Then(/^(Element|Collection) "([^"]*)" should (not )?be (present|clickable|visible|invisible|selected|gone)$/, async (elementOrCollection, alias, negate, validation) => {
    const element = parser.parser(alias);
    const CUSTOM_TIMEOUT = 15 * 1000;

    if (elementOrCollection === "Collection") {
        await element.each(elem => {
            return browser.wait(utils.ECHelper(elem, validation, negate), CUSTOM_TIMEOUT, `${elementOrCollection} ${alias} is${negate ? "" : " not"} ${validation}`);
        });
    } else {
        return await browser.wait(utils.ECHelper(element, validation, negate), CUSTOM_TIMEOUT, `${elementOrCollection} ${alias} is${negate ? "" : " not"} ${validation}`);
    }
});

Then(/^"([^"]*)" element should( not)? be in viewport$/, (element, shouldNotBe) => {
    return utils.isInViewPort(element, shouldNotBe);
});

Then(/^Text of "([^"]*)" element should be equal to "([^"]*)"( ignoring case)?$/, (element, givenText, ignoringCase) => {
    return utils.isTextsEquals(element, givenText, ignoringCase);
});

Then(/^I wait until "([^"]*)" element is visible$/, (element) => {
    return utils.visibilityOf(element);
});

Then(/^Page URL should contain "([^"]*)"$/, async (givenUrl) => {
    const url = await browser.getCurrentUrl();

    return expect(url).to.include(givenUrl);
});

When(/^Page title should be equal "([^"]*)"$/, async (givenTitle) => {
    const title = await browser.getTitle();

    return expect(title).to.be.equal(givenTitle);
});

Then(/^Count of "([^"]*)" elements should be equal "([^"]*)"$/, async (elements, count) => {
    const arraysSize = await parser.parser(elements).count();

    return expect(arraysSize, `${elements} size (${arraysSize}) is different then given count (${count})`).to.be.equal(parseInt(count));
});

Then(/^Value of "([^"]*)" element should be equal to "([^"]*)"( ignoring case)?$/, async (element, givenText, ignoringCase) => {
    const value = await parser.parser(element).getAttribute('value');

    return ignoringCase ?
        expect(value.toLowerCase()).to.equal(givenText.toLowerCase()) :
        expect(value).to.equal(givenText);
});

Then(/^Each element of "([^"]*)" collection should (be equal|contain) "([^"]*)" text( ignoring case)?$/, async (elements, expected, givenText, ignoringCase) => {
    const texts = await parser.parser(elements).getText();

    if (ignoringCase) {
        return givenText.includes("$") ?
            expect(utils.collectionComparingTextsWorker(texts, MemoryObject.getter(givenText.replace("$", "")).toUpperCase(), expected), `Not every element from ${texts} collection ${expected} ${givenText}`).to.be.true :
            expect(utils.collectionComparingTextsWorker(texts, givenText.toUpperCase(), expected), `Not every element from ${texts} collection ${expected} ${givenText}`).to.be.true;
    }
    return givenText.includes("$") ?
        expect(utils.collectionComparingTextsWorker(texts, MemoryObject.getter(givenText.replace("$", "")), expected), `Not every element from ${texts} collection ${expected} ${MemoryObject.getter(givenText.replace("$", ""))}`).to.be.true :
        expect(utils.collectionComparingTextsWorker(texts, givenText, expected), `Not every element from ${texts} collection ${expected} ${givenText}`).to.be.true;
});