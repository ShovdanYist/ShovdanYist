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

__webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");

__webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");

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
}); // Likes

var like = document.querySelectorAll('.like-toggle');

function liker(event) {
  var _this4 = this;

  event.preventDefault();
  var url = this.href;
  axios.get(url).then(function (response) {
    var status = String(response.data.response.status);
    status === 'added' ? _this4.classList.add('added') : _this4.classList.remove('added');

    function contains(value) {
      return value.includes('post') ? "post" : "comment";
    }

    var likeCounter = contains(_this4.id) + '-like-counter-' + _this4.id.replace(contains(_this4.id) + '-like-', '');

    var currentLikes = parseInt(document.getElementById(likeCounter).innerHTML);

    if (status === 'added') {
      if (contains(_this4.id) === 'comment') {
        if (currentLikes === 0) {
          document.getElementById(likeCounter).parentElement.style.display = 'unset';
        }
      }

      document.getElementById(likeCounter).innerHTML = currentLikes + 1;
    } else {
      if (contains(_this4.id) === 'comment') {
        if (currentLikes === 1) {
          document.getElementById(likeCounter).parentElement.style.display = 'none';
        }
      }

      document.getElementById(likeCounter).innerHTML = currentLikes - 1;
    }

    setTimeout(function () {
      [_this4].forEach(function (switcher) {
        switcher.style.pointerEvents = 'auto';
      });
    }, 100);
  });
}

