//  data acts like fake database

const userData = {
  aflo: {
    password: "password123",
    tweets: [
      "it's oct 27",
      "I like school",
      "I need coffee",
      "in class.. bored",
      "doing homework",
      "tweet 5"
    ],
    following: ["josh_killer", "mikeGuy7", "timmJ"]
  },
  josh_killer: {
    password: "march20",
    tweets: [
      "Good morning followers",
      "I voted for Biden",
      "my name's josh!",
      "it's my bday",
      "tweet 2",
      "tweet 1",
      "tweet 3"
    ],
    following: ["mikeGuy7"]
  },
  mikeGuy7: {
    password: "pass123",
    tweets: ["tweet6", "tweet7", "im mike"],
    following: ["aflo7"]
  },
  timmJ: {
    password: "tjhouse",
    tweets: [
      "rough day..",
      "going home for the weekend",
      "lol",
      "hungry",
      "I miss you"
    ],
    following: []
  },
  bart: {
    password: "bart15",
    tweets: [
      "im bart",
      "helo world"
    ],
    following: []
  }
}

export { userData }
