const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECURE_ACCESS =
  process.env.SECURE_ACCESS || "VITARAN324LIVE@03!10!202201";
const SECURE_REFRESH =
  process.env.SECURE_REFRESH || "VITARAN324LIVE@03!10!202202";

  
const VerifyToken = (req, res, next) => {

  const authHeader = req.get("Authorization");
  
  const token = authHeader.slice(7);
  console.log("token", token);
  
  jwt.verify(token, SECURE_ACCESS, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    } //invalid token
    console.log("decoded", decoded);
    req.decoded = decoded;
    next();
  });
};

const NewAccessToken = (req, res) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.json({
      code: 400,
      message: "Token error",
    });
  }
//   console.log(authHeader, refreshToken, "nwwwwtoken");
  let refreshToken = authHeader?.slice(7); //

  jwt.verify(refreshToken, SECURE_REFRESH, (err, decoded) => {
    console.log("NewAccessToken", err);
    console.log(decoded, "decoded?.User")
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        User: decoded,
      },
      SECURE_ACCESS,
      { expiresIn: "1d" }
    );
    res.json({
      code: 200,
      message: "success",
      access_token: accessToken,
      user_data: decoded,
    });
  });
};

module.exports = { VerifyToken, NewAccessToken };
