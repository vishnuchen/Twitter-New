$(document).ready(function() {
  console.log("Loaded the page.")
  
  $(".new-tweet form textarea").on('input', function () {
    const charCount = 140 - this.value.length;
    $('.counter').text(charCount);

    if (charCount < 0) {
      $('.counter').addClass('red');
    } else {
      $('.counter').removeClass('red');
    }
  })    
});


// Expermineting 

// $(document).ready(function() {
//   console.log("Loaded the page.")
//   let word = ""
//   $(".new-tweet form textarea").on("keypress", function(e) {
//     word +=  e.originalEvent.key;
//   })
//   $(".new-tweet form textarea").on("keypress", function(e) {
//     var key = e.which;
//     if(key == 13)  // the enter key code
//     {
//       console.log(word)
//     }      
//   })        
// });

