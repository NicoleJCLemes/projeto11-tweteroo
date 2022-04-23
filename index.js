import express from 'express';
import cors from 'cors';

const app = express();
const tweets = [];
const users = [];
const map = new Map();

app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
	const body = req.body;
	users.push(body);
	map.set(`${body.username}`, body.avatar);
	res.send("Ok");
})

app.post("/tweets", (req, res) => {
	const body = req.body;
	const tweet = {
		username: body.username,
		avatar: map.get(`${body.username}`),
		tweet: body.tweet,
	}
	tweets.push(tweet);
	res.send("Ok");
})

app.get("/tweets", (req, res) => {
    let tenTweets = tweets.slice(-10);
	tenTweets = tenTweets.reverse();
    res.send(tenTweets);
})

app.listen(5000, () => console.log("server is running on port 5000"));