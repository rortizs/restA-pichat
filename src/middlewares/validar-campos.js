import { validationResult } from "express-validator";

const validarCampos = (req, res, next) => {
  const errors = validationResult(req, res);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = { validarCampos };
