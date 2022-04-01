(self["webpackChunk"] = self["webpackChunk"] || []).push([["app2"],{

/***/ "./assets/js/ajax.js":
/*!***************************!*\
  !*** ./assets/js/ajax.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js").default; // Add song to playlist or add post to bookmarks


var playlist = document.querySelectorAll('.playlist-toggle');
var bookmark = document.querySelectorAll('.bookmark-toggle');

function switcher(event) {
  var _this = this;

  event.preventDefault();
  var url = this.href;
  axios.get(url).then(function (response) {
    var status = String(response.data.response.status);
    status === 'added' ? _this.classList.add('added') : _this.classList.remove('added');
    _this.dataset.originalTitle = response.data.response.title;
    _this.style.pointerEvents = 'none';
    var alertBox = document.querySelector('main');
    var alertExist = document.querySelector('.md-alert');

    if (response.data.response.message) {
      var badge = '';

      if (response.data.response.status === 'added') {
        badge = 'success';
      } else {
        badge = 'danger';
      }

      var message = '<div class="md-alert md-alert-' + badge + ' md-box-mb">' + response.data.response.message + '</div>';

      if (alertExist) {
        alertExist.outerHTML = message;
      } else {
        alertBox.insertAdjacentHTML('afterbegin', message);
      }

      $(".md-alert").fadeTo(3000, 500).slideUp(500, function () {
        $(".md-alert").slideUp(500);
      });
    }

    setTimeout(function () {
      [_this].forEach(function (switcher) {
        switcher.style.pointerEvents = 'auto';
      });
    }, 100);
  });
}

playlist.forEach(function (playlist) {
  playlist.addEventListener('click', switcher);
});
bookmark.forEach(function (bookmark) {
  bookmark.addEventListener('click', switcher);
}); // Follow a user or unfollow from yourself

var follow = document.querySelectorAll('.follow-toggle');

function follows(event) {
  var _this2 = this;

  event.preventDefault();
  var url = this.href;
  axios.get(url).then(function (response) {
    var status = String(response.data.response.status);

    if (status === 'added') {
      _this2.classList.remove('btn-info');

      _this2.classList.add('btn-light');

      _this2.classList.add('followed');

      if (document.getElementById('profileFollowers')) {
        var followers = document.getElementById('profileFollowers').querySelector('.number').innerHTML;
        document.getElementById('profileFollowers').querySelector('.number').innerHTML = (parseInt(followers, 10) + 1).toString();
      }
    } else {
      _this2.classList.remove('btn-light');

      _this2.classList.remove('followed');

      _this2.classList.add('btn-info');

      if (document.getElementById('profileFollowers')) {
        var _followers = document.getElementById('profileFollowers').querySelector('.number').innerHTML;
        document.getElementById('profileFollowers').querySelector('.number').innerHTML = (parseInt(_followers, 10) - 1).toString();
      }
    }

    _this2.dataset.originalTitle = response.data.response.title;
    _this2.style.pointerEvents = 'none';
    setTimeout(function () {
      [_this2].forEach(function (switcher) {
        switcher.style.pointerEvents = 'auto';
      });
    }, 100);
  });
}

var unfollow = document.querySelectorAll('.unfollow-toggle');
follow.forEach(function (follow) {
  follow.addEventListener('click', follows);
});

function unfollows(event) {
  event.preventDefault();
  var url = this.href;
  var followerBlock = 'u' + this.id.split('u').pop().split('t')[0] + 'l';
  var cancelButtonId = 'userUnfollow' + this.id.split('u').pop().split('t')[0];
  document.getElementById(cancelButtonId).click();
  axios.get(url).then(function (response) {
    var status = String(response.data.response.status);

    if (status === 'removed') {
      document.getElementById(followerBlock).remove();
    }
  });
}

unfollow.forEach(function (unfollow) {
  unfollow.addEventListener('click', unfollows);
}); // Make post featured

var featured = document.querySelectorAll('.featured-toggle');

function featuredPost(event) {
  var _this3 = this;

  event.preventDefault();
  var url = this.href;
  axios.get(url).then(function (response) {
    var status = String(response.data.response.status);
    status === 'added' ? _this3.classList.add('added') : _this3.classList.remove('added');
    setTimeout(function () {
      [_this3].forEach(function (switcher) {
        switcher.style.pointerEvents = 'auto';
      });
    }, 100);
  });
}

featured.forEach(function (featured) {
  featured.addEventListener('click', featuredPost);
}); // Post like

var like = document.querySelectorAll('.like-toggle');

function likePost(event) {
  var _this4 = this;

  event.preventDefault();
  var url = this.href;
  axios.get(url).then(function (response) {
    var status = String(response.data.response.status);
    status === 'added' ? _this4.classList.add('added') : _this4.classList.remove('added');

    var postLikeCounter = 'post-like-counter-' + _this4.id.replace('post-like-', '');

    var currentLikes = parseInt(document.getElementById(postLikeCounter).innerHTML);

    if (status === 'added') {
      document.getElementById(postLikeCounter).innerHTML = currentLikes + 1;
    } else {
      document.getElementById(postLikeCounter).innerHTML = currentLikes - 1;
    }

    setTimeout(function () {
      [_this4].forEach(function (switcher) {
        switcher.style.pointerEvents = 'auto';
      });
    }, 100);
  });
}

like.forEach(function (like) {
  like.addEventListener('click', likePost);
}); // Share song

function shareMediaRequest(event) {
  var username = this.querySelector('.md-username').innerHTML;
  var song = document.getElementById('shareSongId').innerHTML;
  var url = '/shareSong/' + song + '/' + username;
  document.getElementById('shareSendUsername').innerHTML = username;
  document.getElementById('shareSongConfirmModal').querySelector('a').href = url;
  document.getElementById('shareSongModal').click();
  document.getElementById('shareSongConfirm').click();
}

function shareMedia(event) {
  event.preventDefault();
  var url = this.href;
  axios.get(url).then(function (response) {
    document.getElementById('shareSongConfirmModal').click();
    var message = '<div class="md-alert md-alert-success md-box-mb">' + response.data.response.message + '</div>';
    var alertBox = document.querySelector('main');
    var alertExist = document.querySelector('.md-alert');

    if (alertExist) {
      alertExist.outerHTML = message;
    } else {
      alertBox.insertAdjacentHTML('afterbegin', message);
    }

    $(".md-alert").fadeTo(3000, 500).slideUp(500, function () {
      $(".md-alert").slideUp(500);
    });
  });
}

function shareMediaCancel(event) {
  event.preventDefault();
  document.getElementById('shareSongConfirmModal').click();
  document.getElementById('shareSongOpener').click();
}

var shareSongUsers = document.querySelectorAll('.user-share-media .user-line');
shareSongUsers.forEach(function (user) {
  user.addEventListener('click', shareMediaRequest);
});
var shareSendButton = document.getElementById('shareSongConfirmButton');

if (shareSendButton) {
  shareSendButton.addEventListener('click', shareMedia);
}

var shareSendCancel = document.getElementById('shareSongCancel');

if (shareSendCancel) {
  shareSendCancel.addEventListener('click', shareMediaCancel);
} // Share post


var sharePostButton = document.querySelectorAll('.share-post-button');

function sharePostButtonFunction() {
  document.getElementById('sharePostId').innerHTML = this.id.replace('sharePostId', '');
}

sharePostButton.forEach(function (sharePostButton) {
  sharePostButton.addEventListener('click', sharePostButtonFunction);
});
var sharePostUsers = document.querySelectorAll('.user-share-media .user-line');

function sharePostModalFunction(event) {
  var username = this.querySelector('.md-username').innerHTML;
  var post = document.getElementById('sharePostId').innerHTML;
  var url = '/sharePost/' + post + '/' + username;
  console.log(url);
  document.getElementById('sharePostUsername').innerHTML = username;
  document.getElementById('sharePostConfirmModal').querySelector('a').href = url;
  document.getElementById('sharePostModal').click();
  document.getElementById('sharePostConfirm').click();
}

sharePostUsers.forEach(function (sharePostUsers) {
  sharePostUsers.addEventListener('click', sharePostModalFunction);
});
var sharePostCancel = document.getElementById('sharePostCancel');

function sharePostCancelFunction() {
  document.getElementById('sharePostConfirmModal').click();
  document.getElementById('sharePostId' + document.getElementById('sharePostId').innerHTML).click();
}

if (sharePostCancel) {
  sharePostCancel.addEventListener('click', sharePostCancelFunction);
}

var sharePostConfirmButton = document.getElementById('sharePostConfirmButton');

function sharePostConfirmButtonFunction(event) {
  event.preventDefault();
  var url = this.href;
  axios.get(url).then(function (response) {
    document.getElementById('sharePostConfirmModal').click();
    var message = '<div class="md-alert md-alert-success md-box-mb">' + response.data.response.message + '</div>';
    var alertBox = document.querySelector('main');
    var alertExist = document.querySelector('.md-alert');

    if (alertExist) {
      alertExist.outerHTML = message;
    } else {
      alertBox.insertAdjacentHTML('afterbegin', message);
    }

    $(".md-alert").fadeTo(3000, 500).slideUp(500, function () {
      $(".md-alert").slideUp(500);
    });
  });
}

if (sharePostConfirmButton) {
  sharePostConfirmButton.addEventListener('click', sharePostConfirmButtonFunction);
} // Post double-click like


document.querySelectorAll('.md-post').forEach(function (post) {
  var postId = post.id.replace('postId', '');
  post.querySelector('.post-image').addEventListener('dblclick', function (event) {
    var postLiker = post.querySelector('.like-toggle');
    var url = postLiker.href;
    axios.get(url).then(function (response) {
      var status = String(response.data.response.status);
      status === 'added' ? postLiker.classList.add('added') : postLiker.classList.remove('added');
      var postLikeCounter = 'post-like-counter-' + postLiker.id.replace('post-like-', '');
      var currentLikes = parseInt(document.getElementById(postLikeCounter).innerHTML);

      if (status === 'added') {
        post.querySelector('.post-liker').classList.add('like');
        setTimeout(function () {
          post.querySelector('.post-liker').classList.remove('like');
        }, 1000);
        document.getElementById(postLikeCounter).innerHTML = currentLikes + 1;
      } else {
        post.querySelector('.post-liker').classList.add('dislike');
        setTimeout(function () {
          post.querySelector('.post-liker').classList.remove('dislike');
        }, 1000);
        document.getElementById(postLikeCounter).innerHTML = currentLikes - 1;
      }

      setTimeout(function () {
        [postLiker].forEach(function (switcher) {
          switcher.style.pointerEvents = 'auto';
        });
      }, 100);
    });
  });
});

/***/ }),

/***/ "./assets/js/app2.js":
/*!***************************!*\
  !*** ./assets/js/app2.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_app2_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/app2.scss */ "./assets/scss/app2.scss");
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts */ "./assets/js/scripts.js");
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scripts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ajax */ "./assets/js/ajax.js");
/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ajax__WEBPACK_IMPORTED_MODULE_2__);
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// any CSS you import will output into a single scss file (appFile.scss in this case)
 // Awesome fonts

