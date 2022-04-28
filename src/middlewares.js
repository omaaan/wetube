import res from "express/lib/response";

export const localsMiddelware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggenInUser = req.session.user;
  next();
};
