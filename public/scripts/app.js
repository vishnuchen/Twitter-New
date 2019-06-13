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
    let daysElapsed = Math.floor((currentTime - tweetCreateDate) / (1000*60)); //(1000*60*60*24)

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
          <p class = 'timeStamp'>${escape(daysElapsed)} minutes ago</p>
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

  function loadTweets (callback) {
    $.ajax({
        method: 'GET',
        url: '/tweets',
        dataType: 'JSON',
        success: callback
    });
  }

  function renderLatestTweet () {
    loadTweets(function(data) {
      renderTweets([data[data.length - 1]]);
    });
  };

  //code to toggle form
  $('#compose').on('click', function (_) {
    $('.new-tweet').slideToggle(100);
    $('textarea').select();
  })

  loadTweets(function(data) {
    renderTweets(data);
  });

  function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container      
    tweets.forEach(function(item) {
      var $tweet = createTweetElement(item);
      $('.all-new-tweets').prepend($tweet);
    });
  }

  $("#tweetform").on('submit', function(event) {
    event.preventDefault();
    // //too long
    // if ($('textarea').val().length > 140) {
    //   alert ("error too long");
    // }
    //   //empty   
    // else if ($('textarea').val().length === 0) {
    //     alert ("tweet is empty");
    // }

    if ($('textarea').val().length > 140) {
      // alert ("error too long");
      let tweetErrorLong = 'Your bytes longerthan 140 Sats';
      $('#errormessage').text(tweetErrorLong);
      $('#errormessage').slideDown();
    }
      //empty   
    else if ($('textarea').val().length === 0) {
        // alert ("tweet is empty");
        let tweetErrorZero = 'You have zero byte of Sats';
        $('#errormessage').text(tweetErrorZero);
        $('#errormessage').slideDown();
    }

    else {
      //else submit the form
      
      console.log($("textarea").serialize());
      $.ajax({ 
        type: 'POST',
        url: "/tweets",
        data: $('textarea').serialize(),
        error: function(_err, _status, message) {
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

