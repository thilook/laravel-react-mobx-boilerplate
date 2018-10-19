export default props => {
  const { condition, children } = props;
  if (condition) {
    return children;
  }
  return null;
};
