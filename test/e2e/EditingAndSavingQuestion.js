module.exports = {
  before(browser) {
    browser
      .url('http://localhost:4000/goodid')
      .waitForElementVisible('body', 1000);
  },

  'user is able to edit question content': function (browser) {
    const quizPage = browser.page.quizPage();
    const firstQuestion = quizPage.section.firstQuestion;

    firstQuestion.moveToElement('@editor', 46, 5);
    browser.mouseButtonClick(0).keys('const a = ');
    firstQuestion.expect.element('@firstLine').text.to.equal('const a = function (a) {');
  },
  'user sees saving indicator when editor is blured': function (browser) {
    const quizPage = browser.page.quizPage();
    const firstQuestion = quizPage.section.firstQuestion;

    browser
      .execute(function () {
        const delay = new Promise((resolve) => {
          setTimeout(() => resolve({ status: 200, body: {} }), 500);
        });
        window.fetchMock.patch('end:answer/1?quiz_id=goodid', delay);
      })
      .moveToElement('body', 0, 0)
      .mouseButtonClick(0);

    firstQuestion.expect.element('@indicator').to.be.visible;
    firstQuestion.expect.element('@indicator').text.to.match(/saving/i);
  },
  'user sees saved indicator after question is save on server': function (browser) {
    const quizPage = browser.page.quizPage();
    const firstQuestion = quizPage.section.firstQuestion;
    browser.pause(500);
    firstQuestion.expect.element('@indicator').to.be.visible;
    firstQuestion.expect.element('@indicator').text.to.match(/saved/i);
  },
  'user gets tooltip about reset button after hovering on it': function (browser) {
    const quizPage = browser.page.quizPage();
    const firstQuestion = quizPage.section.firstQuestion;

    firstQuestion.expect.element('@resetInfo').to.not.be.visible;
    firstQuestion.moveToElement('@reset', 2, 3);
    firstQuestion.expect.element('@resetInfo').to.be.visible;
  },
  'user is able to reset question content to default': function (browser) {
    const quizPage = browser.page.quizPage();
    const firstQuestion = quizPage.section.firstQuestion;

    browser.mouseButtonClick(0);
    firstQuestion.expect.element('@reset').to.not.be.present;
    firstQuestion.expect.element('@firstLine').text.to.equal('function () {');
  },
  'user is able to save question content using shortcut': function (browser) {
    const quizPage = browser.page.quizPage();
    const firstQuestion = quizPage.section.firstQuestion;

    firstQuestion.moveToElement('@editor', 46, 40);
    browser
      .mouseButtonClick(0)
      .keys('\tconst b = a;')
      .keys([browser.Keys.CONTROL, "s"])
      .pause(500);

    firstQuestion.expect.element('@indicator').text.to.match(/saved/i);
  },
  'user should see editor in correct size': function (browser) {
    const quizPage = browser.page.quizPage();
    const firstQuestion = quizPage.section.firstQuestion;

    firstQuestion.expect.element('@scroll').to.not.be.visible;
    firstQuestion.moveToElement('@editor', 46, 40);
    browser
      .mouseButtonClick(0)
      .keys('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')

      firstQuestion.expect.element('@scroll').to.be.visible;
      firstQuestion.expect.element('@editor').to.have.css('height').which.equals('350px');
  },
  after(browser) {
    browser.end();
  },
};
