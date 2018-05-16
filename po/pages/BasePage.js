'use strict';

const Header = require('../components/global/Header');
const Footer = require('../components/global/Footer');

class BasePage {
        constructor() {

                this.Header = new Header();
                this.Footer = new Footer();
        };
}

module.exports = BasePage;