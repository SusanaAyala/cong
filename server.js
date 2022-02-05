const { default: axios } = require("axios");
const express = require("express");

const app = express();
const recentPubsUrl = "/v3/search?query=q=index_s:publications&sort=timestamp desc&uuid=cb3e6ee0-7d68-11ec-ac30-35aecd126a5a&cuid=cb3e6ee1-7d68-11ec-ac30-35aecd126a5a";

app.post("/login", async (req, res) => {
    const { data } = await axios.get("https://dev.ditaweb.com/NotusCloudApi/v3/login?silo=congility_demo", {
        headers: {
            'Authorization': req.headers["authorization"],
            'Cookie': 'JSESSIONID=dev1jt87kekiz941nvehgwivuofj1816.dev'
        }
    });
    res.json({ skey: data.skey });
});

app.get("/publications", async (req, res) => {
    const recentPubs = await axios.get("https://dev.ditaweb.com/NotusCloudApi" + recentPubsUrl, {
        headers: {
            skey: req.headers["skey"]
        }
    });
    return res.send(recentPubs.data);
});

app.listen(4000, () => console.log("To infinity and beyond!!!"));