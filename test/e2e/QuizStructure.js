/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

module.exports = {
  before(browser) {
    browser
      .url('http://localhost:4000/goodid')
      .waitForElementVisible('body', 1000);
  },
  'user sees applicant\'s name': function (browser) {
    const quizPage = browser.page.quizPage();
    const root = quizPage.section.root;
    root.assert.containsText('@name', 'NameOfTheApplicant');
  },
  'user sees valid number of questions': function (browser) {
    const quizPage = browser.page.quizPage();
    const root = quizPage.section.root;
    browser.elements('css selector', root.elements.question.selector, (result) => {
      browser.assert.equal(result.value.length, 2);
    });
  },
  'user sees which questions are saved and which are not': function (browser) {
    const quizPage = browser.page.quizPage();
    const firstQuestion = quizPage.section.firstQuestion;
    const secondQuestion = quizPage.section.secondQuestion;
    firstQuestion.assert.elementPresent('@indicator');
    secondQuestion.assert.elementNotPresent('@indicator');
  },
  'user have access to quiz controls in not submited quiz': function (browser) {
    const quizPage = browser.page.quizPage();
    const root = quizPage.section.root;
    root
    .assert.elementPresent('@saveAll')
    .assert.elementPresent('@submit');
  },
  after(browser) {
    browser.end();
  },
};

/* eslint-enable func-names, prefer-arrow-callback, no-unused-expressions */
