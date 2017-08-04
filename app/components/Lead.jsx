import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

const Lead = ({ applicant }) => (
  <div className="lead">
    <h2 className="lead__heading">
      Welcome, {applicant}
    </h2>
    <p className="lead__paragraph">
      Aenean eleifend tempor lacus, in cursus nunc hendrerit sit amet.
      Fusce sollicitudin augue sed maximus efficitur.
      Nunc sed sodales dolor, sit amet interdum lacus
      Sed scelerisque dolor pharetra dolor aliquet vulputate.
      Donec blandit at neque quis condimentum.
    </p>
  </div>
);

Lead.propTypes = {
  applicant: PropTypes.string.isRequired,
};

export default observer(Lead);
