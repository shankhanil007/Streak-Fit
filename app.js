var path = require("path");
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();

app.use(express.static("public"));

//------------- Initialising passport ----------------

app.use(
  require("express-session")({
    secret: "This the secret message for authentication",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//------------------------   Authentication Routes  -------------------------

app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/signup", function (req, res) {
  res.render("signup");
});

app.post("/signup", function (req, res) {
  User.register(
    new User({
      username: req.body.username,
      name: req.body.name,
      phone: req.body.phone,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/" + req.user._id + "/streak");
      });
    }
  );
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/" + req.user._id + "/streak");
  }
);
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// ------------------------ Authentication Ends ------------------------------

// Landing page
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/:id/streak", isLoggedIn, (req, res) => {
  User.findById(req.params.id, function (err, details) {
    if (err) console.log(err);
    else {
      res.render("streak", {
        name: details.name,
        streak: details.streak,
        points: details.points,
        ranking: details.ranking,
      });
    }
  });
});

app.get("/:id/compete", isLoggedIn, function (req, res) {
  User.findById(req.params.id, function (err, details) {
    if (err) console.log(err);
    else {
      res.render("compete", {
        call: call,
      });
    }
  });
});

app.get("/:id/yoga", isLoggedIn, function (req, res) {
  User.findById(req.params.id, function (err, details) {
    if (err) console.log(err);
    else {
      res.render("yoga", {
        call: call,
      });
    }
  });
});

app.get("/:id/leaderboard", function (req, res) {
  leaderBoard.find({ room: req.params.id }, function (err, details) {
    if (err) console.log(err);
    else {
      res.json(details);
    }
  });
});

app.listen(process.env.PORT || 3000, () => console.log(`Server has started.`));
