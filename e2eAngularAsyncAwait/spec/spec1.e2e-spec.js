var PageObjectValues = require('../page-object.js');
var validator = require('../json-validator.js');
var pageObject = new PageObjectValues();

describe('search tests', function () {
    beforeEach(async function () {
        await  browser.get('http://www.angular.io/docs');
        await browser.driver.manage().window().maximize();
    });

    //Проверка вставки в поле поиска
    xit('checks the pasting into search field', async function () {
        await browser
            .actions()
            .mouseMove(pageObject.title, {x: 0, y: 0})
            .mouseDown()
            .mouseMove(pageObject.title, {x: 200, y: 0})
            .mouseUp().keyDown(protractor.Key.CONTROL)
            .sendKeys('c')
            .perform();
        await browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('c').perform();
        await pageObject.search.click();
        await browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('v').perform();
        expect(await pageObject.searchValueAttr).toEqual('What is Angular?');
    });

    //Проверка ввода в поле поиска
    it('checks the input into search field', async function () {
        await pageObject.search.click().sendKeys("");
        await pageObject.search.sendKeys("Search");
        expect(await pageObject.searchValueAttr).toEqual('Search');
    });

    //Проверка работы поиска
    it('checks search', async function () {
        await pageObject.search.sendKeys("Assumptions");
        expect(await pageObject.searchResultsAttr.isDisplayed()).toBeTruthy();
    });

    //Проверка того, что после клика по другим элементам страницы, поле поиска не очищается
    it('checks that search field save text after click on anther element of page', async function () {
        await pageObject.search.sendKeys("Some text");
        await pageObject.leftMenuItemLevel1.click();
        expect(await pageObject.searchValueAttr).toEqual('Some text');
    });
});

describe('angular.io/docs tests', function () {
    beforeEach(async function () {
        await browser.get('http://www.angular.io/docs');
        await browser.driver.manage().window().maximize();
    });

    //Проверяет, что при наведении на заголовок, элемент "link to this heading" становится видимым
    it('checks that after mouse over on title, element "link to this heading" is visible', async function () {
        await browser.actions().mouseMove(pageObject.title).perform();
        expect(await pageObject.linkToHeading.isDisplayed()).toBeTruthy();
    });
    //Проверка работы кнопки закрывающей боковое меню(закрытие меню)
    xit('checks that docs menu button close left menu (closing)', async function () {
        await pageObject.leftMenuButton.click();
        expect(await pageObject.leftMenu.isDisplayed()).toBeFalsy();
    });

    //Проверяет соответсвия текста заголовка ожидаемому
    it('checks the title', async function () {
        expect(await pageObject.title.getText()).toEqual('What is Angular?');
    });

    //Проверка того, что боковое меню не отображается при уменьшении размеров окна браузера
    it('left menu is not displaying when window size is decreasing', async function () {
        await browser.driver.manage().window().setSize(1000, 1000);
        expect(await pageObject.leftMenu.isDisplayed()).toBeFalsy();
    });

    //Проверка работы кнопки закрывающей боковое меню(открытие меню)
    it('checks that docs menu button close left menu (opening)', async function () {
        await pageObject.leftMenuButton.click().click();
        expect(await pageObject.leftMenu.isDisplayed()).toBeTruthy();
    });

    //Проверка работы бокового меню
    it('checks the condition of the left menu by menu items of level-1 and level-2 deployment', async function () {
        await pageObject.leftMenuItemLevel1.click();
        await pageObject.leftMenuItemLevel2.click();
        await pageObject.leftMenuItemLevel1.click().click();
        expect(await pageObject.leftMenuGroupOfItemsLevel3.isDisplayed()).toBeFalsy();
    });

    // Проверка работы пункта меню
    it('checks that menu item works correctly', async function () {
        await pageObject.mainMenuItem.click();
        expect(browser.getCurrentUrl()).toEqual('https://angular.io/events');
    });

    //Проверка работы клика по элементу "link to this heading"
    it('checks that click on element "link to this heading" works correctly', async function () {
        expect(await pageObject.linkToHeadingHrefAttr).toEqual('https://angular.io/docs#what-is-angular');
    });

    //Проверка работы элемента 'Home' (переход на главную страницу)
    it('checks that Home button works correctly', async function () {
        await pageObject.home.click();
        expect(await browser.getCurrentUrl()).toEqual('https://angular.io/');
    });

    //Отображение китайской версии страницы
    it('Chinese version link', async function () {
        expect(await pageObject.linkChineseVersionHrefAttr).toEqual('https://angular.cn/');
    });

    it('JSON validator', function () {
        var schema = require('../schema.json');
        var json = require('../package.json');
        validator.validateJSON(schema, json);
    });
});