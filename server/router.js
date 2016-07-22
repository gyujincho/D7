import express from "express";
const router = express.Router();

/* Load api Handler Methods */
import api from "./api";
var { handler, fetchUser, fetchAllProjects, fetchOngoingProjects, fetchRecommendedProjects, fetchWishProjects, fetchProjectDetail, fetchRecentPosts, fetchPopularPosts, fetchUserProjectDetail, createNewProject, createNewUserProject, record, like, report, wish, user, payment, paymentCancel } = api;


/* Authentication checking middleware */
const isAuthenticated = (req, res, next) => {
  if (req.user){
    console.log(">>>>>>>>>>>>",req.user);
    return next();
  } else {
    // res.redirect("/");
    res.status(401).json({path: "/"});
  }
};

/* Passport import */
import passport from "passport";
import LocalStrategy from "passport-local";
import model from "./db/models";
import bcrypt from "bcryptjs";


/* Passport Strategies */
import localSetup from "./helpers/passport_setup/local";


/* Passport local setting */
localSetup();


/* Passport Facebook setting */
// some code


/* Passport Google setting */
// some code


/* Passport Authentication APIs */
import login from "./api/auth/login";
import signup from "./api/auth/signup";
import logout from "./api/auth/logout";
import checkLogin from "./api/auth/checkLogin";

router.post("/api/signup", signup());
router.post("/api/login", login());
router.get("/api/logout", isAuthenticated, logout());
router.get("/api/checklogin", checkLogin());


/* Data save/fetch APIs */
router.get("/api/user", isAuthenticated, handler(fetchUser));
router.get("/api/posts/popular", isAuthenticated, handler(fetchPopularPosts));
router.get("/api/posts/recent", isAuthenticated, handler(fetchRecentPosts));
router.get("/api/userproject", isAuthenticated, handler(fetchUserProjectDetail));
router.get("/api/projects/all", isAuthenticated, handler(fetchAllProjects));
router.get("/api/projects/ongoing", isAuthenticated, handler(fetchOngoingProjects));
router.get("/api/projects/recommended", isAuthenticated, handler(fetchRecommendedProjects));
router.get("/api/projects/wish", isAuthenticated, handler(fetchWishProjects));
router.get("/api/project", isAuthenticated, handler(fetchProjectDetail));

router.post("/api/record", isAuthenticated, handler(record));
router.post("/api/newproject", isAuthenticated, handler(createNewProject));
router.post("/api/newuserproject", isAuthenticated, handler(createNewUserProject));
router.post("/api/like", isAuthenticated, handler(like));
router.post("/api/report", isAuthenticated, handler(report));
router.post("/api/wish", isAuthenticated, handler(wish));
router.post("/api/user", isAuthenticated, handler(user));

router.post("/api/payment", isAuthenticated, handler(payment));
router.post("/api/paymentcancel", isAuthenticated, handler(paymentCancel));

/* Rest */
router.get("*", (req, res, next) => {
  res.redirect("/");
});

export default router;
