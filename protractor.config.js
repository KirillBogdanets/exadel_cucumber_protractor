'use strict';
const path = require("path");
const yargs = require("yargs").argv;
const reporter = require('cucumber-html-reporter');
const fs = require("fs");

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // directConnect: true,  
    baseUrl: 'https://exadel.com/',
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: false,
        maxInstances: 2,
        // chromeOptions: {
        //     args: ["--headless", "--window-size=1280x800"]
        // },
        version: "66.0.3359.139"
    },
    // multiCapabilities: [{
    //     browserName: 'chrome',
    //     version: "66.0.3359.139"
    // }, {
    //     browserName: 'firefox'
    // }],

    specs: [
        './features/**.feature'
    ],
    // restartBrowserBetweenTests: true,
    // onPrepare: function () {
        // browser.ignoreSynchronization = true;
        // browser.driver.manage().window().maximize(); 
    // },
    afterLaunch: function () {
        let options = {
            theme: 'bootstrap',
            jsonDir: './output',
            // jsonFile: './output/cucumber.json',
            output: './cucumber_report.html',
            reportSuiteAsScenarios: true,
            launchReport: true,
            metadata: {
                "Browser": "Chrome",
                "Platform": "Windows 10",
                "Parallel": "Scenarios",
                "Executed": "Remote"
            }
        };

        reporter.generate(options);
    },
    beforeLaunch: function () {
        const dir = path.resolve("./output/");
        console.log("Cleaning 'output' folder.");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        } else {
            fs.readdirSync(dir).forEach(file => fs.unlinkSync(path.resolve(dir + "/" + file)));
        }
    },
    cucumberOpts: {
        require: path.resolve('./step_definitions/**.js'),
        tags: [`${yargs.tag||"@smoke"}`],
        ignoreUncaughtExceptions: true,
        format: ['json:output/cucumber.json']
    },
    allScriptsTimeout: 200000,
    getPageTimeout: 100000,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework')
};