const { Router } = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const router = new Router();
router.use(cookieParser());


router.get("/login", (req, res) => {
  res.render("login", { pagetitle: "ورود به بخش مدیریت" });
});

router.post("/login", (req, res) => {
  axios
    .post(
      "https://dev.70si.ir/api/auth/login",
      {
        username: req.body.username,
        password: req.body.password,
        grant_type: "password",
        client_id: "5eoj5gnhta1a0x84",
        client_secret:
          "4UbhyswNOCyVLBtaz84o2CvLOefhQv59BbAQ8faJHo3WqQNuKFFVnF4V76eKozCv",
      },
      {
        headers: {
          API_SHARED_KEY:
            "lEy45wstZvZZ0sFIk1yy9gV0dahTrdAljCY8DE9hlaCwPzydRtrfQLQEyWfnFwDo",
        },
      }
    )
    .then(
      (response) => {
          res.cookie("auth", response.data.access_token);
          res.send("ok");
        console.log(response.data);
        //console.log(username);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
});

module.exports = router;
