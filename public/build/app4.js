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
    } else if (status === 'requested') {
      _this2.classList.remove('btn-info');

      _this2.classList.add('btn-light');

      _this2.classList.add('requested');
    } else {
      if (document.getElementById('profileFollowers') && !document.querySelector('.requested')) {
        var _followers = document.getElementById('profileFollowers').querySelector('.number').innerHTML;
        document.getElementById('profileFollowers').querySelector('.number').innerHTML = (parseInt(_followers, 10) - 1).toString();
      }

      _this2.classList.remove('btn-light');

      _this2.classList.remove('followed');

      _this2.classList.remove('requested');

      _this2.classList.add('btn-info');
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
}); // Accept or reject follow request

function rejectRequestFunction(event, requestResponse) {
  event.preventDefault();
  var url = event.target.href;
  var followerBlock = 'u' + event.target.id.split('u').pop().split('t')[0] + 'l';

  if (requestResponse === 'rejected') {
    var cancelButtonId = 'rejectRequest' + event.target.id.split('u').pop().split('t')[0];
    document.getElementById(cancelButtonId).click();
  }

  axios.get(url).then(function (response) {
    var request = String(response.data.response.request);

    if (request === requestResponse) {
      document.getElementById(followerBlock).remove();

      if (document.querySelector('.user-line') === null) {
        if (document.getElementById('requestsPaginator')) {
          document.location.reload();
        } else {
          document.getElementById('requestsList').remove();
          document.getElementById('requestsIsEmpty').style.display = 'block';
        }
      }
    }
  });
}

