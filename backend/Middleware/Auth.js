const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  //“Take the JWT token that the user sent inside the request header named ‘authorization’.” , Takes the token sent by the frontend
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      message: "Unauthorized ,Jwt token is required ",
    });
  }
  try {
    //Checks if the token is real, not fake, and not expired
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    //Saves the user info in the request, so next route knows who the user is
    req.existUser = decoded;
    //Moves to the next step if token is valid
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Unauthorized ,Jwt token wrong or expired",
    });
  }
};

module.exports = ensureAuthenticated;

//When user logs in, backend creates a JWT token.

//Frontend stores the token and sends it with each request.

//auth.js middleware verifies that token before giving access to private routes.

//If the token is real → user is allowed in; if fake or expired → user is blocked.
