module.exports = async (page, scenario) => {
    const hoverSelector = scenario.hoverSelectors || scenario.hoverSelector;
    const clickSelector = scenario.clickSelector;
    const keyPressSelector = scenario.keyPressSelectors || scenario.keyPressSelector;
    const scrollToSelector = scenario.scrollToSelector;
    const postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]

    if (keyPressSelector) {
        for (const keyPressSelectorItem of [].concat(keyPressSelector)) {
            await page.waitFor(keyPressSelectorItem.selector);
            await page.type(keyPressSelectorItem.selector, keyPressSelectorItem.keyPress);
        }
    }

    if (hoverSelector) {
        for (const hoverSelectorIndex of [].concat(hoverSelector)) {
            await page.waitFor(hoverSelectorIndex);
            await page.hover(hoverSelectorIndex);
        }
    }

    if (clickSelector) {
        for (let clickSelectorIndex of clickSelector.split(',')) {
            let inputData = clickSelectorIndex.split('{:}'),
                inputValue;

            if (inputData.length > 1) {
                clickSelectorIndex = inputData[0];
                inputValue = inputData[1]
            }
            await page.waitFor(clickSelectorIndex);
            await page.click(clickSelectorIndex);
            if (inputValue) {
                await page.keyboard.type(inputValue)
            }

        }
    }

    if (postInteractionWait) {
        await page.waitFor(postInteractionWait);
    }

    if (scrollToSelector) {
        await page.waitFor(scrollToSelector);
        await page.evaluate(scrollToSelector => {
            document.querySelector(scrollToSelector).scrollIntoView();
        }, scrollToSelector);
    }
};