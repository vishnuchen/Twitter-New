/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  //easier way to structure html dom in jquery. use below syntax
    // var html = `
    // <article class="tweet">
    //   <h1 class="username">${tweet.user.name}
    // `


// Fake data taken from tweets.json



$( document ).ready( function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function createTweetElement(tweet) {

    let tweetImage = tweet.user.avatars.small;
    let username = tweet.user.name;
    let userHandle = tweet.user.handle;
    let tweetBody = tweet.content.text;
    let tweetCreateDate = tweet.created_at;
    let currentTime = Math.floor(Date.now());
    let daysElapsed = Math.floor((currentTime - tweetCreateDate) / (1000*60*60*24));

    let htmlAppend = 
    `
    <section class="tweet-containerNew">
      <article class="tweetByUser">
        <header>
          <img class = 'avatarImg' src="${tweetImage}"></img>
          <h1 class = 'avatarTitle'>${username}</h1>
          <p class = 'avatarName'>${userHandle}</p>
        </header>
        <div class = 'newTweetBody'>
          <div class = 'newTweetBodyText'>${tweetBody}</div>
        </div>
        <footer>
          <p class = 'timeStamp'>${daysElapsed} days ago</p>
          <div class= "icons">
            <i class="fab fa-bitcoin"></i>
            <i class="fas fa-bullhorn"></i>
            <i class="fas fa-pizza-slice"></i>
          </div>
        </footer>
      </article>   
    </section>
    `;
    return htmlAppend;
  }

  function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container      
      tweets.forEach(function(item) {
          var $tweet = createTweetElement(item);
          console.log(item);
          $('.all-new-tweets').append($tweet);
      });
  }

  renderTweets(data);
});