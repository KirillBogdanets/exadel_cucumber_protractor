'use strict';

const expect = require('chai').expect;
const world = require('../../po/world');
const EC = protractor.ExpectedConditions;
const DEFAULT_STEP_TIMEOUT = 60 * 1000;
let MemoryObject = require('../memory/memory');
const parser = require('./poParser');

const inViewPortHelper = async (coordinates, shouldNotBe) => {
    const scrollTop = await browser.executeScript("return window.scrollY;");
    const innerHeight = await browser.executeScript("return window.innerHeight;");

    if (shouldNotBe) {
        if (coordinates.y >= scrollTop && coordinates.y < scrollTop + innerHeight) {
            throw new Error();
        }
    } else {
        if (!(coordinates.y >= scrollTop && coordinates.y < scrollTop + innerHeight)) {
            throw new Error();
        }
    }
};

const isInViewPort = async (element, shouldNotBe) => {
    const coordinates = await parser.parser(element).getLocation();

    return inViewPortHelper(coordinates, shouldNotBe);
};

const textHelper = (firstValue, expected, secondValue) => {
    switch (expected) {
        case "different then":
            return expect(MemoryObject.getter(firstValue), `${MemoryObject.getter(firstValue)} is equal to the ${MemoryObject.getter(secondValue)}`).to.not.equal(MemoryObject.getter(secondValue));
        case "equal to":
            return expect(MemoryObject.getter(firstValue), `${MemoryObject.getter(firstValue)} is not equal to the ${MemoryObject.getter(secondValue)}`).to.equal(MemoryObject.getter(secondValue));
    }
};

/**
* Returns expected condition by provided key
* @param element - element
* @param validation - key
* @param negate - negate flag
* @return {Condition}
*/
const ECHelper = (element, validation, negate) => {
    switch (validation) {
        case "present": return negate ? EC.not(EC.presenceOf(element)) : EC.presenceOf(element);
        case "clickable": return negate ? EC.not(EC.elementToBeClickable(element)) : EC.elementToBeClickable(element);
        case "visible": return negate ? EC.not(EC.visibilityOf(element)) : EC.visibilityOf(element);
        case "invisible": return negate ? EC.not(EC.invisibilityOf(element)) : EC.invisibilityOf(element);
        case "selected": return negate ? EC.not(EC.elementToBeSelected(element)) : EC.elementToBeSelected(element);
        case "gone": return negate ? EC.not(EC.stalenessOf(element)) : EC.stalenessOf(element);
        case "appear": return EC.presenceOf(element);
        case "disappear": return EC.stalenessOf(element);
        case "become visible": return EC.visibilityOf(element);
        case "become invisible": return EC.invisibilityOf(element);
        default: throw new Error("Wrong expected condition provided");
    }
};

const scrollToTheElementHelper = async (element) => {
    const location = await parser.parser(element).getLocation();

    return browser.executeScript(`window.scrollTo(0, "${location.y}");`);
};

const isTextsEquals = async (element, givenText, ignoringCase) => {
    const text = await parser.parser(element).getText();
    if (ignoringCase) {
        return givenText.includes("$") ?
            expect(text.toLowerCase()).to.equal(MemoryObject.getter(givenText.replace("$", "")).toLowerCase()) :
            expect(text.toLowerCase()).to.equal(givenText.toLowerCase());
    } else {
        return givenText.includes("$") ?
            expect(text.toLowerCase()).to.equal(MemoryObject.getter(givenText.replace("$", ""))) :
            expect(text).to.equal(givenText);
    }
};

const textRememberer = async (element, saveAs) => {
    const text = await parser.parser(element).getText();

    MemoryObject.setter(saveAs, text);
};

const collectionComparingTextsWorker = (array, givenText, expected) => {
    switch (expected) {
        case "equal to":
            return array.every(element => element === givenText);
        case "contain":
            return array.every(element => element.includes(givenText));
    }
};

module.exports = {
    isInViewPort,
    textHelper,
    ECHelper,
    scrollToTheElementHelper,
    isTextsEquals,
    textRememberer,
    collectionComparingTextsWorker
};