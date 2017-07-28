import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import QuizStore from '../stores/QuizStore';
import UIStoreClass from '../stores/UIStore';

const Controls = ({ quizStore, UIStore }) => (
  <div key="controls" className="app__controls">
    { !quizStore.isSubmitted ?
    [
      <RaisedButton key="save" className="app__button" label="save all" onClick={() => quizStore.saveQuestions()} />,
      <RaisedButton key="finish" className="app__button" label="finish" onClick={() => UIStore.toggleModal()} primary />,
    ] : null
    }
  </div>
);


Controls.propTypes = {
  quizStore: PropTypes.instanceOf(QuizStore).isRequired,
  UIStore: PropTypes.instanceOf(UIStoreClass).isRequired,

};

export default inject('quizStore', 'UIStore')(observer(Controls));
