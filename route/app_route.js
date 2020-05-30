const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  createComp,
  history,
  resign,
  companies,
  compdash,
  joincomp,
} = require("../controller/app_controller");
const authenticate = require("../middleware/auth");
const Employee = require("../model/employee_model");
const Detail = require("../model/all_details");
// const Company = require("../model/company_model");

router.get("/", (req, res) => {
  if (req.session.userId) {
    res.render("home", {
      userId: req.session.userId,
      title: "E&C.co.in",
    });
  } else {
    res.render("home", { title: "E&C.co.in" });
  }
});

router.get("/home", authenticate, async (req, res) => {
  const user = await Employee.findById(req.session.userId);
  if (user.working == false) {
    res.render("dashboard", {
      userId: req.session.userId,
      free: true,
      title: "Home",
    });
  } else {
    const details = await Detail.find({ _id: user.cur_company }).populate(
      "company"
    );
    res.render("dashboard", {
      name: details[0].company.name,
      role: details[0].role,
      joiningdate: details[0].joiningdate,
      userId: req.session.userId,
      free: false,
      id: details[0].company._id,
      title: "Home",
    });
  }
});
router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});
router.post("/register", registerUser);

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});
router.get("/newcompany", authenticate, async (req, res) => {
  const user = await Employee.findById(req.session.userId);
  if (user.working == true) {
    res.redirect("/home");
  } else {
    res.render("create", {
      userId: req.session.userId,
      title: "New Company",
    });
  }
});
router.get("/history", authenticate, history);
router.get("/allcomp", authenticate, companies);
router.get("/compdash/:id", authenticate, compdash);
router.post("/login", loginUser);
router.post("/newcomp", authenticate, createComp);
router.post("/join/:id", authenticate, joincomp);
router.delete("/logout", authenticate, logOutUser);
router.delete("/resign/:id", authenticate, resign);

module.exports = router;
