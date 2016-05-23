/**
 * Created by urielbertoche on 5/22/2016.
 */

var Ouvidoria = function () {
  var posts;

  var init = function (opts) {
    var config = {
      post_id: 0
    };
    $.extend(config, opts);

    posts = new Posts();
    if (config.post_id != 0)
      posts.setup(config.post_id);
  };

  return {
    init: init
  };
};