var acceptRequest = document.querySelectorAll('.accept-follow-request');
var rejectRequest = document.querySelectorAll('.reject-request-toggle');
acceptRequest.forEach(function (acceptRequest) {
  acceptRequest.addEventListener('click', function (event) {
    rejectRequestFunction(event, 'accepted');
  });
});
rejectRequest.forEach(function (rejectRequest) {
  rejectRequest.addEventListener('click', function (event) {
    rejectRequestFunction(event, 'rejected');
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN2Q0EsRUFBQUEsS0FBSyxDQUFDQyxjQUFOO0FBQ0FMLEVBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsbUJBQXhCLEVBQTZDWSxLQUE3QztBQUNBakQsRUFBQUEsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixjQUF4QixFQUF3Q1ksS0FBeEM7QUFDSDs7QUFFRCxJQUFJbUksa0JBQWtCLEdBQUdwTCxRQUFRLENBQUNxQyxjQUFULENBQXdCLG9CQUF4QixDQUF6Qjs7QUFDQSxJQUFJK0ksa0JBQUosRUFBd0I7QUFDcEJBLEVBQUFBLGtCQUFrQixDQUFDbEosZ0JBQW5CLENBQW9DLE9BQXBDLEVBQTZDaUosMEJBQTdDO0FBQ0g7Ozs7Ozs7Ozs7OztBQ25KRCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hamF4LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hcHA0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9zaGFyZS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2Nzcy9hcHA0LnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpLmRlZmF1bHQ7XG5cbi8vIEFkZCBzb25nIHRvIHBsYXlsaXN0IG9yIGFkZCBwb3N0IHRvIGJvb2ttYXJrc1xuXG5sZXQgcGxheWxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWxpc3QtdG9nZ2xlJyk7XG5sZXQgYm9va21hcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9va21hcmstdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIHN3aXRjaGVyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gdGhpcy5jbGFzc0xpc3QuYWRkKCdhZGRlZCcpIDogdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhZGRlZCcpO1xuICAgICAgICB0aGlzLmRhdGFzZXQub3JpZ2luYWxUaXRsZSA9IHJlc3BvbnNlLmRhdGEucmVzcG9uc2UudGl0bGU7XG4gICAgICAgIHRoaXMuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblxuICAgICAgICBsZXQgYWxlcnRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgICAgIGxldCBhbGVydEV4aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWFsZXJ0Jyk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVzcG9uc2UubWVzc2FnZSkge1xuICAgICAgICAgICAgbGV0IGJhZGdlID0gJyc7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgICAgICBiYWRnZSA9ICdzdWNjZXNzJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFkZ2UgPSAnZGFuZ2VyJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnPGRpdiBjbGFzcz1cIm1kLWFsZXJ0IG1kLWFsZXJ0LScgKyBiYWRnZSArICcgbWQtYm94LW1iXCI+JyArXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5yZXNwb25zZS5tZXNzYWdlICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JztcblxuICAgICAgICAgICAgaWYgKGFsZXJ0RXhpc3QpIHtcbiAgICAgICAgICAgICAgICBhbGVydEV4aXN0Lm91dGVySFRNTCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0Qm94Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLmZhZGVUbygzMDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoXCIubWQtYWxlcnRcIikuc2xpZGVVcCg1MDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIFt0aGlzXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDApO1xuICAgIH0pXG59XG5cbnBsYXlsaXN0LmZvckVhY2goKHBsYXlsaXN0KSA9PiB7XG4gICAgcGxheWxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hlcik7XG59KTtcblxuYm9va21hcmsuZm9yRWFjaCgoYm9va21hcmspID0+IHtcbiAgICBib29rbWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaGVyKTtcbn0pO1xuXG4vLyBGb2xsb3cgYSB1c2VyIG9yIHVuZm9sbG93IGZyb20geW91cnNlbGZcblxubGV0IGZvbGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb2xsb3ctdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIGZvbGxvd3MoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnYWRkZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi1pbmZvJyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1saWdodCcpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdmb2xsb3dlZCcpO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKSkge1xuICAgICAgICAgICAgICAgIGxldCBmb2xsb3dlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyJykuaW5uZXJIVE1MID0gKHBhcnNlSW50KGZvbGxvd2VycywgMTApICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi1pbmZvJyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1saWdodCcpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdyZXF1ZXN0ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpICYmICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVxdWVzdGVkJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9sbG93ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyJykuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykucXVlcnlTZWxlY3RvcignLm51bWJlcicpLmlubmVySFRNTCA9IChwYXJzZUludChmb2xsb3dlcnMsIDEwKSAtIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi1saWdodCcpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdmb2xsb3dlZCcpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdyZXF1ZXN0ZWQnKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYnRuLWluZm8nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YXNldC5vcmlnaW5hbFRpdGxlID0gcmVzcG9uc2UuZGF0YS5yZXNwb25zZS50aXRsZTtcbiAgICAgICAgdGhpcy5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxubGV0IHVuZm9sbG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuZm9sbG93LXRvZ2dsZScpO1xuXG5mb2xsb3cuZm9yRWFjaCgoZm9sbG93KSA9PiB7XG4gICAgZm9sbG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZm9sbG93cyk7XG59KTtcblxuZnVuY3Rpb24gdW5mb2xsb3dzKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuICAgIGxldCBmb2xsb3dlckJsb2NrID0gJ3UnICsgdGhpcy5pZC5zcGxpdCgndScpLnBvcCgpLnNwbGl0KCd0JylbMF0gKyAnbCc7XG4gICAgbGV0IGNhbmNlbEJ1dHRvbklkID0gJ3VzZXJVbmZvbGxvdycgKyB0aGlzLmlkLnNwbGl0KCd1JykucG9wKCkuc3BsaXQoJ3QnKVswXTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW5jZWxCdXR0b25JZCkuY2xpY2soKTtcblxuICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBzdGF0dXMgPSBTdHJpbmcocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICBpZiAoc3RhdHVzID09PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZvbGxvd2VyQmxvY2spLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxudW5mb2xsb3cuZm9yRWFjaCgodW5mb2xsb3cpID0+IHtcbiAgICB1bmZvbGxvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVuZm9sbG93cyk7XG59KTtcblxuLy8gQWNjZXB0IG9yIHJlamVjdCBmb2xsb3cgcmVxdWVzdFxuXG5mdW5jdGlvbiByZWplY3RSZXF1ZXN0RnVuY3Rpb24oZXZlbnQsIHJlcXVlc3RSZXNwb25zZSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVybCA9IGV2ZW50LnRhcmdldC5ocmVmO1xuICAgIGxldCBmb2xsb3dlckJsb2NrID0gJ3UnICsgZXZlbnQudGFyZ2V0LmlkLnNwbGl0KCd1JykucG9wKCkuc3BsaXQoJ3QnKVswXSArICdsJztcblxuICAgIGlmIChyZXF1ZXN0UmVzcG9uc2UgPT09ICdyZWplY3RlZCcpIHtcbiAgICAgICAgbGV0IGNhbmNlbEJ1dHRvbklkID0gJ3JlamVjdFJlcXVlc3QnICsgZXZlbnQudGFyZ2V0LmlkLnNwbGl0KCd1JykucG9wKCkuc3BsaXQoJ3QnKVswXTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FuY2VsQnV0dG9uSWQpLmNsaWNrKCk7XG4gICAgfVxuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBTdHJpbmcocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5yZXF1ZXN0KTtcbiAgICAgICAgaWYgKHJlcXVlc3QgPT09IHJlcXVlc3RSZXNwb25zZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZm9sbG93ZXJCbG9jaykucmVtb3ZlKCk7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXItbGluZScpID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXF1ZXN0c1BhZ2luYXRvcicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXF1ZXN0c0xpc3QnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlcXVlc3RzSXNFbXB0eScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmxldCBhY2NlcHRSZXF1ZXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY2VwdC1mb2xsb3ctcmVxdWVzdCcpO1xubGV0IHJlamVjdFJlcXVlc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVqZWN0LXJlcXVlc3QtdG9nZ2xlJyk7XG5cbmFjY2VwdFJlcXVlc3QuZm9yRWFjaCgoYWNjZXB0UmVxdWVzdCkgPT4ge1xuICAgIGFjY2VwdFJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgcmVqZWN0UmVxdWVzdEZ1bmN0aW9uKGV2ZW50LCdhY2NlcHRlZCcpXG4gICAgfSk7XG59KTtcblxucmVqZWN0UmVxdWVzdC5mb3JFYWNoKChyZWplY3RSZXF1ZXN0KSA9PiB7XG4gICAgcmVqZWN0UmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICByZWplY3RSZXF1ZXN0RnVuY3Rpb24oZXZlbnQsJ3JlamVjdGVkJylcbiAgICB9KTtcbn0pO1xuXG4vLyBNYWtlIHBvc3QgZmVhdHVyZWRcblxubGV0IGZlYXR1cmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZlYXR1cmVkLXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBmZWF0dXJlZFBvc3QoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgKHN0YXR1cyA9PT0gJ2FkZGVkJykgPyB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5mZWF0dXJlZC5mb3JFYWNoKChmZWF0dXJlZCkgPT4ge1xuICAgIGZlYXR1cmVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZmVhdHVyZWRQb3N0KTtcbn0pO1xuXG4vLyBQb3N0IGxpa2VcblxubGV0IGxpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlrZS10b2dnbGUnKTtcblxuZnVuY3Rpb24gbGlrZVBvc3QoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgKHN0YXR1cyA9PT0gJ2FkZGVkJykgPyB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG5cbiAgICAgICAgbGV0IHBvc3RMaWtlQ291bnRlciA9ICdwb3N0LWxpa2UtY291bnRlci0nICsgdGhpcy5pZC5yZXBsYWNlKCdwb3N0LWxpa2UtJywnJyk7XG4gICAgICAgIGxldCBjdXJyZW50TGlrZXMgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3N0TGlrZUNvdW50ZXIpLmlubmVySFRNTCk7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2FkZGVkJykge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zdExpa2VDb3VudGVyKS5pbm5lckhUTUwgPSBjdXJyZW50TGlrZXMgKyAxO1xuICAgICAgICB9IGVsc2UgIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvc3RMaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxubGlrZS5mb3JFYWNoKChsaWtlKSA9PiB7XG4gICAgbGlrZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpa2VQb3N0KTtcbn0pO1xuXG4vLyBQb3N0IGRvdWJsZS1jbGljayBsaWtlXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZC1wb3N0JykuZm9yRWFjaCgocG9zdCkgPT4ge1xuICAgIGxldCBwb3N0SWQgPSBwb3N0LmlkLnJlcGxhY2UoJ3Bvc3RJZCcsICcnKTtcbiAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWltYWdlJykuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLChldmVudCkgPT4ge1xuICAgICAgICBsZXQgcG9zdExpa2VyID0gcG9zdC5xdWVyeVNlbGVjdG9yKCcubGlrZS10b2dnbGUnKTtcbiAgICAgICAgbGV0IHVybCA9IHBvc3RMaWtlci5ocmVmO1xuXG4gICAgICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gcG9zdExpa2VyLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiBwb3N0TGlrZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWRkZWQnKTtcblxuICAgICAgICAgICAgbGV0IHBvc3RMaWtlQ291bnRlciA9ICdwb3N0LWxpa2UtY291bnRlci0nICsgcG9zdExpa2VyLmlkLnJlcGxhY2UoJ3Bvc3QtbGlrZS0nLCcnKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50TGlrZXMgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3N0TGlrZUNvdW50ZXIpLmlubmVySFRNTCk7XG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgICAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWxpa2VyJykuY2xhc3NMaXN0LmFkZCgnbGlrZScpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWxpa2VyJykuY2xhc3NMaXN0LnJlbW92ZSgnbGlrZScpO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvc3RMaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgIHBvc3QucXVlcnlTZWxlY3RvcignLnBvc3QtbGlrZXInKS5jbGFzc0xpc3QuYWRkKCdkaXNsaWtlJyk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc3QucXVlcnlTZWxlY3RvcignLnBvc3QtbGlrZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNsaWtlJyk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zdExpa2VDb3VudGVyKS5pbm5lckhUTUwgPSBjdXJyZW50TGlrZXMgLSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBbcG9zdExpa2VyXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KVxuICAgIH0pO1xufSk7XG4iLCIvKlxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxuICpcbiAqIFdlIHJlY29tbWVuZCBpbmNsdWRpbmcgdGhlIGJ1aWx0IHZlcnNpb24gb2YgdGhpcyBKYXZhU2NyaXB0IGZpbGVcbiAqIChhbmQgaXRzIENTUyBmaWxlKSBpbiB5b3VyIGJhc2UgbGF5b3V0IChiYXNlLmh0bWwudHdpZykuXG4gKi9cblxuLy8gYW55IENTUyB5b3UgaW1wb3J0IHdpbGwgb3V0cHV0IGludG8gYSBzaW5nbGUgc2NzcyBmaWxlIChhcHBGaWxlLnNjc3MgaW4gdGhpcyBjYXNlKVxuaW1wb3J0ICcuLi9zY3NzL2FwcDQuc2Nzcyc7XG5cbi8vIEF3ZXNvbWUgZm9udHNcbnJlcXVpcmUoJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwubWluLmNzcycpO1xucmVxdWlyZSgnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvanMvYWxsLmpzJyk7XG5cbi8vIE5lZWQgalF1ZXJ5PyBJbnN0YWxsIGl0IHdpdGggXCJ5YXJuIGFkZCBqcXVlcnlcIiwgdGhlbiB1bmNvbW1lbnQgdG8gaW1wb3J0IGl0LlxuLy8gaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmxldCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5nbG9iYWwuJCA9IGdsb2JhbC5qUXVlcnkgPSAkO1xuXG4vLyBCb290c3RyYXAganNcbnJlcXVpcmUoJ2Jvb3RzdHJhcCcpO1xuXG4vLyBNeSBzY3JpcHRzXG5pbXBvcnQgJy4vc2NyaXB0cyc7XG5pbXBvcnQgJy4vYWpheCc7XG5pbXBvcnQgJy4vc2hhcmUnO1xuIiwiLy8gUHJldmVudCBzY3JvbGxcblxuY29uc3QgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5sZXQga2V5cyA9IHszNzogMSwgMzg6IDEsIDM5OiAxLCA0MDogMX07XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyhlKSB7XG4gICAgaWYgKGtleXNbZS5rZXlDb2RlXSkge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxubGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xudHJ5IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgbnVsbCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7IH1cbiAgICB9KSk7XG59IGNhdGNoKGUpIHt9XG5cbmxldCB3aGVlbE9wdCA9IHN1cHBvcnRzUGFzc2l2ZSA/IHsgcGFzc2l2ZTogZmFsc2UgfSA6IGZhbHNlO1xubGV0IHdoZWVsRXZlbnQgPSAnb253aGVlbCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgPyAnd2hlZWwnIDogJ21vdXNld2hlZWwnO1xuXG5mdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7IC8vIG9sZGVyIEZGXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIod2hlZWxFdmVudCwgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTsgLy8gbW9kZXJuIGRlc2t0b3BcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTsgLy8gbW9iaWxlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlU2Nyb2xsKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIod2hlZWxFdmVudCwgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cywgZmFsc2UpO1xufVxuXG4vLyBNb2JpbGUgbmF2YmFyXG5cbmNvbnN0IHNpZGVOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdicpO1xuY29uc3Qgc2lkZU5hdk9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2T3BlbmVyJyk7XG5jb25zdCBzaWRlTmF2Q2xvc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZDbG9zZXInKTtcbmNvbnN0IHNpZGVOYXZMb2dvdXRDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdkxvZ291dENsb3NlcicpO1xuY29uc3Qgc2lkZU5hdkJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdkJhY2snKTtcblxuZnVuY3Rpb24gb3Blbk5hdigpIHtcbiAgICBkaXNhYmxlU2Nyb2xsKCk7XG4gICAgc2lkZU5hdi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgxMDAlKSc7XG4gICAgc2lkZU5hdkJhY2suc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICBzaWRlTmF2Q2xvc2VyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBlbmFibGVTY3JvbGwoKTtcbiAgICBzaWRlTmF2LnN0eWxlLnRyYW5zZm9ybSA9ICd1bnNldCc7XG4gICAgc2lkZU5hdkJhY2suc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICBzaWRlTmF2Q2xvc2VyLnN0eWxlLndpZHRoID0gJzAnO1xufVxuXG5pZiAoc2lkZU5hdikge1xuICAgIHNpZGVOYXZPcGVuZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTmF2KTtcbiAgICBzaWRlTmF2Q2xvc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VOYXYpO1xuICAgIGlmIChzaWRlTmF2TG9nb3V0Q2xvc2VyKSB7XG4gICAgICAgIHNpZGVOYXZMb2dvdXRDbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU5hdik7XG4gICAgfVxufVxuXG4vLyBNZWRpYUVsZW1lbnQgUGxheWVyXG5cbnJlcXVpcmUoJ21lZGlhZWxlbWVudC9idWlsZC9tZWRpYWVsZW1lbnQtYW5kLXBsYXllci5taW4nKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmF1ZGlvLXBsYXllciBhdWRpbycpLm1lZGlhZWxlbWVudHBsYXllcih7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHBsYXllciwgbm9kZSkge1xuICAgICAgICAgICAgLy8gT3B0aW9uYWxcbiAgICAgICAgICAgICQocGxheWVyKS5jbG9zZXN0KCcubWVqc19fY29udGFpbmVyJykuYXR0cignbGFuZycsIG1lanMuaTE4bi5sYW5ndWFnZSgpKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5hdHRyKCdsYW5nJywgbWVqcy5pMThuLmxhbmd1YWdlKCkpO1xuICAgICAgICAgICAgLy8gTW9yZSBjb2RlXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0Vm9sdW1lOiAxLFxuICAgICAgICBhdXRvUmV3aW5kOiB0cnVlLFxuICAgICAgICBlbmFibGVQcm9ncmVzc1Rvb2x0aXA6IGZhbHNlLFxuICAgICAgICBmZWF0dXJlczogWydwbGF5cGF1c2UnLCdbZmVhdHVyZV9uYW1lXScsJ2N1cnJlbnQnLCdwcm9ncmVzcycsJ2R1cmF0aW9uJ11cbiAgICB9KVxufSk7XG5cbi8vIENvbW1lbnQgcmVwbHlcblxuY29uc3QgY29tbWVudFdyaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWNvbW1lbnQtd3JpdGUnKTtcbmNvbnN0IGNvbW1lbnRUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X21lc3NhZ2UnKTtcbmNvbnN0IGNvbW1lbnRSZXBseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LXJlcGx5Jyk7XG5jb25zdCByZXBseVRvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfcmVwbHlUbycpO1xuY29uc3QgcmVwbHlGb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudF9yZXBseUZvcicpO1xuY29uc3QgY29tbWVudFJlcGx5VXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1jb21tZW50LXJlcGx5LXVzZXInKTtcbmNvbnN0IHJlcGx5aW5nRGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLXJlcGx5aW5nLWRlbGV0ZScpO1xuXG5pZiAocmVwbHlpbmdEZWxldGUpIHtcbiAgICByZXBseWluZ0RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcmVwbHlUby5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIHJlcGx5Rm9yLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ21kLXJlcGx5aW5nJyk7XG4gICAgfSk7XG59XG5cbmlmIChjb21tZW50UmVwbHkpIHtcbiAgICBjb21tZW50UmVwbHkuZm9yRWFjaCgocmVwbHkpID0+IHtcbiAgICAgICAgbGV0IHJlcGx5VXNlciA9IHJlcGx5LnF1ZXJ5U2VsZWN0b3IoJy5yZXBseS11c2VyJyk7XG4gICAgICAgIGxldCByZXBseUNvbW1lbnQgPSByZXBseS5xdWVyeVNlbGVjdG9yKCcucmVwbHktY29tbWVudCcpO1xuICAgICAgICByZXBseS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChyZXBseSkgPT4ge1xuICAgICAgICAgICAgcmVwbHlUby52YWx1ZSA9IHJlcGx5VXNlci5pbm5lckhUTUw7XG4gICAgICAgICAgICByZXBseUZvci52YWx1ZSA9IHJlcGx5Q29tbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb21tZW50VGV4dEFyZWEuZm9jdXMoKTtcblxuICAgICAgICAgICAgaWYgKHJlcGx5VG8udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5hZGQoJ21kLXJlcGx5aW5nJyk7XG4gICAgICAgICAgICAgICAgY29tbWVudFJlcGx5VXNlci5pbm5lckhUTUwgPSByZXBseVRvLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xufVxuXG4vLyBTZWFyY2hlclxuXG5sZXQgc2VhcmNoSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1kLXNlYXJjaC1hbGwtaW5wdXQnKTtcblxuY29uc3QgbmF2YmFyU2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhclNlYXJjaCcpO1xuLy8gY29uc3QgbmF2YmFyU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyU2VhcmNoSW5wdXQnKTtcbmNvbnN0IG5hdmJhclNlYXJjaE9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuTmF2YmFyU2VhcmNoJyk7XG5jb25zdCBuYXZiYXJTZWFyY2hDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VOYXZiYXJTZWFyY2gnKTtcblxuZnVuY3Rpb24gb3Blbk5hdmJhclNlYXJjaCgpe1xuICAgIG5hdmJhclNlYXJjaE9wZW5lci5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50JztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXNlYXJjaC1tb2JpbGUnKS5zdHlsZS5kaXNwbGF5ID0gJ3Vuc2V0JztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXNlYXJjaC1tb2JpbGUgaW5wdXQnKS5mb2N1cygpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdmJhclNlYXJjaCgpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgbmF2YmFyU2VhcmNoT3BlbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cbmlmIChuYXZiYXJTZWFyY2gpIHtcbiAgICBuYXZiYXJTZWFyY2hPcGVuZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTmF2YmFyU2VhcmNoKTtcbiAgICBuYXZiYXJTZWFyY2hDbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU5hdmJhclNlYXJjaCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvZHktd3JhcHBlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VOYXZiYXJTZWFyY2gpO1xufVxuXG5zZWFyY2hJbnB1dHMuZm9yRWFjaCgoaW5wdXRCb3gsa2V5KSA9PiB7XG4gICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9pbnB1dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywoaW5wdXQpID0+IHtcbiAgICAgICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9idXR0b24nKS5ocmVmID0gJy9zZWFyY2gvJyArIGlucHV0LnRhcmdldC52YWx1ZS5yZXBsYWNlKCcjJywgJyUyMycpLnJlcGxhY2UoJyUnLCAnJTI1Jyk7XG4gICAgfSlcblxuICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQuY29kZSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9idXR0b24nKS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbn0pO1xuXG4vLyBFbmFibGUgdG9vbHRpcFxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe1xuICAgICAgICB0cmlnZ2VyIDogJ2hvdmVyJ1xuICAgIH0pXG59KTtcblxuLy8gSW1hZ2Ugb24gY2hhbmdlXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1maWxlLWlucHV0JykpIHtcbiAgICBsZXQgZmlsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1maWxlLWlucHV0Jyk7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0SW1nT3V0cHV0JykpIHtcbiAgICAgICAgbGV0IHBvc3RJbWdPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdEltZ091dHB1dCcpO1xuICAgICAgICBmaWxlSW5wdXQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBwb3N0SW1nT3V0cHV0LnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVJbnB1dC5maWxlc1swXSk7XG4gICAgICAgICAgICBwb3N0SW1nT3V0cHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc4cHgnO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dC1jb250ZW50JykpIHtcbiAgICAgICAgbGV0IG91dHB1dENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0LWNvbnRlbnQnKTtcbiAgICAgICAgZmlsZUlucHV0Lm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgb3V0cHV0Q29udGVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFxcJycgKyB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlSW5wdXQuZmlsZXNbMF0pICsgJ1xcJyknO1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8gVGV4dGFyZWEgYXV0b3NpemVcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYXV0by1zaXplcicpKSB7XG4gICAgbGV0IHRleHRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWF1dG8tc2l6ZXInKTtcbiAgICB0ZXh0YXJlYS5vbmlucHV0ID0gKCkgPT4ge1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5oZWlnaHQgPSB0ZXh0YXJlYS5zY3JvbGxIZWlnaHQgKyAyICsgXCJweFwiO1xuICAgIH07XG59XG5cbi8vIEF1dG8gY2xvc2UgYWxlcnRzXG4kKFwiLm1kLWFsZXJ0LWF1dG8taGlkZVwiKS5mYWRlVG8oNTAwMCwgNTAwKS5zbGlkZVVwKDUwMCwgZnVuY3Rpb24oKXtcbiAgICAkKFwiLm1kLWFsZXJ0LWF1dG8taGlkZVwiKS5zbGlkZVVwKDUwMCk7XG59KTtcblxuLy8gUHJldmVudCB1c2VybmFtZSBzeW1ib2xzXG4kKCcudXNlcm5hbWUtaW5wdXQnKS5vbigna2V5cHJlc3MnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKFwiXlthLXpBLVowLTkuX10rJFwiKTtcbiAgICBsZXQga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZSghZXZlbnQuY2hhckNvZGUgPyBldmVudC53aGljaCA6IGV2ZW50LmNoYXJDb2RlKTtcbiAgICBpZiAoIXJlZ2V4LnRlc3Qoa2V5KSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSk7XG5cbi8vIFBvc3QgY29sbGFwc2VcbmNvbnN0IHBvc3RDb2xsYXBzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3N0LWNvbGxhcHNlJyk7XG5cbnBvc3RDb2xsYXBzZS5mb3JFYWNoKChwb3N0KSA9PiB7XG4gICAgZnVuY3Rpb24gb3BlbkNvbGxhcHNlZFBvc3QoKSB7XG4gICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RDb2xsYXBzZScgKyBwb3N0SWQpLmNsYXNzTGlzdC5yZW1vdmUoJ2Nsb3NlZCcpO1xuICAgIH1cblxuICAgIGxldCBwb3N0SWQgPSBwb3N0LmlkLnJlcGxhY2UoJ3Bvc3RDb2xsYXBzZScsICcnKTtcblxuICAgIGlmIChwb3N0LnF1ZXJ5U2VsZWN0b3IoJ2RpdicpLmNsaWVudEhlaWdodCA+IDUwKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0Q29sbGFwc2VCdXR0b24nICsgcG9zdElkKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdENvbGxhcHNlQnV0dG9uJyArIHBvc3RJZCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuQ29sbGFwc2VkUG9zdCk7XG59KTtcbiIsImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKS5kZWZhdWx0O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBTaGFyZSBnbG9iYWwgZnVuY3Rpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIHNoYXJlTWVkaWFBbGVydChldmVudCx1c2VyLHR5cGUpIHtcblxuICAgIGZ1bmN0aW9uIHNoYXJlVHlwZSh0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnUHJvZmlsZScpIHtcbiAgICAgICAgICAgIHJldHVybiB1c2VyLnF1ZXJ5U2VsZWN0b3IoJy5tZC11c2VyLWlkJykuaW5uZXJIVE1MO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVzZXIucXVlcnlTZWxlY3RvcignLm1kLXVzZXJuYW1lJykuaW5uZXJIVE1MO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCB1c2VybmFtZSA9IHNoYXJlVHlwZSh0eXBlKTtcbiAgICBsZXQgbWVkaWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmUnICsgdHlwZSArICdJZCcpLmlubmVySFRNTDtcbiAgICBsZXQgdXJsID0gJy9zaGFyZScgKyB0eXBlICsgJy8nICsgbWVkaWEgKyAnLycgKyB1c2VybmFtZTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZScgKyB0eXBlICsgJ1VzZXJuYW1lJykuaW5uZXJIVE1MID0gdXNlci5xdWVyeVNlbGVjdG9yKCcubWQtdXNlcm5hbWUnKS5pbm5lckhUTUw7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlJyArIHR5cGUgKyAnQWxlcnQnKS5xdWVyeVNlbGVjdG9yKCdhJykuaHJlZiA9IHVybDtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZScgKyB0eXBlICsgJ01vZGFsJykuY2xpY2soKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmUnICsgdHlwZSArICdDb25maXJtJykuY2xpY2soKTtcbn1cblxuZnVuY3Rpb24gc2hhcmVNZWRpYShldmVudCwgdHlwZSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVybCA9IGV2ZW50LnRhcmdldC5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlJyArIHR5cGUgKyAnQWxlcnQnKS5jbGljaygpO1xuXG4gICAgICAgIGxldCBtZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJtZC1hbGVydCBtZC1hbGVydC1zdWNjZXNzIG1kLWJveC1tYlwiPicgK1xuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5yZXNwb25zZS5tZXNzYWdlICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuXG4gICAgICAgIGxldCBhbGVydEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICAgICAgbGV0IGFsZXJ0RXhpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYWxlcnQnKTtcblxuICAgICAgICBpZiAoYWxlcnRFeGlzdCkge1xuICAgICAgICAgICAgYWxlcnRFeGlzdC5vdXRlckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnRCb3guaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgbWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLmZhZGVUbygzMDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJChcIi5tZC1hbGVydFwiKS5zbGlkZVVwKDUwMCk7XG4gICAgICAgIH0pO1xuICAgIH0pXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIFNoYXJlIHNvbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gU29uZyBzaGFyZSBhbGVydFxubGV0IHNoYXJlU29uZ1VzZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3NoYXJlU29uZ01vZGFsIC51c2VyLWxpbmUnKTtcbnNoYXJlU29uZ1VzZXJzLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICB1c2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIHNoYXJlTWVkaWFBbGVydChldmVudCx1c2VyLCdTb25nJyk7XG4gICAgfSlcbn0pO1xuXG4vLyBJZiBzb25nIHNoYXJlIGNvbmZpcm1cbmxldCBzaGFyZVNvbmdCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVTb25nQ29uZmlybUJ1dHRvbicpO1xuaWYgKHNoYXJlU29uZ0J1dHRvbikge1xuICAgIHNoYXJlU29uZ0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBzaGFyZU1lZGlhKGV2ZW50LCdTb25nJyk7XG4gICAgfSk7XG59XG5cbi8vIElmIHNvbmcgc2hhcmUgY2FuY2VsXG5mdW5jdGlvbiBzaGFyZVNvbmdDYW5jZWxGdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlU29uZ0FsZXJ0JykuY2xpY2soKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVTb25nJykuY2xpY2soKTtcbn1cblxubGV0IHNoYXJlU29uZ0NhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVNvbmdDYW5jZWwnKTtcbmlmIChzaGFyZVNvbmdDYW5jZWwpIHtcbiAgICBzaGFyZVNvbmdDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaGFyZVNvbmdDYW5jZWxGdW5jdGlvbik7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIFNoYXJlIHBvc3QgLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gSW5zZXJ0IHBvc3QgSWRcbmZ1bmN0aW9uIHNoYXJlUG9zdEJ1dHRvbkZ1bmN0aW9uKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVBvc3RJZCcpLmlubmVySFRNTCA9IHRoaXMuaWQucmVwbGFjZSgnc2hhcmVQb3N0SWQnLCAnJyk7XG59XG5cbmxldCBzaGFyZVBvc3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhcmUtcG9zdC1idXR0b24nKTtcbnNoYXJlUG9zdEJ1dHRvbi5mb3JFYWNoKChzaGFyZVBvc3RCdXR0b24pID0+IHtcbiAgICBzaGFyZVBvc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaGFyZVBvc3RCdXR0b25GdW5jdGlvbilcbn0pO1xuXG4vLyBQb3N0IHNoYXJlIGFsZXJ0XG5sZXQgc2hhcmVQb3N0VXNlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjc2hhcmVQb3N0TW9kYWwgLnVzZXItbGluZScpO1xuc2hhcmVQb3N0VXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgIHVzZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgc2hhcmVNZWRpYUFsZXJ0KGV2ZW50LHVzZXIsJ1Bvc3QnKTtcbiAgICB9KVxufSlcblxuLy8gSWYgcG9zdCBzaGFyZSBjb25maXJtXG5sZXQgc2hhcmVQb3N0Q29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVBvc3RDb25maXJtQnV0dG9uJyk7XG5pZiAoc2hhcmVQb3N0Q29uZmlybUJ1dHRvbikge1xuICAgIHNoYXJlUG9zdENvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgc2hhcmVNZWRpYShldmVudCwnUG9zdCcpO1xuICAgIH0pXG59XG5cbi8vIElmIHBvc3Qgc2hhcmUgY2FuY2VsXG5mdW5jdGlvbiBzaGFyZVBvc3RDYW5jZWxGdW5jdGlvbigpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQb3N0QWxlcnQnKS5jbGljaygpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVBvc3RJZCcgKyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQb3N0SWQnKS5pbm5lckhUTUwpLmNsaWNrKCk7XG59XG5cbmxldCBzaGFyZVBvc3RDYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQb3N0Q2FuY2VsJyk7XG5pZiAoc2hhcmVQb3N0Q2FuY2VsKSB7XG4gICAgc2hhcmVQb3N0Q2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hhcmVQb3N0Q2FuY2VsRnVuY3Rpb24pO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBTaGFyZSBwcm9maWxlIC0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIFByb2ZpbGUgc2hhcmUgYWxlcnRcbmxldCBzaGFyZVByb2ZpbGVVc2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNzaGFyZVByb2ZpbGVNb2RhbCAudXNlci1saW5lJyk7XG5zaGFyZVByb2ZpbGVVc2Vycy5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgdXNlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBzaGFyZU1lZGlhQWxlcnQoZXZlbnQsdXNlciwnUHJvZmlsZScpO1xuICAgIH0pXG59KTtcblxuLy8gSWYgcHJvZmlsZSBzaGFyZSBjb25maXJtXG5sZXQgc2hhcmVQcm9maWxlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUHJvZmlsZUNvbmZpcm1CdXR0b24nKTtcbmlmIChzaGFyZVByb2ZpbGVCdXR0b24pIHtcbiAgICBzaGFyZVByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgc2hhcmVNZWRpYShldmVudCwnUHJvZmlsZScpO1xuICAgIH0pO1xufVxuXG4vLyBJZiBwcm9maWxlIHNoYXJlIGNhbmNlbFxuZnVuY3Rpb24gc2hhcmVQcm9maWxlQ2FuY2VsRnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVByb2ZpbGVBbGVydCcpLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUHJvZmlsZScpLmNsaWNrKCk7XG59XG5cbmxldCBzaGFyZVByb2ZpbGVDYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQcm9maWxlQ2FuY2VsJyk7XG5pZiAoc2hhcmVQcm9maWxlQ2FuY2VsKSB7XG4gICAgc2hhcmVQcm9maWxlQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hhcmVQcm9maWxlQ2FuY2VsRnVuY3Rpb24pO1xufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImF4aW9zIiwicmVxdWlyZSIsInBsYXlsaXN0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYm9va21hcmsiLCJzd2l0Y2hlciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ1cmwiLCJocmVmIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzIiwiU3RyaW5nIiwiZGF0YSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRhdGFzZXQiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJzdHlsZSIsInBvaW50ZXJFdmVudHMiLCJhbGVydEJveCIsInF1ZXJ5U2VsZWN0b3IiLCJhbGVydEV4aXN0IiwibWVzc2FnZSIsImJhZGdlIiwib3V0ZXJIVE1MIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiJCIsImZhZGVUbyIsInNsaWRlVXAiLCJzZXRUaW1lb3V0IiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb2xsb3ciLCJmb2xsb3dzIiwiZ2V0RWxlbWVudEJ5SWQiLCJmb2xsb3dlcnMiLCJpbm5lckhUTUwiLCJwYXJzZUludCIsInRvU3RyaW5nIiwidW5mb2xsb3ciLCJ1bmZvbGxvd3MiLCJmb2xsb3dlckJsb2NrIiwiaWQiLCJzcGxpdCIsInBvcCIsImNhbmNlbEJ1dHRvbklkIiwiY2xpY2siLCJyZWplY3RSZXF1ZXN0RnVuY3Rpb24iLCJyZXF1ZXN0UmVzcG9uc2UiLCJ0YXJnZXQiLCJyZXF1ZXN0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJkaXNwbGF5IiwiYWNjZXB0UmVxdWVzdCIsInJlamVjdFJlcXVlc3QiLCJmZWF0dXJlZCIsImZlYXR1cmVkUG9zdCIsImxpa2UiLCJsaWtlUG9zdCIsInBvc3RMaWtlQ291bnRlciIsInJlcGxhY2UiLCJjdXJyZW50TGlrZXMiLCJwb3N0IiwicG9zdElkIiwicG9zdExpa2VyIiwiZ2xvYmFsIiwialF1ZXJ5Iiwia2V5cyIsImUiLCJwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMiLCJrZXlDb2RlIiwic3VwcG9ydHNQYXNzaXZlIiwid2luZG93IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ3aGVlbE9wdCIsInBhc3NpdmUiLCJ3aGVlbEV2ZW50IiwiY3JlYXRlRWxlbWVudCIsImRpc2FibGVTY3JvbGwiLCJlbmFibGVTY3JvbGwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2lkZU5hdiIsInNpZGVOYXZPcGVuZXIiLCJzaWRlTmF2Q2xvc2VyIiwic2lkZU5hdkxvZ291dENsb3NlciIsInNpZGVOYXZCYWNrIiwib3Blbk5hdiIsInRyYW5zZm9ybSIsIm9wYWNpdHkiLCJ3aWR0aCIsImNsb3NlTmF2IiwicmVhZHkiLCJtZWRpYWVsZW1lbnRwbGF5ZXIiLCJzdWNjZXNzIiwicGxheWVyIiwibm9kZSIsImNsb3Nlc3QiLCJhdHRyIiwibWVqcyIsImkxOG4iLCJsYW5ndWFnZSIsInN0YXJ0Vm9sdW1lIiwiYXV0b1Jld2luZCIsImVuYWJsZVByb2dyZXNzVG9vbHRpcCIsImZlYXR1cmVzIiwiY29tbWVudFdyaXRlIiwiY29tbWVudFRleHRBcmVhIiwiY29tbWVudFJlcGx5IiwicmVwbHlUbyIsInJlcGx5Rm9yIiwiY29tbWVudFJlcGx5VXNlciIsInJlcGx5aW5nRGVsZXRlIiwicmVtb3ZlQXR0cmlidXRlIiwicmVwbHkiLCJyZXBseVVzZXIiLCJyZXBseUNvbW1lbnQiLCJ2YWx1ZSIsImZvY3VzIiwic2VhcmNoSW5wdXRzIiwibmF2YmFyU2VhcmNoIiwibmF2YmFyU2VhcmNoT3BlbmVyIiwibmF2YmFyU2VhcmNoQ2xvc2VyIiwib3Blbk5hdmJhclNlYXJjaCIsImNzc1RleHQiLCJjbG9zZU5hdmJhclNlYXJjaCIsImlucHV0Qm94Iiwia2V5IiwiaW5wdXQiLCJjb2RlIiwidG9vbHRpcCIsInRyaWdnZXIiLCJmaWxlSW5wdXQiLCJwb3N0SW1nT3V0cHV0Iiwib25jaGFuZ2UiLCJzcmMiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJmaWxlcyIsIm1hcmdpbkJvdHRvbSIsIm91dHB1dENvbnRlbnQiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJ0ZXh0YXJlYSIsIm9uaW5wdXQiLCJoZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJvbiIsInJlZ2V4IiwiUmVnRXhwIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGUiLCJ3aGljaCIsInRlc3QiLCJwb3N0Q29sbGFwc2UiLCJvcGVuQ29sbGFwc2VkUG9zdCIsImNsaWVudEhlaWdodCIsInNoYXJlTWVkaWFBbGVydCIsInVzZXIiLCJ0eXBlIiwic2hhcmVUeXBlIiwidXNlcm5hbWUiLCJtZWRpYSIsInNoYXJlTWVkaWEiLCJzaGFyZVNvbmdVc2VycyIsInNoYXJlU29uZ0J1dHRvbiIsInNoYXJlU29uZ0NhbmNlbEZ1bmN0aW9uIiwic2hhcmVTb25nQ2FuY2VsIiwic2hhcmVQb3N0QnV0dG9uRnVuY3Rpb24iLCJzaGFyZVBvc3RCdXR0b24iLCJzaGFyZVBvc3RVc2VycyIsInNoYXJlUG9zdENvbmZpcm1CdXR0b24iLCJzaGFyZVBvc3RDYW5jZWxGdW5jdGlvbiIsInNoYXJlUG9zdENhbmNlbCIsInNoYXJlUHJvZmlsZVVzZXJzIiwic2hhcmVQcm9maWxlQnV0dG9uIiwic2hhcmVQcm9maWxlQ2FuY2VsRnVuY3Rpb24iLCJzaGFyZVByb2ZpbGVDYW5jZWwiXSwic291cmNlUm9vdCI6IiJ9