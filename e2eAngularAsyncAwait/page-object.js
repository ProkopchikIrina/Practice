class PageObject {
    get title() {
        return element(by.css('#what-is-angular'));
    }

    get search() {
        return element(by.css('.search-container input'));
    }

    get leftMenuButton() {
        return element(by.css('.hamburger.mat-button'));
    }

    get leftMenu() {
        return element(by.css('.sidenav.mat-drawer'));
    }

    get home() {
        return element(by.css('.nav-link.home'));
    }

    get leftMenuItemLevel1() {
        return element(by.css('[title="The fundamentals of Angular"]'));
    }

    get leftMenuItemLevel2() {
        return element(by.css('[title="The basic building blocks of Angular applications."]'));
    }

    get leftMenuGroupOfItemsLevel3() {
        return element(by.css('.heading-children.level-2'));
    }

    get mainMenuItem() {
        return element(by.css('[href="events"]'));
    }

    get linkChineseVersion() {
        return element(by.css('.link[title="中文版"]'));
    }

    get mainMenuGroupOfItemsLevel1() {
        return element(by.css('ul [role="navigation"]'));
    }

    get linkToHeading() {
        return element(by.css('.header-link'));
    }
}

class PageObjectValues extends PageObject  {
    get linkChineseVersionHrefAttr() {
        return this.getElementAttributeValue(super.linkChineseVersion,'href');
    }

    get linkToHeadingHrefAttr() {
        return this.getElementAttributeValue(super.linkToHeading,'href')
    }

    get searchValueAttr() {
        return this.getElementAttributeValue(super.search,'value')
    }

    get searchResultsAttr() {
        return this.getElementAttributeValue(super.search,'.search-results')
    }

    getElementAttributeValue(element,attr){
        return element.getAttribute(attr);
    }
}
module.exports = PageObjectValues;