import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import QuizStore from '../stores/QuizStore';
import UIStoreClass from '../stores/UIStore';

const Controls = ({ quizStore, UIStore }) => (
  <div key="controls" className="app__controls">
    { !quizStore.isSubmitted ?
    [
      <button key="save" className="app__button" onClick={() => quizStore.saveQuestions()} >Save All</button>,
      <button key="finish" className="app__button app__button--primary" onClick={() => UIStore.toggleModal()}>Finish</button>,
    ] : null
    }
  </div>
);


Controls.propTypes = {
  quizStore: PropTypes.instanceOf(QuizStore).isRequired,
  UIStore: PropTypes.instanceOf(UIStoreClass).isRequired,

};

export default inject('quizStore', 'UIStore')(observer(Controls));
