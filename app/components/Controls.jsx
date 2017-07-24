import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import TestStore from '../stores/TestStore';
import UIStoreClass from '../stores/UIStore';

const Controls = ({ testStore, UIStore }) => (
  <div key="controls" className="app__controls">
    { !testStore.isSubmitted ?
    [
      <RaisedButton key="save" className="app__button" label="save all" onClick={() => testStore.saveQuestions()} />,
      <RaisedButton key="finish" className="app__button" label="finish" onClick={() => UIStore.toggleModal()} primary />,
    ] : null
    }
  </div>
);


Controls.propTypes = {
  testStore: PropTypes.instanceOf(TestStore).isRequired,
  UIStore: PropTypes.instanceOf(UIStoreClass).isRequired,

};

export default inject('testStore', 'UIStore')(observer(Controls));