like.forEach(function (like) {
  like.addEventListener('click', liker);
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_fortawesome_fontawesome-free_js_all_js-node_modules_fortawesome_fontawes-8625a3"], () => (__webpack_exec__("./assets/js/app4.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwNC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUdDLHlFQUFkLEVBRUE7OztBQUVBLElBQUlDLFFBQVEsR0FBR0MsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsQ0FBZjtBQUNBLElBQUlDLFFBQVEsR0FBR0YsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsQ0FBZjs7QUFFQSxTQUFTRSxRQUFULENBQWtCQyxLQUFsQixFQUF5QjtBQUFBOztBQUNyQkEsRUFBQUEsS0FBSyxDQUFDQyxjQUFOO0FBQ0EsTUFBSUMsR0FBRyxHQUFHLEtBQUtDLElBQWY7QUFFQVYsRUFBQUEsS0FBSyxDQUFDVyxHQUFOLENBQVVGLEdBQVYsRUFBZUcsSUFBZixDQUFvQixVQUFDQyxRQUFELEVBQWM7QUFDOUIsUUFBSUMsTUFBTSxHQUFHQyxNQUFNLENBQUNGLFFBQVEsQ0FBQ0csSUFBVCxDQUFjSCxRQUFkLENBQXVCQyxNQUF4QixDQUFuQjtBQUNDQSxJQUFBQSxNQUFNLEtBQUssT0FBWixHQUF1QixLQUFJLENBQUNHLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixPQUFuQixDQUF2QixHQUFxRCxLQUFJLENBQUNELFNBQUwsQ0FBZUUsTUFBZixDQUFzQixPQUF0QixDQUFyRDtBQUNBLFNBQUksQ0FBQ0MsT0FBTCxDQUFhQyxhQUFiLEdBQTZCUixRQUFRLENBQUNHLElBQVQsQ0FBY0gsUUFBZCxDQUF1QlMsS0FBcEQ7QUFDQSxTQUFJLENBQUNDLEtBQUwsQ0FBV0MsYUFBWCxHQUEyQixNQUEzQjtBQUVBLFFBQUlDLFFBQVEsR0FBR3RCLFFBQVEsQ0FBQ3VCLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBZjtBQUNBLFFBQUlDLFVBQVUsR0FBR3hCLFFBQVEsQ0FBQ3VCLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBakI7O0FBRUEsUUFBSWIsUUFBUSxDQUFDRyxJQUFULENBQWNILFFBQWQsQ0FBdUJlLE9BQTNCLEVBQW9DO0FBQ2hDLFVBQUlDLEtBQUssR0FBRyxFQUFaOztBQUNBLFVBQUloQixRQUFRLENBQUNHLElBQVQsQ0FBY0gsUUFBZCxDQUF1QkMsTUFBdkIsS0FBa0MsT0FBdEMsRUFBK0M7QUFDM0NlLFFBQUFBLEtBQUssR0FBRyxTQUFSO0FBQ0gsT0FGRCxNQUVPO0FBQ0hBLFFBQUFBLEtBQUssR0FBRyxRQUFSO0FBQ0g7O0FBRUQsVUFBSUQsT0FBTyxHQUFHLG1DQUFtQ0MsS0FBbkMsR0FBMkMsY0FBM0MsR0FDVmhCLFFBQVEsQ0FBQ0csSUFBVCxDQUFjSCxRQUFkLENBQXVCZSxPQURiLEdBRVYsUUFGSjs7QUFJQSxVQUFJRCxVQUFKLEVBQWdCO0FBQ1pBLFFBQUFBLFVBQVUsQ0FBQ0csU0FBWCxHQUF1QkYsT0FBdkI7QUFDSCxPQUZELE1BRU87QUFDSEgsUUFBQUEsUUFBUSxDQUFDTSxrQkFBVCxDQUE0QixZQUE1QixFQUEwQ0gsT0FBMUM7QUFDSDs7QUFFREksTUFBQUEsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlQyxNQUFmLENBQXNCLElBQXRCLEVBQTRCLEdBQTVCLEVBQWlDQyxPQUFqQyxDQUF5QyxHQUF6QyxFQUE4QyxZQUFVO0FBQ3BERixRQUFBQSxDQUFDLENBQUMsV0FBRCxDQUFELENBQWVFLE9BQWYsQ0FBdUIsR0FBdkI7QUFDSCxPQUZEO0FBR0g7O0FBRURDLElBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsT0FBQyxLQUFELEVBQU9DLE9BQVAsQ0FBZSxVQUFDOUIsUUFBRCxFQUFjO0FBQ3pCQSxRQUFBQSxRQUFRLENBQUNpQixLQUFULENBQWVDLGFBQWYsR0FBK0IsTUFBL0I7QUFDSCxPQUZEO0FBR0gsS0FKUyxFQUlQLEdBSk8sQ0FBVjtBQUtILEdBckNEO0FBc0NIOztBQUVEdEIsUUFBUSxDQUFDa0MsT0FBVCxDQUFpQixVQUFDbEMsUUFBRCxFQUFjO0FBQzNCQSxFQUFBQSxRQUFRLENBQUNtQyxnQkFBVCxDQUEwQixPQUExQixFQUFtQy9CLFFBQW5DO0FBQ0gsQ0FGRDtBQUlBRCxRQUFRLENBQUMrQixPQUFULENBQWlCLFVBQUMvQixRQUFELEVBQWM7QUFDM0JBLEVBQUFBLFFBQVEsQ0FBQ2dDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DL0IsUUFBbkM7QUFDSCxDQUZELEdBSUE7O0FBRUEsSUFBSWdDLE1BQU0sR0FBR25DLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsZ0JBQTFCLENBQWI7O0FBRUEsU0FBU21DLE9BQVQsQ0FBaUJoQyxLQUFqQixFQUF3QjtBQUFBOztBQUNwQkEsRUFBQUEsS0FBSyxDQUFDQyxjQUFOO0FBQ0EsTUFBSUMsR0FBRyxHQUFHLEtBQUtDLElBQWY7QUFFQVYsRUFBQUEsS0FBSyxDQUFDVyxHQUFOLENBQVVGLEdBQVYsRUFBZUcsSUFBZixDQUFvQixVQUFDQyxRQUFELEVBQWM7QUFDOUIsUUFBSUMsTUFBTSxHQUFHQyxNQUFNLENBQUNGLFFBQVEsQ0FBQ0csSUFBVCxDQUFjSCxRQUFkLENBQXVCQyxNQUF4QixDQUFuQjs7QUFFQSxRQUFJQSxNQUFNLEtBQUssT0FBZixFQUF3QjtBQUNwQixZQUFJLENBQUNHLFNBQUwsQ0FBZUUsTUFBZixDQUFzQixVQUF0Qjs7QUFDQSxZQUFJLENBQUNGLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixXQUFuQjs7QUFDQSxZQUFJLENBQUNELFNBQUwsQ0FBZUMsR0FBZixDQUFtQixVQUFuQjs7QUFFQSxVQUFJZixRQUFRLENBQUNxQyxjQUFULENBQXdCLGtCQUF4QixDQUFKLEVBQWlEO0FBQzdDLFlBQUlDLFNBQVMsR0FBR3RDLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDZCxhQUE1QyxDQUEwRCxTQUExRCxFQUFxRWdCLFNBQXJGO0FBQ0F2QyxRQUFBQSxRQUFRLENBQUNxQyxjQUFULENBQXdCLGtCQUF4QixFQUE0Q2QsYUFBNUMsQ0FBMEQsU0FBMUQsRUFBcUVnQixTQUFyRSxHQUFpRixDQUFDQyxRQUFRLENBQUNGLFNBQUQsRUFBWSxFQUFaLENBQVIsR0FBMEIsQ0FBM0IsRUFBOEJHLFFBQTlCLEVBQWpGO0FBQ0g7QUFDSixLQVRELE1BU08sSUFBSTlCLE1BQU0sS0FBSyxXQUFmLEVBQTRCO0FBQy9CLFlBQUksQ0FBQ0csU0FBTCxDQUFlRSxNQUFmLENBQXNCLFVBQXRCOztBQUNBLFlBQUksQ0FBQ0YsU0FBTCxDQUFlQyxHQUFmLENBQW1CLFdBQW5COztBQUNBLFlBQUksQ0FBQ0QsU0FBTCxDQUFlQyxHQUFmLENBQW1CLFdBQW5CO0FBQ0gsS0FKTSxNQUlBO0FBQ0gsVUFBSWYsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixrQkFBeEIsS0FBK0MsQ0FBQ3JDLFFBQVEsQ0FBQ3VCLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBcEQsRUFBMEY7QUFDdEYsWUFBSWUsVUFBUyxHQUFHdEMsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixrQkFBeEIsRUFBNENkLGFBQTVDLENBQTBELFNBQTFELEVBQXFFZ0IsU0FBckY7QUFDQXZDLFFBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDZCxhQUE1QyxDQUEwRCxTQUExRCxFQUFxRWdCLFNBQXJFLEdBQWlGLENBQUNDLFFBQVEsQ0FBQ0YsVUFBRCxFQUFZLEVBQVosQ0FBUixHQUEwQixDQUEzQixFQUE4QkcsUUFBOUIsRUFBakY7QUFDSDs7QUFDRCxZQUFJLENBQUMzQixTQUFMLENBQWVFLE1BQWYsQ0FBc0IsV0FBdEI7O0FBQ0EsWUFBSSxDQUFDRixTQUFMLENBQWVFLE1BQWYsQ0FBc0IsVUFBdEI7O0FBQ0EsWUFBSSxDQUFDRixTQUFMLENBQWVFLE1BQWYsQ0FBc0IsV0FBdEI7O0FBQ0EsWUFBSSxDQUFDRixTQUFMLENBQWVDLEdBQWYsQ0FBbUIsVUFBbkI7QUFDSDs7QUFFRCxVQUFJLENBQUNFLE9BQUwsQ0FBYUMsYUFBYixHQUE2QlIsUUFBUSxDQUFDRyxJQUFULENBQWNILFFBQWQsQ0FBdUJTLEtBQXBEO0FBQ0EsVUFBSSxDQUFDQyxLQUFMLENBQVdDLGFBQVgsR0FBMkIsTUFBM0I7QUFFQVcsSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYixPQUFDLE1BQUQsRUFBT0MsT0FBUCxDQUFlLFVBQUM5QixRQUFELEVBQWM7QUFDekJBLFFBQUFBLFFBQVEsQ0FBQ2lCLEtBQVQsQ0FBZUMsYUFBZixHQUErQixNQUEvQjtBQUNILE9BRkQ7QUFHSCxLQUpTLEVBSVAsR0FKTyxDQUFWO0FBS0gsR0FuQ0Q7QUFvQ0g7O0FBRUQsSUFBSXFCLFFBQVEsR0FBRzFDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLENBQWY7QUFFQWtDLE1BQU0sQ0FBQ0YsT0FBUCxDQUFlLFVBQUNFLE1BQUQsRUFBWTtBQUN2QkEsRUFBQUEsTUFBTSxDQUFDRCxnQkFBUCxDQUF3QixPQUF4QixFQUFpQ0UsT0FBakM7QUFDSCxDQUZEOztBQUlBLFNBQVNPLFNBQVQsQ0FBbUJ2QyxLQUFuQixFQUEwQjtBQUN0QkEsRUFBQUEsS0FBSyxDQUFDQyxjQUFOO0FBQ0EsTUFBSUMsR0FBRyxHQUFHLEtBQUtDLElBQWY7QUFDQSxNQUFJcUMsYUFBYSxHQUFHLE1BQU0sS0FBS0MsRUFBTCxDQUFRQyxLQUFSLENBQWMsR0FBZCxFQUFtQkMsR0FBbkIsR0FBeUJELEtBQXpCLENBQStCLEdBQS9CLEVBQW9DLENBQXBDLENBQU4sR0FBK0MsR0FBbkU7QUFDQSxNQUFJRSxjQUFjLEdBQUcsaUJBQWlCLEtBQUtILEVBQUwsQ0FBUUMsS0FBUixDQUFjLEdBQWQsRUFBbUJDLEdBQW5CLEdBQXlCRCxLQUF6QixDQUErQixHQUEvQixFQUFvQyxDQUFwQyxDQUF0QztBQUNBOUMsRUFBQUEsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QlcsY0FBeEIsRUFBd0NDLEtBQXhDO0FBRUFwRCxFQUFBQSxLQUFLLENBQUNXLEdBQU4sQ0FBVUYsR0FBVixFQUFlRyxJQUFmLENBQW9CLFVBQUNDLFFBQUQsRUFBYztBQUM5QixRQUFJQyxNQUFNLEdBQUdDLE1BQU0sQ0FBQ0YsUUFBUSxDQUFDRyxJQUFULENBQWNILFFBQWQsQ0FBdUJDLE1BQXhCLENBQW5COztBQUNBLFFBQUlBLE1BQU0sS0FBSyxTQUFmLEVBQTBCO0FBQ3RCWCxNQUFBQSxRQUFRLENBQUNxQyxjQUFULENBQXdCTyxhQUF4QixFQUF1QzVCLE1BQXZDO0FBQ0g7QUFDSixHQUxEO0FBTUg7O0FBRUQwQixRQUFRLENBQUNULE9BQVQsQ0FBaUIsVUFBQ1MsUUFBRCxFQUFjO0FBQzNCQSxFQUFBQSxRQUFRLENBQUNSLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DUyxTQUFuQztBQUNILENBRkQsR0FJQTs7QUFFQSxTQUFTTyxxQkFBVCxDQUErQjlDLEtBQS9CLEVBQXNDK0MsZUFBdEMsRUFBdUQ7QUFDbkQvQyxFQUFBQSxLQUFLLENBQUNDLGNBQU47QUFDQSxNQUFJQyxHQUFHLEdBQUdGLEtBQUssQ0FBQ2dELE1BQU4sQ0FBYTdDLElBQXZCO0FBQ0EsTUFBSXFDLGFBQWEsR0FBRyxNQUFNeEMsS0FBSyxDQUFDZ0QsTUFBTixDQUFhUCxFQUFiLENBQWdCQyxLQUFoQixDQUFzQixHQUF0QixFQUEyQkMsR0FBM0IsR0FBaUNELEtBQWpDLENBQXVDLEdBQXZDLEVBQTRDLENBQTVDLENBQU4sR0FBdUQsR0FBM0U7O0FBRUEsTUFBSUssZUFBZSxLQUFLLFVBQXhCLEVBQW9DO0FBQ2hDLFFBQUlILGNBQWMsR0FBRyxrQkFBa0I1QyxLQUFLLENBQUNnRCxNQUFOLENBQWFQLEVBQWIsQ0FBZ0JDLEtBQWhCLENBQXNCLEdBQXRCLEVBQTJCQyxHQUEzQixHQUFpQ0QsS0FBakMsQ0FBdUMsR0FBdkMsRUFBNEMsQ0FBNUMsQ0FBdkM7QUFDQTlDLElBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0JXLGNBQXhCLEVBQXdDQyxLQUF4QztBQUNIOztBQUVEcEQsRUFBQUEsS0FBSyxDQUFDVyxHQUFOLENBQVVGLEdBQVYsRUFBZUcsSUFBZixDQUFvQixVQUFDQyxRQUFELEVBQWM7QUFDOUIsUUFBSTJDLE9BQU8sR0FBR3pDLE1BQU0sQ0FBQ0YsUUFBUSxDQUFDRyxJQUFULENBQWNILFFBQWQsQ0FBdUIyQyxPQUF4QixDQUFwQjs7QUFDQSxRQUFJQSxPQUFPLEtBQUtGLGVBQWhCLEVBQWlDO0FBQzdCbkQsTUFBQUEsUUFBUSxDQUFDcUMsY0FBVCxDQUF3Qk8sYUFBeEIsRUFBdUM1QixNQUF2Qzs7QUFDQSxVQUFJaEIsUUFBUSxDQUFDdUIsYUFBVCxDQUF1QixZQUF2QixNQUF5QyxJQUE3QyxFQUFtRDtBQUMvQyxZQUFJdkIsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixtQkFBeEIsQ0FBSixFQUFrRDtBQUM5Q3JDLFVBQUFBLFFBQVEsQ0FBQ3NELFFBQVQsQ0FBa0JDLE1BQWxCO0FBQ0gsU0FGRCxNQUVPO0FBQ0h2RCxVQUFBQSxRQUFRLENBQUNxQyxjQUFULENBQXdCLGNBQXhCLEVBQXdDckIsTUFBeEM7QUFDQWhCLFVBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsaUJBQXhCLEVBQTJDakIsS0FBM0MsQ0FBaURvQyxPQUFqRCxHQUEyRCxPQUEzRDtBQUNIO0FBQ0o7QUFDSjtBQUNKLEdBYkQ7QUFjSDs7QUFFRCxJQUFJQyxhQUFhLEdBQUd6RCxRQUFRLENBQUNDLGdCQUFULENBQTBCLHdCQUExQixDQUFwQjtBQUNBLElBQUl5RCxhQUFhLEdBQUcxRCxRQUFRLENBQUNDLGdCQUFULENBQTBCLHdCQUExQixDQUFwQjtBQUVBd0QsYUFBYSxDQUFDeEIsT0FBZCxDQUFzQixVQUFDd0IsYUFBRCxFQUFtQjtBQUNyQ0EsRUFBQUEsYUFBYSxDQUFDdkIsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0MsVUFBQzlCLEtBQUQsRUFBVztBQUMvQzhDLElBQUFBLHFCQUFxQixDQUFDOUMsS0FBRCxFQUFPLFVBQVAsQ0FBckI7QUFDSCxHQUZEO0FBR0gsQ0FKRDtBQU1Bc0QsYUFBYSxDQUFDekIsT0FBZCxDQUFzQixVQUFDeUIsYUFBRCxFQUFtQjtBQUNyQ0EsRUFBQUEsYUFBYSxDQUFDeEIsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0MsVUFBQzlCLEtBQUQsRUFBVztBQUMvQzhDLElBQUFBLHFCQUFxQixDQUFDOUMsS0FBRCxFQUFPLFVBQVAsQ0FBckI7QUFDSCxHQUZEO0FBR0gsQ0FKRCxHQU1BOztBQUVBLElBQUl1RCxRQUFRLEdBQUczRCxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixDQUFmOztBQUVBLFNBQVMyRCxZQUFULENBQXNCeEQsS0FBdEIsRUFBNkI7QUFBQTs7QUFDekJBLEVBQUFBLEtBQUssQ0FBQ0MsY0FBTjtBQUNBLE1BQUlDLEdBQUcsR0FBRyxLQUFLQyxJQUFmO0FBRUFWLEVBQUFBLEtBQUssQ0FBQ1csR0FBTixDQUFVRixHQUFWLEVBQWVHLElBQWYsQ0FBb0IsVUFBQ0MsUUFBRCxFQUFjO0FBQzlCLFFBQUlDLE1BQU0sR0FBR0MsTUFBTSxDQUFDRixRQUFRLENBQUNHLElBQVQsQ0FBY0gsUUFBZCxDQUF1QkMsTUFBeEIsQ0FBbkI7QUFDQ0EsSUFBQUEsTUFBTSxLQUFLLE9BQVosR0FBdUIsTUFBSSxDQUFDRyxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsT0FBbkIsQ0FBdkIsR0FBcUQsTUFBSSxDQUFDRCxTQUFMLENBQWVFLE1BQWYsQ0FBc0IsT0FBdEIsQ0FBckQ7QUFFQWdCLElBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsT0FBQyxNQUFELEVBQU9DLE9BQVAsQ0FBZSxVQUFDOUIsUUFBRCxFQUFjO0FBQ3pCQSxRQUFBQSxRQUFRLENBQUNpQixLQUFULENBQWVDLGFBQWYsR0FBK0IsTUFBL0I7QUFDSCxPQUZEO0FBR0gsS0FKUyxFQUlQLEdBSk8sQ0FBVjtBQUtILEdBVEQ7QUFVSDs7QUFFRHNDLFFBQVEsQ0FBQzFCLE9BQVQsQ0FBaUIsVUFBQzBCLFFBQUQsRUFBYztBQUMzQkEsRUFBQUEsUUFBUSxDQUFDekIsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMwQixZQUFuQztBQUNILENBRkQsR0FJQTs7QUFFQSxJQUFJQyxJQUFJLEdBQUc3RCxRQUFRLENBQUNDLGdCQUFULENBQTBCLGNBQTFCLENBQVg7O0FBRUEsU0FBUzZELEtBQVQsQ0FBZTFELEtBQWYsRUFBc0I7QUFBQTs7QUFDbEJBLEVBQUFBLEtBQUssQ0FBQ0MsY0FBTjtBQUNBLE1BQUlDLEdBQUcsR0FBRyxLQUFLQyxJQUFmO0FBRUFWLEVBQUFBLEtBQUssQ0FBQ1csR0FBTixDQUFVRixHQUFWLEVBQWVHLElBQWYsQ0FBb0IsVUFBQ0MsUUFBRCxFQUFjO0FBQzlCLFFBQUlDLE1BQU0sR0FBR0MsTUFBTSxDQUFDRixRQUFRLENBQUNHLElBQVQsQ0FBY0gsUUFBZCxDQUF1QkMsTUFBeEIsQ0FBbkI7QUFDQ0EsSUFBQUEsTUFBTSxLQUFLLE9BQVosR0FBdUIsTUFBSSxDQUFDRyxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsT0FBbkIsQ0FBdkIsR0FBcUQsTUFBSSxDQUFDRCxTQUFMLENBQWVFLE1BQWYsQ0FBc0IsT0FBdEIsQ0FBckQ7O0FBRUEsYUFBUytDLFFBQVQsQ0FBa0JDLEtBQWxCLEVBQXlCO0FBQ3JCLGFBQU9BLEtBQUssQ0FBQ0MsUUFBTixDQUFlLE1BQWYsSUFBeUIsTUFBekIsR0FBa0MsU0FBekM7QUFDSDs7QUFFRCxRQUFJQyxXQUFXLEdBQUdILFFBQVEsQ0FBQyxNQUFJLENBQUNsQixFQUFOLENBQVIsR0FBb0IsZ0JBQXBCLEdBQXVDLE1BQUksQ0FBQ0EsRUFBTCxDQUFRc0IsT0FBUixDQUFnQkosUUFBUSxDQUFDLE1BQUksQ0FBQ2xCLEVBQU4sQ0FBUixHQUFvQixRQUFwQyxFQUE2QyxFQUE3QyxDQUF6RDs7QUFDQSxRQUFJdUIsWUFBWSxHQUFHNUIsUUFBUSxDQUFDeEMsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QjZCLFdBQXhCLEVBQXFDM0IsU0FBdEMsQ0FBM0I7O0FBRUEsUUFBSTVCLE1BQU0sS0FBSyxPQUFmLEVBQXdCO0FBQ3BCLFVBQUlvRCxRQUFRLENBQUMsTUFBSSxDQUFDbEIsRUFBTixDQUFSLEtBQXNCLFNBQTFCLEVBQXFDO0FBQ2pDLFlBQUl1QixZQUFZLEtBQUssQ0FBckIsRUFBd0I7QUFDcEJwRSxVQUFBQSxRQUFRLENBQUNxQyxjQUFULENBQXdCNkIsV0FBeEIsRUFBcUNHLGFBQXJDLENBQW1EakQsS0FBbkQsQ0FBeURvQyxPQUF6RCxHQUFtRSxPQUFuRTtBQUNIO0FBQ0o7O0FBQ0R4RCxNQUFBQSxRQUFRLENBQUNxQyxjQUFULENBQXdCNkIsV0FBeEIsRUFBcUMzQixTQUFyQyxHQUFpRDZCLFlBQVksR0FBRyxDQUFoRTtBQUNILEtBUEQsTUFPUTtBQUNKLFVBQUlMLFFBQVEsQ0FBQyxNQUFJLENBQUNsQixFQUFOLENBQVIsS0FBc0IsU0FBMUIsRUFBcUM7QUFDakMsWUFBSXVCLFlBQVksS0FBSyxDQUFyQixFQUF3QjtBQUNwQnBFLFVBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0I2QixXQUF4QixFQUFxQ0csYUFBckMsQ0FBbURqRCxLQUFuRCxDQUF5RG9DLE9BQXpELEdBQW1FLE1BQW5FO0FBQ0g7QUFDSjs7QUFDRHhELE1BQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0I2QixXQUF4QixFQUFxQzNCLFNBQXJDLEdBQWlENkIsWUFBWSxHQUFHLENBQWhFO0FBQ0g7O0FBRURwQyxJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLE9BQUMsTUFBRCxFQUFPQyxPQUFQLENBQWUsVUFBQzlCLFFBQUQsRUFBYztBQUN6QkEsUUFBQUEsUUFBUSxDQUFDaUIsS0FBVCxDQUFlQyxhQUFmLEdBQStCLE1BQS9CO0FBQ0gsT0FGRDtBQUdILEtBSlMsRUFJUCxHQUpPLENBQVY7QUFLSCxHQWhDRDtBQWlDSDs7QUFFRHdDLElBQUksQ0FBQzVCLE9BQUwsQ0FBYSxVQUFDNEIsSUFBRCxFQUFVO0FBQ25CQSxFQUFBQSxJQUFJLENBQUMzQixnQkFBTCxDQUFzQixPQUF0QixFQUErQjRCLEtBQS9CO0FBQ0gsQ0FGRCxHQUlBOztBQUVBOUQsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixVQUExQixFQUFzQ2dDLE9BQXRDLENBQThDLFVBQUNxQyxJQUFELEVBQVU7QUFDcEQsTUFBSUMsTUFBTSxHQUFHRCxJQUFJLENBQUN6QixFQUFMLENBQVFzQixPQUFSLENBQWdCLFFBQWhCLEVBQTBCLEVBQTFCLENBQWI7QUFDQUcsRUFBQUEsSUFBSSxDQUFDL0MsYUFBTCxDQUFtQixhQUFuQixFQUFrQ1csZ0JBQWxDLENBQW1ELFVBQW5ELEVBQThELFVBQUM5QixLQUFELEVBQVc7QUFDckUsUUFBSW9FLFNBQVMsR0FBR0YsSUFBSSxDQUFDL0MsYUFBTCxDQUFtQixjQUFuQixDQUFoQjtBQUNBLFFBQUlqQixHQUFHLEdBQUdrRSxTQUFTLENBQUNqRSxJQUFwQjtBQUVBVixJQUFBQSxLQUFLLENBQUNXLEdBQU4sQ0FBVUYsR0FBVixFQUFlRyxJQUFmLENBQW9CLFVBQUNDLFFBQUQsRUFBYztBQUM5QixVQUFJQyxNQUFNLEdBQUdDLE1BQU0sQ0FBQ0YsUUFBUSxDQUFDRyxJQUFULENBQWNILFFBQWQsQ0FBdUJDLE1BQXhCLENBQW5CO0FBQ0NBLE1BQUFBLE1BQU0sS0FBSyxPQUFaLEdBQXVCNkQsU0FBUyxDQUFDMUQsU0FBVixDQUFvQkMsR0FBcEIsQ0FBd0IsT0FBeEIsQ0FBdkIsR0FBMER5RCxTQUFTLENBQUMxRCxTQUFWLENBQW9CRSxNQUFwQixDQUEyQixPQUEzQixDQUExRDtBQUVBLFVBQUl5RCxlQUFlLEdBQUcsdUJBQXVCRCxTQUFTLENBQUMzQixFQUFWLENBQWFzQixPQUFiLENBQXFCLFlBQXJCLEVBQWtDLEVBQWxDLENBQTdDO0FBQ0EsVUFBSUMsWUFBWSxHQUFHNUIsUUFBUSxDQUFDeEMsUUFBUSxDQUFDcUMsY0FBVCxDQUF3Qm9DLGVBQXhCLEVBQXlDbEMsU0FBMUMsQ0FBM0I7O0FBRUEsVUFBSTVCLE1BQU0sS0FBSyxPQUFmLEVBQXdCO0FBQ3BCMkQsUUFBQUEsSUFBSSxDQUFDL0MsYUFBTCxDQUFtQixhQUFuQixFQUFrQ1QsU0FBbEMsQ0FBNENDLEdBQTVDLENBQWdELE1BQWhEO0FBQ0FpQixRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNic0MsVUFBQUEsSUFBSSxDQUFDL0MsYUFBTCxDQUFtQixhQUFuQixFQUFrQ1QsU0FBbEMsQ0FBNENFLE1BQTVDLENBQW1ELE1BQW5EO0FBQ0gsU0FGUyxFQUVQLElBRk8sQ0FBVjtBQUdBaEIsUUFBQUEsUUFBUSxDQUFDcUMsY0FBVCxDQUF3Qm9DLGVBQXhCLEVBQXlDbEMsU0FBekMsR0FBcUQ2QixZQUFZLEdBQUcsQ0FBcEU7QUFDSCxPQU5ELE1BTVE7QUFDSkUsUUFBQUEsSUFBSSxDQUFDL0MsYUFBTCxDQUFtQixhQUFuQixFQUFrQ1QsU0FBbEMsQ0FBNENDLEdBQTVDLENBQWdELFNBQWhEO0FBQ0FpQixRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNic0MsVUFBQUEsSUFBSSxDQUFDL0MsYUFBTCxDQUFtQixhQUFuQixFQUFrQ1QsU0FBbEMsQ0FBNENFLE1BQTVDLENBQW1ELFNBQW5EO0FBQ0gsU0FGUyxFQUVQLElBRk8sQ0FBVjtBQUdBaEIsUUFBQUEsUUFBUSxDQUFDcUMsY0FBVCxDQUF3Qm9DLGVBQXhCLEVBQXlDbEMsU0FBekMsR0FBcUQ2QixZQUFZLEdBQUcsQ0FBcEU7QUFDSDs7QUFFRHBDLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsU0FBQ3dDLFNBQUQsRUFBWXZDLE9BQVosQ0FBb0IsVUFBQzlCLFFBQUQsRUFBYztBQUM5QkEsVUFBQUEsUUFBUSxDQUFDaUIsS0FBVCxDQUFlQyxhQUFmLEdBQStCLE1BQS9CO0FBQ0gsU0FGRDtBQUdILE9BSlMsRUFJUCxHQUpPLENBQVY7QUFLSCxLQTFCRDtBQTJCSCxHQS9CRDtBQWdDSCxDQWxDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtDQUdBOztBQUNBdkIsbUJBQU8sQ0FBQyxtSEFBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLHVHQUFELENBQVAsRUFFQTtBQUNBOzs7QUFDQSxJQUFJK0IsQ0FBQyxHQUFHL0IsbUJBQU8sQ0FBQyxvREFBRCxDQUFmOztBQUNBNEUscUJBQU0sQ0FBQzdDLENBQVAsR0FBVzZDLHFCQUFNLENBQUNDLE1BQVAsR0FBZ0I5QyxDQUEzQixFQUVBOztBQUNBL0IsbUJBQU8sQ0FBQyxnRUFBRCxDQUFQLEVBRUE7OztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJBO0FBRUEsSUFBTStCLENBQUMsR0FBRy9CLG1CQUFPLENBQUMsb0RBQUQsQ0FBakI7O0FBQ0EsSUFBSThFLElBQUksR0FBRztBQUFDLE1BQUksQ0FBTDtBQUFRLE1BQUksQ0FBWjtBQUFlLE1BQUksQ0FBbkI7QUFBc0IsTUFBSTtBQUExQixDQUFYOztBQUVBLFNBQVN2RSxjQUFULENBQXdCd0UsQ0FBeEIsRUFBMkI7QUFDdkJBLEVBQUFBLENBQUMsQ0FBQ3hFLGNBQUY7QUFDSDs7QUFFRCxTQUFTeUUsMkJBQVQsQ0FBcUNELENBQXJDLEVBQXdDO0FBQ3BDLE1BQUlELElBQUksQ0FBQ0MsQ0FBQyxDQUFDRSxPQUFILENBQVIsRUFBcUI7QUFDakIxRSxJQUFBQSxjQUFjLENBQUN3RSxDQUFELENBQWQ7QUFDQSxXQUFPLEtBQVA7QUFDSDtBQUNKOztBQUVELElBQUlHLGVBQWUsR0FBRyxLQUF0Qjs7QUFDQSxJQUFJO0FBQ0FDLEVBQUFBLE1BQU0sQ0FBQy9DLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLElBQWhDLEVBQXNDZ0QsTUFBTSxDQUFDQyxjQUFQLENBQXNCLEVBQXRCLEVBQTBCLFNBQTFCLEVBQXFDO0FBQ3ZFM0UsSUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFBRXdFLE1BQUFBLGVBQWUsR0FBRyxJQUFsQjtBQUF5QjtBQUQyQixHQUFyQyxDQUF0QztBQUdILENBSkQsQ0FJRSxPQUFNSCxDQUFOLEVBQVMsQ0FBRTs7QUFFYixJQUFJTyxRQUFRLEdBQUdKLGVBQWUsR0FBRztBQUFFSyxFQUFBQSxPQUFPLEVBQUU7QUFBWCxDQUFILEdBQXdCLEtBQXREO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLGFBQWF0RixRQUFRLENBQUN1RixhQUFULENBQXVCLEtBQXZCLENBQWIsR0FBNkMsT0FBN0MsR0FBdUQsWUFBeEU7O0FBRUEsU0FBU0MsYUFBVCxHQUF5QjtBQUNyQlAsRUFBQUEsTUFBTSxDQUFDL0MsZ0JBQVAsQ0FBd0IsZ0JBQXhCLEVBQTBDN0IsY0FBMUMsRUFBMEQsS0FBMUQsRUFEcUIsQ0FDNkM7O0FBQ2xFNEUsRUFBQUEsTUFBTSxDQUFDL0MsZ0JBQVAsQ0FBd0JvRCxVQUF4QixFQUFvQ2pGLGNBQXBDLEVBQW9EK0UsUUFBcEQsRUFGcUIsQ0FFMEM7O0FBQy9ESCxFQUFBQSxNQUFNLENBQUMvQyxnQkFBUCxDQUF3QixXQUF4QixFQUFxQzdCLGNBQXJDLEVBQXFEK0UsUUFBckQsRUFIcUIsQ0FHMkM7O0FBQ2hFSCxFQUFBQSxNQUFNLENBQUMvQyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQzRDLDJCQUFuQyxFQUFnRSxLQUFoRTtBQUNIOztBQUVELFNBQVNXLFlBQVQsR0FBd0I7QUFDcEJSLEVBQUFBLE1BQU0sQ0FBQ1MsbUJBQVAsQ0FBMkIsZ0JBQTNCLEVBQTZDckYsY0FBN0MsRUFBNkQsS0FBN0Q7QUFDQTRFLEVBQUFBLE1BQU0sQ0FBQ1MsbUJBQVAsQ0FBMkJKLFVBQTNCLEVBQXVDakYsY0FBdkMsRUFBdUQrRSxRQUF2RDtBQUNBSCxFQUFBQSxNQUFNLENBQUNTLG1CQUFQLENBQTJCLFdBQTNCLEVBQXdDckYsY0FBeEMsRUFBd0QrRSxRQUF4RDtBQUNBSCxFQUFBQSxNQUFNLENBQUNTLG1CQUFQLENBQTJCLFNBQTNCLEVBQXNDWiwyQkFBdEMsRUFBbUUsS0FBbkU7QUFDSCxFQUVEOzs7QUFFQSxJQUFNYSxPQUFPLEdBQUczRixRQUFRLENBQUNxQyxjQUFULENBQXdCLFNBQXhCLENBQWhCO0FBQ0EsSUFBTXVELGFBQWEsR0FBRzVGLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBdEI7QUFDQSxJQUFNd0QsYUFBYSxHQUFHN0YsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixlQUF4QixDQUF0QjtBQUNBLElBQU15RCxtQkFBbUIsR0FBRzlGLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IscUJBQXhCLENBQTVCO0FBQ0EsSUFBTTBELFdBQVcsR0FBRy9GLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBcEI7O0FBRUEsU0FBUzJELE9BQVQsR0FBbUI7QUFDZlIsRUFBQUEsYUFBYTtBQUNiRyxFQUFBQSxPQUFPLENBQUN2RSxLQUFSLENBQWM2RSxTQUFkLEdBQTBCLGtCQUExQjtBQUNBRixFQUFBQSxXQUFXLENBQUMzRSxLQUFaLENBQWtCOEUsT0FBbEIsR0FBNEIsR0FBNUI7QUFDQUwsRUFBQUEsYUFBYSxDQUFDekUsS0FBZCxDQUFvQitFLEtBQXBCLEdBQTRCLE1BQTVCO0FBQ0g7O0FBRUQsU0FBU0MsUUFBVCxHQUFvQjtBQUNoQlgsRUFBQUEsWUFBWTtBQUNaRSxFQUFBQSxPQUFPLENBQUN2RSxLQUFSLENBQWM2RSxTQUFkLEdBQTBCLE9BQTFCO0FBQ0FGLEVBQUFBLFdBQVcsQ0FBQzNFLEtBQVosQ0FBa0I4RSxPQUFsQixHQUE0QixHQUE1QjtBQUNBTCxFQUFBQSxhQUFhLENBQUN6RSxLQUFkLENBQW9CK0UsS0FBcEIsR0FBNEIsR0FBNUI7QUFDSDs7QUFFRCxJQUFJUixPQUFKLEVBQWE7QUFDVEMsRUFBQUEsYUFBYSxDQUFDMUQsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0M4RCxPQUF4QztBQUNBSCxFQUFBQSxhQUFhLENBQUMzRCxnQkFBZCxDQUErQixPQUEvQixFQUF3Q2tFLFFBQXhDOztBQUNBLE1BQUlOLG1CQUFKLEVBQXlCO0FBQ3JCQSxJQUFBQSxtQkFBbUIsQ0FBQzVELGdCQUFwQixDQUFxQyxPQUFyQyxFQUE4Q2tFLFFBQTlDO0FBQ0g7QUFDSixFQUVEOzs7QUFFQXRHLG1CQUFPLENBQUMsd0hBQUQsQ0FBUDs7QUFFQStCLENBQUMsQ0FBQzdCLFFBQUQsQ0FBRCxDQUFZcUcsS0FBWixDQUFrQixZQUFXO0FBQ3pCeEUsRUFBQUEsQ0FBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUJ5RSxrQkFBekIsQ0FBNEM7QUFDeENDLElBQUFBLE9BQU8sRUFBRSxpQkFBU0MsTUFBVCxFQUFpQkMsSUFBakIsRUFBdUI7QUFDNUI7QUFDQTVFLE1BQUFBLENBQUMsQ0FBQzJFLE1BQUQsQ0FBRCxDQUFVRSxPQUFWLENBQWtCLGtCQUFsQixFQUFzQ0MsSUFBdEMsQ0FBMkMsTUFBM0MsRUFBbURDLElBQUksQ0FBQ0MsSUFBTCxDQUFVQyxRQUFWLEVBQW5EO0FBQ0FqRixNQUFBQSxDQUFDLENBQUMsTUFBRCxDQUFELENBQVU4RSxJQUFWLENBQWUsTUFBZixFQUF1QkMsSUFBSSxDQUFDQyxJQUFMLENBQVVDLFFBQVYsRUFBdkIsRUFINEIsQ0FJNUI7QUFDSCxLQU51QztBQU94Q0MsSUFBQUEsV0FBVyxFQUFFLENBUDJCO0FBUXhDQyxJQUFBQSxVQUFVLEVBQUUsSUFSNEI7QUFTeENDLElBQUFBLHFCQUFxQixFQUFFLEtBVGlCO0FBVXhDQyxJQUFBQSxRQUFRLEVBQUUsQ0FBQyxXQUFELEVBQWEsZ0JBQWIsRUFBOEIsU0FBOUIsRUFBd0MsVUFBeEMsRUFBbUQsVUFBbkQ7QUFWOEIsR0FBNUM7QUFZSCxDQWJELEdBZUE7O0FBRUEsSUFBTUMsWUFBWSxHQUFHbkgsUUFBUSxDQUFDdUIsYUFBVCxDQUF1QixtQkFBdkIsQ0FBckI7QUFDQSxJQUFNNkYsZUFBZSxHQUFHcEgsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixpQkFBeEIsQ0FBeEI7QUFDQSxJQUFNZ0YsWUFBWSxHQUFHckgsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBckI7QUFDQSxJQUFNcUgsT0FBTyxHQUFHdEgsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixpQkFBeEIsQ0FBaEI7QUFDQSxJQUFNa0YsUUFBUSxHQUFHdkgsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixrQkFBeEIsQ0FBakI7QUFDQSxJQUFNbUYsZ0JBQWdCLEdBQUd4SCxRQUFRLENBQUN1QixhQUFULENBQXVCLHdCQUF2QixDQUF6QjtBQUNBLElBQU1rRyxjQUFjLEdBQUd6SCxRQUFRLENBQUN1QixhQUFULENBQXVCLHFCQUF2QixDQUF2Qjs7QUFFQSxJQUFJa0csY0FBSixFQUFvQjtBQUNoQkEsRUFBQUEsY0FBYyxDQUFDdkYsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUMsWUFBTTtBQUMzQ29GLElBQUFBLE9BQU8sQ0FBQ0ksZUFBUixDQUF3QixPQUF4QjtBQUNBSCxJQUFBQSxRQUFRLENBQUNHLGVBQVQsQ0FBeUIsT0FBekI7QUFDQVAsSUFBQUEsWUFBWSxDQUFDckcsU0FBYixDQUF1QkUsTUFBdkIsQ0FBOEIsYUFBOUI7QUFDSCxHQUpEO0FBS0g7O0FBRUQsSUFBSXFHLFlBQUosRUFBa0I7QUFDZEEsRUFBQUEsWUFBWSxDQUFDcEYsT0FBYixDQUFxQixVQUFDMEYsS0FBRCxFQUFXO0FBQzVCLFFBQUlDLFNBQVMsR0FBR0QsS0FBSyxDQUFDcEcsYUFBTixDQUFvQixhQUFwQixDQUFoQjtBQUNBLFFBQUlzRyxZQUFZLEdBQUdGLEtBQUssQ0FBQ3BHLGFBQU4sQ0FBb0IsZ0JBQXBCLENBQW5CO0FBQ0FvRyxJQUFBQSxLQUFLLENBQUN6RixnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDeUYsS0FBRCxFQUFXO0FBQ3ZDTCxNQUFBQSxPQUFPLENBQUN0RCxLQUFSLEdBQWdCNEQsU0FBUyxDQUFDckYsU0FBMUI7QUFDQWdGLE1BQUFBLFFBQVEsQ0FBQ3ZELEtBQVQsR0FBaUI2RCxZQUFZLENBQUN0RixTQUE5QjtBQUNBNkUsTUFBQUEsZUFBZSxDQUFDVSxLQUFoQjs7QUFFQSxVQUFJUixPQUFPLENBQUN0RCxLQUFSLEtBQWtCLEVBQXRCLEVBQTBCO0FBQ3RCbUQsUUFBQUEsWUFBWSxDQUFDckcsU0FBYixDQUF1QkMsR0FBdkIsQ0FBMkIsYUFBM0I7QUFDQXlHLFFBQUFBLGdCQUFnQixDQUFDakYsU0FBakIsR0FBNkIrRSxPQUFPLENBQUN0RCxLQUFyQztBQUNIO0FBQ0osS0FURDtBQVVILEdBYkQ7QUFjSCxFQUVEOzs7QUFFQSxJQUFJK0QsWUFBWSxHQUFHL0gsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixzQkFBMUIsQ0FBbkI7QUFFQSxJQUFNK0gsWUFBWSxHQUFHaEksUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixjQUF4QixDQUFyQixFQUNBOztBQUNBLElBQU00RixrQkFBa0IsR0FBR2pJLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0Isa0JBQXhCLENBQTNCO0FBQ0EsSUFBTTZGLGtCQUFrQixHQUFHbEksUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixtQkFBeEIsQ0FBM0I7O0FBRUEsU0FBUzhGLGdCQUFULEdBQTJCO0FBQ3ZCRixFQUFBQSxrQkFBa0IsQ0FBQzdHLEtBQW5CLENBQXlCZ0gsT0FBekIsR0FBbUMseUJBQW5DO0FBQ0FwSSxFQUFBQSxRQUFRLENBQUN1QixhQUFULENBQXVCLHVCQUF2QixFQUFnREgsS0FBaEQsQ0FBc0RvQyxPQUF0RCxHQUFnRSxPQUFoRTtBQUNBeEQsRUFBQUEsUUFBUSxDQUFDdUIsYUFBVCxDQUF1Qiw2QkFBdkIsRUFBc0R1RyxLQUF0RDtBQUNIOztBQUVELFNBQVNPLGlCQUFULEdBQTRCO0FBQ3hCckksRUFBQUEsUUFBUSxDQUFDdUIsYUFBVCxDQUF1Qix1QkFBdkIsRUFBZ0RILEtBQWhELENBQXNEb0MsT0FBdEQsR0FBZ0UsTUFBaEU7QUFDQXlFLEVBQUFBLGtCQUFrQixDQUFDN0csS0FBbkIsQ0FBeUJvQyxPQUF6QixHQUFtQyxNQUFuQztBQUNIOztBQUVELElBQUl3RSxZQUFKLEVBQWtCO0FBQ2RDLEVBQUFBLGtCQUFrQixDQUFDL0YsZ0JBQW5CLENBQW9DLE9BQXBDLEVBQTZDaUcsZ0JBQTdDO0FBQ0FELEVBQUFBLGtCQUFrQixDQUFDaEcsZ0JBQW5CLENBQW9DLE9BQXBDLEVBQTZDbUcsaUJBQTdDO0FBQ0FySSxFQUFBQSxRQUFRLENBQUN1QixhQUFULENBQXVCLGVBQXZCLEVBQXdDVyxnQkFBeEMsQ0FBeUQsT0FBekQsRUFBa0VtRyxpQkFBbEU7QUFDSDs7QUFFRE4sWUFBWSxDQUFDOUYsT0FBYixDQUFxQixVQUFDcUcsUUFBRCxFQUFVQyxHQUFWLEVBQWtCO0FBQ25DRCxFQUFBQSxRQUFRLENBQUMvRyxhQUFULENBQXVCLGVBQXZCLEVBQXdDVyxnQkFBeEMsQ0FBeUQsT0FBekQsRUFBaUUsVUFBQ3NHLEtBQUQsRUFBVztBQUN4RUYsSUFBQUEsUUFBUSxDQUFDL0csYUFBVCxDQUF1QixnQkFBdkIsRUFBeUNoQixJQUF6QyxHQUFnRCxhQUFhaUksS0FBSyxDQUFDcEYsTUFBTixDQUFhWSxLQUFiLENBQW1CRyxPQUFuQixDQUEyQixHQUEzQixFQUFnQyxLQUFoQyxFQUF1Q0EsT0FBdkMsQ0FBK0MsR0FBL0MsRUFBb0QsS0FBcEQsQ0FBN0Q7QUFDSCxHQUZEO0FBSUFtRSxFQUFBQSxRQUFRLENBQUMvRyxhQUFULENBQXVCLGVBQXZCLEVBQXdDVyxnQkFBeEMsQ0FBeUQsT0FBekQsRUFBaUUsVUFBQzlCLEtBQUQsRUFBVztBQUNwRSxRQUFJQSxLQUFLLENBQUMyRSxPQUFOLEtBQWtCLEVBQWxCLElBQXdCM0UsS0FBSyxDQUFDcUksSUFBTixLQUFlLE9BQTNDLEVBQW9EO0FBQ2hESCxNQUFBQSxRQUFRLENBQUMvRyxhQUFULENBQXVCLGdCQUF2QixFQUF5QzBCLEtBQXpDO0FBQ0g7QUFDSixHQUpMO0FBTUgsQ0FYRCxHQWFBOztBQUNBcEIsQ0FBQyxDQUFDLFlBQVk7QUFDVkEsRUFBQUEsQ0FBQyxDQUFDLHlCQUFELENBQUQsQ0FBNkI2RyxPQUE3QixDQUFxQztBQUNqQ0MsSUFBQUEsT0FBTyxFQUFHO0FBRHVCLEdBQXJDO0FBR0gsQ0FKQSxDQUFELEVBTUE7O0FBQ0EsSUFBSTNJLFFBQVEsQ0FBQ3VCLGFBQVQsQ0FBdUIsb0JBQXZCLENBQUosRUFBa0Q7QUFDOUMsTUFBSXFILFNBQVMsR0FBRzVJLFFBQVEsQ0FBQ3VCLGFBQVQsQ0FBdUIsb0JBQXZCLENBQWhCOztBQUNBLE1BQUl2QixRQUFRLENBQUNxQyxjQUFULENBQXdCLGVBQXhCLENBQUosRUFBOEM7QUFDMUMsUUFBSXdHLGFBQWEsR0FBRzdJLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBcEI7O0FBQ0F1RyxJQUFBQSxTQUFTLENBQUNFLFFBQVYsR0FBcUIsWUFBTTtBQUN2QkQsTUFBQUEsYUFBYSxDQUFDRSxHQUFkLEdBQW9COUQsTUFBTSxDQUFDK0QsR0FBUCxDQUFXQyxlQUFYLENBQTJCTCxTQUFTLENBQUNNLEtBQVYsQ0FBZ0IsQ0FBaEIsQ0FBM0IsQ0FBcEI7QUFDQUwsTUFBQUEsYUFBYSxDQUFDekgsS0FBZCxDQUFvQitILFlBQXBCLEdBQW1DLEtBQW5DO0FBQ0gsS0FIRDtBQUlILEdBTkQsTUFNTyxJQUFJbkosUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixnQkFBeEIsQ0FBSixFQUErQztBQUNsRCxRQUFJK0csYUFBYSxHQUFHcEosUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixnQkFBeEIsQ0FBcEI7O0FBQ0F1RyxJQUFBQSxTQUFTLENBQUNFLFFBQVYsR0FBcUIsWUFBTTtBQUN2Qk0sTUFBQUEsYUFBYSxDQUFDaEksS0FBZCxDQUFvQmlJLGVBQXBCLEdBQXNDLFdBQVdwRSxNQUFNLENBQUMrRCxHQUFQLENBQVdDLGVBQVgsQ0FBMkJMLFNBQVMsQ0FBQ00sS0FBVixDQUFnQixDQUFoQixDQUEzQixDQUFYLEdBQTRELEtBQWxHO0FBQ0gsS0FGRDtBQUdIO0FBQ0osRUFFRDs7O0FBQ0EsSUFBSWxKLFFBQVEsQ0FBQ3VCLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQUosRUFBOEM7QUFDMUMsTUFBSStILFFBQVEsR0FBR3RKLFFBQVEsQ0FBQ3VCLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQWY7O0FBQ0ErSCxFQUFBQSxRQUFRLENBQUNDLE9BQVQsR0FBbUIsWUFBTTtBQUNyQkQsSUFBQUEsUUFBUSxDQUFDbEksS0FBVCxDQUFlb0ksTUFBZixHQUF3QkYsUUFBUSxDQUFDRyxZQUFULEdBQXdCLENBQXhCLEdBQTRCLElBQXBEO0FBQ0gsR0FGRDtBQUdILEVBRUQ7OztBQUNBNUgsQ0FBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUJDLE1BQXpCLENBQWdDLElBQWhDLEVBQXNDLEdBQXRDLEVBQTJDQyxPQUEzQyxDQUFtRCxHQUFuRCxFQUF3RCxZQUFVO0FBQzlERixFQUFBQSxDQUFDLENBQUMscUJBQUQsQ0FBRCxDQUF5QkUsT0FBekIsQ0FBaUMsR0FBakM7QUFDSCxDQUZELEdBSUE7O0FBQ0FGLENBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCNkgsRUFBckIsQ0FBd0IsVUFBeEIsRUFBb0MsVUFBVXRKLEtBQVYsRUFBaUI7QUFDakQsTUFBSXVKLEtBQUssR0FBRyxJQUFJQyxNQUFKLENBQVcsa0JBQVgsQ0FBWjtBQUNBLE1BQUlyQixHQUFHLEdBQUczSCxNQUFNLENBQUNpSixZQUFQLENBQW9CLENBQUN6SixLQUFLLENBQUMwSixRQUFQLEdBQWtCMUosS0FBSyxDQUFDMkosS0FBeEIsR0FBZ0MzSixLQUFLLENBQUMwSixRQUExRCxDQUFWOztBQUNBLE1BQUksQ0FBQ0gsS0FBSyxDQUFDSyxJQUFOLENBQVd6QixHQUFYLENBQUwsRUFBc0I7QUFDbEJuSSxJQUFBQSxLQUFLLENBQUNDLGNBQU47QUFDQSxXQUFPLEtBQVA7QUFDSDtBQUNKLENBUEQsR0FTQTs7QUFDQSxJQUFNNEosWUFBWSxHQUFHakssUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBckI7QUFFQWdLLFlBQVksQ0FBQ2hJLE9BQWIsQ0FBcUIsVUFBQ3FDLElBQUQsRUFBVTtBQUMzQixXQUFTNEYsaUJBQVQsR0FBNkI7QUFDekIsU0FBSzlJLEtBQUwsQ0FBV29DLE9BQVgsR0FBcUIsTUFBckI7QUFDQXhELElBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsaUJBQWlCa0MsTUFBekMsRUFBaUR6RCxTQUFqRCxDQUEyREUsTUFBM0QsQ0FBa0UsUUFBbEU7QUFDSDs7QUFFRCxNQUFJdUQsTUFBTSxHQUFHRCxJQUFJLENBQUN6QixFQUFMLENBQVFzQixPQUFSLENBQWdCLGNBQWhCLEVBQWdDLEVBQWhDLENBQWI7O0FBRUEsTUFBSUcsSUFBSSxDQUFDL0MsYUFBTCxDQUFtQixLQUFuQixFQUEwQjRJLFlBQTFCLEdBQXlDLEVBQTdDLEVBQWlEO0FBQzdDbkssSUFBQUEsUUFBUSxDQUFDcUMsY0FBVCxDQUF3Qix1QkFBdUJrQyxNQUEvQyxFQUF1RG5ELEtBQXZELENBQTZEb0MsT0FBN0QsR0FBdUUsT0FBdkU7QUFDSDs7QUFFRHhELEVBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsdUJBQXVCa0MsTUFBL0MsRUFBdURyQyxnQkFBdkQsQ0FBd0UsT0FBeEUsRUFBaUZnSSxpQkFBakY7QUFDSCxDQWJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDck5BLElBQU1ySyxLQUFLLEdBQUdDLHlFQUFkLEVBRUE7OztBQUVBLFNBQVNzSyxlQUFULENBQXlCaEssS0FBekIsRUFBK0JpSyxJQUEvQixFQUFvQ0MsSUFBcEMsRUFBMEM7QUFFdEMsV0FBU0MsU0FBVCxDQUFtQkQsSUFBbkIsRUFBeUI7QUFDckIsUUFBSUEsSUFBSSxLQUFLLFNBQWIsRUFBd0I7QUFDcEIsYUFBT0QsSUFBSSxDQUFDOUksYUFBTCxDQUFtQixhQUFuQixFQUFrQ2dCLFNBQXpDO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsYUFBTzhILElBQUksQ0FBQzlJLGFBQUwsQ0FBbUIsY0FBbkIsRUFBbUNnQixTQUExQztBQUNIO0FBQ0o7O0FBQ0QsTUFBSWlJLFFBQVEsR0FBR0QsU0FBUyxDQUFDRCxJQUFELENBQXhCO0FBQ0EsTUFBSUcsS0FBSyxHQUFHekssUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixVQUFVaUksSUFBVixHQUFpQixJQUF6QyxFQUErQy9ILFNBQTNEO0FBQ0EsTUFBSWpDLEdBQUcsR0FBRyxXQUFXZ0ssSUFBWCxHQUFrQixHQUFsQixHQUF3QkcsS0FBeEIsR0FBZ0MsR0FBaEMsR0FBc0NELFFBQWhEO0FBRUF4SyxFQUFBQSxRQUFRLENBQUNxQyxjQUFULENBQXdCLFVBQVVpSSxJQUFWLEdBQWlCLFVBQXpDLEVBQXFEL0gsU0FBckQsR0FBaUU4SCxJQUFJLENBQUM5SSxhQUFMLENBQW1CLGNBQW5CLEVBQW1DZ0IsU0FBcEc7QUFDQXZDLEVBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsVUFBVWlJLElBQVYsR0FBaUIsT0FBekMsRUFBa0QvSSxhQUFsRCxDQUFnRSxHQUFoRSxFQUFxRWhCLElBQXJFLEdBQTRFRCxHQUE1RTtBQUVBTixFQUFBQSxRQUFRLENBQUNxQyxjQUFULENBQXdCLFVBQVVpSSxJQUFWLEdBQWlCLE9BQXpDLEVBQWtEckgsS0FBbEQ7QUFDQWpELEVBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsVUFBVWlJLElBQVYsR0FBaUIsU0FBekMsRUFBb0RySCxLQUFwRDtBQUNIOztBQUVELFNBQVN5SCxVQUFULENBQW9CdEssS0FBcEIsRUFBMkJrSyxJQUEzQixFQUFpQztBQUM3QmxLLEVBQUFBLEtBQUssQ0FBQ0MsY0FBTjtBQUNBLE1BQUlDLEdBQUcsR0FBR0YsS0FBSyxDQUFDZ0QsTUFBTixDQUFhN0MsSUFBdkI7QUFFQVYsRUFBQUEsS0FBSyxDQUFDVyxHQUFOLENBQVVGLEdBQVYsRUFBZUcsSUFBZixDQUFvQixVQUFDQyxRQUFELEVBQWM7QUFDOUJWLElBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsVUFBVWlJLElBQVYsR0FBaUIsT0FBekMsRUFBa0RySCxLQUFsRDtBQUVBLFFBQUl4QixPQUFPLEdBQUcsc0RBQ1ZmLFFBQVEsQ0FBQ0csSUFBVCxDQUFjSCxRQUFkLENBQXVCZSxPQURiLEdBRVYsUUFGSjtBQUlBLFFBQUlILFFBQVEsR0FBR3RCLFFBQVEsQ0FBQ3VCLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBZjtBQUNBLFFBQUlDLFVBQVUsR0FBR3hCLFFBQVEsQ0FBQ3VCLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBakI7O0FBRUEsUUFBSUMsVUFBSixFQUFnQjtBQUNaQSxNQUFBQSxVQUFVLENBQUNHLFNBQVgsR0FBdUJGLE9BQXZCO0FBQ0gsS0FGRCxNQUVPO0FBQ0hILE1BQUFBLFFBQVEsQ0FBQ00sa0JBQVQsQ0FBNEIsWUFBNUIsRUFBMENILE9BQTFDO0FBQ0g7O0FBRURJLElBQUFBLENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZUMsTUFBZixDQUFzQixJQUF0QixFQUE0QixHQUE1QixFQUFpQ0MsT0FBakMsQ0FBeUMsR0FBekMsRUFBOEMsWUFBVTtBQUNwREYsTUFBQUEsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlRSxPQUFmLENBQXVCLEdBQXZCO0FBQ0gsS0FGRDtBQUdILEdBbkJEO0FBb0JILEVBRUQ7QUFFQTs7O0FBQ0EsSUFBSTRJLGNBQWMsR0FBRzNLLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsNEJBQTFCLENBQXJCO0FBQ0EwSyxjQUFjLENBQUMxSSxPQUFmLENBQXVCLFVBQUNvSSxJQUFELEVBQVU7QUFDN0JBLEVBQUFBLElBQUksQ0FBQ25JLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFVBQUM5QixLQUFELEVBQVc7QUFDdENnSyxJQUFBQSxlQUFlLENBQUNoSyxLQUFELEVBQU9pSyxJQUFQLEVBQVksTUFBWixDQUFmO0FBQ0gsR0FGRDtBQUdILENBSkQsR0FNQTs7QUFDQSxJQUFJTyxlQUFlLEdBQUc1SyxRQUFRLENBQUNxQyxjQUFULENBQXdCLHdCQUF4QixDQUF0Qjs7QUFDQSxJQUFJdUksZUFBSixFQUFxQjtBQUNqQkEsRUFBQUEsZUFBZSxDQUFDMUksZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDLFVBQUM5QixLQUFELEVBQVc7QUFDakRzSyxJQUFBQSxVQUFVLENBQUN0SyxLQUFELEVBQU8sTUFBUCxDQUFWO0FBQ0gsR0FGRDtBQUdILEVBRUQ7OztBQUNBLFNBQVN5Syx1QkFBVCxDQUFpQ3pLLEtBQWpDLEVBQXdDO0FBQ3BDQSxFQUFBQSxLQUFLLENBQUNDLGNBQU47QUFDQUwsRUFBQUEsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixnQkFBeEIsRUFBMENZLEtBQTFDO0FBQ0FqRCxFQUFBQSxRQUFRLENBQUNxQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDWSxLQUFyQztBQUNIOztBQUVELElBQUk2SCxlQUFlLEdBQUc5SyxRQUFRLENBQUNxQyxjQUFULENBQXdCLGlCQUF4QixDQUF0Qjs7QUFDQSxJQUFJeUksZUFBSixFQUFxQjtBQUNqQkEsRUFBQUEsZUFBZSxDQUFDNUksZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDMkksdUJBQTFDO0FBQ0gsRUFFRDtBQUVBOzs7QUFDQSxTQUFTRSx1QkFBVCxHQUFtQztBQUMvQi9LLEVBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsYUFBeEIsRUFBdUNFLFNBQXZDLEdBQW1ELEtBQUtNLEVBQUwsQ0FBUXNCLE9BQVIsQ0FBZ0IsYUFBaEIsRUFBK0IsRUFBL0IsQ0FBbkQ7QUFDSDs7QUFFRCxJQUFJNkcsZUFBZSxHQUFHaEwsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixvQkFBMUIsQ0FBdEI7QUFDQStLLGVBQWUsQ0FBQy9JLE9BQWhCLENBQXdCLFVBQUMrSSxlQUFELEVBQXFCO0FBQ3pDQSxFQUFBQSxlQUFlLENBQUM5SSxnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEM2SSx1QkFBMUM7QUFDSCxDQUZELEdBSUE7O0FBQ0EsSUFBSUUsY0FBYyxHQUFHakwsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQiw0QkFBMUIsQ0FBckI7QUFDQWdMLGNBQWMsQ0FBQ2hKLE9BQWYsQ0FBdUIsVUFBQ29JLElBQUQsRUFBVTtBQUM3QkEsRUFBQUEsSUFBSSxDQUFDbkksZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBQzlCLEtBQUQsRUFBVztBQUN0Q2dLLElBQUFBLGVBQWUsQ0FBQ2hLLEtBQUQsRUFBT2lLLElBQVAsRUFBWSxNQUFaLENBQWY7QUFDSCxHQUZEO0FBR0gsQ0FKRCxHQU1BOztBQUNBLElBQUlhLHNCQUFzQixHQUFHbEwsUUFBUSxDQUFDcUMsY0FBVCxDQUF3Qix3QkFBeEIsQ0FBN0I7O0FBQ0EsSUFBSTZJLHNCQUFKLEVBQTRCO0FBQ3hCQSxFQUFBQSxzQkFBc0IsQ0FBQ2hKLGdCQUF2QixDQUF3QyxPQUF4QyxFQUFpRCxVQUFDOUIsS0FBRCxFQUFXO0FBQ3hEc0ssSUFBQUEsVUFBVSxDQUFDdEssS0FBRCxFQUFPLE1BQVAsQ0FBVjtBQUNILEdBRkQ7QUFHSCxFQUVEOzs7QUFDQSxTQUFTK0ssdUJBQVQsR0FBbUM7QUFDL0JuTCxFQUFBQSxRQUFRLENBQUNxQyxjQUFULENBQXdCLGdCQUF4QixFQUEwQ1ksS0FBMUM7QUFDQWpELEVBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsZ0JBQWdCckMsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixhQUF4QixFQUF1Q0UsU0FBL0UsRUFBMEZVLEtBQTFGO0FBQ0g7O0FBRUQsSUFBSW1JLGVBQWUsR0FBR3BMLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsaUJBQXhCLENBQXRCOztBQUNBLElBQUkrSSxlQUFKLEVBQXFCO0FBQ2pCQSxFQUFBQSxlQUFlLENBQUNsSixnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMENpSix1QkFBMUM7QUFDSCxFQUVEO0FBRUE7OztBQUNBLElBQUlFLGlCQUFpQixHQUFHckwsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQiwrQkFBMUIsQ0FBeEI7QUFDQW9MLGlCQUFpQixDQUFDcEosT0FBbEIsQ0FBMEIsVUFBQ29JLElBQUQsRUFBVTtBQUNoQ0EsRUFBQUEsSUFBSSxDQUFDbkksZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBQzlCLEtBQUQsRUFBVztBQUN0Q2dLLElBQUFBLGVBQWUsQ0FBQ2hLLEtBQUQsRUFBT2lLLElBQVAsRUFBWSxTQUFaLENBQWY7QUFDSCxHQUZEO0FBR0gsQ0FKRCxHQU1BOztBQUNBLElBQUlpQixrQkFBa0IsR0FBR3RMLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsMkJBQXhCLENBQXpCOztBQUNBLElBQUlpSixrQkFBSixFQUF3QjtBQUNwQkEsRUFBQUEsa0JBQWtCLENBQUNwSixnQkFBbkIsQ0FBb0MsT0FBcEMsRUFBNkMsVUFBQzlCLEtBQUQsRUFBVztBQUNwRHNLLElBQUFBLFVBQVUsQ0FBQ3RLLEtBQUQsRUFBTyxTQUFQLENBQVY7QUFDSCxHQUZEO0FBR0gsRUFFRDs7O0FBQ0EsU0FBU21MLDBCQUFULENBQW9DbkwsS0FBcEMsRUFBMkM7QUFDdkNBLEVBQUFBLEtBQUssQ0FBQ0MsY0FBTjtBQUNBTCxFQUFBQSxRQUFRLENBQUNxQyxjQUFULENBQXdCLG1CQUF4QixFQUE2Q1ksS0FBN0M7QUFDQWpELEVBQUFBLFFBQVEsQ0FBQ3FDLGNBQVQsQ0FBd0IsY0FBeEIsRUFBd0NZLEtBQXhDO0FBQ0g7O0FBRUQsSUFBSXVJLGtCQUFrQixHQUFHeEwsUUFBUSxDQUFDcUMsY0FBVCxDQUF3QixvQkFBeEIsQ0FBekI7O0FBQ0EsSUFBSW1KLGtCQUFKLEVBQXdCO0FBQ3BCQSxFQUFBQSxrQkFBa0IsQ0FBQ3RKLGdCQUFuQixDQUFvQyxPQUFwQyxFQUE2Q3FKLDBCQUE3QztBQUNIOzs7Ozs7Ozs7Ozs7QUNuSkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYXBwNC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvc2hhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvYXBwNC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKS5kZWZhdWx0O1xuXG4vLyBBZGQgc29uZyB0byBwbGF5bGlzdCBvciBhZGQgcG9zdCB0byBib29rbWFya3NcblxubGV0IHBsYXlsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXlsaXN0LXRvZ2dsZScpO1xubGV0IGJvb2ttYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvb2ttYXJrLXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBzd2l0Y2hlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVybCA9IHRoaXMuaHJlZjtcblxuICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBzdGF0dXMgPSBTdHJpbmcocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAoc3RhdHVzID09PSAnYWRkZWQnKSA/IHRoaXMuY2xhc3NMaXN0LmFkZCgnYWRkZWQnKSA6IHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWRkZWQnKTtcbiAgICAgICAgdGhpcy5kYXRhc2V0Lm9yaWdpbmFsVGl0bGUgPSByZXNwb25zZS5kYXRhLnJlc3BvbnNlLnRpdGxlO1xuICAgICAgICB0aGlzLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgbGV0IGFsZXJ0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICAgICAgICBsZXQgYWxlcnRFeGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hbGVydCcpO1xuXG4gICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnJlc3BvbnNlLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGxldCBiYWRnZSA9ICcnO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzID09PSAnYWRkZWQnKSB7XG4gICAgICAgICAgICAgICAgYmFkZ2UgPSAnc3VjY2Vzcyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJhZGdlID0gJ2Rhbmdlcic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJtZC1hbGVydCBtZC1hbGVydC0nICsgYmFkZ2UgKyAnIG1kLWJveC1tYlwiPicgK1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEucmVzcG9uc2UubWVzc2FnZSArXG4gICAgICAgICAgICAgICAgJzwvZGl2Pic7XG5cbiAgICAgICAgICAgIGlmIChhbGVydEV4aXN0KSB7XG4gICAgICAgICAgICAgICAgYWxlcnRFeGlzdC5vdXRlckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydEJveC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJChcIi5tZC1hbGVydFwiKS5mYWRlVG8oMzAwMCwgNTAwKS5zbGlkZVVwKDUwMCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLnNsaWRlVXAoNTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5wbGF5bGlzdC5mb3JFYWNoKChwbGF5bGlzdCkgPT4ge1xuICAgIHBsYXlsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpdGNoZXIpO1xufSk7XG5cbmJvb2ttYXJrLmZvckVhY2goKGJvb2ttYXJrKSA9PiB7XG4gICAgYm9va21hcmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hlcik7XG59KTtcblxuLy8gRm9sbG93IGEgdXNlciBvciB1bmZvbGxvdyBmcm9tIHlvdXJzZWxmXG5cbmxldCBmb2xsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9sbG93LXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBmb2xsb3dzKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2FkZGVkJykge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdidG4taW5mbycpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdidG4tbGlnaHQnKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnZm9sbG93ZWQnKTtcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9sbG93ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyJykuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykucXVlcnlTZWxlY3RvcignLm51bWJlcicpLmlubmVySFRNTCA9IChwYXJzZUludChmb2xsb3dlcnMsIDEwKSArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAncmVxdWVzdGVkJykge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdidG4taW5mbycpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdidG4tbGlnaHQnKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgncmVxdWVzdGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKSAmJiAhZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlcXVlc3RlZCcpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvbGxvd2VycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykucXVlcnlTZWxlY3RvcignLm51bWJlcicpLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUwgPSAocGFyc2VJbnQoZm9sbG93ZXJzLCAxMCkgLSAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdidG4tbGlnaHQnKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnZm9sbG93ZWQnKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgncmVxdWVzdGVkJyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1pbmZvJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGFzZXQub3JpZ2luYWxUaXRsZSA9IHJlc3BvbnNlLmRhdGEucmVzcG9uc2UudGl0bGU7XG4gICAgICAgIHRoaXMuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIFt0aGlzXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDApO1xuICAgIH0pXG59XG5cbmxldCB1bmZvbGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmZvbGxvdy10b2dnbGUnKTtcblxuZm9sbG93LmZvckVhY2goKGZvbGxvdykgPT4ge1xuICAgIGZvbGxvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZvbGxvd3MpO1xufSk7XG5cbmZ1bmN0aW9uIHVuZm9sbG93cyhldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVybCA9IHRoaXMuaHJlZjtcbiAgICBsZXQgZm9sbG93ZXJCbG9jayA9ICd1JyArIHRoaXMuaWQuc3BsaXQoJ3UnKS5wb3AoKS5zcGxpdCgndCcpWzBdICsgJ2wnO1xuICAgIGxldCBjYW5jZWxCdXR0b25JZCA9ICd1c2VyVW5mb2xsb3cnICsgdGhpcy5pZC5zcGxpdCgndScpLnBvcCgpLnNwbGl0KCd0JylbMF07XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FuY2VsQnV0dG9uSWQpLmNsaWNrKCk7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlbW92ZWQnKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChmb2xsb3dlckJsb2NrKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbnVuZm9sbG93LmZvckVhY2goKHVuZm9sbG93KSA9PiB7XG4gICAgdW5mb2xsb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1bmZvbGxvd3MpO1xufSk7XG5cbi8vIEFjY2VwdCBvciByZWplY3QgZm9sbG93IHJlcXVlc3RcblxuZnVuY3Rpb24gcmVqZWN0UmVxdWVzdEZ1bmN0aW9uKGV2ZW50LCByZXF1ZXN0UmVzcG9uc2UpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSBldmVudC50YXJnZXQuaHJlZjtcbiAgICBsZXQgZm9sbG93ZXJCbG9jayA9ICd1JyArIGV2ZW50LnRhcmdldC5pZC5zcGxpdCgndScpLnBvcCgpLnNwbGl0KCd0JylbMF0gKyAnbCc7XG5cbiAgICBpZiAocmVxdWVzdFJlc3BvbnNlID09PSAncmVqZWN0ZWQnKSB7XG4gICAgICAgIGxldCBjYW5jZWxCdXR0b25JZCA9ICdyZWplY3RSZXF1ZXN0JyArIGV2ZW50LnRhcmdldC5pZC5zcGxpdCgndScpLnBvcCgpLnNwbGl0KCd0JylbMF07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbmNlbEJ1dHRvbklkKS5jbGljaygpO1xuICAgIH1cblxuICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCByZXF1ZXN0ID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2UucmVxdWVzdCk7XG4gICAgICAgIGlmIChyZXF1ZXN0ID09PSByZXF1ZXN0UmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZvbGxvd2VyQmxvY2spLnJlbW92ZSgpO1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLWxpbmUnKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVxdWVzdHNQYWdpbmF0b3InKSkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVxdWVzdHNMaXN0JykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXF1ZXN0c0lzRW1wdHknKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5sZXQgYWNjZXB0UmVxdWVzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NlcHQtZm9sbG93LXJlcXVlc3QnKTtcbmxldCByZWplY3RSZXF1ZXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlamVjdC1yZXF1ZXN0LXRvZ2dsZScpO1xuXG5hY2NlcHRSZXF1ZXN0LmZvckVhY2goKGFjY2VwdFJlcXVlc3QpID0+IHtcbiAgICBhY2NlcHRSZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIHJlamVjdFJlcXVlc3RGdW5jdGlvbihldmVudCwnYWNjZXB0ZWQnKVxuICAgIH0pO1xufSk7XG5cbnJlamVjdFJlcXVlc3QuZm9yRWFjaCgocmVqZWN0UmVxdWVzdCkgPT4ge1xuICAgIHJlamVjdFJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgcmVqZWN0UmVxdWVzdEZ1bmN0aW9uKGV2ZW50LCdyZWplY3RlZCcpXG4gICAgfSk7XG59KTtcblxuLy8gTWFrZSBwb3N0IGZlYXR1cmVkXG5cbmxldCBmZWF0dXJlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mZWF0dXJlZC10b2dnbGUnKTtcblxuZnVuY3Rpb24gZmVhdHVyZWRQb3N0KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gdGhpcy5jbGFzc0xpc3QuYWRkKCdhZGRlZCcpIDogdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhZGRlZCcpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxuZmVhdHVyZWQuZm9yRWFjaCgoZmVhdHVyZWQpID0+IHtcbiAgICBmZWF0dXJlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZlYXR1cmVkUG9zdCk7XG59KTtcblxuLy8gTGlrZXNcblxubGV0IGxpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlrZS10b2dnbGUnKTtcblxuZnVuY3Rpb24gbGlrZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgKHN0YXR1cyA9PT0gJ2FkZGVkJykgPyB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gY29udGFpbnModmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5pbmNsdWRlcygncG9zdCcpID8gXCJwb3N0XCIgOiBcImNvbW1lbnRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsaWtlQ291bnRlciA9IGNvbnRhaW5zKHRoaXMuaWQpICsgJy1saWtlLWNvdW50ZXItJyArIHRoaXMuaWQucmVwbGFjZShjb250YWlucyh0aGlzLmlkKSArICctbGlrZS0nLCcnKTtcbiAgICAgICAgbGV0IGN1cnJlbnRMaWtlcyA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpa2VDb3VudGVyKS5pbm5lckhUTUwpO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgIGlmIChjb250YWlucyh0aGlzLmlkKSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRMaWtlcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaWtlQ291bnRlcikucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ3Vuc2V0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzICsgMTtcbiAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICBpZiAoY29udGFpbnModGhpcy5pZCkgPT09ICdjb21tZW50Jykge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50TGlrZXMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGlrZUNvdW50ZXIpLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxubGlrZS5mb3JFYWNoKChsaWtlKSA9PiB7XG4gICAgbGlrZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpa2VyKTtcbn0pO1xuXG4vLyBQb3N0IGRvdWJsZS1jbGljayBsaWtlXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZC1wb3N0JykuZm9yRWFjaCgocG9zdCkgPT4ge1xuICAgIGxldCBwb3N0SWQgPSBwb3N0LmlkLnJlcGxhY2UoJ3Bvc3RJZCcsICcnKTtcbiAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWltYWdlJykuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLChldmVudCkgPT4ge1xuICAgICAgICBsZXQgcG9zdExpa2VyID0gcG9zdC5xdWVyeVNlbGVjdG9yKCcubGlrZS10b2dnbGUnKTtcbiAgICAgICAgbGV0IHVybCA9IHBvc3RMaWtlci5ocmVmO1xuXG4gICAgICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gcG9zdExpa2VyLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiBwb3N0TGlrZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWRkZWQnKTtcblxuICAgICAgICAgICAgbGV0IHBvc3RMaWtlQ291bnRlciA9ICdwb3N0LWxpa2UtY291bnRlci0nICsgcG9zdExpa2VyLmlkLnJlcGxhY2UoJ3Bvc3QtbGlrZS0nLCcnKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50TGlrZXMgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3N0TGlrZUNvdW50ZXIpLmlubmVySFRNTCk7XG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgICAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWxpa2VyJykuY2xhc3NMaXN0LmFkZCgnbGlrZScpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWxpa2VyJykuY2xhc3NMaXN0LnJlbW92ZSgnbGlrZScpO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvc3RMaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgIHBvc3QucXVlcnlTZWxlY3RvcignLnBvc3QtbGlrZXInKS5jbGFzc0xpc3QuYWRkKCdkaXNsaWtlJyk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc3QucXVlcnlTZWxlY3RvcignLnBvc3QtbGlrZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNsaWtlJyk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zdExpa2VDb3VudGVyKS5pbm5lckhUTUwgPSBjdXJyZW50TGlrZXMgLSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBbcG9zdExpa2VyXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KVxuICAgIH0pO1xufSk7XG4iLCIvKlxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxuICpcbiAqIFdlIHJlY29tbWVuZCBpbmNsdWRpbmcgdGhlIGJ1aWx0IHZlcnNpb24gb2YgdGhpcyBKYXZhU2NyaXB0IGZpbGVcbiAqIChhbmQgaXRzIENTUyBmaWxlKSBpbiB5b3VyIGJhc2UgbGF5b3V0IChiYXNlLmh0bWwudHdpZykuXG4gKi9cblxuLy8gYW55IENTUyB5b3UgaW1wb3J0IHdpbGwgb3V0cHV0IGludG8gYSBzaW5nbGUgc2NzcyBmaWxlIChhcHBGaWxlLnNjc3MgaW4gdGhpcyBjYXNlKVxuaW1wb3J0ICcuLi9zY3NzL2FwcDQuc2Nzcyc7XG5cbi8vIEF3ZXNvbWUgZm9udHNcbnJlcXVpcmUoJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwubWluLmNzcycpO1xucmVxdWlyZSgnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvanMvYWxsLmpzJyk7XG5cbi8vIE5lZWQgalF1ZXJ5PyBJbnN0YWxsIGl0IHdpdGggXCJ5YXJuIGFkZCBqcXVlcnlcIiwgdGhlbiB1bmNvbW1lbnQgdG8gaW1wb3J0IGl0LlxuLy8gaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmxldCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5nbG9iYWwuJCA9IGdsb2JhbC5qUXVlcnkgPSAkO1xuXG4vLyBCb290c3RyYXAganNcbnJlcXVpcmUoJ2Jvb3RzdHJhcCcpO1xuXG4vLyBNeSBzY3JpcHRzXG5pbXBvcnQgJy4vc2NyaXB0cyc7XG5pbXBvcnQgJy4vYWpheCc7XG5pbXBvcnQgJy4vc2hhcmUnO1xuIiwiLy8gUHJldmVudCBzY3JvbGxcblxuY29uc3QgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5sZXQga2V5cyA9IHszNzogMSwgMzg6IDEsIDM5OiAxLCA0MDogMX07XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyhlKSB7XG4gICAgaWYgKGtleXNbZS5rZXlDb2RlXSkge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxubGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xudHJ5IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgbnVsbCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7IH1cbiAgICB9KSk7XG59IGNhdGNoKGUpIHt9XG5cbmxldCB3aGVlbE9wdCA9IHN1cHBvcnRzUGFzc2l2ZSA/IHsgcGFzc2l2ZTogZmFsc2UgfSA6IGZhbHNlO1xubGV0IHdoZWVsRXZlbnQgPSAnb253aGVlbCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgPyAnd2hlZWwnIDogJ21vdXNld2hlZWwnO1xuXG5mdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7IC8vIG9sZGVyIEZGXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIod2hlZWxFdmVudCwgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTsgLy8gbW9kZXJuIGRlc2t0b3BcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTsgLy8gbW9iaWxlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlU2Nyb2xsKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIod2hlZWxFdmVudCwgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cywgZmFsc2UpO1xufVxuXG4vLyBNb2JpbGUgbmF2YmFyXG5cbmNvbnN0IHNpZGVOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdicpO1xuY29uc3Qgc2lkZU5hdk9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2T3BlbmVyJyk7XG5jb25zdCBzaWRlTmF2Q2xvc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZDbG9zZXInKTtcbmNvbnN0IHNpZGVOYXZMb2dvdXRDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdkxvZ291dENsb3NlcicpO1xuY29uc3Qgc2lkZU5hdkJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdkJhY2snKTtcblxuZnVuY3Rpb24gb3Blbk5hdigpIHtcbiAgICBkaXNhYmxlU2Nyb2xsKCk7XG4gICAgc2lkZU5hdi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgxMDAlKSc7XG4gICAgc2lkZU5hdkJhY2suc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICBzaWRlTmF2Q2xvc2VyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBlbmFibGVTY3JvbGwoKTtcbiAgICBzaWRlTmF2LnN0eWxlLnRyYW5zZm9ybSA9ICd1bnNldCc7XG4gICAgc2lkZU5hdkJhY2suc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICBzaWRlTmF2Q2xvc2VyLnN0eWxlLndpZHRoID0gJzAnO1xufVxuXG5pZiAoc2lkZU5hdikge1xuICAgIHNpZGVOYXZPcGVuZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTmF2KTtcbiAgICBzaWRlTmF2Q2xvc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VOYXYpO1xuICAgIGlmIChzaWRlTmF2TG9nb3V0Q2xvc2VyKSB7XG4gICAgICAgIHNpZGVOYXZMb2dvdXRDbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU5hdik7XG4gICAgfVxufVxuXG4vLyBNZWRpYUVsZW1lbnQgUGxheWVyXG5cbnJlcXVpcmUoJ21lZGlhZWxlbWVudC9idWlsZC9tZWRpYWVsZW1lbnQtYW5kLXBsYXllci5taW4nKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmF1ZGlvLXBsYXllciBhdWRpbycpLm1lZGlhZWxlbWVudHBsYXllcih7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHBsYXllciwgbm9kZSkge1xuICAgICAgICAgICAgLy8gT3B0aW9uYWxcbiAgICAgICAgICAgICQocGxheWVyKS5jbG9zZXN0KCcubWVqc19fY29udGFpbmVyJykuYXR0cignbGFuZycsIG1lanMuaTE4bi5sYW5ndWFnZSgpKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5hdHRyKCdsYW5nJywgbWVqcy5pMThuLmxhbmd1YWdlKCkpO1xuICAgICAgICAgICAgLy8gTW9yZSBjb2RlXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0Vm9sdW1lOiAxLFxuICAgICAgICBhdXRvUmV3aW5kOiB0cnVlLFxuICAgICAgICBlbmFibGVQcm9ncmVzc1Rvb2x0aXA6IGZhbHNlLFxuICAgICAgICBmZWF0dXJlczogWydwbGF5cGF1c2UnLCdbZmVhdHVyZV9uYW1lXScsJ2N1cnJlbnQnLCdwcm9ncmVzcycsJ2R1cmF0aW9uJ11cbiAgICB9KVxufSk7XG5cbi8vIENvbW1lbnQgcmVwbHlcblxuY29uc3QgY29tbWVudFdyaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWNvbW1lbnQtd3JpdGUnKTtcbmNvbnN0IGNvbW1lbnRUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X21lc3NhZ2UnKTtcbmNvbnN0IGNvbW1lbnRSZXBseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LXJlcGx5Jyk7XG5jb25zdCByZXBseVRvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfcmVwbHlUbycpO1xuY29uc3QgcmVwbHlGb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudF9yZXBseUZvcicpO1xuY29uc3QgY29tbWVudFJlcGx5VXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1jb21tZW50LXJlcGx5LXVzZXInKTtcbmNvbnN0IHJlcGx5aW5nRGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLXJlcGx5aW5nLWRlbGV0ZScpO1xuXG5pZiAocmVwbHlpbmdEZWxldGUpIHtcbiAgICByZXBseWluZ0RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcmVwbHlUby5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIHJlcGx5Rm9yLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ21kLXJlcGx5aW5nJyk7XG4gICAgfSk7XG59XG5cbmlmIChjb21tZW50UmVwbHkpIHtcbiAgICBjb21tZW50UmVwbHkuZm9yRWFjaCgocmVwbHkpID0+IHtcbiAgICAgICAgbGV0IHJlcGx5VXNlciA9IHJlcGx5LnF1ZXJ5U2VsZWN0b3IoJy5yZXBseS11c2VyJyk7XG4gICAgICAgIGxldCByZXBseUNvbW1lbnQgPSByZXBseS5xdWVyeVNlbGVjdG9yKCcucmVwbHktY29tbWVudCcpO1xuICAgICAgICByZXBseS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChyZXBseSkgPT4ge1xuICAgICAgICAgICAgcmVwbHlUby52YWx1ZSA9IHJlcGx5VXNlci5pbm5lckhUTUw7XG4gICAgICAgICAgICByZXBseUZvci52YWx1ZSA9IHJlcGx5Q29tbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb21tZW50VGV4dEFyZWEuZm9jdXMoKTtcblxuICAgICAgICAgICAgaWYgKHJlcGx5VG8udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5hZGQoJ21kLXJlcGx5aW5nJyk7XG4gICAgICAgICAgICAgICAgY29tbWVudFJlcGx5VXNlci5pbm5lckhUTUwgPSByZXBseVRvLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xufVxuXG4vLyBTZWFyY2hlclxuXG5sZXQgc2VhcmNoSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1kLXNlYXJjaC1hbGwtaW5wdXQnKTtcblxuY29uc3QgbmF2YmFyU2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhclNlYXJjaCcpO1xuLy8gY29uc3QgbmF2YmFyU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyU2VhcmNoSW5wdXQnKTtcbmNvbnN0IG5hdmJhclNlYXJjaE9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuTmF2YmFyU2VhcmNoJyk7XG5jb25zdCBuYXZiYXJTZWFyY2hDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VOYXZiYXJTZWFyY2gnKTtcblxuZnVuY3Rpb24gb3Blbk5hdmJhclNlYXJjaCgpe1xuICAgIG5hdmJhclNlYXJjaE9wZW5lci5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50JztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXNlYXJjaC1tb2JpbGUnKS5zdHlsZS5kaXNwbGF5ID0gJ3Vuc2V0JztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXNlYXJjaC1tb2JpbGUgaW5wdXQnKS5mb2N1cygpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdmJhclNlYXJjaCgpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgbmF2YmFyU2VhcmNoT3BlbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cbmlmIChuYXZiYXJTZWFyY2gpIHtcbiAgICBuYXZiYXJTZWFyY2hPcGVuZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTmF2YmFyU2VhcmNoKTtcbiAgICBuYXZiYXJTZWFyY2hDbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU5hdmJhclNlYXJjaCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvZHktd3JhcHBlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VOYXZiYXJTZWFyY2gpO1xufVxuXG5zZWFyY2hJbnB1dHMuZm9yRWFjaCgoaW5wdXRCb3gsa2V5KSA9PiB7XG4gICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9pbnB1dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywoaW5wdXQpID0+IHtcbiAgICAgICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9idXR0b24nKS5ocmVmID0gJy9zZWFyY2gvJyArIGlucHV0LnRhcmdldC52YWx1ZS5yZXBsYWNlKCcjJywgJyUyMycpLnJlcGxhY2UoJyUnLCAnJTI1Jyk7XG4gICAgfSlcblxuICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQuY29kZSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9idXR0b24nKS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbn0pO1xuXG4vLyBFbmFibGUgdG9vbHRpcFxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe1xuICAgICAgICB0cmlnZ2VyIDogJ2hvdmVyJ1xuICAgIH0pXG59KTtcblxuLy8gSW1hZ2Ugb24gY2hhbmdlXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1maWxlLWlucHV0JykpIHtcbiAgICBsZXQgZmlsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1maWxlLWlucHV0Jyk7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0SW1nT3V0cHV0JykpIHtcbiAgICAgICAgbGV0IHBvc3RJbWdPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdEltZ091dHB1dCcpO1xuICAgICAgICBmaWxlSW5wdXQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBwb3N0SW1nT3V0cHV0LnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVJbnB1dC5maWxlc1swXSk7XG4gICAgICAgICAgICBwb3N0SW1nT3V0cHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc4cHgnO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dC1jb250ZW50JykpIHtcbiAgICAgICAgbGV0IG91dHB1dENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0LWNvbnRlbnQnKTtcbiAgICAgICAgZmlsZUlucHV0Lm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgb3V0cHV0Q29udGVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFxcJycgKyB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlSW5wdXQuZmlsZXNbMF0pICsgJ1xcJyknO1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8gVGV4dGFyZWEgYXV0b3NpemVcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYXV0by1zaXplcicpKSB7XG4gICAgbGV0IHRleHRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWF1dG8tc2l6ZXInKTtcbiAgICB0ZXh0YXJlYS5vbmlucHV0ID0gKCkgPT4ge1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5oZWlnaHQgPSB0ZXh0YXJlYS5zY3JvbGxIZWlnaHQgKyAyICsgXCJweFwiO1xuICAgIH07XG59XG5cbi8vIEF1dG8gY2xvc2UgYWxlcnRzXG4kKFwiLm1kLWFsZXJ0LWF1dG8taGlkZVwiKS5mYWRlVG8oNTAwMCwgNTAwKS5zbGlkZVVwKDUwMCwgZnVuY3Rpb24oKXtcbiAgICAkKFwiLm1kLWFsZXJ0LWF1dG8taGlkZVwiKS5zbGlkZVVwKDUwMCk7XG59KTtcblxuLy8gUHJldmVudCB1c2VybmFtZSBzeW1ib2xzXG4kKCcudXNlcm5hbWUtaW5wdXQnKS5vbigna2V5cHJlc3MnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKFwiXlthLXpBLVowLTkuX10rJFwiKTtcbiAgICBsZXQga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZSghZXZlbnQuY2hhckNvZGUgPyBldmVudC53aGljaCA6IGV2ZW50LmNoYXJDb2RlKTtcbiAgICBpZiAoIXJlZ2V4LnRlc3Qoa2V5KSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSk7XG5cbi8vIFBvc3QgY29sbGFwc2VcbmNvbnN0IHBvc3RDb2xsYXBzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3N0LWNvbGxhcHNlJyk7XG5cbnBvc3RDb2xsYXBzZS5mb3JFYWNoKChwb3N0KSA9PiB7XG4gICAgZnVuY3Rpb24gb3BlbkNvbGxhcHNlZFBvc3QoKSB7XG4gICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RDb2xsYXBzZScgKyBwb3N0SWQpLmNsYXNzTGlzdC5yZW1vdmUoJ2Nsb3NlZCcpO1xuICAgIH1cblxuICAgIGxldCBwb3N0SWQgPSBwb3N0LmlkLnJlcGxhY2UoJ3Bvc3RDb2xsYXBzZScsICcnKTtcblxuICAgIGlmIChwb3N0LnF1ZXJ5U2VsZWN0b3IoJ2RpdicpLmNsaWVudEhlaWdodCA+IDUwKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0Q29sbGFwc2VCdXR0b24nICsgcG9zdElkKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdENvbGxhcHNlQnV0dG9uJyArIHBvc3RJZCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuQ29sbGFwc2VkUG9zdCk7XG59KTtcbiIsImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKS5kZWZhdWx0O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBTaGFyZSBnbG9iYWwgZnVuY3Rpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIHNoYXJlTWVkaWFBbGVydChldmVudCx1c2VyLHR5cGUpIHtcblxuICAgIGZ1bmN0aW9uIHNoYXJlVHlwZSh0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnUHJvZmlsZScpIHtcbiAgICAgICAgICAgIHJldHVybiB1c2VyLnF1ZXJ5U2VsZWN0b3IoJy5tZC11c2VyLWlkJykuaW5uZXJIVE1MO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVzZXIucXVlcnlTZWxlY3RvcignLm1kLXVzZXJuYW1lJykuaW5uZXJIVE1MO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCB1c2VybmFtZSA9IHNoYXJlVHlwZSh0eXBlKTtcbiAgICBsZXQgbWVkaWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmUnICsgdHlwZSArICdJZCcpLmlubmVySFRNTDtcbiAgICBsZXQgdXJsID0gJy9zaGFyZScgKyB0eXBlICsgJy8nICsgbWVkaWEgKyAnLycgKyB1c2VybmFtZTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZScgKyB0eXBlICsgJ1VzZXJuYW1lJykuaW5uZXJIVE1MID0gdXNlci5xdWVyeVNlbGVjdG9yKCcubWQtdXNlcm5hbWUnKS5pbm5lckhUTUw7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlJyArIHR5cGUgKyAnQWxlcnQnKS5xdWVyeVNlbGVjdG9yKCdhJykuaHJlZiA9IHVybDtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZScgKyB0eXBlICsgJ01vZGFsJykuY2xpY2soKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmUnICsgdHlwZSArICdDb25maXJtJykuY2xpY2soKTtcbn1cblxuZnVuY3Rpb24gc2hhcmVNZWRpYShldmVudCwgdHlwZSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVybCA9IGV2ZW50LnRhcmdldC5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlJyArIHR5cGUgKyAnQWxlcnQnKS5jbGljaygpO1xuXG4gICAgICAgIGxldCBtZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJtZC1hbGVydCBtZC1hbGVydC1zdWNjZXNzIG1kLWJveC1tYlwiPicgK1xuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5yZXNwb25zZS5tZXNzYWdlICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuXG4gICAgICAgIGxldCBhbGVydEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICAgICAgbGV0IGFsZXJ0RXhpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYWxlcnQnKTtcblxuICAgICAgICBpZiAoYWxlcnRFeGlzdCkge1xuICAgICAgICAgICAgYWxlcnRFeGlzdC5vdXRlckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnRCb3guaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgbWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLmZhZGVUbygzMDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJChcIi5tZC1hbGVydFwiKS5zbGlkZVVwKDUwMCk7XG4gICAgICAgIH0pO1xuICAgIH0pXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIFNoYXJlIHNvbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gU29uZyBzaGFyZSBhbGVydFxubGV0IHNoYXJlU29uZ1VzZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3NoYXJlU29uZ01vZGFsIC51c2VyLWxpbmUnKTtcbnNoYXJlU29uZ1VzZXJzLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICB1c2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIHNoYXJlTWVkaWFBbGVydChldmVudCx1c2VyLCdTb25nJyk7XG4gICAgfSlcbn0pO1xuXG4vLyBJZiBzb25nIHNoYXJlIGNvbmZpcm1cbmxldCBzaGFyZVNvbmdCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVTb25nQ29uZmlybUJ1dHRvbicpO1xuaWYgKHNoYXJlU29uZ0J1dHRvbikge1xuICAgIHNoYXJlU29uZ0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBzaGFyZU1lZGlhKGV2ZW50LCdTb25nJyk7XG4gICAgfSk7XG59XG5cbi8vIElmIHNvbmcgc2hhcmUgY2FuY2VsXG5mdW5jdGlvbiBzaGFyZVNvbmdDYW5jZWxGdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlU29uZ0FsZXJ0JykuY2xpY2soKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVTb25nJykuY2xpY2soKTtcbn1cblxubGV0IHNoYXJlU29uZ0NhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVNvbmdDYW5jZWwnKTtcbmlmIChzaGFyZVNvbmdDYW5jZWwpIHtcbiAgICBzaGFyZVNvbmdDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaGFyZVNvbmdDYW5jZWxGdW5jdGlvbik7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tIFNoYXJlIHBvc3QgLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gSW5zZXJ0IHBvc3QgSWRcbmZ1bmN0aW9uIHNoYXJlUG9zdEJ1dHRvbkZ1bmN0aW9uKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVBvc3RJZCcpLmlubmVySFRNTCA9IHRoaXMuaWQucmVwbGFjZSgnc2hhcmVQb3N0SWQnLCAnJyk7XG59XG5cbmxldCBzaGFyZVBvc3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhcmUtcG9zdC1idXR0b24nKTtcbnNoYXJlUG9zdEJ1dHRvbi5mb3JFYWNoKChzaGFyZVBvc3RCdXR0b24pID0+IHtcbiAgICBzaGFyZVBvc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaGFyZVBvc3RCdXR0b25GdW5jdGlvbilcbn0pO1xuXG4vLyBQb3N0IHNoYXJlIGFsZXJ0XG5sZXQgc2hhcmVQb3N0VXNlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjc2hhcmVQb3N0TW9kYWwgLnVzZXItbGluZScpO1xuc2hhcmVQb3N0VXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgIHVzZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgc2hhcmVNZWRpYUFsZXJ0KGV2ZW50LHVzZXIsJ1Bvc3QnKTtcbiAgICB9KVxufSlcblxuLy8gSWYgcG9zdCBzaGFyZSBjb25maXJtXG5sZXQgc2hhcmVQb3N0Q29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVBvc3RDb25maXJtQnV0dG9uJyk7XG5pZiAoc2hhcmVQb3N0Q29uZmlybUJ1dHRvbikge1xuICAgIHNoYXJlUG9zdENvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgc2hhcmVNZWRpYShldmVudCwnUG9zdCcpO1xuICAgIH0pXG59XG5cbi8vIElmIHBvc3Qgc2hhcmUgY2FuY2VsXG5mdW5jdGlvbiBzaGFyZVBvc3RDYW5jZWxGdW5jdGlvbigpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQb3N0QWxlcnQnKS5jbGljaygpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVBvc3RJZCcgKyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQb3N0SWQnKS5pbm5lckhUTUwpLmNsaWNrKCk7XG59XG5cbmxldCBzaGFyZVBvc3RDYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQb3N0Q2FuY2VsJyk7XG5pZiAoc2hhcmVQb3N0Q2FuY2VsKSB7XG4gICAgc2hhcmVQb3N0Q2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hhcmVQb3N0Q2FuY2VsRnVuY3Rpb24pO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLSBTaGFyZSBwcm9maWxlIC0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIFByb2ZpbGUgc2hhcmUgYWxlcnRcbmxldCBzaGFyZVByb2ZpbGVVc2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNzaGFyZVByb2ZpbGVNb2RhbCAudXNlci1saW5lJyk7XG5zaGFyZVByb2ZpbGVVc2Vycy5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgdXNlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBzaGFyZU1lZGlhQWxlcnQoZXZlbnQsdXNlciwnUHJvZmlsZScpO1xuICAgIH0pXG59KTtcblxuLy8gSWYgcHJvZmlsZSBzaGFyZSBjb25maXJtXG5sZXQgc2hhcmVQcm9maWxlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUHJvZmlsZUNvbmZpcm1CdXR0b24nKTtcbmlmIChzaGFyZVByb2ZpbGVCdXR0b24pIHtcbiAgICBzaGFyZVByb2ZpbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgc2hhcmVNZWRpYShldmVudCwnUHJvZmlsZScpO1xuICAgIH0pO1xufVxuXG4vLyBJZiBwcm9maWxlIHNoYXJlIGNhbmNlbFxuZnVuY3Rpb24gc2hhcmVQcm9maWxlQ2FuY2VsRnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZVByb2ZpbGVBbGVydCcpLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlUHJvZmlsZScpLmNsaWNrKCk7XG59XG5cbmxldCBzaGFyZVByb2ZpbGVDYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmVQcm9maWxlQ2FuY2VsJyk7XG5pZiAoc2hhcmVQcm9maWxlQ2FuY2VsKSB7XG4gICAgc2hhcmVQcm9maWxlQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hhcmVQcm9maWxlQ2FuY2VsRnVuY3Rpb24pO1xufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImF4aW9zIiwicmVxdWlyZSIsInBsYXlsaXN0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYm9va21hcmsiLCJzd2l0Y2hlciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ1cmwiLCJocmVmIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzIiwiU3RyaW5nIiwiZGF0YSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRhdGFzZXQiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJzdHlsZSIsInBvaW50ZXJFdmVudHMiLCJhbGVydEJveCIsInF1ZXJ5U2VsZWN0b3IiLCJhbGVydEV4aXN0IiwibWVzc2FnZSIsImJhZGdlIiwib3V0ZXJIVE1MIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiJCIsImZhZGVUbyIsInNsaWRlVXAiLCJzZXRUaW1lb3V0IiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb2xsb3ciLCJmb2xsb3dzIiwiZ2V0RWxlbWVudEJ5SWQiLCJmb2xsb3dlcnMiLCJpbm5lckhUTUwiLCJwYXJzZUludCIsInRvU3RyaW5nIiwidW5mb2xsb3ciLCJ1bmZvbGxvd3MiLCJmb2xsb3dlckJsb2NrIiwiaWQiLCJzcGxpdCIsInBvcCIsImNhbmNlbEJ1dHRvbklkIiwiY2xpY2siLCJyZWplY3RSZXF1ZXN0RnVuY3Rpb24iLCJyZXF1ZXN0UmVzcG9uc2UiLCJ0YXJnZXQiLCJyZXF1ZXN0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJkaXNwbGF5IiwiYWNjZXB0UmVxdWVzdCIsInJlamVjdFJlcXVlc3QiLCJmZWF0dXJlZCIsImZlYXR1cmVkUG9zdCIsImxpa2UiLCJsaWtlciIsImNvbnRhaW5zIiwidmFsdWUiLCJpbmNsdWRlcyIsImxpa2VDb3VudGVyIiwicmVwbGFjZSIsImN1cnJlbnRMaWtlcyIsInBhcmVudEVsZW1lbnQiLCJwb3N0IiwicG9zdElkIiwicG9zdExpa2VyIiwicG9zdExpa2VDb3VudGVyIiwiZ2xvYmFsIiwialF1ZXJ5Iiwia2V5cyIsImUiLCJwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMiLCJrZXlDb2RlIiwic3VwcG9ydHNQYXNzaXZlIiwid2luZG93IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ3aGVlbE9wdCIsInBhc3NpdmUiLCJ3aGVlbEV2ZW50IiwiY3JlYXRlRWxlbWVudCIsImRpc2FibGVTY3JvbGwiLCJlbmFibGVTY3JvbGwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2lkZU5hdiIsInNpZGVOYXZPcGVuZXIiLCJzaWRlTmF2Q2xvc2VyIiwic2lkZU5hdkxvZ291dENsb3NlciIsInNpZGVOYXZCYWNrIiwib3Blbk5hdiIsInRyYW5zZm9ybSIsIm9wYWNpdHkiLCJ3aWR0aCIsImNsb3NlTmF2IiwicmVhZHkiLCJtZWRpYWVsZW1lbnRwbGF5ZXIiLCJzdWNjZXNzIiwicGxheWVyIiwibm9kZSIsImNsb3Nlc3QiLCJhdHRyIiwibWVqcyIsImkxOG4iLCJsYW5ndWFnZSIsInN0YXJ0Vm9sdW1lIiwiYXV0b1Jld2luZCIsImVuYWJsZVByb2dyZXNzVG9vbHRpcCIsImZlYXR1cmVzIiwiY29tbWVudFdyaXRlIiwiY29tbWVudFRleHRBcmVhIiwiY29tbWVudFJlcGx5IiwicmVwbHlUbyIsInJlcGx5Rm9yIiwiY29tbWVudFJlcGx5VXNlciIsInJlcGx5aW5nRGVsZXRlIiwicmVtb3ZlQXR0cmlidXRlIiwicmVwbHkiLCJyZXBseVVzZXIiLCJyZXBseUNvbW1lbnQiLCJmb2N1cyIsInNlYXJjaElucHV0cyIsIm5hdmJhclNlYXJjaCIsIm5hdmJhclNlYXJjaE9wZW5lciIsIm5hdmJhclNlYXJjaENsb3NlciIsIm9wZW5OYXZiYXJTZWFyY2giLCJjc3NUZXh0IiwiY2xvc2VOYXZiYXJTZWFyY2giLCJpbnB1dEJveCIsImtleSIsImlucHV0IiwiY29kZSIsInRvb2x0aXAiLCJ0cmlnZ2VyIiwiZmlsZUlucHV0IiwicG9zdEltZ091dHB1dCIsIm9uY2hhbmdlIiwic3JjIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiZmlsZXMiLCJtYXJnaW5Cb3R0b20iLCJvdXRwdXRDb250ZW50IiwiYmFja2dyb3VuZEltYWdlIiwidGV4dGFyZWEiLCJvbmlucHV0IiwiaGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0Iiwib24iLCJyZWdleCIsIlJlZ0V4cCIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlIiwid2hpY2giLCJ0ZXN0IiwicG9zdENvbGxhcHNlIiwib3BlbkNvbGxhcHNlZFBvc3QiLCJjbGllbnRIZWlnaHQiLCJzaGFyZU1lZGlhQWxlcnQiLCJ1c2VyIiwidHlwZSIsInNoYXJlVHlwZSIsInVzZXJuYW1lIiwibWVkaWEiLCJzaGFyZU1lZGlhIiwic2hhcmVTb25nVXNlcnMiLCJzaGFyZVNvbmdCdXR0b24iLCJzaGFyZVNvbmdDYW5jZWxGdW5jdGlvbiIsInNoYXJlU29uZ0NhbmNlbCIsInNoYXJlUG9zdEJ1dHRvbkZ1bmN0aW9uIiwic2hhcmVQb3N0QnV0dG9uIiwic2hhcmVQb3N0VXNlcnMiLCJzaGFyZVBvc3RDb25maXJtQnV0dG9uIiwic2hhcmVQb3N0Q2FuY2VsRnVuY3Rpb24iLCJzaGFyZVBvc3RDYW5jZWwiLCJzaGFyZVByb2ZpbGVVc2VycyIsInNoYXJlUHJvZmlsZUJ1dHRvbiIsInNoYXJlUHJvZmlsZUNhbmNlbEZ1bmN0aW9uIiwic2hhcmVQcm9maWxlQ2FuY2VsIl0sInNvdXJjZVJvb3QiOiIifQ==