const styles = theme => ({
  content: {
    flexGrow: 1,
    overflowX: 'auto',
    padding: theme.spacing.unit * 6,
    paddingTop: theme.spacing.unit * 12,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: theme.spacing.unit * 7,
  },
  'content-right': {
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 240,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

export default styles;
