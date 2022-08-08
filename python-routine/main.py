import json
import tweepy

if __name__ == "__main__":
    cli = None
    with open("python-routine/credentials.json", 'r') as f:
        auth = json.load(f)
        cli = tweepy.Client(auth["BEARER_TOKEN"], auth["API_KEY"], auth["API_KEY_SECRET"], auth["TOKEN"], auth["TOKEN_SECRET"])

    if cli is not None:
        data = None

        with open("python-routine/messages.json", 'r') as f:
            data = json.load(f)

            if data is not None:
                for i, tweet in enumerate(data["messages"]):

                    msg = "From : " + ','.join(tweet["from"]) + '\n'
                    msg += "To : " + ','.join(tweet["to"]) + "\n\n"
                    msg += '\t' + '\t'.join(tweet["text"].split('\n')) + "\n\n"
                    msg += "DAY : " + str(tweet["day"])

                    # cli.create_tweet(msg)
                    data["messages"][i]["day"] += 1

        if data is not None:
            with open("python-routine/messages.json", 'w') as f:
                json.dump(data, f)
