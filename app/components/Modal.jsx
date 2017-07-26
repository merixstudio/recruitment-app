import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';

import QuizStore from '../stores/QuizStore';
import UIStoreClass from '../stores/UIStore';

const Modal = ({ quizStore, UIStore }) => (
  <div className={`modal ${UIStore.isModalOpen ? '' : 'modal--hidden'}`} onClick={() => UIStore.toggleModal()}>
    <Card
      className="modal__card"
      containerStyle={{ display: 'flex', flexDirection: 'column', justifyAnswer: 'space-between', height: '100%' }}
      onClick={event => event.stopPropagation()}
    >
      <p className="modal__body">
        You will no longer be able to change your answers.
        Are you sure?
      </p>
      <div className="modal__footer">
        <RaisedButton label="No" className="modal__cancel" onClick={() => UIStore.toggleModal()} />
        <RaisedButton
          label="Yes"
          className="modal__confirm"
          onClick={() => {
            quizStore.submitQuiz();
            UIStore.toggleModal();
          }}
          primary
        />
      </div>
    </Card>
  </div>
);

Modal.propTypes = {
  quizStore: PropTypes.instanceOf(QuizStore).isRequired,
  UIStore: PropTypes.instanceOf(UIStoreClass).isRequired,
};

export default inject('quizStore', 'UIStore')(observer(Modal));
