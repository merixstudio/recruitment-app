import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
/* eslint-disable max-len */

const Lead = ({ applicant }) => (
  <div className="lead">
    <h2 className="lead__heading">
      Hello, {applicant}
    </h2>
    <p className="lead__paragraph">
      Time has come for us to meet. You probably already know that work culture at our company is a huge deal for us. But that’s not all - you should be not only a team player but also one of the most valuable players who will bring to Merixstudio the experience and knowledge. This is why we have the following test for you. Please, fill it in, and we will see if we’re the right match. Good luck!
    </p>
  </div>
);
/* eslint-nable max-len */

Lead.propTypes = {
  applicant: PropTypes.string,
};

Lead.defaultProps = {
  applicant: 'Unknown',
};

export default observer(Lead);
