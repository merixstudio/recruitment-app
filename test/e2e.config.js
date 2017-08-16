import fetchMock from 'fetch-mock';

window.fetchMock = fetchMock;

const quizMock = {
  id: 'goodid',
  is_finished: false,
  applicant: 'NameOfTheApplicant',
  questions: [
    {
      id: 1,
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae orci at elit dapibus accumsan facilisis sit amet velit. Nullam aliquam tortor et urna egestas imperdiet.',
      answer: 'function (a) {\nconsole.log(a);\n}',
      default_answer: 'function () {\n\n}',
      language: 'javascript',
    },
    {
      id: 2,
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae orci at elit dapibus accumsan facilisis sit amet velit. Nullam aliquam tortor et urna egestas imperdiet.',
      answer: 'Nullam aliquam tortor et urna egestas imperdiet...',
      default_answer: 'Nullam aliquam tortor et urna egestas imperdiet...',
      language: 'english',
    },
  ],
};

const delay = new Promise((resolve) => {
  setTimeout(() => resolve({ status: 200, body: { ...quizMock } }), 10000);
});

fetchMock.get('end:quiz/goodid', { status: 200, body: { ...quizMock } }, {});
fetchMock.get('end:quiz/submittedid', { status: 200, body: { ...quizMock, is_finished: true } }, {});

fetchMock.get('end:quiz/longLoading', delay);

fetchMock.get('end:quiz/wrongid', { status: 404 });
