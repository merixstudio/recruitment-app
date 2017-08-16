/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

module.exports = {
  'user loads quiz with valid id passed': function (browser) {
    const quizPage = browser.page.quizPage();
    const root = quizPage.section.root;

    browser
      .url('http://localhost:4000/goodid')
      .waitForElementVisible('body', 1000);

    root.assert.visible('@name');
    browser.end();
  },
  'user is loading quiz which takes a lot time to laod': function (browser) {
    const quizPage = browser.page.quizPage();
    const root = quizPage.section.root;

    browser
      .url('http://localhost:4000/longLoading')
      .waitForElementVisible('body', 500);

    root.assert.visible('@loading');
    browser.end();
  },
  'user passed wrong quiz id': function (browser) {
    const quizPage = browser.page.quizPage();
    const root = quizPage.section.root;

    browser
      .url('http://localhost:4000/wrongid')
      .waitForElementVisible('body', 500);

    root.assert.visible('@error');
    browser.end();
  },
};

/* eslint-enable func-names, prefer-arrow-callback, no-unused-expressions */