__webpack_require__(/*! @fortawesome/fontawesome-free/css/all.min.css */ "./node_modules/@fortawesome/fontawesome-free/css/all.min.css");

__webpack_require__(/*! @fortawesome/fontawesome-free/js/all.js */ "./node_modules/@fortawesome/fontawesome-free/js/all.js"); // Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';


var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

__webpack_require__.g.$ = __webpack_require__.g.jQuery = $; // Bootstrap js

__webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js"); // My scripts





/***/ }),

/***/ "./assets/js/scripts.js":
/*!******************************!*\
  !*** ./assets/js/scripts.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/web.url.js */ "./node_modules/core-js/modules/web.url.js");

__webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "./node_modules/core-js/modules/es.regexp.constructor.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

// Prevent scroll
var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

var keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1
};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;

try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  }));
} catch (e) {}

var wheelOpt = supportsPassive ? {
  passive: false
} : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF

  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop

  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile

  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
} // Mobile navbar


var sideNav = document.getElementById('sideNav');
var sideNavOpener = document.getElementById('sideNavOpener');
var sideNavCloser = document.getElementById('sideNavCloser');
var sideNavLogoutCloser = document.getElementById('sideNavLogoutCloser');
var sideNavBack = document.getElementById('sideNavBack');

function openNav() {
  disableScroll();
  sideNav.style.transform = 'translateX(100%)';
  sideNavBack.style.opacity = '1';
  sideNavCloser.style.width = '100%';
}

function closeNav() {
  enableScroll();
  sideNav.style.transform = 'unset';
  sideNavBack.style.opacity = '0';
  sideNavCloser.style.width = '0';
}

if (sideNav) {
  sideNavOpener.addEventListener('click', openNav);
  sideNavCloser.addEventListener('click', closeNav);

  if (sideNavLogoutCloser) {
    sideNavLogoutCloser.addEventListener('click', closeNav);
  }
} // MediaElement Player


__webpack_require__(/*! mediaelement/build/mediaelement-and-player.min */ "./node_modules/mediaelement/build/mediaelement-and-player.min.js");

$(document).ready(function () {
  $('.audio-player audio').mediaelementplayer({
    success: function success(player, node) {
      // Optional
      $(player).closest('.mejs__container').attr('lang', mejs.i18n.language());
      $('html').attr('lang', mejs.i18n.language()); // More code
    },
    startVolume: 1,
    autoRewind: true,
    enableProgressTooltip: false,
    features: ['playpause', '[feature_name]', 'current', 'progress', 'duration']
  });
}); // Comment reply

var commentWrite = document.querySelector('.md-comment-write');
var commentTextArea = document.getElementById('comment_message');
var commentReply = document.querySelectorAll('.comment-reply');
var replyTo = document.getElementById('comment_replyTo');
var replyFor = document.getElementById('comment_replyFor');
var commentReplyUser = document.querySelector('.md-comment-reply-user');
var replyingDelete = document.querySelector('.md-replying-delete');

if (replyingDelete) {
  replyingDelete.addEventListener('click', function () {
    replyTo.removeAttribute('value');
    replyFor.removeAttribute('value');
    commentWrite.classList.remove('md-replying');
  });
}

