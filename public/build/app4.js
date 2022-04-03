(self["webpackChunk"] = self["webpackChunk"] || []).push([["app4"],{

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
}); // Post double-click like

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

/***/ "./assets/js/app4.js":
/*!***************************!*\
  !*** ./assets/js/app4.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_app4_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/app4.scss */ "./assets/scss/app4.scss");
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts */ "./assets/js/scripts.js");
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scripts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ajax */ "./assets/js/ajax.js");
/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ajax__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _share__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./share */ "./assets/js/share.js");
/* harmony import */ var _share__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_share__WEBPACK_IMPORTED_MODULE_3__);
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

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/web.url.js */ "./node_modules/core-js/modules/web.url.js");

__webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "./node_modules/core-js/modules/es.regexp.constructor.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

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
    inputBox.querySelector('.search_button').href = '/search/' + input.target.value.replace('#', '%23').replace('%', '%25');
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

/***/ "./assets/js/share.js":
/*!****************************!*\
  !*** ./assets/js/share.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js").default; // -------------------- Share global functions -------------------- //


function shareMediaAlert(event, user, type) {
  function shareType(type) {
    if (type === 'Profile') {
      return user.querySelector('.md-user-id').innerHTML;
    } else {
      return user.querySelector('.md-username').innerHTML;
    }
  }

  var username = shareType(type);
  var media = document.getElementById('share' + type + 'Id').innerHTML;
  var url = '/share' + type + '/' + media + '/' + username;
  document.getElementById('share' + type + 'Username').innerHTML = user.querySelector('.md-username').innerHTML;
  document.getElementById('share' + type + 'Alert').querySelector('a').href = url;
  document.getElementById('share' + type + 'Modal').click();
  document.getElementById('share' + type + 'Confirm').click();
}

function shareMedia(event, type) {
  event.preventDefault();
  var url = event.target.href;
  axios.get(url).then(function (response) {
    document.getElementById('share' + type + 'Alert').click();
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
} // -------------------- Share song -------------------- //
// Song share alert


var shareSongUsers = document.querySelectorAll('#shareSongModal .user-line');
shareSongUsers.forEach(function (user) {
  user.addEventListener('click', function (event) {
    shareMediaAlert(event, user, 'Song');
  });
}); // If song share confirm

var shareSongButton = document.getElementById('shareSongConfirmButton');

if (shareSongButton) {
  shareSongButton.addEventListener('click', function (event) {
    shareMedia(event, 'Song');
  });
} // If song share cancel


function shareSongCancelFunction(event) {
  event.preventDefault();
  document.getElementById('shareSongAlert').click();
  document.getElementById('shareSong').click();
}

var shareSongCancel = document.getElementById('shareSongCancel');

if (shareSongCancel) {
  shareSongCancel.addEventListener('click', shareSongCancelFunction);
} // -------------------- Share post -------------------- //
// Insert post Id


function sharePostButtonFunction() {
  document.getElementById('sharePostId').innerHTML = this.id.replace('sharePostId', '');
}

var sharePostButton = document.querySelectorAll('.share-post-button');
sharePostButton.forEach(function (sharePostButton) {
  sharePostButton.addEventListener('click', sharePostButtonFunction);
}); // Post share alert

var sharePostUsers = document.querySelectorAll('#sharePostModal .user-line');
sharePostUsers.forEach(function (user) {
  user.addEventListener('click', function (event) {
    shareMediaAlert(event, user, 'Post');
  });
}); // If post share confirm

var sharePostConfirmButton = document.getElementById('sharePostConfirmButton');

if (sharePostConfirmButton) {
  sharePostConfirmButton.addEventListener('click', function (event) {
    shareMedia(event, 'Post');
  });
} // If post share cancel


function sharePostCancelFunction() {
  document.getElementById('sharePostAlert').click();
  document.getElementById('sharePostId' + document.getElementById('sharePostId').innerHTML).click();
}

var sharePostCancel = document.getElementById('sharePostCancel');

if (sharePostCancel) {
  sharePostCancel.addEventListener('click', sharePostCancelFunction);
} // -------------------- Share profile -------------------- //
// Profile share alert


var shareProfileUsers = document.querySelectorAll('#shareProfileModal .user-line');
shareProfileUsers.forEach(function (user) {
  user.addEventListener('click', function (event) {
    shareMediaAlert(event, user, 'Profile');
  });
}); // If profile share confirm

var shareProfileButton = document.getElementById('shareProfileConfirmButton');

if (shareProfileButton) {
  shareProfileButton.addEventListener('click', function (event) {
    shareMedia(event, 'Profile');
  });
} // If profile share cancel


function shareProfileCancelFunction(event) {
  event.preventDefault();
  document.getElementById('shareProfileAlert').click();
  document.getElementById('shareProfile').click();
}

var shareProfileCancel = document.getElementById('shareProfileCancel');

if (shareProfileCancel) {
  shareProfileCancel.addEventListener('click', shareProfileCancelFunction);
}

/***/ }),

