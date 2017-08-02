import {
  action,
  observable,
} from 'mobx';
import actions from './quizActions';

const {
  fetchQuiz,
  submitQuiz,
  saveQuestions,
  saveQuestion,
} = actions;

export default class Quiz {
  candidateId = null;
  @observable applicant = null;
  @observable questions = [];
  @observable isFetching = false;
  @observable hasFailedToLoad = false;
  @observable isSubmitting = false;
  @observable submitionDate = null;
  @observable isSubmitted = false;


  fetchQuiz = action(fetchQuiz);
  submitQuiz = action(submitQuiz);
  saveQuestions = action(saveQuestions);
  saveQuestion = action(saveQuestion);
}
