module.exports = {
  before(browser) {
    browser
      .url('http://localhost:4000/goodid')
      .waitForElementVisible('body', 1000);
  },
  'user should be asked for confirmation after trying to submit': function (browser) {
    const quizPage = browser.page.quizPage();
    const root = quizPage.section.root;

    root.click('@submit');
    root.expect.element('@modal').to.be.visible;
  },
  'user should be able to close modal by clicking at background': function (browser) {
    const quizPage = browser.page.quizPage();
    const root = quizPage.section.root;

    root.moveToElement('@modal', 20, 20);
    browser.mouseButtonClick(0);
    root.expect.element('@modal').to.be.not.visible;
  },
  'user should be able to close modal by clicking cancel button': function (browser) {
    const quizPage = browser.page.quizPage();
    const root = quizPage.section.root;
    const modal = quizPage.section.modal;

    root.click('@submit');
    modal.click('@cancel');
    root.expect.element('@modal').to.be.not.visible;
  },
  'user should confirm quiz submition': function (browser) {
    let quizPage = browser.page.quizPage();
    let root = quizPage.section.root;
    let modal = quizPage.section.modal;

    browser.execute(function () {
      window.fetchMock.put('end:quiz/goodid', { status: 200, body: {} });
    });
    root.click('@submit');
    modal.click('@confirm');
    browser.pause(200);

    root.expect.element('@modal').to.be.not.visible;
    root.expect.element('@submit').to.be.not.present;
    root.expect.element('@saveAll').to.be.not.present;

  },
  after(browser) {
    browser.end();
  }
};
