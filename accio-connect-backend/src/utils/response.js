const responseHandler = (req, res, next) => {
  res.success = (status, message, data = null) =>
    res.status(status).json({ success: true, message, data });

  res.err = (status, message, details = null) =>
    res.status(status).json({ success: false, message, details });

  next();
};

module.exports = responseHandler;
