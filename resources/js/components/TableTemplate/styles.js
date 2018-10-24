const style = {
  tableContainerStyle: {
    marginTop: 20,
  },
  headerButtons: {
    padding: 0,
    textAlign: 'left',
    textTransform: 'none',
    minWidth: 0,
  },
  buttonAddContainer: {
    textAlign: 'right',
  },
  addIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  footerContainer: {
    marginTop: 10,
    textAlign: 'center',
  },
  tableRow: {
    '&:hover': {
      backgroundColor: 'rgba(116,210,156,0.2)',
    },
    '&:last-child > td': {
      borderBottom: 0,
    },
  },
  // Pagination
};

export default style;
