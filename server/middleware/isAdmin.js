const isAdmin = (req, res, next) => {
  if (req.body.role === 1) {
    next();
  } else {
    res
      .status(401)
      .send({ errors: [{ msg: "You are not authorized, not an admin!!!" }] });
  }
};

module.exports = isAdmin;
