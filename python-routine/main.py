import json
import tweepy

API_KEY = "biXtDmRTAb9vB9XzCQun9TA0a"
API_KEY_SECRET = "pRI2yWmZg7BVYTfPWXeLszDqnXAAZv5oaOronNoxe2LiAoT2BW"

TOKEN = "1554888646523748357-bbwAYHnBYtJhV5NK59Nsu7DyJAMrYL"
TOKEN_SECRET = "rK09i2LNMgoTtb1F3uNtpsJqoHSQnRDSHvdfUcKJMVNfn"

BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAABtIfgEAAAAAkjKoftr2DudpDQnZ7kLYzfV%2F2AI%3DB3I5UVchRhuiWbRuD8oKUu4nvsO9Jw2ZLWyzmvUElS5nmNJt7f"

# MESSAGE = "@CallMeSenpaiPls fais la bannière stp.\n"
MESSAGE = "Hello\n"

def tweet(msg):
    cli = tweepy.Client(BEARER_TOKEN, API_KEY, API_KEY_SECRET, TOKEN, TOKEN_SECRET)
    cli.create_tweet(text=msg)

if __name__ == "__main__":
    day = None
    with open("python-routine/day_counter.json", "r") as f:
        day = json.load(f)["DAY"]

    if day is not None:
        MESSAGE += f"DAY : {day}"
        tweet(MESSAGE)

    with open("python-routine/day_counter.json", "w+") as f:
        json.dump({"DAY" : day + 1}, f)
