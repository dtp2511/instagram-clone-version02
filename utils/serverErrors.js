exports.showErrorResponse = (res, http, message = 'Server Error !') => {
  return res.status(http).json({ errors: [{ msg: message }] });
};
