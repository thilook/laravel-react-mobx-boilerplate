const style = theme => ({
  avatarStyle: {
    marginLeft: 15,
    marginRight: 10,
    width: 30,
    height: 30,
  },
  popOverContainer: {
    width: '100%',
    minWidth: 350,
    backgroundColor: theme.palette.background.paper,
  },
  imageAvatar: {
    width: 90,
    height: 90,
    marginRight: 15,
  },
  btnSettings: {
    marginBottom: 15,
    marginTop: 15,
    textTransform: 'none',
  },
  listSignout: {
    justifyContent: 'flex-end',
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 90,
    height: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  },
});

export default style;
