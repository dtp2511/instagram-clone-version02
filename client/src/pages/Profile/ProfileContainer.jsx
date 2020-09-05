import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux;';

const mapStateToProps = state => ({
  isResolved: state.userDetailed.isResolve,
});

export default compose(connect(mapStateToProps))(ProfileContainer);
