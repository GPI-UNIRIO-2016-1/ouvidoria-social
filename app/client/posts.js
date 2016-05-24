/**
 * Created by urielbertoche on 5/22/2016.
 */

var Posts = function () {
  var post_id;

  var comment = function (message) {
    $.post("/post/comment/" + post_id, {message: message}, function (data) {
      console.log(data);
      $("#comments").load("/post/view/" + post_id + " #comments");
    });
    // console.log(message, post_id);
  };

  var like = function () {
    $.get("/post/like/" + post_id, function (data) {
      console.log(data);
      $("#like").load("/post/view/" + post_id + " #like");
    });
  };

  var setup = function (pid) {
    post_id = pid;

    $("[data-role=comment]").on('click', function () {
      var message = $("[data-role=comment-message]").val();
      comment(message);
    });

    $("[data-role=like]").on('click', function () {
      like();
    });
  };

  return {
    like: like,
    comment: comment,
    setup: setup
  };
};