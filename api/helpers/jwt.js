import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const generateAccessToken = (req, res, next) => {
  req.body.emailToken = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
    expiresIn: "90000s",
  });
  next();
};

const generateNewPasswordToken = (req, res, next) => {
  req.token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
    expiresIn: "900s",
  });
  console.log(req.token, "req.token, dans jwt generateNewPasswordToken");
  next();
};

const passToken = (req, res, next) => {
  const accessToken = jwt.sign({}, process.env.SECRET_KEY, { expiresIn: "5d" });
  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
res.render("resetPassword", { token: req.token });
  // res.status(200).json(req.body.message);
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


/* Vérifie si l'utilisateur est Admin */
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin === 1) {
      next();
    } else {
      return next(
        createError(403, "Vous n'êtes pas autoriser à effectuer cette action.")
      );
    }
  });
};

/* Vérifie si l'utilisateur est bien associé au info du Token */
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.idUser === req.params.id || req.user.isAdmin === 1) {
      next();
    } else {
      return next(
        createError(401, "Vous n'êtes pas autoriser à effectuer cette action.")
      );
    }
  });
};

export {
  generateAccessToken,
  verifyToken,
  passToken,
  generateNewPasswordToken,
};
