'use strict';

const world = require('../../po/world');

const parser = (element) => {
    let elementsArray = element.split(" > ");
    let finalElement;
    elementsArray.map(value => {
        if (finalElement === undefined) {
            finalElement = world[value];
        } else {
            finalElement = value.includes("#") ? 
            finalElement[value.substr(value.indexOf('of')+3)].get(parseFloat(value.match('\\d+')[0])-1) :
            finalElement = finalElement[value];
        }
    });
    return finalElement;
};

module.exports = {
  parser
};