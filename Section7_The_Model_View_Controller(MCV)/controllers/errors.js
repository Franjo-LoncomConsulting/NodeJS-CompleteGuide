exports.get404 = (req, res, next) => {
  res.status(404).render("404", { docsTitle: "404", path: req.url });
};
