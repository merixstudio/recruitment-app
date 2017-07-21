import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import TestStore from '../stores/TestStore';
import UIStore from '../stores/UIStore';

const Modal = ({ testStore, UIStore }) => (
  <div />
);

Modal.propTypes = {
  testStore: PropTypes.instanceOf(TestStore).isRequired,
  UIStore: PropTypes.instanceOf(UIStore).isRequired,

};

export default inject('testStore', 'UIStore')(observer(Modal));
