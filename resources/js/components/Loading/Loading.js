import React from 'react';
import { CircularProgress } from '@material-ui/core';

const styles = {
  divStyle: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  circularStyle: {
    margin: '0 auto',
  }
};

export default (props) => {
  const { size, thickness} = props;
  return (
    <div style={styles.divStyle}>
      <CircularProgress
        style={styles.circularStyle}
        size={50 || size}
        thickness={5 || thickness}
      />
    </div>
  );
}
