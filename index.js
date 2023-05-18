const axios = require("axios");
const FormData = require("form-data");

const vote = async (emails) => {
  let success = 0;
  let failure = 0;
  const URL = "https://filmfaremiddleeast.com/social-night/index.php/home/vote";
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    try {
      const formData = new FormData();
      formData.append("video_id", "388");
      formData.append("email", email);
      formData.append("category", "Photography");
      const res = await axios.post(URL, formData, {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      });
      const resStr = res.data;
      if (resStr.includes("Sorry")) {
        console.log(resStr);
        failure += 1;
      } else {
        success += 1;
      }
    } catch (error) {
      console.log(error);
      failure += 1;
    }
  }
  return {
    success,
    failure,
  };
};

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// your code
app.get("/", async (req, res) => {
  let emails = req.query.emails;
  console.log(emails);
  emails = emails.split(",");
  const { failure, success } = await vote(emails);
  return res.status(200).json({ success, failure });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
