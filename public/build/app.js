(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

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

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/app.scss */ "./assets/scss/app.scss");
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
// any CSS you import will output into a single scss file (app.scss in this case)
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

/***/ "./assets/scss/app.scss":
/*!******************************!*\
  !*** ./assets/scss/app.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_fortawesome_fontawesome-free_js_all_js-node_modules_fortawesome_fontawes-a7977b"], () => (__webpack_exec__("./assets/js/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUEsUUFBUSxDQUFDcUMsY0FBVCxDQUF3Qix1QkFBdUJxQixNQUEvQyxFQUF1RHhCLGdCQUF2RCxDQUF3RSxPQUF4RSxFQUFpRnFILGlCQUFqRjtBQUNILENBYkQ7Ozs7Ozs7Ozs7OztBQ3JOQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hamF4LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvYXBwLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpLmRlZmF1bHQ7XG5cbi8vIEFkZCBzb25nIHRvIHBsYXlsaXN0IG9yIGFkZCBwb3N0IHRvIGJvb2ttYXJrc1xuXG5sZXQgcGxheWxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWxpc3QtdG9nZ2xlJyk7XG5sZXQgYm9va21hcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9va21hcmstdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIHN3aXRjaGVyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gdGhpcy5jbGFzc0xpc3QuYWRkKCdhZGRlZCcpIDogdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhZGRlZCcpO1xuICAgICAgICB0aGlzLmRhdGFzZXQub3JpZ2luYWxUaXRsZSA9IHJlc3BvbnNlLmRhdGEucmVzcG9uc2UudGl0bGU7XG4gICAgICAgIHRoaXMuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblxuICAgICAgICBsZXQgYWxlcnRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgICAgIGxldCBhbGVydEV4aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWFsZXJ0Jyk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVzcG9uc2UubWVzc2FnZSkge1xuICAgICAgICAgICAgbGV0IGJhZGdlID0gJyc7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgICAgICBiYWRnZSA9ICdzdWNjZXNzJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFkZ2UgPSAnZGFuZ2VyJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnPGRpdiBjbGFzcz1cIm1kLWFsZXJ0IG1kLWFsZXJ0LScgKyBiYWRnZSArICcgbWQtYm94LW1iXCI+JyArXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5yZXNwb25zZS5tZXNzYWdlICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JztcblxuICAgICAgICAgICAgaWYgKGFsZXJ0RXhpc3QpIHtcbiAgICAgICAgICAgICAgICBhbGVydEV4aXN0Lm91dGVySFRNTCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0Qm94Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLmZhZGVUbygzMDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoXCIubWQtYWxlcnRcIikuc2xpZGVVcCg1MDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIFt0aGlzXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDApO1xuICAgIH0pXG59XG5cbnBsYXlsaXN0LmZvckVhY2goKHBsYXlsaXN0KSA9PiB7XG4gICAgcGxheWxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hlcik7XG59KTtcblxuYm9va21hcmsuZm9yRWFjaCgoYm9va21hcmspID0+IHtcbiAgICBib29rbWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaGVyKTtcbn0pO1xuXG4vLyBGb2xsb3cgYSB1c2VyIG9yIHVuZm9sbG93IGZyb20geW91cnNlbGZcblxubGV0IGZvbGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb2xsb3ctdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIGZvbGxvd3MoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnYWRkZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi1pbmZvJyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1saWdodCcpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdmb2xsb3dlZCcpO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKSkge1xuICAgICAgICAgICAgICAgIGxldCBmb2xsb3dlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyJykuaW5uZXJIVE1MID0gKHBhcnNlSW50KGZvbGxvd2VycywgMTApICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLWxpZ2h0Jyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2ZvbGxvd2VkJyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1pbmZvJyk7XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvbGxvd2VycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykucXVlcnlTZWxlY3RvcignLm51bWJlcicpLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUwgPSAocGFyc2VJbnQoZm9sbG93ZXJzLCAxMCkgLSAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRhc2V0Lm9yaWdpbmFsVGl0bGUgPSByZXNwb25zZS5kYXRhLnJlc3BvbnNlLnRpdGxlO1xuICAgICAgICB0aGlzLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5sZXQgdW5mb2xsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5mb2xsb3ctdG9nZ2xlJyk7XG5cbmZvbGxvdy5mb3JFYWNoKChmb2xsb3cpID0+IHtcbiAgICBmb2xsb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb2xsb3dzKTtcbn0pO1xuXG5mdW5jdGlvbiB1bmZvbGxvd3MoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG4gICAgbGV0IGZvbGxvd2VyQmxvY2sgPSAndScgKyB0aGlzLmlkLnNwbGl0KCd1JykucG9wKCkuc3BsaXQoJ3QnKVswXSArICdsJztcbiAgICBsZXQgY2FuY2VsQnV0dG9uSWQgPSAndXNlclVuZm9sbG93JyArIHRoaXMuaWQuc3BsaXQoJ3UnKS5wb3AoKS5zcGxpdCgndCcpWzBdO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbmNlbEJ1dHRvbklkKS5jbGljaygpO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZW1vdmVkJykge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZm9sbG93ZXJCbG9jaykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG51bmZvbGxvdy5mb3JFYWNoKCh1bmZvbGxvdykgPT4ge1xuICAgIHVuZm9sbG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5mb2xsb3dzKTtcbn0pO1xuXG4vLyBNYWtlIHBvc3QgZmVhdHVyZWRcblxubGV0IGZlYXR1cmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZlYXR1cmVkLXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBmZWF0dXJlZFBvc3QoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgKHN0YXR1cyA9PT0gJ2FkZGVkJykgPyB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5mZWF0dXJlZC5mb3JFYWNoKChmZWF0dXJlZCkgPT4ge1xuICAgIGZlYXR1cmVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZmVhdHVyZWRQb3N0KTtcbn0pO1xuXG4vLyBQb3N0IGxpa2VcblxubGV0IGxpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlrZS10b2dnbGUnKTtcblxuZnVuY3Rpb24gbGlrZVBvc3QoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgKHN0YXR1cyA9PT0gJ2FkZGVkJykgPyB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG5cbiAgICAgICAgbGV0IHBvc3RMaWtlQ291bnRlciA9ICdwb3N0LWxpa2UtY291bnRlci0nICsgdGhpcy5pZC5yZXBsYWNlKCdwb3N0LWxpa2UtJywnJyk7XG4gICAgICAgIGxldCBjdXJyZW50TGlrZXMgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3N0TGlrZUNvdW50ZXIpLmlubmVySFRNTCk7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2FkZGVkJykge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zdExpa2VDb3VudGVyKS5pbm5lckhUTUwgPSBjdXJyZW50TGlrZXMgKyAxO1xuICAgICAgICB9IGVsc2UgIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvc3RMaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxubGlrZS5mb3JFYWNoKChsaWtlKSA9PiB7XG4gICAgbGlrZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpa2VQb3N0KTtcbn0pO1xuXG4vLyBQb3N0IGRvdWJsZS1jbGljayBsaWtlXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZC1wb3N0JykuZm9yRWFjaCgocG9zdCkgPT4ge1xuICAgIGxldCBwb3N0SWQgPSBwb3N0LmlkLnJlcGxhY2UoJ3Bvc3RJZCcsICcnKTtcbiAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWltYWdlJykuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLChldmVudCkgPT4ge1xuICAgICAgICBsZXQgcG9zdExpa2VyID0gcG9zdC5xdWVyeVNlbGVjdG9yKCcubGlrZS10b2dnbGUnKTtcbiAgICAgICAgbGV0IHVybCA9IHBvc3RMaWtlci5ocmVmO1xuXG4gICAgICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gcG9zdExpa2VyLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiBwb3N0TGlrZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWRkZWQnKTtcblxuICAgICAgICAgICAgbGV0IHBvc3RMaWtlQ291bnRlciA9ICdwb3N0LWxpa2UtY291bnRlci0nICsgcG9zdExpa2VyLmlkLnJlcGxhY2UoJ3Bvc3QtbGlrZS0nLCcnKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50TGlrZXMgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3N0TGlrZUNvdW50ZXIpLmlubmVySFRNTCk7XG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgICAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWxpa2VyJykuY2xhc3NMaXN0LmFkZCgnbGlrZScpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwb3N0LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWxpa2VyJykuY2xhc3NMaXN0LnJlbW92ZSgnbGlrZScpO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvc3RMaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgIHBvc3QucXVlcnlTZWxlY3RvcignLnBvc3QtbGlrZXInKS5jbGFzc0xpc3QuYWRkKCdkaXNsaWtlJyk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc3QucXVlcnlTZWxlY3RvcignLnBvc3QtbGlrZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNsaWtlJyk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zdExpa2VDb3VudGVyKS5pbm5lckhUTUwgPSBjdXJyZW50TGlrZXMgLSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBbcG9zdExpa2VyXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KVxuICAgIH0pO1xufSk7XG4iLCIvKlxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxuICpcbiAqIFdlIHJlY29tbWVuZCBpbmNsdWRpbmcgdGhlIGJ1aWx0IHZlcnNpb24gb2YgdGhpcyBKYXZhU2NyaXB0IGZpbGVcbiAqIChhbmQgaXRzIENTUyBmaWxlKSBpbiB5b3VyIGJhc2UgbGF5b3V0IChiYXNlLmh0bWwudHdpZykuXG4gKi9cblxuLy8gYW55IENTUyB5b3UgaW1wb3J0IHdpbGwgb3V0cHV0IGludG8gYSBzaW5nbGUgc2NzcyBmaWxlIChhcHAuc2NzcyBpbiB0aGlzIGNhc2UpXG5pbXBvcnQgJy4uL3Njc3MvYXBwLnNjc3MnO1xuXG4vLyBBd2Vzb21lIGZvbnRzXG5yZXF1aXJlKCdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLm1pbi5jc3MnKTtcbnJlcXVpcmUoJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2pzL2FsbC5qcycpO1xuXG4vLyBOZWVkIGpRdWVyeT8gSW5zdGFsbCBpdCB3aXRoIFwieWFybiBhZGQganF1ZXJ5XCIsIHRoZW4gdW5jb21tZW50IHRvIGltcG9ydCBpdC5cbi8vIGltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5sZXQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuZ2xvYmFsLiQgPSBnbG9iYWwualF1ZXJ5ID0gJDtcblxuLy8gQm9vdHN0cmFwIGpzXG5yZXF1aXJlKCdib290c3RyYXAnKTtcblxuLy8gTXkgc2NyaXB0c1xuaW1wb3J0ICcuL3NjcmlwdHMnO1xuaW1wb3J0ICcuL2FqYXgnO1xuIiwiLy8gUHJldmVudCBzY3JvbGxcblxuY29uc3QgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5sZXQga2V5cyA9IHszNzogMSwgMzg6IDEsIDM5OiAxLCA0MDogMX07XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyhlKSB7XG4gICAgaWYgKGtleXNbZS5rZXlDb2RlXSkge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxubGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xudHJ5IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgbnVsbCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7IH1cbiAgICB9KSk7XG59IGNhdGNoKGUpIHt9XG5cbmxldCB3aGVlbE9wdCA9IHN1cHBvcnRzUGFzc2l2ZSA/IHsgcGFzc2l2ZTogZmFsc2UgfSA6IGZhbHNlO1xubGV0IHdoZWVsRXZlbnQgPSAnb253aGVlbCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgPyAnd2hlZWwnIDogJ21vdXNld2hlZWwnO1xuXG5mdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7IC8vIG9sZGVyIEZGXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIod2hlZWxFdmVudCwgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTsgLy8gbW9kZXJuIGRlc2t0b3BcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTsgLy8gbW9iaWxlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlU2Nyb2xsKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIod2hlZWxFdmVudCwgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cywgZmFsc2UpO1xufVxuXG4vLyBNb2JpbGUgbmF2YmFyXG5cbmNvbnN0IHNpZGVOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdicpO1xuY29uc3Qgc2lkZU5hdk9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2T3BlbmVyJyk7XG5jb25zdCBzaWRlTmF2Q2xvc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZDbG9zZXInKTtcbmNvbnN0IHNpZGVOYXZMb2dvdXRDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdkxvZ291dENsb3NlcicpO1xuY29uc3Qgc2lkZU5hdkJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdkJhY2snKTtcblxuZnVuY3Rpb24gb3Blbk5hdigpIHtcbiAgICBkaXNhYmxlU2Nyb2xsKCk7XG4gICAgc2lkZU5hdi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgxMDAlKSc7XG4gICAgc2lkZU5hdkJhY2suc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICBzaWRlTmF2Q2xvc2VyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBlbmFibGVTY3JvbGwoKTtcbiAgICBzaWRlTmF2LnN0eWxlLnRyYW5zZm9ybSA9ICd1bnNldCc7XG4gICAgc2lkZU5hdkJhY2suc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICBzaWRlTmF2Q2xvc2VyLnN0eWxlLndpZHRoID0gJzAnO1xufVxuXG5pZiAoc2lkZU5hdikge1xuICAgIHNpZGVOYXZPcGVuZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTmF2KTtcbiAgICBzaWRlTmF2Q2xvc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VOYXYpO1xuICAgIGlmIChzaWRlTmF2TG9nb3V0Q2xvc2VyKSB7XG4gICAgICAgIHNpZGVOYXZMb2dvdXRDbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU5hdik7XG4gICAgfVxufVxuXG4vLyBNZWRpYUVsZW1lbnQgUGxheWVyXG5cbnJlcXVpcmUoJ21lZGlhZWxlbWVudC9idWlsZC9tZWRpYWVsZW1lbnQtYW5kLXBsYXllci5taW4nKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmF1ZGlvLXBsYXllciBhdWRpbycpLm1lZGlhZWxlbWVudHBsYXllcih7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHBsYXllciwgbm9kZSkge1xuICAgICAgICAgICAgLy8gT3B0aW9uYWxcbiAgICAgICAgICAgICQocGxheWVyKS5jbG9zZXN0KCcubWVqc19fY29udGFpbmVyJykuYXR0cignbGFuZycsIG1lanMuaTE4bi5sYW5ndWFnZSgpKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5hdHRyKCdsYW5nJywgbWVqcy5pMThuLmxhbmd1YWdlKCkpO1xuICAgICAgICAgICAgLy8gTW9yZSBjb2RlXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0Vm9sdW1lOiAxLFxuICAgICAgICBhdXRvUmV3aW5kOiB0cnVlLFxuICAgICAgICBlbmFibGVQcm9ncmVzc1Rvb2x0aXA6IGZhbHNlLFxuICAgICAgICBmZWF0dXJlczogWydwbGF5cGF1c2UnLCdbZmVhdHVyZV9uYW1lXScsJ2N1cnJlbnQnLCdwcm9ncmVzcycsJ2R1cmF0aW9uJ11cbiAgICB9KVxufSk7XG5cbi8vIENvbW1lbnQgcmVwbHlcblxuY29uc3QgY29tbWVudFdyaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWNvbW1lbnQtd3JpdGUnKTtcbmNvbnN0IGNvbW1lbnRUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X21lc3NhZ2UnKTtcbmNvbnN0IGNvbW1lbnRSZXBseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LXJlcGx5Jyk7XG5jb25zdCByZXBseVRvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfcmVwbHlUbycpO1xuY29uc3QgcmVwbHlGb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudF9yZXBseUZvcicpO1xuY29uc3QgY29tbWVudFJlcGx5VXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1jb21tZW50LXJlcGx5LXVzZXInKTtcbmNvbnN0IHJlcGx5aW5nRGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLXJlcGx5aW5nLWRlbGV0ZScpO1xuXG5pZiAocmVwbHlpbmdEZWxldGUpIHtcbiAgICByZXBseWluZ0RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcmVwbHlUby5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIHJlcGx5Rm9yLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ21kLXJlcGx5aW5nJyk7XG4gICAgfSk7XG59XG5cbmlmIChjb21tZW50UmVwbHkpIHtcbiAgICBjb21tZW50UmVwbHkuZm9yRWFjaCgocmVwbHkpID0+IHtcbiAgICAgICAgbGV0IHJlcGx5VXNlciA9IHJlcGx5LnF1ZXJ5U2VsZWN0b3IoJy5yZXBseS11c2VyJyk7XG4gICAgICAgIGxldCByZXBseUNvbW1lbnQgPSByZXBseS5xdWVyeVNlbGVjdG9yKCcucmVwbHktY29tbWVudCcpO1xuICAgICAgICByZXBseS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChyZXBseSkgPT4ge1xuICAgICAgICAgICAgcmVwbHlUby52YWx1ZSA9IHJlcGx5VXNlci5pbm5lckhUTUw7XG4gICAgICAgICAgICByZXBseUZvci52YWx1ZSA9IHJlcGx5Q29tbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb21tZW50VGV4dEFyZWEuZm9jdXMoKTtcblxuICAgICAgICAgICAgaWYgKHJlcGx5VG8udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5hZGQoJ21kLXJlcGx5aW5nJyk7XG4gICAgICAgICAgICAgICAgY29tbWVudFJlcGx5VXNlci5pbm5lckhUTUwgPSByZXBseVRvLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xufVxuXG4vLyBTZWFyY2hlclxuXG5sZXQgc2VhcmNoSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1kLXNlYXJjaC1hbGwtaW5wdXQnKTtcblxuY29uc3QgbmF2YmFyU2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhclNlYXJjaCcpO1xuLy8gY29uc3QgbmF2YmFyU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyU2VhcmNoSW5wdXQnKTtcbmNvbnN0IG5hdmJhclNlYXJjaE9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuTmF2YmFyU2VhcmNoJyk7XG5jb25zdCBuYXZiYXJTZWFyY2hDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VOYXZiYXJTZWFyY2gnKTtcblxuZnVuY3Rpb24gb3Blbk5hdmJhclNlYXJjaCgpe1xuICAgIG5hdmJhclNlYXJjaE9wZW5lci5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50JztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXNlYXJjaC1tb2JpbGUnKS5zdHlsZS5kaXNwbGF5ID0gJ3Vuc2V0JztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXNlYXJjaC1tb2JpbGUgaW5wdXQnKS5mb2N1cygpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdmJhclNlYXJjaCgpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgbmF2YmFyU2VhcmNoT3BlbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cbmlmIChuYXZiYXJTZWFyY2gpIHtcbiAgICBuYXZiYXJTZWFyY2hPcGVuZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTmF2YmFyU2VhcmNoKTtcbiAgICBuYXZiYXJTZWFyY2hDbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU5hdmJhclNlYXJjaCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvZHktd3JhcHBlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VOYXZiYXJTZWFyY2gpO1xufVxuXG5zZWFyY2hJbnB1dHMuZm9yRWFjaCgoaW5wdXRCb3gsa2V5KSA9PiB7XG4gICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9pbnB1dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywoaW5wdXQpID0+IHtcbiAgICAgICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9idXR0b24nKS5ocmVmID0gJy9zZWFyY2gvJyArIGlucHV0LnRhcmdldC52YWx1ZTtcbiAgICB9KVxuXG4gICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9pbnB1dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC5jb2RlID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICBpbnB1dEJveC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX2J1dHRvbicpLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xufSk7XG5cbi8vIEVuYWJsZSB0b29sdGlwXG4kKGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCh7XG4gICAgICAgIHRyaWdnZXIgOiAnaG92ZXInXG4gICAgfSlcbn0pO1xuXG4vLyBJbWFnZSBvbiBjaGFuZ2VcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLWZpbGUtaW5wdXQnKSkge1xuICAgIGxldCBmaWxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLWZpbGUtaW5wdXQnKTtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RJbWdPdXRwdXQnKSkge1xuICAgICAgICBsZXQgcG9zdEltZ091dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0SW1nT3V0cHV0Jyk7XG4gICAgICAgIGZpbGVJbnB1dC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHBvc3RJbWdPdXRwdXQuc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZUlucHV0LmZpbGVzWzBdKTtcbiAgICAgICAgICAgIHBvc3RJbWdPdXRwdXQuc3R5bGUubWFyZ2luQm90dG9tID0gJzhweCc7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0LWNvbnRlbnQnKSkge1xuICAgICAgICBsZXQgb3V0cHV0Q29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQtY29udGVudCcpO1xuICAgICAgICBmaWxlSW5wdXQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBvdXRwdXRDb250ZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXFwnJyArIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVJbnB1dC5maWxlc1swXSkgKyAnXFwnKSc7XG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vLyBUZXh0YXJlYSBhdXRvc2l6ZVxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hdXRvLXNpemVyJykpIHtcbiAgICBsZXQgdGV4dGFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYXV0by1zaXplcicpO1xuICAgIHRleHRhcmVhLm9uaW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLmhlaWdodCA9IHRleHRhcmVhLnNjcm9sbEhlaWdodCArIDIgKyBcInB4XCI7XG4gICAgfTtcbn1cblxuLy8gQXV0byBjbG9zZSBhbGVydHNcbiQoXCIubWQtYWxlcnQtYXV0by1oaWRlXCIpLmZhZGVUbyg1MDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICQoXCIubWQtYWxlcnQtYXV0by1oaWRlXCIpLnNsaWRlVXAoNTAwKTtcbn0pO1xuXG4vLyBQcmV2ZW50IHVzZXJuYW1lIHN5bWJvbHNcbiQoJy51c2VybmFtZS1pbnB1dCcpLm9uKCdrZXlwcmVzcycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOS5fXSskXCIpO1xuICAgIGxldCBrZXkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCFldmVudC5jaGFyQ29kZSA/IGV2ZW50LndoaWNoIDogZXZlbnQuY2hhckNvZGUpO1xuICAgIGlmICghcmVnZXgudGVzdChrZXkpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59KTtcblxuLy8gUG9zdCBjb2xsYXBzZVxuY29uc3QgcG9zdENvbGxhcHNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvc3QtY29sbGFwc2UnKTtcblxucG9zdENvbGxhcHNlLmZvckVhY2goKHBvc3QpID0+IHtcbiAgICBmdW5jdGlvbiBvcGVuQ29sbGFwc2VkUG9zdCgpIHtcbiAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdENvbGxhcHNlJyArIHBvc3RJZCkuY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2VkJyk7XG4gICAgfVxuXG4gICAgbGV0IHBvc3RJZCA9IHBvc3QuaWQucmVwbGFjZSgncG9zdENvbGxhcHNlJywgJycpO1xuXG4gICAgaWYgKHBvc3QucXVlcnlTZWxlY3RvcignZGl2JykuY2xpZW50SGVpZ2h0ID4gNTApIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RDb2xsYXBzZUJ1dHRvbicgKyBwb3N0SWQpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0Q29sbGFwc2VCdXR0b24nICsgcG9zdElkKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Db2xsYXBzZWRQb3N0KTtcbn0pO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImF4aW9zIiwicmVxdWlyZSIsInBsYXlsaXN0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYm9va21hcmsiLCJzd2l0Y2hlciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ1cmwiLCJocmVmIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzIiwiU3RyaW5nIiwiZGF0YSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRhdGFzZXQiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJzdHlsZSIsInBvaW50ZXJFdmVudHMiLCJhbGVydEJveCIsInF1ZXJ5U2VsZWN0b3IiLCJhbGVydEV4aXN0IiwibWVzc2FnZSIsImJhZGdlIiwib3V0ZXJIVE1MIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiJCIsImZhZGVUbyIsInNsaWRlVXAiLCJzZXRUaW1lb3V0IiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb2xsb3ciLCJmb2xsb3dzIiwiZ2V0RWxlbWVudEJ5SWQiLCJmb2xsb3dlcnMiLCJpbm5lckhUTUwiLCJwYXJzZUludCIsInRvU3RyaW5nIiwidW5mb2xsb3ciLCJ1bmZvbGxvd3MiLCJmb2xsb3dlckJsb2NrIiwiaWQiLCJzcGxpdCIsInBvcCIsImNhbmNlbEJ1dHRvbklkIiwiY2xpY2siLCJmZWF0dXJlZCIsImZlYXR1cmVkUG9zdCIsImxpa2UiLCJsaWtlUG9zdCIsInBvc3RMaWtlQ291bnRlciIsInJlcGxhY2UiLCJjdXJyZW50TGlrZXMiLCJwb3N0IiwicG9zdElkIiwicG9zdExpa2VyIiwiZ2xvYmFsIiwialF1ZXJ5Iiwia2V5cyIsImUiLCJwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMiLCJrZXlDb2RlIiwic3VwcG9ydHNQYXNzaXZlIiwid2luZG93IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ3aGVlbE9wdCIsInBhc3NpdmUiLCJ3aGVlbEV2ZW50IiwiY3JlYXRlRWxlbWVudCIsImRpc2FibGVTY3JvbGwiLCJlbmFibGVTY3JvbGwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2lkZU5hdiIsInNpZGVOYXZPcGVuZXIiLCJzaWRlTmF2Q2xvc2VyIiwic2lkZU5hdkxvZ291dENsb3NlciIsInNpZGVOYXZCYWNrIiwib3Blbk5hdiIsInRyYW5zZm9ybSIsIm9wYWNpdHkiLCJ3aWR0aCIsImNsb3NlTmF2IiwicmVhZHkiLCJtZWRpYWVsZW1lbnRwbGF5ZXIiLCJzdWNjZXNzIiwicGxheWVyIiwibm9kZSIsImNsb3Nlc3QiLCJhdHRyIiwibWVqcyIsImkxOG4iLCJsYW5ndWFnZSIsInN0YXJ0Vm9sdW1lIiwiYXV0b1Jld2luZCIsImVuYWJsZVByb2dyZXNzVG9vbHRpcCIsImZlYXR1cmVzIiwiY29tbWVudFdyaXRlIiwiY29tbWVudFRleHRBcmVhIiwiY29tbWVudFJlcGx5IiwicmVwbHlUbyIsInJlcGx5Rm9yIiwiY29tbWVudFJlcGx5VXNlciIsInJlcGx5aW5nRGVsZXRlIiwicmVtb3ZlQXR0cmlidXRlIiwicmVwbHkiLCJyZXBseVVzZXIiLCJyZXBseUNvbW1lbnQiLCJ2YWx1ZSIsImZvY3VzIiwic2VhcmNoSW5wdXRzIiwibmF2YmFyU2VhcmNoIiwibmF2YmFyU2VhcmNoT3BlbmVyIiwibmF2YmFyU2VhcmNoQ2xvc2VyIiwib3Blbk5hdmJhclNlYXJjaCIsImNzc1RleHQiLCJkaXNwbGF5IiwiY2xvc2VOYXZiYXJTZWFyY2giLCJpbnB1dEJveCIsImtleSIsImlucHV0IiwidGFyZ2V0IiwiY29kZSIsInRvb2x0aXAiLCJ0cmlnZ2VyIiwiZmlsZUlucHV0IiwicG9zdEltZ091dHB1dCIsIm9uY2hhbmdlIiwic3JjIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiZmlsZXMiLCJtYXJnaW5Cb3R0b20iLCJvdXRwdXRDb250ZW50IiwiYmFja2dyb3VuZEltYWdlIiwidGV4dGFyZWEiLCJvbmlucHV0IiwiaGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0Iiwib24iLCJyZWdleCIsIlJlZ0V4cCIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlIiwid2hpY2giLCJ0ZXN0IiwicG9zdENvbGxhcHNlIiwib3BlbkNvbGxhcHNlZFBvc3QiLCJjbGllbnRIZWlnaHQiXSwic291cmNlUm9vdCI6IiJ9