module.exports = {
  'step one': function (browser) {
    browser
      .url('http://localhost:4000/7YsghZkYCWEgyjF9vsHPnA')
      .execute(function () {
        console.log(a.toString());
      })
      .waitForElementVisible('body', 1000)
      .assert.visible('.lead__heading')
      .end();
  },
};
