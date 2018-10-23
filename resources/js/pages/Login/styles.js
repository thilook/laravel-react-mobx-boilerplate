const styles = theme => ({
  alignRight: {
    textAlign: 'right',
  },
  alignLeft: {
    textAlign: 'left',
  },
  btnForget: {
    padding: 0,
    textTransform: 'none',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  innerGrid: {
    height: window.innerHeight,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 6,
    height: '100%',
    width: '100%',
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
});

export default styles;
