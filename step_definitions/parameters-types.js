const { defineParameterType } = require('cucumber');
const parser = require('./utils/poParser');
const MemoryObject = require('./memory/memory');

/** 
* @STRING_REGEXP 
* Regular expression for reading value inside the double quotes 
* double quotes are excluded from result 
* will work in case string contains more than one value inside the double quotes 
* 
* Examples: 
* 
* Code field "#form-question-code" is displayed 
* Preview table ".form-question-preview" with text "Question preview" is displayed 
*/
const STRING_REGEXP = /"([^"\\]*(\\.[^"\\]*)*)"/;

/** 
* Used for adding description to elements. 
*/
defineParameterType({
    regexp: /[^"]*/,
    name: 'detail',
    useForSnippets: false
});

/** 
* Used for CSS locators. 
* Json-nesting can be any. It depends on project needs. 
* But first parameter should obligatory be page name from page-enum.js. 
* Last parameter should obligatory be element name. 
* 
* @return {array|string} element
*/
defineParameterType({
    regexp: STRING_REGEXP,
    name: 'cssText',
    useForSnippets: true,
    transformer: async function (givenValue) {
        console.log(givenValue);
        const element = parser.parser(givenValue);
        return await element.getText();
    }
});

/** 
* Used for text values. 
* @return {string} 
*/
defineParameterType({
    regexp: STRING_REGEXP,
    name: 'text',
    useForSnippets: true,
    transformer: function (s) {
        return givenText.includes("$") ? MemoryObject.getter(s.replace("$", "")) : s;
    }
});