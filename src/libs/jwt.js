import req from "express/lib/request";
import jwt from "jsonwebtoken";

export const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          //error create token
          reject("Not created token");
        } else {
          //created token
          resolve(token);
        }
      }
    );
  });
};

const verificarJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    return [true, uid];
  } catch {
    return [false, null];
  }
};

module.exports = {
  generarJWT,
  verificarJWT,
};
