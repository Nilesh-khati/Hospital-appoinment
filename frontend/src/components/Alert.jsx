function Alert({ type = "info", message }) {
  if (!message) return null;
  const classes = `alert alert-${type} rounded-pill`;
  return <div className={classes}>{message}</div>;
}

export default Alert;
