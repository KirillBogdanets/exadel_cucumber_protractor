'use strict';

class Footer {
        constructor() {

                this.Footer = element(by.css("footer#main-footer"));

                this.Solutions = this.Footer.element(by.css('#menu-item-176024'));
                this.OurWork = this.Footer.element(by.css('#menu-item-176030'));
                this.About = this.Footer.element(by.css('#menu-item-176037'));
                this.News = this.Footer.element(by.css('#menu-item-179671'));

                this.SolutionsItems = this.Solutions.$$('.sub-menu li[id*="menu-item"]');
                this.OurWorkItems = this.OurWork.$$('.sub-menu li[id*="menu-item"]');
                this.AboutItems = this.About.$$('.sub-menu li[id*="menu-item"]');
                this.NewsItems = this.News.$$('.sub-menu li[id*="menu-item"]');
        };
}

module.exports = Footer;