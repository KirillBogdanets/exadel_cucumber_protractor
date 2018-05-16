'use strict';

const HomePage = require('./pages/HomePage');
// const baseUrl = browser.baseUrl;

class World {
	constructor (){
		this.HomePage = new HomePage();

		this.HomeUrl = `^${browser.baseUrl}$`;
	}
}

module.exports = new World();