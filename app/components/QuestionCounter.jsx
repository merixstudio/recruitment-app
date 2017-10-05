import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

const QuestionCounter = ({ savedCount, allCount }) => (
  <div className={`app__done ${savedCount === allCount ? 'app__done--all' : ''}`}>
    {savedCount}/{allCount}
  </div>
);

QuestionCounter.propTypes = {
  savedCount: PropTypes.number.isRequired,
  allCount: PropTypes.number.isRequired,
};

export default observer(QuestionCounter);
