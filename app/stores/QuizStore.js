import {
  action,
  observable,
} from 'mobx';
import {
  fetchQuiz,
  submitQuiz,
  saveQuestions,
  saveQuestion,
} from './quizActions';

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