if (commentReply) {
  commentReply.forEach(function (reply) {
    var replyUser = reply.querySelector('.reply-user');
    var replyComment = reply.querySelector('.reply-comment');
    reply.addEventListener('click', function (reply) {
      replyTo.value = replyUser.innerHTML;
      replyFor.value = replyComment.innerHTML;
      commentTextArea.focus();

      if (replyTo.value !== '') {
        commentWrite.classList.add('md-replying');
        commentReplyUser.innerHTML = replyTo.value;
      }
    });
  });
} // Searcher


var searchInputs = document.querySelectorAll('.md-search-all-input');
var navbarSearch = document.getElementById('navbarSearch'); // const navbarSearchInput = document.getElementById('navbarSearchInput');

var navbarSearchOpener = document.getElementById('openNavbarSearch');
var navbarSearchCloser = document.getElementById('closeNavbarSearch');

function openNavbarSearch() {
  navbarSearchOpener.style.cssText = 'display:none !important';
  document.querySelector('.navbar-search-mobile').style.display = 'unset';
  document.querySelector('.navbar-search-mobile input').focus();
}

function closeNavbarSearch() {
  document.querySelector('.navbar-search-mobile').style.display = 'none';
  navbarSearchOpener.style.display = 'none';
}

if (navbarSearch) {
  navbarSearchOpener.addEventListener('click', openNavbarSearch);
  navbarSearchCloser.addEventListener('click', closeNavbarSearch);
  document.querySelector('.body-wrapper').addEventListener('click', closeNavbarSearch);
}

searchInputs.forEach(function (inputBox, key) {
  inputBox.querySelector('.search_input').addEventListener('input', function (input) {
    inputBox.querySelector('.search_button').href = '/search/' + input.target.value;
  });
  inputBox.querySelector('.search_input').addEventListener('keyup', function (event) {
    if (event.keyCode === 13 || event.code === "Enter") {
      inputBox.querySelector('.search_button').click();
    }
  });
}); // Enable tooltip

$(function () {
  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover'
  });
}); // Image on change

if (document.querySelector('.custom-file-input')) {
  var fileInput = document.querySelector('.custom-file-input');

  if (document.getElementById('postImgOutput')) {
    var postImgOutput = document.getElementById('postImgOutput');

    fileInput.onchange = function () {
      postImgOutput.src = window.URL.createObjectURL(fileInput.files[0]);
      postImgOutput.style.marginBottom = '8px';
    };
  } else if (document.getElementById('output-content')) {
    var outputContent = document.getElementById('output-content');

    fileInput.onchange = function () {
      outputContent.style.backgroundImage = 'url(\'' + window.URL.createObjectURL(fileInput.files[0]) + '\')';
    };
  }
} // Textarea autosize


if (document.querySelector('.md-auto-sizer')) {
  var textarea = document.querySelector('.md-auto-sizer');

  textarea.oninput = function () {
    textarea.style.height = textarea.scrollHeight + 2 + "px";
  };
} // Auto close alerts


$(".md-alert-auto-hide").fadeTo(5000, 500).slideUp(500, function () {
  $(".md-alert-auto-hide").slideUp(500);
}); // Prevent username symbols

$('.username-input').on('keypress', function (event) {
  var regex = new RegExp("^[a-zA-Z0-9._]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);

  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
}); // Post collapse

var postCollapse = document.querySelectorAll('.post-collapse');
postCollapse.forEach(function (post) {
  function openCollapsedPost() {
    this.style.display = 'none';
    document.getElementById('postCollapse' + postId).classList.remove('closed');
  }

  var postId = post.id.replace('postCollapse', '');

  if (post.querySelector('div').clientHeight > 50) {
    document.getElementById('postCollapseButton' + postId).style.display = 'block';
  }

  document.getElementById('postCollapseButton' + postId).addEventListener('click', openCollapsedPost);
});

/***/ }),

