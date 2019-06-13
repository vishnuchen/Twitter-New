/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready( function () {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
          <img class = 'avatarImg' src="${escape(tweetImage)}"></img>
          <h1 class = 'avatarTitle'>${escape(username)}</h1>
          <p class = 'avatarName'>${escape(userHandle)}</p>
        </header>
        <div class = 'newTweetBody'>
          <div class = 'newTweetBodyText'>${escape(tweetBody)}</div>
        </div>
        <footer>
          <p class = 'timeStamp'>${escape(daysElapsed)} days ago</p>
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

  function loadTweets () {
    $.ajax({
        method: 'GET',
        url: '/tweets',
        dataType: 'JSON',
        success: function(data) {
            renderTweets(data);
        }
    })
  };

  function renderLatestTweet () {
    $.ajax({
        method: 'GET',
        url: '/tweets',
        dataType: 'JSON',
        success: function(data) {
          $('.all-new-tweets').prepend(createTweetElement(data[data.length - 1]));
        }
    })
  };

  loadTweets()

  function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container      
    tweets.forEach(function(item) {
      var $tweet = createTweetElement(item);
      $('.all-new-tweets').prepend($tweet);
    });
  }

  $("form").on('submit', function(event) {
    //too long
    if ($('textarea').val().length > 140) {
      alert ("error too long");
    }
      //empty   
    else if ($('textarea').val().length === 0) {
        alert ("tweet is empty");
    }

    else {
      //else submit the form
      event.preventDefault();
      console.log($("textarea").serialize());
      $.ajax({ 
        type: 'POST',
        url: "/tweets",
        data: $('textarea').serialize(),
        error: function(err, status, message) {
          console.log('err: ', message);
        },
        success: function() {
          renderLatestTweet();
        }
      })
    }
  });

// Loads tweet function which executes a GET request to load tweets

});