/***/ "./assets/scss/app4.scss":
/*!*******************************!*\
  !*** ./assets/scss/app4.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_fortawesome_fontawesome-free_js_all_js-node_modules_fortawesome_fontawes-a7977b"], () => (__webpack_exec__("./assets/js/app4.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWpELEVBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsY0FBeEIsRUFBd0NZLEtBQXhDO0FBQ0g7O0FBRUQsSUFBSTRILGtCQUFrQixHQUFHN0ssUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixvQkFBeEIsQ0FBekI7O0FBQ0EsSUFBSXdJLGtCQUFKLEVBQXdCO0FBQ3BCQSxFQUFBQSxrQkFBa0IsQ0FBQzNJLGdCQUFuQixDQUFvQyxPQUFwQyxFQUE2QzBJLDBCQUE3QztBQUNIOzs7Ozs7Ozs7Ozs7QUNuSkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYXBwNC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvc2hhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvYXBwNC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKS5kZWZhdWx0O1xuXG4vLyBBZGQgc29uZyB0byBwbGF5bGlzdCBvciBhZGQgcG9zdCB0byBib29rbWFya3NcblxubGV0IHBsYXlsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXlsaXN0LXRvZ2dsZScpO1xubGV0IGJvb2ttYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvb2ttYXJrLXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBzd2l0Y2hlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVybCA9IHRoaXMuaHJlZjtcblxuICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBzdGF0dXMgPSBTdHJpbmcocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAoc3RhdHVzID09PSAnYWRkZWQnKSA/IHRoaXMuY2xhc3NMaXN0LmFkZCgnYWRkZWQnKSA6IHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWRkZWQnKTtcbiAgICAgICAgdGhpcy5kYXRhc2V0Lm9yaWdpbmFsVGl0bGUgPSByZXNwb25zZS5kYXRhLnJlc3BvbnNlLnRpdGxlO1xuICAgICAgICB0aGlzLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgbGV0IGFsZXJ0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICAgICAgICBsZXQgYWxlcnRFeGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hbGVydCcpO1xuXG4gICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnJlc3BvbnNlLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGxldCBiYWRnZSA9ICcnO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzID09PSAnYWRkZWQnKSB7XG4gICAgICAgICAgICAgICAgYmFkZ2UgPSAnc3VjY2Vzcyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJhZGdlID0gJ2Rhbmdlcic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJtZC1hbGVydCBtZC1hbGVydC0nICsgYmFkZ2UgKyAnIG1kLWJveC1tYlwiPicgK1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEucmVzcG9uc2UubWVzc2FnZSArXG4gICAgICAgICAgICAgICAgJzwvZGl2Pic7XG5cbiAgICAgICAgICAgIGlmIChhbGVydEV4aXN0KSB7XG4gICAgICAgICAgICAgICAgYWxlcnRFeGlzdC5vdXRlckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydEJveC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJChcIi5tZC1hbGVydFwiKS5mYWRlVG8oMzAwMCwgNTAwKS5zbGlkZVVwKDUwMCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLnNsaWRlVXAoNTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5wbGF5bGlzdC5mb3JFYWNoKChwbGF5bGlzdCkgPT4ge1xuICAgIHBsYXlsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpdGNoZXIpO1xufSk7XG5cbmJvb2ttYXJrLmZvckVhY2goKGJvb2ttYXJrKSA9PiB7XG4gICAgYm9va21hcmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hlcik7XG59KTtcblxuLy8gRm9sbG93IGEgdXNlciBvciB1bmZvbGxvdyBmcm9tIHlvdXJzZWxmXG5cbmxldCBmb2xsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9sbG93LXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBmb2xsb3dzKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2FkZGVkJykge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdidG4taW5mbycpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdidG4tbGlnaHQnKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnZm9sbG93ZWQnKTtcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9sbG93ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyJykuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykucXVlcnlTZWxlY3RvcignLm51bWJlcicpLmlubmVySFRNTCA9IChwYXJzZUludChmb2xsb3dlcnMsIDEwKSArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi1saWdodCcpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdmb2xsb3dlZCcpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdidG4taW5mbycpO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKSkge1xuICAgICAgICAgICAgICAgIGxldCBmb2xsb3dlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyJykuaW5uZXJIVE1MID0gKHBhcnNlSW50KGZvbGxvd2VycywgMTApIC0gMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YXNldC5vcmlnaW5hbFRpdGxlID0gcmVzcG9uc2UuZGF0YS5yZXNwb25zZS50aXRsZTtcbiAgICAgICAgdGhpcy5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxubGV0IHVuZm9sbG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuZm9sbG93LXRvZ2dsZScpO1xuXG5mb2xsb3cuZm9yRWFjaCgoZm9sbG93KSA9PiB7XG4gICAgZm9sbG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZm9sbG93cyk7XG59KTtcblxuZnVuY3Rpb24gdW5mb2xsb3dzKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuICAgIGxldCBmb2xsb3dlckJsb2NrID0gJ3UnICsgdGhpcy5pZC5zcGxpdCgndScpLnBvcCgpLnNwbGl0KCd0JylbMF0gKyAnbCc7XG4gICAgbGV0IGNhbmNlbEJ1dHRvbklkID0gJ3VzZXJVbmZvbGxvdycgKyB0aGlzLmlkLnNwbGl0KCd1JykucG9wKCkuc3BsaXQoJ3QnKVswXTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW5jZWxCdXR0b25JZCkuY2xpY2soKTtcblxuICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBzdGF0dXMgPSBTdHJpbmcocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICBpZiAoc3RhdHVzID09PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZvbGxvd2VyQmxvY2spLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxudW5mb2xsb3cuZm9yRWFjaCgodW5mb2xsb3cpID0+IHtcbiAgICB1bmZvbGxvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVuZm9sbG93cyk7XG59KTtcblxuLy8gTWFrZSBwb3N0IGZlYXR1cmVkXG5cbmxldCBmZWF0dXJlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mZWF0dXJlZC10b2dnbGUnKTtcblxuZnVuY3Rpb24gZmVhdHVyZWRQb3N0KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gdGhpcy5jbGFzc0xpc3QuYWRkKCdhZGRlZCcpIDogdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhZGRlZCcpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxuZmVhdHVyZWQuZm9yRWFjaCgoZmVhdHVyZWQpID0+IHtcbiAgICBmZWF0dXJlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZlYXR1cmVkUG9zdCk7XG59KTtcblxuLy8gUG9zdCBsaWtlXG5cbmxldCBsaWtlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpa2UtdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIGxpa2VQb3N0KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gdGhpcy5jbGFzc0xpc3QuYWRkKCdhZGRlZCcpIDogdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhZGRlZCcpO1xuXG4gICAgICAgIGxldCBwb3N0TGlrZUNvdW50ZXIgPSAncG9zdC1saWtlLWNvdW50ZXItJyArIHRoaXMuaWQucmVwbGFjZSgncG9zdC1saWtlLScsJycpO1xuICAgICAgICBsZXQgY3VycmVudExpa2VzID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zdExpa2VDb3VudGVyKS5pbm5lckhUTUwpO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvc3RMaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzICsgMTtcbiAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3N0TGlrZUNvdW50ZXIpLmlubmVySFRNTCA9IGN1cnJlbnRMaWtlcyAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIFt0aGlzXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDApO1xuICAgIH0pXG59XG5cbmxpa2UuZm9yRWFjaCgobGlrZSkgPT4ge1xuICAgIGxpa2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsaWtlUG9zdCk7XG59KTtcblxuLy8gUG9zdCBkb3VibGUtY2xpY2sgbGlrZVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWQtcG9zdCcpLmZvckVhY2goKHBvc3QpID0+IHtcbiAgICBsZXQgcG9zdElkID0gcG9zdC5pZC5yZXBsYWNlKCdwb3N0SWQnLCAnJyk7XG4gICAgcG9zdC5xdWVyeVNlbGVjdG9yKCcucG9zdC1pbWFnZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywoZXZlbnQpID0+IHtcbiAgICAgICAgbGV0IHBvc3RMaWtlciA9IHBvc3QucXVlcnlTZWxlY3RvcignLmxpa2UtdG9nZ2xlJyk7XG4gICAgICAgIGxldCB1cmwgPSBwb3N0TGlrZXIuaHJlZjtcblxuICAgICAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgICAgICAoc3RhdHVzID09PSAnYWRkZWQnKSA/IHBvc3RMaWtlci5jbGFzc0xpc3QuYWRkKCdhZGRlZCcpIDogcG9zdExpa2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG5cbiAgICAgICAgICAgIGxldCBwb3N0TGlrZUNvdW50ZXIgPSAncG9zdC1saWtlLWNvdW50ZXItJyArIHBvc3RMaWtlci5pZC5yZXBsYWNlKCdwb3N0LWxpa2UtJywnJyk7XG4gICAgICAgICAgICBsZXQgY3VycmVudExpa2VzID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zdExpa2VDb3VudGVyKS5pbm5lckhUTUwpO1xuXG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnYWRkZWQnKSB7XG4gICAgICAgICAgICAgICAgcG9zdC5xdWVyeVNlbGVjdG9yKCcucG9zdC1saWtlcicpLmNsYXNzTGlzdC5hZGQoJ2xpa2UnKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zdC5xdWVyeVNlbGVjdG9yKCcucG9zdC1saWtlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xpa2UnKTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3N0TGlrZUNvdW50ZXIpLmlubmVySFRNTCA9IGN1cnJlbnRMaWtlcyArIDE7XG4gICAgICAgICAgICB9IGVsc2UgIHtcbiAgICAgICAgICAgICAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWxpa2VyJykuY2xhc3NMaXN0LmFkZCgnZGlzbGlrZScpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWxpa2VyJykuY2xhc3NMaXN0LnJlbW92ZSgnZGlzbGlrZScpO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvc3RMaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzIC0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgW3Bvc3RMaWtlcl0uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbn0pO1xuIiwiLypcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcbiAqXG4gKiBXZSByZWNvbW1lbmQgaW5jbHVkaW5nIHRoZSBidWlsdCB2ZXJzaW9uIG9mIHRoaXMgSmF2YVNjcmlwdCBmaWxlXG4gKiAoYW5kIGl0cyBDU1MgZmlsZSkgaW4geW91ciBiYXNlIGxheW91dCAoYmFzZS5odG1sLnR3aWcpLlxuICovXG5cbi8vIGFueSBDU1MgeW91IGltcG9ydCB3aWxsIG91dHB1dCBpbnRvIGEgc2luZ2xlIHNjc3MgZmlsZSAoYXBwRmlsZS5zY3NzIGluIHRoaXMgY2FzZSlcbmltcG9ydCAnLi4vc2Nzcy9hcHA0LnNjc3MnO1xuXG4vLyBBd2Vzb21lIGZvbnRzXG5yZXF1aXJlKCdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLm1pbi5jc3MnKTtcbnJlcXVpcmUoJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2pzL2FsbC5qcycpO1xuXG4vLyBOZWVkIGpRdWVyeT8gSW5zdGFsbCBpdCB3aXRoIFwieWFybiBhZGQganF1ZXJ5XCIsIHRoZW4gdW5jb21tZW50IHRvIGltcG9ydCBpdC5cbi8vIGltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5sZXQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuZ2xvYmFsLiQgPSBnbG9iYWwualF1ZXJ5ID0gJDtcblxuLy8gQm9vdHN0cmFwIGpzXG5yZXF1aXJlKCdib290c3RyYXAnKTtcblxuLy8gTXkgc2NyaXB0c1xuaW1wb3J0ICcuL3NjcmlwdHMnO1xuaW1wb3J0ICcuL2FqYXgnO1xuaW1wb3J0ICcuL3NoYXJlJztcbiIsIi8vIFByZXZlbnQgc2Nyb2xsXG5cbmNvbnN0ICQgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xubGV0IGtleXMgPSB7Mzc6IDEsIDM4OiAxLCAzOTogMSwgNDA6IDF9O1xuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMoZSkge1xuICAgIGlmIChrZXlzW2Uua2V5Q29kZV0pIHtcbiAgICAgICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmxldCBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcbnRyeSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsIG51bGwsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlOyB9XG4gICAgfSkpO1xufSBjYXRjaChlKSB7fVxuXG5sZXQgd2hlZWxPcHQgPSBzdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IGZhbHNlIH0gOiBmYWxzZTtcbmxldCB3aGVlbEV2ZW50ID0gJ29ud2hlZWwnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpID8gJ3doZWVsJyA6ICdtb3VzZXdoZWVsJztcblxuZnVuY3Rpb24gZGlzYWJsZVNjcm9sbCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpOyAvLyBvbGRlciBGRlxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKHdoZWVsRXZlbnQsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7IC8vIG1vZGVybiBkZXNrdG9wXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7IC8vIG1vYmlsZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZVNjcm9sbCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKHdoZWVsRXZlbnQsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMsIGZhbHNlKTtcbn1cblxuLy8gTW9iaWxlIG5hdmJhclxuXG5jb25zdCBzaWRlTmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXYnKTtcbmNvbnN0IHNpZGVOYXZPcGVuZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdk9wZW5lcicpO1xuY29uc3Qgc2lkZU5hdkNsb3NlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2Q2xvc2VyJyk7XG5jb25zdCBzaWRlTmF2TG9nb3V0Q2xvc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZMb2dvdXRDbG9zZXInKTtcbmNvbnN0IHNpZGVOYXZCYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZCYWNrJyk7XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gICAgZGlzYWJsZVNjcm9sbCgpO1xuICAgIHNpZGVOYXYuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoMTAwJSknO1xuICAgIHNpZGVOYXZCYWNrLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgc2lkZU5hdkNsb3Nlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYoKSB7XG4gICAgZW5hYmxlU2Nyb2xsKCk7XG4gICAgc2lkZU5hdi5zdHlsZS50cmFuc2Zvcm0gPSAndW5zZXQnO1xuICAgIHNpZGVOYXZCYWNrLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgc2lkZU5hdkNsb3Nlci5zdHlsZS53aWR0aCA9ICcwJztcbn1cblxuaWYgKHNpZGVOYXYpIHtcbiAgICBzaWRlTmF2T3BlbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk5hdik7XG4gICAgc2lkZU5hdkNsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2KTtcbiAgICBpZiAoc2lkZU5hdkxvZ291dENsb3Nlcikge1xuICAgICAgICBzaWRlTmF2TG9nb3V0Q2xvc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VOYXYpO1xuICAgIH1cbn1cblxuLy8gTWVkaWFFbGVtZW50IFBsYXllclxuXG5yZXF1aXJlKCdtZWRpYWVsZW1lbnQvYnVpbGQvbWVkaWFlbGVtZW50LWFuZC1wbGF5ZXIubWluJyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICQoJy5hdWRpby1wbGF5ZXIgYXVkaW8nKS5tZWRpYWVsZW1lbnRwbGF5ZXIoe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihwbGF5ZXIsIG5vZGUpIHtcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsXG4gICAgICAgICAgICAkKHBsYXllcikuY2xvc2VzdCgnLm1lanNfX2NvbnRhaW5lcicpLmF0dHIoJ2xhbmcnLCBtZWpzLmkxOG4ubGFuZ3VhZ2UoKSk7XG4gICAgICAgICAgICAkKCdodG1sJykuYXR0cignbGFuZycsIG1lanMuaTE4bi5sYW5ndWFnZSgpKTtcbiAgICAgICAgICAgIC8vIE1vcmUgY29kZVxuICAgICAgICB9LFxuICAgICAgICBzdGFydFZvbHVtZTogMSxcbiAgICAgICAgYXV0b1Jld2luZDogdHJ1ZSxcbiAgICAgICAgZW5hYmxlUHJvZ3Jlc3NUb29sdGlwOiBmYWxzZSxcbiAgICAgICAgZmVhdHVyZXM6IFsncGxheXBhdXNlJywnW2ZlYXR1cmVfbmFtZV0nLCdjdXJyZW50JywncHJvZ3Jlc3MnLCdkdXJhdGlvbiddXG4gICAgfSlcbn0pO1xuXG4vLyBDb21tZW50IHJlcGx5XG5cbmNvbnN0IGNvbW1lbnRXcml0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1jb21tZW50LXdyaXRlJyk7XG5jb25zdCBjb21tZW50VGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudF9tZXNzYWdlJyk7XG5jb25zdCBjb21tZW50UmVwbHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudC1yZXBseScpO1xuY29uc3QgcmVwbHlUbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X3JlcGx5VG8nKTtcbmNvbnN0IHJlcGx5Rm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfcmVwbHlGb3InKTtcbmNvbnN0IGNvbW1lbnRSZXBseVVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtY29tbWVudC1yZXBseS11c2VyJyk7XG5jb25zdCByZXBseWluZ0RlbGV0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1yZXBseWluZy1kZWxldGUnKTtcblxuaWYgKHJlcGx5aW5nRGVsZXRlKSB7XG4gICAgcmVwbHlpbmdEZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHJlcGx5VG8ucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICByZXBseUZvci5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIGNvbW1lbnRXcml0ZS5jbGFzc0xpc3QucmVtb3ZlKCdtZC1yZXBseWluZycpO1xuICAgIH0pO1xufVxuXG5pZiAoY29tbWVudFJlcGx5KSB7XG4gICAgY29tbWVudFJlcGx5LmZvckVhY2goKHJlcGx5KSA9PiB7XG4gICAgICAgIGxldCByZXBseVVzZXIgPSByZXBseS5xdWVyeVNlbGVjdG9yKCcucmVwbHktdXNlcicpO1xuICAgICAgICBsZXQgcmVwbHlDb21tZW50ID0gcmVwbHkucXVlcnlTZWxlY3RvcignLnJlcGx5LWNvbW1lbnQnKTtcbiAgICAgICAgcmVwbHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAocmVwbHkpID0+IHtcbiAgICAgICAgICAgIHJlcGx5VG8udmFsdWUgPSByZXBseVVzZXIuaW5uZXJIVE1MO1xuICAgICAgICAgICAgcmVwbHlGb3IudmFsdWUgPSByZXBseUNvbW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgY29tbWVudFRleHRBcmVhLmZvY3VzKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXBseVRvLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGNvbW1lbnRXcml0ZS5jbGFzc0xpc3QuYWRkKCdtZC1yZXBseWluZycpO1xuICAgICAgICAgICAgICAgIGNvbW1lbnRSZXBseVVzZXIuaW5uZXJIVE1MID0gcmVwbHlUby52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblxuLy8gU2VhcmNoZXJcblxubGV0IHNlYXJjaElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZC1zZWFyY2gtYWxsLWlucHV0Jyk7XG5cbmNvbnN0IG5hdmJhclNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZiYXJTZWFyY2gnKTtcbi8vIGNvbnN0IG5hdmJhclNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhclNlYXJjaElucHV0Jyk7XG5jb25zdCBuYXZiYXJTZWFyY2hPcGVuZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbk5hdmJhclNlYXJjaCcpO1xuY29uc3QgbmF2YmFyU2VhcmNoQ2xvc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlTmF2YmFyU2VhcmNoJyk7XG5cbmZ1bmN0aW9uIG9wZW5OYXZiYXJTZWFyY2goKXtcbiAgICBuYXZiYXJTZWFyY2hPcGVuZXIuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5Om5vbmUgIWltcG9ydGFudCc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1zZWFyY2gtbW9iaWxlJykuc3R5bGUuZGlzcGxheSA9ICd1bnNldCc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1zZWFyY2gtbW9iaWxlIGlucHV0JykuZm9jdXMoKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXZiYXJTZWFyY2goKXtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXNlYXJjaC1tb2JpbGUnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIG5hdmJhclNlYXJjaE9wZW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5pZiAobmF2YmFyU2VhcmNoKSB7XG4gICAgbmF2YmFyU2VhcmNoT3BlbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk5hdmJhclNlYXJjaCk7XG4gICAgbmF2YmFyU2VhcmNoQ2xvc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VOYXZiYXJTZWFyY2gpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2R5LXdyYXBwZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2YmFyU2VhcmNoKTtcbn1cblxuc2VhcmNoSW5wdXRzLmZvckVhY2goKGlucHV0Qm94LGtleSkgPT4ge1xuICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsKGlucHV0KSA9PiB7XG4gICAgICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfYnV0dG9uJykuaHJlZiA9ICcvc2VhcmNoLycgKyBpbnB1dC50YXJnZXQudmFsdWUucmVwbGFjZSgnIycsICclMjMnKS5yZXBsYWNlKCclJywgJyUyNScpO1xuICAgIH0pXG5cbiAgICBpbnB1dEJveC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX2lucHV0JykuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzIHx8IGV2ZW50LmNvZGUgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfYnV0dG9uJykuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG59KTtcblxuLy8gRW5hYmxlIHRvb2x0aXBcbiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtcbiAgICAgICAgdHJpZ2dlciA6ICdob3ZlcidcbiAgICB9KVxufSk7XG5cbi8vIEltYWdlIG9uIGNoYW5nZVxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tZmlsZS1pbnB1dCcpKSB7XG4gICAgbGV0IGZpbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tZmlsZS1pbnB1dCcpO1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdEltZ091dHB1dCcpKSB7XG4gICAgICAgIGxldCBwb3N0SW1nT3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RJbWdPdXRwdXQnKTtcbiAgICAgICAgZmlsZUlucHV0Lm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgcG9zdEltZ091dHB1dC5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlSW5wdXQuZmlsZXNbMF0pO1xuICAgICAgICAgICAgcG9zdEltZ091dHB1dC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnOHB4JztcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQtY29udGVudCcpKSB7XG4gICAgICAgIGxldCBvdXRwdXRDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dC1jb250ZW50Jyk7XG4gICAgICAgIGZpbGVJbnB1dC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIG91dHB1dENvbnRlbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcXCcnICsgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZUlucHV0LmZpbGVzWzBdKSArICdcXCcpJztcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIFRleHRhcmVhIGF1dG9zaXplXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWF1dG8tc2l6ZXInKSkge1xuICAgIGxldCB0ZXh0YXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hdXRvLXNpemVyJyk7XG4gICAgdGV4dGFyZWEub25pbnB1dCA9ICgpID0+IHtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuaGVpZ2h0ID0gdGV4dGFyZWEuc2Nyb2xsSGVpZ2h0ICsgMiArIFwicHhcIjtcbiAgICB9O1xufVxuXG4vLyBBdXRvIGNsb3NlIGFsZXJ0c1xuJChcIi5tZC1hbGVydC1hdXRvLWhpZGVcIikuZmFkZVRvKDUwMDAsIDUwMCkuc2xpZGVVcCg1MDAsIGZ1bmN0aW9uKCl7XG4gICAgJChcIi5tZC1hbGVydC1hdXRvLWhpZGVcIikuc2xpZGVVcCg1MDApO1xufSk7XG5cbi8vIFByZXZlbnQgdXNlcm5hbWUgc3ltYm9sc1xuJCgnLnVzZXJuYW1lLWlucHV0Jykub24oJ2tleXByZXNzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Ll9dKyRcIik7XG4gICAgbGV0IGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIWV2ZW50LmNoYXJDb2RlID8gZXZlbnQud2hpY2ggOiBldmVudC5jaGFyQ29kZSk7XG4gICAgaWYgKCFyZWdleC50ZXN0KGtleSkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0pO1xuXG4vLyBQb3N0IGNvbGxhcHNlXG5jb25zdCBwb3N0Q29sbGFwc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9zdC1jb2xsYXBzZScpO1xuXG5wb3N0Q29sbGFwc2UuZm9yRWFjaCgocG9zdCkgPT4ge1xuICAgIGZ1bmN0aW9uIG9wZW5Db2xsYXBzZWRQb3N0KCkge1xuICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0Q29sbGFwc2UnICsgcG9zdElkKS5jbGFzc0xpc3QucmVtb3ZlKCdjbG9zZWQnKTtcbiAgICB9XG5cbiAgICBsZXQgcG9zdElkID0gcG9zdC5pZC5yZXBsYWNlKCdwb3N0Q29sbGFwc2UnLCAnJyk7XG5cbiAgICBpZiAocG9zdC5xdWVyeVNlbGVjdG9yKCdkaXYnKS5jbGllbnRIZWlnaHQgPiA1MCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdENvbGxhcHNlQnV0dG9uJyArIHBvc3RJZCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RDb2xsYXBzZUJ1dHRvbicgKyBwb3N0SWQpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbkNvbGxhcHNlZFBvc3QpO1xufSk7XG4iLCJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJykuZGVmYXVsdDtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gU2hhcmUgZ2xvYmFsIGZ1bmN0aW9ucyAtLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBzaGFyZU1lZGlhQWxlcnQoZXZlbnQsdXNlcix0eXBlKSB7XG5cbiAgICBmdW5jdGlvbiBzaGFyZVR5cGUodHlwZSkge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ1Byb2ZpbGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gdXNlci5xdWVyeVNlbGVjdG9yKCcubWQtdXNlci1pZCcpLmlubmVySFRNTDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB1c2VyLnF1ZXJ5U2VsZWN0b3IoJy5tZC11c2VybmFtZScpLmlubmVySFRNTDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgdXNlcm5hbWUgPSBzaGFyZVR5cGUodHlwZSk7XG4gICAgbGV0IG1lZGlhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlJyArIHR5cGUgKyAnSWQnKS5pbm5lckhUTUw7XG4gICAgbGV0IHVybCA9ICcvc2hhcmUnICsgdHlwZSArICcvJyArIG1lZGlhICsgJy8nICsgdXNlcm5hbWU7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmUnICsgdHlwZSArICdVc2VybmFtZScpLmlubmVySFRNTCA9IHVzZXIucXVlcnlTZWxlY3RvcignLm1kLXVzZXJuYW1lJykuaW5uZXJIVE1MO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZScgKyB0eXBlICsgJ0FsZXJ0JykucXVlcnlTZWxlY3RvcignYScpLmhyZWYgPSB1cmw7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmUnICsgdHlwZSArICdNb2RhbCcpLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlJyArIHR5cGUgKyAnQ29uZmlybScpLmNsaWNrKCk7XG59XG5cbmZ1bmN0aW9uIHNoYXJlTWVkaWEoZXZlbnQsIHR5cGUpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSBldmVudC50YXJnZXQuaHJlZjtcblxuICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZScgKyB0eXBlICsgJ0FsZXJ0JykuY2xpY2soKTtcblxuICAgICAgICBsZXQgbWVzc2FnZSA9ICc8ZGl2IGNsYXNzPVwibWQtYWxlcnQgbWQtYWxlcnQtc3VjY2VzcyBtZC1ib3gtbWJcIj4nICtcbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEucmVzcG9uc2UubWVzc2FnZSArXG4gICAgICAgICAgICAnPC9kaXY+JztcblxuICAgICAgICBsZXQgYWxlcnRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgICAgIGxldCBhbGVydEV4aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWFsZXJ0Jyk7XG5cbiAgICAgICAgaWYgKGFsZXJ0RXhpc3QpIHtcbiAgICAgICAgICAgIGFsZXJ0RXhpc3Qub3V0ZXJIVE1MID0gbWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0Qm94Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIG1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgJChcIi5tZC1hbGVydFwiKS5mYWRlVG8oMzAwMCwgNTAwKS5zbGlkZVVwKDUwMCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoXCIubWQtYWxlcnRcIikuc2xpZGVVcCg1MDApO1xuICAgICAgICB9KTtcbiAgICB9KVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBTaGFyZSBzb25nIC0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIFNvbmcgc2hhcmUgYWxlcnRcbmxldCBzaGFyZVNvbmdVc2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNzaGFyZVNvbmdNb2RhbCAudXNlci1saW5lJyk7XG5zaGFyZVNvbmdVc2Vycy5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgdXNlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBzaGFyZU1lZGlhQWxlcnQoZXZlbnQsdXNlciwnU29uZycpO1xuICAgIH0pXG59KTtcblxuLy8gSWYgc29uZyBzaGFyZSBjb25maXJtXG5sZXQgc2hhcmVTb25nQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlU29uZ0NvbmZpcm1CdXR0b24nKTtcbmlmIChzaGFyZVNvbmdCdXR0b24pIHtcbiAgICBzaGFyZVNvbmdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgc2hhcmVNZWRpYShldmVudCwnU29uZycpO1xuICAgIH0pO1xufVxuXG4vLyBJZiBzb25nIHNoYXJlIGNhbmNlbFxuZnVuY3Rpb24gc2hhcmVTb25nQ2FuY2VsRnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVNvbmdBbGVydCcpLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlU29uZycpLmNsaWNrKCk7XG59XG5cbmxldCBzaGFyZVNvbmdDYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVTb25nQ2FuY2VsJyk7XG5pZiAoc2hhcmVTb25nQ2FuY2VsKSB7XG4gICAgc2hhcmVTb25nQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hhcmVTb25nQ2FuY2VsRnVuY3Rpb24pO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBTaGFyZSBwb3N0IC0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIEluc2VydCBwb3N0IElkXG5mdW5jdGlvbiBzaGFyZVBvc3RCdXR0b25GdW5jdGlvbigpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQb3N0SWQnKS5pbm5lckhUTUwgPSB0aGlzLmlkLnJlcGxhY2UoJ3NoYXJlUG9zdElkJywgJycpO1xufVxuXG5sZXQgc2hhcmVQb3N0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoYXJlLXBvc3QtYnV0dG9uJyk7XG5zaGFyZVBvc3RCdXR0b24uZm9yRWFjaCgoc2hhcmVQb3N0QnV0dG9uKSA9PiB7XG4gICAgc2hhcmVQb3N0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hhcmVQb3N0QnV0dG9uRnVuY3Rpb24pXG59KTtcblxuLy8gUG9zdCBzaGFyZSBhbGVydFxubGV0IHNoYXJlUG9zdFVzZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3NoYXJlUG9zdE1vZGFsIC51c2VyLWxpbmUnKTtcbnNoYXJlUG9zdFVzZXJzLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICB1c2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIHNoYXJlTWVkaWFBbGVydChldmVudCx1c2VyLCdQb3N0Jyk7XG4gICAgfSlcbn0pXG5cbi8vIElmIHBvc3Qgc2hhcmUgY29uZmlybVxubGV0IHNoYXJlUG9zdENvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQb3N0Q29uZmlybUJ1dHRvbicpO1xuaWYgKHNoYXJlUG9zdENvbmZpcm1CdXR0b24pIHtcbiAgICBzaGFyZVBvc3RDb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIHNoYXJlTWVkaWEoZXZlbnQsJ1Bvc3QnKTtcbiAgICB9KVxufVxuXG4vLyBJZiBwb3N0IHNoYXJlIGNhbmNlbFxuZnVuY3Rpb24gc2hhcmVQb3N0Q2FuY2VsRnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUG9zdEFsZXJ0JykuY2xpY2soKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQb3N0SWQnICsgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUG9zdElkJykuaW5uZXJIVE1MKS5jbGljaygpO1xufVxuXG5sZXQgc2hhcmVQb3N0Q2FuY2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUG9zdENhbmNlbCcpO1xuaWYgKHNoYXJlUG9zdENhbmNlbCkge1xuICAgIHNoYXJlUG9zdENhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNoYXJlUG9zdENhbmNlbEZ1bmN0aW9uKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0gU2hhcmUgcHJvZmlsZSAtLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBQcm9maWxlIHNoYXJlIGFsZXJ0XG5sZXQgc2hhcmVQcm9maWxlVXNlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjc2hhcmVQcm9maWxlTW9kYWwgLnVzZXItbGluZScpO1xuc2hhcmVQcm9maWxlVXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgIHVzZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgc2hhcmVNZWRpYUFsZXJ0KGV2ZW50LHVzZXIsJ1Byb2ZpbGUnKTtcbiAgICB9KVxufSk7XG5cbi8vIElmIHByb2ZpbGUgc2hhcmUgY29uZmlybVxubGV0IHNoYXJlUHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVByb2ZpbGVDb25maXJtQnV0dG9uJyk7XG5pZiAoc2hhcmVQcm9maWxlQnV0dG9uKSB7XG4gICAgc2hhcmVQcm9maWxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIHNoYXJlTWVkaWEoZXZlbnQsJ1Byb2ZpbGUnKTtcbiAgICB9KTtcbn1cblxuLy8gSWYgcHJvZmlsZSBzaGFyZSBjYW5jZWxcbmZ1bmN0aW9uIHNoYXJlUHJvZmlsZUNhbmNlbEZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQcm9maWxlQWxlcnQnKS5jbGljaygpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVByb2ZpbGUnKS5jbGljaygpO1xufVxuXG5sZXQgc2hhcmVQcm9maWxlQ2FuY2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUHJvZmlsZUNhbmNlbCcpO1xuaWYgKHNoYXJlUHJvZmlsZUNhbmNlbCkge1xuICAgIHNoYXJlUHJvZmlsZUNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNoYXJlUHJvZmlsZUNhbmNlbEZ1bmN0aW9uKTtcbn1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJheGlvcyIsInJlcXVpcmUiLCJwbGF5bGlzdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImJvb2ttYXJrIiwic3dpdGNoZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidXJsIiwiaHJlZiIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsInN0YXR1cyIsIlN0cmluZyIsImRhdGEiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkYXRhc2V0Iiwib3JpZ2luYWxUaXRsZSIsInRpdGxlIiwic3R5bGUiLCJwb2ludGVyRXZlbnRzIiwiYWxlcnRCb3giLCJxdWVyeVNlbGVjdG9yIiwiYWxlcnRFeGlzdCIsIm1lc3NhZ2UiLCJiYWRnZSIsIm91dGVySFRNTCIsImluc2VydEFkamFjZW50SFRNTCIsIiQiLCJmYWRlVG8iLCJzbGlkZVVwIiwic2V0VGltZW91dCIsImZvckVhY2giLCJhZGRFdmVudExpc3RlbmVyIiwiZm9sbG93IiwiZm9sbG93cyIsImdldEVsZW1lbnRCeUlkIiwiZm9sbG93ZXJzIiwiaW5uZXJIVE1MIiwicGFyc2VJbnQiLCJ0b1N0cmluZyIsInVuZm9sbG93IiwidW5mb2xsb3dzIiwiZm9sbG93ZXJCbG9jayIsImlkIiwic3BsaXQiLCJwb3AiLCJjYW5jZWxCdXR0b25JZCIsImNsaWNrIiwiZmVhdHVyZWQiLCJmZWF0dXJlZFBvc3QiLCJsaWtlIiwibGlrZVBvc3QiLCJwb3N0TGlrZUNvdW50ZXIiLCJyZXBsYWNlIiwiY3VycmVudExpa2VzIiwicG9zdCIsInBvc3RJZCIsInBvc3RMaWtlciIsImdsb2JhbCIsImpRdWVyeSIsImtleXMiLCJlIiwicHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzIiwia2V5Q29kZSIsInN1cHBvcnRzUGFzc2l2ZSIsIndpbmRvdyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid2hlZWxPcHQiLCJwYXNzaXZlIiwid2hlZWxFdmVudCIsImNyZWF0ZUVsZW1lbnQiLCJkaXNhYmxlU2Nyb2xsIiwiZW5hYmxlU2Nyb2xsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNpZGVOYXYiLCJzaWRlTmF2T3BlbmVyIiwic2lkZU5hdkNsb3NlciIsInNpZGVOYXZMb2dvdXRDbG9zZXIiLCJzaWRlTmF2QmFjayIsIm9wZW5OYXYiLCJ0cmFuc2Zvcm0iLCJvcGFjaXR5Iiwid2lkdGgiLCJjbG9zZU5hdiIsInJlYWR5IiwibWVkaWFlbGVtZW50cGxheWVyIiwic3VjY2VzcyIsInBsYXllciIsIm5vZGUiLCJjbG9zZXN0IiwiYXR0ciIsIm1lanMiLCJpMThuIiwibGFuZ3VhZ2UiLCJzdGFydFZvbHVtZSIsImF1dG9SZXdpbmQiLCJlbmFibGVQcm9ncmVzc1Rvb2x0aXAiLCJmZWF0dXJlcyIsImNvbW1lbnRXcml0ZSIsImNvbW1lbnRUZXh0QXJlYSIsImNvbW1lbnRSZXBseSIsInJlcGx5VG8iLCJyZXBseUZvciIsImNvbW1lbnRSZXBseVVzZXIiLCJyZXBseWluZ0RlbGV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInJlcGx5IiwicmVwbHlVc2VyIiwicmVwbHlDb21tZW50IiwidmFsdWUiLCJmb2N1cyIsInNlYXJjaElucHV0cyIsIm5hdmJhclNlYXJjaCIsIm5hdmJhclNlYXJjaE9wZW5lciIsIm5hdmJhclNlYXJjaENsb3NlciIsIm9wZW5OYXZiYXJTZWFyY2giLCJjc3NUZXh0IiwiZGlzcGxheSIsImNsb3NlTmF2YmFyU2VhcmNoIiwiaW5wdXRCb3giLCJrZXkiLCJpbnB1dCIsInRhcmdldCIsImNvZGUiLCJ0b29sdGlwIiwidHJpZ2dlciIsImZpbGVJbnB1dCIsInBvc3RJbWdPdXRwdXQiLCJvbmNoYW5nZSIsInNyYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImZpbGVzIiwibWFyZ2luQm90dG9tIiwib3V0cHV0Q29udGVudCIsImJhY2tncm91bmRJbWFnZSIsInRleHRhcmVhIiwib25pbnB1dCIsImhlaWdodCIsInNjcm9sbEhlaWdodCIsIm9uIiwicmVnZXgiLCJSZWdFeHAiLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZSIsIndoaWNoIiwidGVzdCIsInBvc3RDb2xsYXBzZSIsIm9wZW5Db2xsYXBzZWRQb3N0IiwiY2xpZW50SGVpZ2h0Iiwic2hhcmVNZWRpYUFsZXJ0IiwidXNlciIsInR5cGUiLCJzaGFyZVR5cGUiLCJ1c2VybmFtZSIsIm1lZGlhIiwic2hhcmVNZWRpYSIsInNoYXJlU29uZ1VzZXJzIiwic2hhcmVTb25nQnV0dG9uIiwic2hhcmVTb25nQ2FuY2VsRnVuY3Rpb24iLCJzaGFyZVNvbmdDYW5jZWwiLCJzaGFyZVBvc3RCdXR0b25GdW5jdGlvbiIsInNoYXJlUG9zdEJ1dHRvbiIsInNoYXJlUG9zdFVzZXJzIiwic2hhcmVQb3N0Q29uZmlybUJ1dHRvbiIsInNoYXJlUG9zdENhbmNlbEZ1bmN0aW9uIiwic2hhcmVQb3N0Q2FuY2VsIiwic2hhcmVQcm9maWxlVXNlcnMiLCJzaGFyZVByb2ZpbGVCdXR0b24iLCJzaGFyZVByb2ZpbGVDYW5jZWxGdW5jdGlvbiIsInNoYXJlUHJvZmlsZUNhbmNlbCJdLCJzb3VyY2VSb290IjoiIn0=