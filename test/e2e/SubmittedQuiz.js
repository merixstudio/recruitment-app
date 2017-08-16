module.exports = {
  before(browser) {
    browser
      .url('http://localhost:4000/submittedid')
      .waitForElementVisible('body', 1000);
  },
  'user should not be able to edit questions': function (browser) {
    const quizPage = browser.page.quizPage();
    const firstQuestion = quizPage.section.firstQuestion;

    firstQuestion.moveToElement('@editor', 46, 5);
    browser.mouseButtonClick(0).keys('const a = ');
    firstQuestion.expect.element('@firstLine').text.to.equal('function (a) {');
  },
  'user should not be able to reset questions to default': function (browser) {
    const quizPage = browser.page.quizPage();
    const firstQuestion = quizPage.section.firstQuestion;
    const secondQuestion = quizPage.section.secondQuestion;

    firstQuestion.expect.element('@reset').to.not.be.present;
    secondQuestion.expect.element('@reset').to.not.be.present;

  },
  'user should not be able to submit quiz again': function (browser) {
    const quizPage = browser.page.quizPage();
    const root = quizPage.section.root;
    root.expect.element('@submit').to.not.be.present;
    root.expect.element('@saveAll').to.not.be.present;
  },

  after(browser) {
    browser.end();
  }
};