/***/ "./assets/scss/app2.scss":
/*!*******************************!*\
  !*** ./assets/scss/app2.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_fortawesome_fontawesome-free_js_all_js-node_modules_fortawesome_fontawes-a7977b"], () => (__webpack_exec__("./assets/js/app2.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXNCO0FBQ2xCMUksSUFBQUEsS0FBSyxDQUFDQyxjQUFOO0FBQ0EsV0FBTyxLQUFQO0FBQ0g7QUFDSixDQVBELEdBU0E7O0FBQ0EsSUFBTW9LLFlBQVksR0FBR3pLLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsZ0JBQTFCLENBQXJCO0FBRUF3SyxZQUFZLENBQUN4SSxPQUFiLENBQXFCLFVBQUNxQyxJQUFELEVBQVU7QUFDM0IsV0FBU29HLGlCQUFULEdBQTZCO0FBQ3pCLFNBQUt0SixLQUFMLENBQVd1SCxPQUFYLEdBQXFCLE1BQXJCO0FBQ0EzSSxJQUFBQSxRQUFRLENBQUNxQyxjQUFULENBQXdCLGlCQUFpQndDLE1BQXpDLEVBQWlEL0QsU0FBakQsQ0FBMkRFLE1BQTNELENBQWtFLFFBQWxFO0FBQ0g7O0FBRUQsTUFBSTZELE1BQU0sR0FBR1AsSUFBSSxDQUFDekIsRUFBTCxDQUFRVSxPQUFSLENBQWdCLGNBQWhCLEVBQWdDLEVBQWhDLENBQWI7O0FBRUEsTUFBSWUsSUFBSSxDQUFDL0MsYUFBTCxDQUFtQixLQUFuQixFQUEwQm9KLFlBQTFCLEdBQXlDLEVBQTdDLEVBQWlEO0FBQzdDM0ssSUFBQUEsUUFBUSxDQUFDcUMsY0FBVCxDQUF3Qix1QkFBdUJ3QyxNQUEvQyxFQUF1RHpELEtBQXZELENBQTZEdUgsT0FBN0QsR0FBdUUsT0FBdkU7QUFDSDs7QUFFRDNJLEVBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsdUJBQXVCd0MsTUFBL0MsRUFBdUQzQyxnQkFBdkQsQ0FBd0UsT0FBeEUsRUFBaUZ3SSxpQkFBakY7QUFDSCxDQWJEOzs7Ozs7Ozs7Ozs7QUNyTkEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYXBwMi5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2Nzcy9hcHAyLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpLmRlZmF1bHQ7XG5cbi8vIEFkZCBzb25nIHRvIHBsYXlsaXN0IG9yIGFkZCBwb3N0IHRvIGJvb2ttYXJrc1xuXG5sZXQgcGxheWxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWxpc3QtdG9nZ2xlJyk7XG5sZXQgYm9va21hcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9va21hcmstdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIHN3aXRjaGVyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gdGhpcy5jbGFzc0xpc3QuYWRkKCdhZGRlZCcpIDogdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhZGRlZCcpO1xuICAgICAgICB0aGlzLmRhdGFzZXQub3JpZ2luYWxUaXRsZSA9IHJlc3BvbnNlLmRhdGEucmVzcG9uc2UudGl0bGU7XG4gICAgICAgIHRoaXMuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblxuICAgICAgICBsZXQgYWxlcnRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgICAgIGxldCBhbGVydEV4aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWFsZXJ0Jyk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVzcG9uc2UubWVzc2FnZSkge1xuICAgICAgICAgICAgbGV0IGJhZGdlID0gJyc7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgICAgICBiYWRnZSA9ICdzdWNjZXNzJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFkZ2UgPSAnZGFuZ2VyJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnPGRpdiBjbGFzcz1cIm1kLWFsZXJ0IG1kLWFsZXJ0LScgKyBiYWRnZSArICcgbWQtYm94LW1iXCI+JyArXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5yZXNwb25zZS5tZXNzYWdlICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JztcblxuICAgICAgICAgICAgaWYgKGFsZXJ0RXhpc3QpIHtcbiAgICAgICAgICAgICAgICBhbGVydEV4aXN0Lm91dGVySFRNTCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0Qm94Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLmZhZGVUbygzMDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoXCIubWQtYWxlcnRcIikuc2xpZGVVcCg1MDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIFt0aGlzXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDApO1xuICAgIH0pXG59XG5cbnBsYXlsaXN0LmZvckVhY2goKHBsYXlsaXN0KSA9PiB7XG4gICAgcGxheWxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hlcik7XG59KTtcblxuYm9va21hcmsuZm9yRWFjaCgoYm9va21hcmspID0+IHtcbiAgICBib29rbWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaGVyKTtcbn0pO1xuXG4vLyBGb2xsb3cgYSB1c2VyIG9yIHVuZm9sbG93IGZyb20geW91cnNlbGZcblxubGV0IGZvbGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb2xsb3ctdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIGZvbGxvd3MoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnYWRkZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi1pbmZvJyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1saWdodCcpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdmb2xsb3dlZCcpO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKSkge1xuICAgICAgICAgICAgICAgIGxldCBmb2xsb3dlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyJykuaW5uZXJIVE1MID0gKHBhcnNlSW50KGZvbGxvd2VycywgMTApICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLWxpZ2h0Jyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2ZvbGxvd2VkJyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1pbmZvJyk7XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvbGxvd2VycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykucXVlcnlTZWxlY3RvcignLm51bWJlcicpLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUwgPSAocGFyc2VJbnQoZm9sbG93ZXJzLCAxMCkgLSAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRhc2V0Lm9yaWdpbmFsVGl0bGUgPSByZXNwb25zZS5kYXRhLnJlc3BvbnNlLnRpdGxlO1xuICAgICAgICB0aGlzLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5sZXQgdW5mb2xsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5mb2xsb3ctdG9nZ2xlJyk7XG5cbmZvbGxvdy5mb3JFYWNoKChmb2xsb3cpID0+IHtcbiAgICBmb2xsb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb2xsb3dzKTtcbn0pO1xuXG5mdW5jdGlvbiB1bmZvbGxvd3MoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG4gICAgbGV0IGZvbGxvd2VyQmxvY2sgPSAndScgKyB0aGlzLmlkLnNwbGl0KCd1JykucG9wKCkuc3BsaXQoJ3QnKVswXSArICdsJztcbiAgICBsZXQgY2FuY2VsQnV0dG9uSWQgPSAndXNlclVuZm9sbG93JyArIHRoaXMuaWQuc3BsaXQoJ3UnKS5wb3AoKS5zcGxpdCgndCcpWzBdO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbmNlbEJ1dHRvbklkKS5jbGljaygpO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZW1vdmVkJykge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZm9sbG93ZXJCbG9jaykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG51bmZvbGxvdy5mb3JFYWNoKCh1bmZvbGxvdykgPT4ge1xuICAgIHVuZm9sbG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5mb2xsb3dzKTtcbn0pO1xuXG4vLyBNYWtlIHBvc3QgZmVhdHVyZWRcblxubGV0IGZlYXR1cmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZlYXR1cmVkLXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBmZWF0dXJlZFBvc3QoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgKHN0YXR1cyA9PT0gJ2FkZGVkJykgPyB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5mZWF0dXJlZC5mb3JFYWNoKChmZWF0dXJlZCkgPT4ge1xuICAgIGZlYXR1cmVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZmVhdHVyZWRQb3N0KTtcbn0pO1xuXG4vLyBQb3N0IGxpa2VcblxubGV0IGxpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlrZS10b2dnbGUnKTtcblxuZnVuY3Rpb24gbGlrZVBvc3QoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgKHN0YXR1cyA9PT0gJ2FkZGVkJykgPyB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG5cbiAgICAgICAgbGV0IHBvc3RMaWtlQ291bnRlciA9ICdwb3N0LWxpa2UtY291bnRlci0nICsgdGhpcy5pZC5yZXBsYWNlKCdwb3N0LWxpa2UtJywnJyk7XG4gICAgICAgIGxldCBjdXJyZW50TGlrZXMgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3N0TGlrZUNvdW50ZXIpLmlubmVySFRNTCk7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2FkZGVkJykge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zdExpa2VDb3VudGVyKS5pbm5lckhUTUwgPSBjdXJyZW50TGlrZXMgKyAxO1xuICAgICAgICB9IGVsc2UgIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvc3RMaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxubGlrZS5mb3JFYWNoKChsaWtlKSA9PiB7XG4gICAgbGlrZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpa2VQb3N0KTtcbn0pO1xuXG4vLyBTaGFyZSBzb25nXG5cbmZ1bmN0aW9uIHNoYXJlTWVkaWFSZXF1ZXN0KGV2ZW50KSB7XG4gICAgbGV0IHVzZXJuYW1lID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubWQtdXNlcm5hbWUnKS5pbm5lckhUTUw7XG4gICAgbGV0IHNvbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVTb25nSWQnKS5pbm5lckhUTUw7XG4gICAgbGV0IHVybCA9ICcvc2hhcmVTb25nLycgKyBzb25nICsgJy8nICsgdXNlcm5hbWU7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVTZW5kVXNlcm5hbWUnKS5pbm5lckhUTUwgPSB1c2VybmFtZTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVTb25nQ29uZmlybU1vZGFsJykucXVlcnlTZWxlY3RvcignYScpLmhyZWYgPSB1cmw7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVTb25nTW9kYWwnKS5jbGljaygpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVNvbmdDb25maXJtJykuY2xpY2soKTtcbn1cblxuZnVuY3Rpb24gc2hhcmVNZWRpYShldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVybCA9IHRoaXMuaHJlZjtcblxuICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVNvbmdDb25maXJtTW9kYWwnKS5jbGljaygpO1xuXG4gICAgICAgIGxldCBtZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJtZC1hbGVydCBtZC1hbGVydC1zdWNjZXNzIG1kLWJveC1tYlwiPicgK1xuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5yZXNwb25zZS5tZXNzYWdlICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuXG4gICAgICAgIGxldCBhbGVydEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICAgICAgbGV0IGFsZXJ0RXhpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYWxlcnQnKTtcblxuICAgICAgICBpZiAoYWxlcnRFeGlzdCkge1xuICAgICAgICAgICAgYWxlcnRFeGlzdC5vdXRlckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnRCb3guaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgbWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLmZhZGVUbygzMDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJChcIi5tZC1hbGVydFwiKS5zbGlkZVVwKDUwMCk7XG4gICAgICAgIH0pO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNoYXJlTWVkaWFDYW5jZWwoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVNvbmdDb25maXJtTW9kYWwnKS5jbGljaygpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVNvbmdPcGVuZXInKS5jbGljaygpO1xufVxuXG5sZXQgc2hhcmVTb25nVXNlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlci1zaGFyZS1tZWRpYSAudXNlci1saW5lJyk7XG5zaGFyZVNvbmdVc2Vycy5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgdXNlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNoYXJlTWVkaWFSZXF1ZXN0KVxufSk7XG5cbmxldCBzaGFyZVNlbmRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVTb25nQ29uZmlybUJ1dHRvbicpO1xuaWYgKHNoYXJlU2VuZEJ1dHRvbikge1xuICAgIHNoYXJlU2VuZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNoYXJlTWVkaWEpO1xufVxuXG5sZXQgc2hhcmVTZW5kQ2FuY2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlU29uZ0NhbmNlbCcpO1xuaWYgKHNoYXJlU2VuZENhbmNlbCkge1xuICAgIHNoYXJlU2VuZENhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNoYXJlTWVkaWFDYW5jZWwpO1xufVxuXG4vLyBTaGFyZSBwb3N0XG5cbmxldCBzaGFyZVBvc3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhcmUtcG9zdC1idXR0b24nKTtcblxuZnVuY3Rpb24gc2hhcmVQb3N0QnV0dG9uRnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUG9zdElkJykuaW5uZXJIVE1MID0gdGhpcy5pZC5yZXBsYWNlKCdzaGFyZVBvc3RJZCcsICcnKTtcbn1cblxuc2hhcmVQb3N0QnV0dG9uLmZvckVhY2goKHNoYXJlUG9zdEJ1dHRvbikgPT4ge1xuICAgIHNoYXJlUG9zdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNoYXJlUG9zdEJ1dHRvbkZ1bmN0aW9uKVxufSk7XG5cbmxldCBzaGFyZVBvc3RVc2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VyLXNoYXJlLW1lZGlhIC51c2VyLWxpbmUnKTtcblxuZnVuY3Rpb24gc2hhcmVQb3N0TW9kYWxGdW5jdGlvbihldmVudCkge1xuICAgIGxldCB1c2VybmFtZSA9IHRoaXMucXVlcnlTZWxlY3RvcignLm1kLXVzZXJuYW1lJykuaW5uZXJIVE1MO1xuICAgIGxldCBwb3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUG9zdElkJykuaW5uZXJIVE1MO1xuICAgIGxldCB1cmwgPSAnL3NoYXJlUG9zdC8nICsgcG9zdCArICcvJyArIHVzZXJuYW1lO1xuXG4gICAgY29uc29sZS5sb2codXJsKTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVBvc3RVc2VybmFtZScpLmlubmVySFRNTCA9IHVzZXJuYW1lO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVBvc3RDb25maXJtTW9kYWwnKS5xdWVyeVNlbGVjdG9yKCdhJykuaHJlZiA9IHVybDtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVBvc3RNb2RhbCcpLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUG9zdENvbmZpcm0nKS5jbGljaygpO1xufVxuXG5zaGFyZVBvc3RVc2Vycy5mb3JFYWNoKChzaGFyZVBvc3RVc2VycykgPT4ge1xuICAgIHNoYXJlUG9zdFVzZXJzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hhcmVQb3N0TW9kYWxGdW5jdGlvbilcbn0pXG5cbmxldCBzaGFyZVBvc3RDYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQb3N0Q2FuY2VsJyk7XG5cbmZ1bmN0aW9uIHNoYXJlUG9zdENhbmNlbEZ1bmN0aW9uKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVBvc3RDb25maXJtTW9kYWwnKS5jbGljaygpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVBvc3RJZCcgKyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQb3N0SWQnKS5pbm5lckhUTUwpLmNsaWNrKCk7XG59XG5cbmlmIChzaGFyZVBvc3RDYW5jZWwpIHtcbiAgICBzaGFyZVBvc3RDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaGFyZVBvc3RDYW5jZWxGdW5jdGlvbik7XG59XG5cbmxldCBzaGFyZVBvc3RDb25maXJtQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUG9zdENvbmZpcm1CdXR0b24nKTtcblxuZnVuY3Rpb24gc2hhcmVQb3N0Q29uZmlybUJ1dHRvbkZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUG9zdENvbmZpcm1Nb2RhbCcpLmNsaWNrKCk7XG5cbiAgICAgICAgbGV0IG1lc3NhZ2UgPSAnPGRpdiBjbGFzcz1cIm1kLWFsZXJ0IG1kLWFsZXJ0LXN1Y2Nlc3MgbWQtYm94LW1iXCI+JyArXG4gICAgICAgICAgICByZXNwb25zZS5kYXRhLnJlc3BvbnNlLm1lc3NhZ2UgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG5cbiAgICAgICAgbGV0IGFsZXJ0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICAgICAgICBsZXQgYWxlcnRFeGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hbGVydCcpO1xuXG4gICAgICAgIGlmIChhbGVydEV4aXN0KSB7XG4gICAgICAgICAgICBhbGVydEV4aXN0Lm91dGVySFRNTCA9IG1lc3NhZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGVydEJveC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoXCIubWQtYWxlcnRcIikuZmFkZVRvKDMwMDAsIDUwMCkuc2xpZGVVcCg1MDAsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLnNsaWRlVXAoNTAwKTtcbiAgICAgICAgfSk7XG4gICAgfSlcbn1cblxuaWYgKHNoYXJlUG9zdENvbmZpcm1CdXR0b24pIHtcbiAgICBzaGFyZVBvc3RDb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hhcmVQb3N0Q29uZmlybUJ1dHRvbkZ1bmN0aW9uKVxufVxuXG4vLyBQb3N0IGRvdWJsZS1jbGljayBsaWtlXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZC1wb3N0JykuZm9yRWFjaCgocG9zdCkgPT4ge1xuICAgIGxldCBwb3N0SWQgPSBwb3N0LmlkLnJlcGxhY2UoJ3Bvc3RJZCcsICcnKTtcbiAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWltYWdlJykuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLChldmVudCkgPT4ge1xuICAgICAgICBsZXQgcG9zdExpa2VyID0gcG9zdC5xdWVyeVNlbGVjdG9yKCcubGlrZS10b2dnbGUnKTtcbiAgICAgICAgbGV0IHVybCA9IHBvc3RMaWtlci5ocmVmO1xuXG4gICAgICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gcG9zdExpa2VyLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiBwb3N0TGlrZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWRkZWQnKTtcblxuICAgICAgICAgICAgbGV0IHBvc3RMaWtlQ291bnRlciA9ICdwb3N0LWxpa2UtY291bnRlci0nICsgcG9zdExpa2VyLmlkLnJlcGxhY2UoJ3Bvc3QtbGlrZS0nLCcnKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50TGlrZXMgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3N0TGlrZUNvdW50ZXIpLmlubmVySFRNTCk7XG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgICAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWxpa2VyJykuY2xhc3NMaXN0LmFkZCgnbGlrZScpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWxpa2VyJykuY2xhc3NMaXN0LnJlbW92ZSgnbGlrZScpO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvc3RMaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgIHBvc3QucXVlcnlTZWxlY3RvcignLnBvc3QtbGlrZXInKS5jbGFzc0xpc3QuYWRkKCdkaXNsaWtlJyk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc3QucXVlcnlTZWxlY3RvcignLnBvc3QtbGlrZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNsaWtlJyk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zdExpa2VDb3VudGVyKS5pbm5lckhUTUwgPSBjdXJyZW50TGlrZXMgLSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBbcG9zdExpa2VyXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KVxuICAgIH0pO1xufSk7XG4iLCIvKlxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxuICpcbiAqIFdlIHJlY29tbWVuZCBpbmNsdWRpbmcgdGhlIGJ1aWx0IHZlcnNpb24gb2YgdGhpcyBKYXZhU2NyaXB0IGZpbGVcbiAqIChhbmQgaXRzIENTUyBmaWxlKSBpbiB5b3VyIGJhc2UgbGF5b3V0IChiYXNlLmh0bWwudHdpZykuXG4gKi9cblxuLy8gYW55IENTUyB5b3UgaW1wb3J0IHdpbGwgb3V0cHV0IGludG8gYSBzaW5nbGUgc2NzcyBmaWxlIChhcHBGaWxlLnNjc3MgaW4gdGhpcyBjYXNlKVxuaW1wb3J0ICcuLi9zY3NzL2FwcDIuc2Nzcyc7XG5cbi8vIEF3ZXNvbWUgZm9udHNcbnJlcXVpcmUoJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwubWluLmNzcycpO1xucmVxdWlyZSgnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvanMvYWxsLmpzJyk7XG5cbi8vIE5lZWQgalF1ZXJ5PyBJbnN0YWxsIGl0IHdpdGggXCJ5YXJuIGFkZCBqcXVlcnlcIiwgdGhlbiB1bmNvbW1lbnQgdG8gaW1wb3J0IGl0LlxuLy8gaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmxldCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5nbG9iYWwuJCA9IGdsb2JhbC5qUXVlcnkgPSAkO1xuXG4vLyBCb290c3RyYXAganNcbnJlcXVpcmUoJ2Jvb3RzdHJhcCcpO1xuXG4vLyBNeSBzY3JpcHRzXG5pbXBvcnQgJy4vc2NyaXB0cyc7XG5pbXBvcnQgJy4vYWpheCc7XG4iLCIvLyBQcmV2ZW50IHNjcm9sbFxuXG5jb25zdCAkID0gcmVxdWlyZShcImpxdWVyeVwiKTtcbmxldCBrZXlzID0gezM3OiAxLCAzODogMSwgMzk6IDEsIDQwOiAxfTtcblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzKGUpIHtcbiAgICBpZiAoa2V5c1tlLmtleUNvZGVdKSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5sZXQgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG50cnkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidGVzdFwiLCBudWxsLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTsgfVxuICAgIH0pKTtcbn0gY2F0Y2goZSkge31cblxubGV0IHdoZWVsT3B0ID0gc3VwcG9ydHNQYXNzaXZlID8geyBwYXNzaXZlOiBmYWxzZSB9IDogZmFsc2U7XG5sZXQgd2hlZWxFdmVudCA9ICdvbndoZWVsJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA/ICd3aGVlbCcgOiAnbW91c2V3aGVlbCc7XG5cbmZ1bmN0aW9uIGRpc2FibGVTY3JvbGwoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTsgLy8gb2xkZXIgRkZcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcih3aGVlbEV2ZW50LCBwcmV2ZW50RGVmYXVsdCwgd2hlZWxPcHQpOyAvLyBtb2Rlcm4gZGVza3RvcFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBwcmV2ZW50RGVmYXVsdCwgd2hlZWxPcHQpOyAvLyBtb2JpbGVcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cywgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBlbmFibGVTY3JvbGwoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcih3aGVlbEV2ZW50LCBwcmV2ZW50RGVmYXVsdCwgd2hlZWxPcHQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBwcmV2ZW50RGVmYXVsdCwgd2hlZWxPcHQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzLCBmYWxzZSk7XG59XG5cbi8vIE1vYmlsZSBuYXZiYXJcblxuY29uc3Qgc2lkZU5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2Jyk7XG5jb25zdCBzaWRlTmF2T3BlbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZPcGVuZXInKTtcbmNvbnN0IHNpZGVOYXZDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdkNsb3NlcicpO1xuY29uc3Qgc2lkZU5hdkxvZ291dENsb3NlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2TG9nb3V0Q2xvc2VyJyk7XG5jb25zdCBzaWRlTmF2QmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2QmFjaycpO1xuXG5mdW5jdGlvbiBvcGVuTmF2KCkge1xuICAgIGRpc2FibGVTY3JvbGwoKTtcbiAgICBzaWRlTmF2LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDEwMCUpJztcbiAgICBzaWRlTmF2QmFjay5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgIHNpZGVOYXZDbG9zZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2KCkge1xuICAgIGVuYWJsZVNjcm9sbCgpO1xuICAgIHNpZGVOYXYuc3R5bGUudHJhbnNmb3JtID0gJ3Vuc2V0JztcbiAgICBzaWRlTmF2QmFjay5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgIHNpZGVOYXZDbG9zZXIuc3R5bGUud2lkdGggPSAnMCc7XG59XG5cbmlmIChzaWRlTmF2KSB7XG4gICAgc2lkZU5hdk9wZW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5OYXYpO1xuICAgIHNpZGVOYXZDbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU5hdik7XG4gICAgaWYgKHNpZGVOYXZMb2dvdXRDbG9zZXIpIHtcbiAgICAgICAgc2lkZU5hdkxvZ291dENsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2KTtcbiAgICB9XG59XG5cbi8vIE1lZGlhRWxlbWVudCBQbGF5ZXJcblxucmVxdWlyZSgnbWVkaWFlbGVtZW50L2J1aWxkL21lZGlhZWxlbWVudC1hbmQtcGxheWVyLm1pbicpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKCcuYXVkaW8tcGxheWVyIGF1ZGlvJykubWVkaWFlbGVtZW50cGxheWVyKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocGxheWVyLCBub2RlKSB7XG4gICAgICAgICAgICAvLyBPcHRpb25hbFxuICAgICAgICAgICAgJChwbGF5ZXIpLmNsb3Nlc3QoJy5tZWpzX19jb250YWluZXInKS5hdHRyKCdsYW5nJywgbWVqcy5pMThuLmxhbmd1YWdlKCkpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmF0dHIoJ2xhbmcnLCBtZWpzLmkxOG4ubGFuZ3VhZ2UoKSk7XG4gICAgICAgICAgICAvLyBNb3JlIGNvZGVcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnRWb2x1bWU6IDEsXG4gICAgICAgIGF1dG9SZXdpbmQ6IHRydWUsXG4gICAgICAgIGVuYWJsZVByb2dyZXNzVG9vbHRpcDogZmFsc2UsXG4gICAgICAgIGZlYXR1cmVzOiBbJ3BsYXlwYXVzZScsJ1tmZWF0dXJlX25hbWVdJywnY3VycmVudCcsJ3Byb2dyZXNzJywnZHVyYXRpb24nXVxuICAgIH0pXG59KTtcblxuLy8gQ29tbWVudCByZXBseVxuXG5jb25zdCBjb21tZW50V3JpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtY29tbWVudC13cml0ZScpO1xuY29uc3QgY29tbWVudFRleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfbWVzc2FnZScpO1xuY29uc3QgY29tbWVudFJlcGx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnQtcmVwbHknKTtcbmNvbnN0IHJlcGx5VG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudF9yZXBseVRvJyk7XG5jb25zdCByZXBseUZvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X3JlcGx5Rm9yJyk7XG5jb25zdCBjb21tZW50UmVwbHlVc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWNvbW1lbnQtcmVwbHktdXNlcicpO1xuY29uc3QgcmVwbHlpbmdEZWxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtcmVwbHlpbmctZGVsZXRlJyk7XG5cbmlmIChyZXBseWluZ0RlbGV0ZSkge1xuICAgIHJlcGx5aW5nRGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICByZXBseVRvLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgcmVwbHlGb3IucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICBjb21tZW50V3JpdGUuY2xhc3NMaXN0LnJlbW92ZSgnbWQtcmVwbHlpbmcnKTtcbiAgICB9KTtcbn1cblxuaWYgKGNvbW1lbnRSZXBseSkge1xuICAgIGNvbW1lbnRSZXBseS5mb3JFYWNoKChyZXBseSkgPT4ge1xuICAgICAgICBsZXQgcmVwbHlVc2VyID0gcmVwbHkucXVlcnlTZWxlY3RvcignLnJlcGx5LXVzZXInKTtcbiAgICAgICAgbGV0IHJlcGx5Q29tbWVudCA9IHJlcGx5LnF1ZXJ5U2VsZWN0b3IoJy5yZXBseS1jb21tZW50Jyk7XG4gICAgICAgIHJlcGx5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKHJlcGx5KSA9PiB7XG4gICAgICAgICAgICByZXBseVRvLnZhbHVlID0gcmVwbHlVc2VyLmlubmVySFRNTDtcbiAgICAgICAgICAgIHJlcGx5Rm9yLnZhbHVlID0gcmVwbHlDb21tZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbW1lbnRUZXh0QXJlYS5mb2N1cygpO1xuXG4gICAgICAgICAgICBpZiAocmVwbHlUby52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBjb21tZW50V3JpdGUuY2xhc3NMaXN0LmFkZCgnbWQtcmVwbHlpbmcnKTtcbiAgICAgICAgICAgICAgICBjb21tZW50UmVwbHlVc2VyLmlubmVySFRNTCA9IHJlcGx5VG8udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5cbi8vIFNlYXJjaGVyXG5cbmxldCBzZWFyY2hJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWQtc2VhcmNoLWFsbC1pbnB1dCcpO1xuXG5jb25zdCBuYXZiYXJTZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyU2VhcmNoJyk7XG4vLyBjb25zdCBuYXZiYXJTZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZiYXJTZWFyY2hJbnB1dCcpO1xuY29uc3QgbmF2YmFyU2VhcmNoT3BlbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5OYXZiYXJTZWFyY2gnKTtcbmNvbnN0IG5hdmJhclNlYXJjaENsb3NlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZU5hdmJhclNlYXJjaCcpO1xuXG5mdW5jdGlvbiBvcGVuTmF2YmFyU2VhcmNoKCl7XG4gICAgbmF2YmFyU2VhcmNoT3BlbmVyLnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTpub25lICFpbXBvcnRhbnQnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZScpLnN0eWxlLmRpc3BsYXkgPSAndW5zZXQnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZSBpbnB1dCcpLmZvY3VzKCk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2YmFyU2VhcmNoKCl7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1zZWFyY2gtbW9iaWxlJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBuYXZiYXJTZWFyY2hPcGVuZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuaWYgKG5hdmJhclNlYXJjaCkge1xuICAgIG5hdmJhclNlYXJjaE9wZW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5OYXZiYXJTZWFyY2gpO1xuICAgIG5hdmJhclNlYXJjaENsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2YmFyU2VhcmNoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9keS13cmFwcGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU5hdmJhclNlYXJjaCk7XG59XG5cbnNlYXJjaElucHV0cy5mb3JFYWNoKChpbnB1dEJveCxrZXkpID0+IHtcbiAgICBpbnB1dEJveC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX2lucHV0JykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLChpbnB1dCkgPT4ge1xuICAgICAgICBpbnB1dEJveC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX2J1dHRvbicpLmhyZWYgPSAnL3NlYXJjaC8nICsgaW5wdXQudGFyZ2V0LnZhbHVlO1xuICAgIH0pXG5cbiAgICBpbnB1dEJveC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX2lucHV0JykuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzIHx8IGV2ZW50LmNvZGUgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfYnV0dG9uJykuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG59KTtcblxuLy8gRW5hYmxlIHRvb2x0aXBcbiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtcbiAgICAgICAgdHJpZ2dlciA6ICdob3ZlcidcbiAgICB9KVxufSk7XG5cbi8vIEltYWdlIG9uIGNoYW5nZVxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tZmlsZS1pbnB1dCcpKSB7XG4gICAgbGV0IGZpbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tZmlsZS1pbnB1dCcpO1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdEltZ091dHB1dCcpKSB7XG4gICAgICAgIGxldCBwb3N0SW1nT3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RJbWdPdXRwdXQnKTtcbiAgICAgICAgZmlsZUlucHV0Lm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgcG9zdEltZ091dHB1dC5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlSW5wdXQuZmlsZXNbMF0pO1xuICAgICAgICAgICAgcG9zdEltZ091dHB1dC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnOHB4JztcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQtY29udGVudCcpKSB7XG4gICAgICAgIGxldCBvdXRwdXRDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dC1jb250ZW50Jyk7XG4gICAgICAgIGZpbGVJbnB1dC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIG91dHB1dENvbnRlbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcXCcnICsgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZUlucHV0LmZpbGVzWzBdKSArICdcXCcpJztcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIFRleHRhcmVhIGF1dG9zaXplXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWF1dG8tc2l6ZXInKSkge1xuICAgIGxldCB0ZXh0YXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hdXRvLXNpemVyJyk7XG4gICAgdGV4dGFyZWEub25pbnB1dCA9ICgpID0+IHtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuaGVpZ2h0ID0gdGV4dGFyZWEuc2Nyb2xsSGVpZ2h0ICsgMiArIFwicHhcIjtcbiAgICB9O1xufVxuXG4vLyBBdXRvIGNsb3NlIGFsZXJ0c1xuJChcIi5tZC1hbGVydC1hdXRvLWhpZGVcIikuZmFkZVRvKDUwMDAsIDUwMCkuc2xpZGVVcCg1MDAsIGZ1bmN0aW9uKCl7XG4gICAgJChcIi5tZC1hbGVydC1hdXRvLWhpZGVcIikuc2xpZGVVcCg1MDApO1xufSk7XG5cbi8vIFByZXZlbnQgdXNlcm5hbWUgc3ltYm9sc1xuJCgnLnVzZXJuYW1lLWlucHV0Jykub24oJ2tleXByZXNzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Ll9dKyRcIik7XG4gICAgbGV0IGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIWV2ZW50LmNoYXJDb2RlID8gZXZlbnQud2hpY2ggOiBldmVudC5jaGFyQ29kZSk7XG4gICAgaWYgKCFyZWdleC50ZXN0KGtleSkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0pO1xuXG4vLyBQb3N0IGNvbGxhcHNlXG5jb25zdCBwb3N0Q29sbGFwc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9zdC1jb2xsYXBzZScpO1xuXG5wb3N0Q29sbGFwc2UuZm9yRWFjaCgocG9zdCkgPT4ge1xuICAgIGZ1bmN0aW9uIG9wZW5Db2xsYXBzZWRQb3N0KCkge1xuICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0Q29sbGFwc2UnICsgcG9zdElkKS5jbGFzc0xpc3QucmVtb3ZlKCdjbG9zZWQnKTtcbiAgICB9XG5cbiAgICBsZXQgcG9zdElkID0gcG9zdC5pZC5yZXBsYWNlKCdwb3N0Q29sbGFwc2UnLCAnJyk7XG5cbiAgICBpZiAocG9zdC5xdWVyeVNlbGVjdG9yKCdkaXYnKS5jbGllbnRIZWlnaHQgPiA1MCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdENvbGxhcHNlQnV0dG9uJyArIHBvc3RJZCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RDb2xsYXBzZUJ1dHRvbicgKyBwb3N0SWQpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbkNvbGxhcHNlZFBvc3QpO1xufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1aXJlIiwicGxheWxpc3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJib29rbWFyayIsInN3aXRjaGVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInVybCIsImhyZWYiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJTdHJpbmciLCJkYXRhIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZGF0YXNldCIsIm9yaWdpbmFsVGl0bGUiLCJ0aXRsZSIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsImFsZXJ0Qm94IiwicXVlcnlTZWxlY3RvciIsImFsZXJ0RXhpc3QiLCJtZXNzYWdlIiwiYmFkZ2UiLCJvdXRlckhUTUwiLCJpbnNlcnRBZGphY2VudEhUTUwiLCIkIiwiZmFkZVRvIiwic2xpZGVVcCIsInNldFRpbWVvdXQiLCJmb3JFYWNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvbGxvdyIsImZvbGxvd3MiLCJnZXRFbGVtZW50QnlJZCIsImZvbGxvd2VycyIsImlubmVySFRNTCIsInBhcnNlSW50IiwidG9TdHJpbmciLCJ1bmZvbGxvdyIsInVuZm9sbG93cyIsImZvbGxvd2VyQmxvY2siLCJpZCIsInNwbGl0IiwicG9wIiwiY2FuY2VsQnV0dG9uSWQiLCJjbGljayIsImZlYXR1cmVkIiwiZmVhdHVyZWRQb3N0IiwibGlrZSIsImxpa2VQb3N0IiwicG9zdExpa2VDb3VudGVyIiwicmVwbGFjZSIsImN1cnJlbnRMaWtlcyIsInNoYXJlTWVkaWFSZXF1ZXN0IiwidXNlcm5hbWUiLCJzb25nIiwic2hhcmVNZWRpYSIsInNoYXJlTWVkaWFDYW5jZWwiLCJzaGFyZVNvbmdVc2VycyIsInVzZXIiLCJzaGFyZVNlbmRCdXR0b24iLCJzaGFyZVNlbmRDYW5jZWwiLCJzaGFyZVBvc3RCdXR0b24iLCJzaGFyZVBvc3RCdXR0b25GdW5jdGlvbiIsInNoYXJlUG9zdFVzZXJzIiwic2hhcmVQb3N0TW9kYWxGdW5jdGlvbiIsInBvc3QiLCJjb25zb2xlIiwibG9nIiwic2hhcmVQb3N0Q2FuY2VsIiwic2hhcmVQb3N0Q2FuY2VsRnVuY3Rpb24iLCJzaGFyZVBvc3RDb25maXJtQnV0dG9uIiwic2hhcmVQb3N0Q29uZmlybUJ1dHRvbkZ1bmN0aW9uIiwicG9zdElkIiwicG9zdExpa2VyIiwiZ2xvYmFsIiwialF1ZXJ5Iiwia2V5cyIsImUiLCJwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMiLCJrZXlDb2RlIiwic3VwcG9ydHNQYXNzaXZlIiwid2luZG93IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ3aGVlbE9wdCIsInBhc3NpdmUiLCJ3aGVlbEV2ZW50IiwiY3JlYXRlRWxlbWVudCIsImRpc2FibGVTY3JvbGwiLCJlbmFibGVTY3JvbGwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2lkZU5hdiIsInNpZGVOYXZPcGVuZXIiLCJzaWRlTmF2Q2xvc2VyIiwic2lkZU5hdkxvZ291dENsb3NlciIsInNpZGVOYXZCYWNrIiwib3Blbk5hdiIsInRyYW5zZm9ybSIsIm9wYWNpdHkiLCJ3aWR0aCIsImNsb3NlTmF2IiwicmVhZHkiLCJtZWRpYWVsZW1lbnRwbGF5ZXIiLCJzdWNjZXNzIiwicGxheWVyIiwibm9kZSIsImNsb3Nlc3QiLCJhdHRyIiwibWVqcyIsImkxOG4iLCJsYW5ndWFnZSIsInN0YXJ0Vm9sdW1lIiwiYXV0b1Jld2luZCIsImVuYWJsZVByb2dyZXNzVG9vbHRpcCIsImZlYXR1cmVzIiwiY29tbWVudFdyaXRlIiwiY29tbWVudFRleHRBcmVhIiwiY29tbWVudFJlcGx5IiwicmVwbHlUbyIsInJlcGx5Rm9yIiwiY29tbWVudFJlcGx5VXNlciIsInJlcGx5aW5nRGVsZXRlIiwicmVtb3ZlQXR0cmlidXRlIiwicmVwbHkiLCJyZXBseVVzZXIiLCJyZXBseUNvbW1lbnQiLCJ2YWx1ZSIsImZvY3VzIiwic2VhcmNoSW5wdXRzIiwibmF2YmFyU2VhcmNoIiwibmF2YmFyU2VhcmNoT3BlbmVyIiwibmF2YmFyU2VhcmNoQ2xvc2VyIiwib3Blbk5hdmJhclNlYXJjaCIsImNzc1RleHQiLCJkaXNwbGF5IiwiY2xvc2VOYXZiYXJTZWFyY2giLCJpbnB1dEJveCIsImtleSIsImlucHV0IiwidGFyZ2V0IiwiY29kZSIsInRvb2x0aXAiLCJ0cmlnZ2VyIiwiZmlsZUlucHV0IiwicG9zdEltZ091dHB1dCIsIm9uY2hhbmdlIiwic3JjIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiZmlsZXMiLCJtYXJnaW5Cb3R0b20iLCJvdXRwdXRDb250ZW50IiwiYmFja2dyb3VuZEltYWdlIiwidGV4dGFyZWEiLCJvbmlucHV0IiwiaGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0Iiwib24iLCJyZWdleCIsIlJlZ0V4cCIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlIiwid2hpY2giLCJ0ZXN0IiwicG9zdENvbGxhcHNlIiwib3BlbkNvbGxhcHNlZFBvc3QiLCJjbGllbnRIZWlnaHQiXSwic291cmNlUm9vdCI6IiJ9