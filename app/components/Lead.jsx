import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

const Lead = ({ applicant }) => (
  <div className="lead">
    <p className="lead__heading">Welcome, {applicant}</p>
    <p className="lead__paragraph">
      Aenean eleifend tempor lacus, in cursus nunc hendrerit sit amet.
      Fusce sollicitudin augue sed maximus efficitur.
      Nunc sed sodales dolor, sit amet interdum lacus
      Sed scelerisque dolor pharetra dolor aliquet vulputate.
      Donec blandit at neque quis condimentum. Aliquam erat volutpat.
      Nam sit amet condimentum arcu, rhoncus ultricies orci.
      Suspendisse sapien purus, sagittis in metus eu, semper varius nunc.
      In hac habitasse platea dictumst.
    </p>
  </div>
);

Lead.propTypes = {
  applicant: PropTypes.string.isRequired,
};

export default observer(Lead);
