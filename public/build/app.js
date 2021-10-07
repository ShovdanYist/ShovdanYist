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
    var alertBox = document.querySelector('.md-breadcrumb');
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
        alertBox.insertAdjacentHTML('afterend', message);
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
  sideNavLogoutCloser.addEventListener('click', closeNav);
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
var navbarSearch = document.getElementById('navbarSearch');
var navbarSearchInput = document.getElementById('navbarSearchInput');
var navbarSearchOpener = document.getElementById('openNavbarSearch');
var navbarSearchCloser = document.getElementById('closeNavbarSearch');

function openNavbarSearch() {
  document.querySelector('.navbar-search-mobile').style.display = 'unset';
  document.querySelector('.navbar-search-mobile input').focus();
}

function closeNavbarSearch() {
  document.querySelector('.navbar-search-mobile').style.display = 'none';
}

if (navbarSearch) {
  navbarSearchOpener.addEventListener('click', openNavbarSearch);
  navbarSearchCloser.addEventListener('click', closeNavbarSearch);
  navbarSearchInput.addEventListener('focusout', closeNavbarSearch);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWpDO0FBQ0gsQ0FGRCxHQUlBOztBQUNBRixDQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQitHLEVBQXJCLENBQXdCLFVBQXhCLEVBQW9DLFVBQVV4SSxLQUFWLEVBQWlCO0FBQ2pELE1BQUl5SSxLQUFLLEdBQUcsSUFBSUMsTUFBSixDQUFXLGtCQUFYLENBQVo7QUFDQSxNQUFJdEIsR0FBRyxHQUFHNUcsTUFBTSxDQUFDbUksWUFBUCxDQUFvQixDQUFDM0ksS0FBSyxDQUFDNEksUUFBUCxHQUFrQjVJLEtBQUssQ0FBQzZJLEtBQXhCLEdBQWdDN0ksS0FBSyxDQUFDNEksUUFBMUQsQ0FBVjs7QUFDQSxNQUFJLENBQUNILEtBQUssQ0FBQ0ssSUFBTixDQUFXMUIsR0FBWCxDQUFMLEVBQXNCO0FBQ2xCcEgsSUFBQUEsS0FBSyxDQUFDQyxjQUFOO0FBQ0EsV0FBTyxLQUFQO0FBQ0g7QUFDSixDQVBEOzs7Ozs7Ozs7Ozs7QUNyTUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzL2FwcC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKS5kZWZhdWx0O1xuXG4vLyBBZGQgc29uZyB0byBwbGF5bGlzdCBvciBhZGQgcG9zdCB0byBib29rbWFya3NcblxubGV0IHBsYXlsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXlsaXN0LXRvZ2dsZScpO1xubGV0IGJvb2ttYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvb2ttYXJrLXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBzd2l0Y2hlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVybCA9IHRoaXMuaHJlZjtcblxuICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBzdGF0dXMgPSBTdHJpbmcocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAoc3RhdHVzID09PSAnYWRkZWQnKSA/IHRoaXMuY2xhc3NMaXN0LmFkZCgnYWRkZWQnKSA6IHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWRkZWQnKTtcbiAgICAgICAgdGhpcy5kYXRhc2V0Lm9yaWdpbmFsVGl0bGUgPSByZXNwb25zZS5kYXRhLnJlc3BvbnNlLnRpdGxlO1xuICAgICAgICB0aGlzLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgbGV0IGFsZXJ0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWJyZWFkY3J1bWInKTtcbiAgICAgICAgbGV0IGFsZXJ0RXhpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYWxlcnQnKTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5tZXNzYWdlKSB7XG4gICAgICAgICAgICBsZXQgYmFkZ2UgPSAnJztcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyA9PT0gJ2FkZGVkJykge1xuICAgICAgICAgICAgICAgIGJhZGdlID0gJ3N1Y2Nlc3MnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiYWRnZSA9ICdkYW5nZXInO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICc8ZGl2IGNsYXNzPVwibWQtYWxlcnQgbWQtYWxlcnQtJyArIGJhZGdlICsgJyBtZC1ib3gtbWJcIj4nICtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLnJlc3BvbnNlLm1lc3NhZ2UgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICBpZiAoYWxlcnRFeGlzdCkge1xuICAgICAgICAgICAgICAgIGFsZXJ0RXhpc3Qub3V0ZXJIVE1MID0gbWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnRCb3guaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLmZhZGVUbygzMDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoXCIubWQtYWxlcnRcIikuc2xpZGVVcCg1MDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIFt0aGlzXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDApO1xuICAgIH0pXG59XG5cbnBsYXlsaXN0LmZvckVhY2goKHBsYXlsaXN0KSA9PiB7XG4gICAgcGxheWxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hlcik7XG59KTtcblxuYm9va21hcmsuZm9yRWFjaCgoYm9va21hcmspID0+IHtcbiAgICBib29rbWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaGVyKTtcbn0pO1xuXG4vLyBGb2xsb3cgYSB1c2VyIG9yIHVuZm9sbG93IGZyb20geW91cnNlbGZcblxubGV0IGZvbGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb2xsb3ctdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIGZvbGxvd3MoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnYWRkZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi1pbmZvJyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1saWdodCcpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdmb2xsb3dlZCcpO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKSkge1xuICAgICAgICAgICAgICAgIGxldCBmb2xsb3dlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyJykuaW5uZXJIVE1MID0gKHBhcnNlSW50KGZvbGxvd2VycywgMTApICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLWxpZ2h0Jyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2ZvbGxvd2VkJyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1pbmZvJyk7XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvbGxvd2VycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykucXVlcnlTZWxlY3RvcignLm51bWJlcicpLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUwgPSAocGFyc2VJbnQoZm9sbG93ZXJzLCAxMCkgLSAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRhc2V0Lm9yaWdpbmFsVGl0bGUgPSByZXNwb25zZS5kYXRhLnJlc3BvbnNlLnRpdGxlO1xuICAgICAgICB0aGlzLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5sZXQgdW5mb2xsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5mb2xsb3ctdG9nZ2xlJyk7XG5cbmZvbGxvdy5mb3JFYWNoKChmb2xsb3cpID0+IHtcbiAgICBmb2xsb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb2xsb3dzKTtcbn0pO1xuXG5mdW5jdGlvbiB1bmZvbGxvd3MoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG4gICAgbGV0IGZvbGxvd2VyQmxvY2sgPSAndScgKyB0aGlzLmlkLnNwbGl0KCd1JykucG9wKCkuc3BsaXQoJ3QnKVswXSArICdsJztcbiAgICBsZXQgY2FuY2VsQnV0dG9uSWQgPSAndXNlclVuZm9sbG93JyArIHRoaXMuaWQuc3BsaXQoJ3UnKS5wb3AoKS5zcGxpdCgndCcpWzBdO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbmNlbEJ1dHRvbklkKS5jbGljaygpO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyZW1vdmVkJykge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZm9sbG93ZXJCbG9jaykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG51bmZvbGxvdy5mb3JFYWNoKCh1bmZvbGxvdykgPT4ge1xuICAgIHVuZm9sbG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5mb2xsb3dzKTtcbn0pO1xuXG4vLyBNYWtlIHBvc3QgZmVhdHVyZWRcblxubGV0IGZlYXR1cmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZlYXR1cmVkLXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBmZWF0dXJlZFBvc3QoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgKHN0YXR1cyA9PT0gJ2FkZGVkJykgPyB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5mZWF0dXJlZC5mb3JFYWNoKChmZWF0dXJlZCkgPT4ge1xuICAgIGZlYXR1cmVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZmVhdHVyZWRQb3N0KTtcbn0pO1xuXG4vLyBQb3N0IGxpa2VcblxubGV0IGxpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlrZS10b2dnbGUnKTtcblxuZnVuY3Rpb24gbGlrZVBvc3QoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgKHN0YXR1cyA9PT0gJ2FkZGVkJykgPyB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG5cbiAgICAgICAgbGV0IHBvc3RMaWtlQ291bnRlciA9ICdwb3N0LWxpa2UtY291bnRlci0nICsgdGhpcy5pZC5yZXBsYWNlKCdwb3N0LWxpa2UtJywnJyk7XG4gICAgICAgIGxldCBjdXJyZW50TGlrZXMgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3N0TGlrZUNvdW50ZXIpLmlubmVySFRNTCk7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2FkZGVkJykge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zdExpa2VDb3VudGVyKS5pbm5lckhUTUwgPSBjdXJyZW50TGlrZXMgKyAxO1xuICAgICAgICB9IGVsc2UgIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvc3RMaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxubGlrZS5mb3JFYWNoKChsaWtlKSA9PiB7XG4gICAgbGlrZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpa2VQb3N0KTtcbn0pO1xuIiwiLypcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcbiAqXG4gKiBXZSByZWNvbW1lbmQgaW5jbHVkaW5nIHRoZSBidWlsdCB2ZXJzaW9uIG9mIHRoaXMgSmF2YVNjcmlwdCBmaWxlXG4gKiAoYW5kIGl0cyBDU1MgZmlsZSkgaW4geW91ciBiYXNlIGxheW91dCAoYmFzZS5odG1sLnR3aWcpLlxuICovXG5cbi8vIGFueSBDU1MgeW91IGltcG9ydCB3aWxsIG91dHB1dCBpbnRvIGEgc2luZ2xlIHNjc3MgZmlsZSAoYXBwLnNjc3MgaW4gdGhpcyBjYXNlKVxuaW1wb3J0ICcuLi9zY3NzL2FwcC5zY3NzJztcblxuLy8gQXdlc29tZSBmb250c1xucmVxdWlyZSgnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5taW4uY3NzJyk7XG5yZXF1aXJlKCdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9qcy9hbGwuanMnKTtcblxuLy8gTmVlZCBqUXVlcnk/IEluc3RhbGwgaXQgd2l0aCBcInlhcm4gYWRkIGpxdWVyeVwiLCB0aGVuIHVuY29tbWVudCB0byBpbXBvcnQgaXQuXG4vLyBpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xubGV0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbmdsb2JhbC4kID0gZ2xvYmFsLmpRdWVyeSA9ICQ7XG5cbi8vIEJvb3RzdHJhcCBqc1xucmVxdWlyZSgnYm9vdHN0cmFwJyk7XG5cbi8vIE15IHNjcmlwdHNcbmltcG9ydCAnLi9zY3JpcHRzJztcbmltcG9ydCAnLi9hamF4JztcbiIsIi8vIFByZXZlbnQgc2Nyb2xsXG5cbmNvbnN0ICQgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xubGV0IGtleXMgPSB7Mzc6IDEsIDM4OiAxLCAzOTogMSwgNDA6IDF9O1xuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMoZSkge1xuICAgIGlmIChrZXlzW2Uua2V5Q29kZV0pIHtcbiAgICAgICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmxldCBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcbnRyeSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsIG51bGwsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlOyB9XG4gICAgfSkpO1xufSBjYXRjaChlKSB7fVxuXG5sZXQgd2hlZWxPcHQgPSBzdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IGZhbHNlIH0gOiBmYWxzZTtcbmxldCB3aGVlbEV2ZW50ID0gJ29ud2hlZWwnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpID8gJ3doZWVsJyA6ICdtb3VzZXdoZWVsJztcblxuZnVuY3Rpb24gZGlzYWJsZVNjcm9sbCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpOyAvLyBvbGRlciBGRlxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKHdoZWVsRXZlbnQsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7IC8vIG1vZGVybiBkZXNrdG9wXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7IC8vIG1vYmlsZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZVNjcm9sbCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKHdoZWVsRXZlbnQsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMsIGZhbHNlKTtcbn1cblxuLy8gTW9iaWxlIG5hdmJhclxuXG5jb25zdCBzaWRlTmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXYnKTtcbmNvbnN0IHNpZGVOYXZPcGVuZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdk9wZW5lcicpO1xuY29uc3Qgc2lkZU5hdkNsb3NlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2Q2xvc2VyJyk7XG5jb25zdCBzaWRlTmF2TG9nb3V0Q2xvc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZMb2dvdXRDbG9zZXInKTtcbmNvbnN0IHNpZGVOYXZCYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZCYWNrJyk7XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gICAgZGlzYWJsZVNjcm9sbCgpO1xuICAgIHNpZGVOYXYuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoMTAwJSknO1xuICAgIHNpZGVOYXZCYWNrLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgc2lkZU5hdkNsb3Nlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYoKSB7XG4gICAgZW5hYmxlU2Nyb2xsKCk7XG4gICAgc2lkZU5hdi5zdHlsZS50cmFuc2Zvcm0gPSAndW5zZXQnO1xuICAgIHNpZGVOYXZCYWNrLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgc2lkZU5hdkNsb3Nlci5zdHlsZS53aWR0aCA9ICcwJztcbn1cblxuaWYgKHNpZGVOYXYpIHtcbiAgICBzaWRlTmF2T3BlbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk5hdik7XG4gICAgc2lkZU5hdkNsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2KTtcbiAgICBzaWRlTmF2TG9nb3V0Q2xvc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VOYXYpO1xufVxuXG4vLyBNZWRpYUVsZW1lbnQgUGxheWVyXG5cbnJlcXVpcmUoJ21lZGlhZWxlbWVudC9idWlsZC9tZWRpYWVsZW1lbnQtYW5kLXBsYXllci5taW4nKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmF1ZGlvLXBsYXllciBhdWRpbycpLm1lZGlhZWxlbWVudHBsYXllcih7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHBsYXllciwgbm9kZSkge1xuICAgICAgICAgICAgLy8gT3B0aW9uYWxcbiAgICAgICAgICAgICQocGxheWVyKS5jbG9zZXN0KCcubWVqc19fY29udGFpbmVyJykuYXR0cignbGFuZycsIG1lanMuaTE4bi5sYW5ndWFnZSgpKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5hdHRyKCdsYW5nJywgbWVqcy5pMThuLmxhbmd1YWdlKCkpO1xuICAgICAgICAgICAgLy8gTW9yZSBjb2RlXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0Vm9sdW1lOiAxLFxuICAgICAgICBhdXRvUmV3aW5kOiB0cnVlLFxuICAgICAgICBlbmFibGVQcm9ncmVzc1Rvb2x0aXA6IGZhbHNlLFxuICAgICAgICBmZWF0dXJlczogWydwbGF5cGF1c2UnLCdbZmVhdHVyZV9uYW1lXScsJ2N1cnJlbnQnLCdwcm9ncmVzcycsJ2R1cmF0aW9uJ11cbiAgICB9KVxufSk7XG5cbi8vIENvbW1lbnQgcmVwbHlcblxuY29uc3QgY29tbWVudFdyaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWNvbW1lbnQtd3JpdGUnKTtcbmNvbnN0IGNvbW1lbnRUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X21lc3NhZ2UnKTtcbmNvbnN0IGNvbW1lbnRSZXBseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LXJlcGx5Jyk7XG5jb25zdCByZXBseVRvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfcmVwbHlUbycpO1xuY29uc3QgcmVwbHlGb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudF9yZXBseUZvcicpO1xuY29uc3QgY29tbWVudFJlcGx5VXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1jb21tZW50LXJlcGx5LXVzZXInKTtcbmNvbnN0IHJlcGx5aW5nRGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLXJlcGx5aW5nLWRlbGV0ZScpO1xuXG5pZiAocmVwbHlpbmdEZWxldGUpIHtcbiAgICByZXBseWluZ0RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcmVwbHlUby5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIHJlcGx5Rm9yLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ21kLXJlcGx5aW5nJyk7XG4gICAgfSk7XG59XG5cbmlmIChjb21tZW50UmVwbHkpIHtcbiAgICBjb21tZW50UmVwbHkuZm9yRWFjaCgocmVwbHkpID0+IHtcbiAgICAgICAgbGV0IHJlcGx5VXNlciA9IHJlcGx5LnF1ZXJ5U2VsZWN0b3IoJy5yZXBseS11c2VyJyk7XG4gICAgICAgIGxldCByZXBseUNvbW1lbnQgPSByZXBseS5xdWVyeVNlbGVjdG9yKCcucmVwbHktY29tbWVudCcpO1xuICAgICAgICByZXBseS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChyZXBseSkgPT4ge1xuICAgICAgICAgICAgcmVwbHlUby52YWx1ZSA9IHJlcGx5VXNlci5pbm5lckhUTUw7XG4gICAgICAgICAgICByZXBseUZvci52YWx1ZSA9IHJlcGx5Q29tbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb21tZW50VGV4dEFyZWEuZm9jdXMoKTtcblxuICAgICAgICAgICAgaWYgKHJlcGx5VG8udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5hZGQoJ21kLXJlcGx5aW5nJyk7XG4gICAgICAgICAgICAgICAgY29tbWVudFJlcGx5VXNlci5pbm5lckhUTUwgPSByZXBseVRvLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xufVxuXG4vLyBTZWFyY2hlclxuXG5sZXQgc2VhcmNoSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1kLXNlYXJjaC1hbGwtaW5wdXQnKTtcblxuY29uc3QgbmF2YmFyU2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhclNlYXJjaCcpO1xuY29uc3QgbmF2YmFyU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyU2VhcmNoSW5wdXQnKTtcbmNvbnN0IG5hdmJhclNlYXJjaE9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuTmF2YmFyU2VhcmNoJyk7XG5jb25zdCBuYXZiYXJTZWFyY2hDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VOYXZiYXJTZWFyY2gnKTtcblxuZnVuY3Rpb24gb3Blbk5hdmJhclNlYXJjaCgpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZScpLnN0eWxlLmRpc3BsYXkgPSAndW5zZXQnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZSBpbnB1dCcpLmZvY3VzKCk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2YmFyU2VhcmNoKCl7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1zZWFyY2gtbW9iaWxlJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuaWYgKG5hdmJhclNlYXJjaCkge1xuICAgIG5hdmJhclNlYXJjaE9wZW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5OYXZiYXJTZWFyY2gpO1xuICAgIG5hdmJhclNlYXJjaENsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2YmFyU2VhcmNoKTtcbiAgICBuYXZiYXJTZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGNsb3NlTmF2YmFyU2VhcmNoKTtcbn1cblxuc2VhcmNoSW5wdXRzLmZvckVhY2goKGlucHV0Qm94LGtleSkgPT4ge1xuICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsKGlucHV0KSA9PiB7XG4gICAgICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfYnV0dG9uJykuaHJlZiA9ICcvc2VhcmNoLycgKyBpbnB1dC50YXJnZXQudmFsdWU7XG4gICAgfSlcblxuICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQuY29kZSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9idXR0b24nKS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbn0pO1xuXG4vLyBFbmFibGUgdG9vbHRpcFxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe1xuICAgICAgICB0cmlnZ2VyIDogJ2hvdmVyJ1xuICAgIH0pXG59KTtcblxuLy8gSW1hZ2Ugb24gY2hhbmdlXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1maWxlLWlucHV0JykpIHtcbiAgICBsZXQgZmlsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1maWxlLWlucHV0Jyk7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0SW1nT3V0cHV0JykpIHtcbiAgICAgICAgbGV0IHBvc3RJbWdPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdEltZ091dHB1dCcpO1xuICAgICAgICBmaWxlSW5wdXQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBwb3N0SW1nT3V0cHV0LnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVJbnB1dC5maWxlc1swXSk7XG4gICAgICAgICAgICBwb3N0SW1nT3V0cHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc4cHgnO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dC1jb250ZW50JykpIHtcbiAgICAgICAgbGV0IG91dHB1dENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0LWNvbnRlbnQnKTtcbiAgICAgICAgZmlsZUlucHV0Lm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgb3V0cHV0Q29udGVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFxcJycgKyB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlSW5wdXQuZmlsZXNbMF0pICsgJ1xcJyknO1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8gVGV4dGFyZWEgYXV0b3NpemVcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYXV0by1zaXplcicpKSB7XG4gICAgbGV0IHRleHRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWF1dG8tc2l6ZXInKTtcbiAgICB0ZXh0YXJlYS5vbmlucHV0ID0gKCkgPT4ge1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5oZWlnaHQgPSB0ZXh0YXJlYS5zY3JvbGxIZWlnaHQgKyAyICsgXCJweFwiO1xuICAgIH07XG59XG5cbi8vIEF1dG8gY2xvc2UgYWxlcnRzXG4kKFwiLm1kLWFsZXJ0LWF1dG8taGlkZVwiKS5mYWRlVG8oNTAwMCwgNTAwKS5zbGlkZVVwKDUwMCwgZnVuY3Rpb24oKXtcbiAgICAkKFwiLm1kLWFsZXJ0LWF1dG8taGlkZVwiKS5zbGlkZVVwKDUwMCk7XG59KTtcblxuLy8gUHJldmVudCB1c2VybmFtZSBzeW1ib2xzXG4kKCcudXNlcm5hbWUtaW5wdXQnKS5vbigna2V5cHJlc3MnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKFwiXlthLXpBLVowLTkuX10rJFwiKTtcbiAgICBsZXQga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZSghZXZlbnQuY2hhckNvZGUgPyBldmVudC53aGljaCA6IGV2ZW50LmNoYXJDb2RlKTtcbiAgICBpZiAoIXJlZ2V4LnRlc3Qoa2V5KSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1aXJlIiwicGxheWxpc3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJib29rbWFyayIsInN3aXRjaGVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInVybCIsImhyZWYiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJTdHJpbmciLCJkYXRhIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZGF0YXNldCIsIm9yaWdpbmFsVGl0bGUiLCJ0aXRsZSIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsImFsZXJ0Qm94IiwicXVlcnlTZWxlY3RvciIsImFsZXJ0RXhpc3QiLCJtZXNzYWdlIiwiYmFkZ2UiLCJvdXRlckhUTUwiLCJpbnNlcnRBZGphY2VudEhUTUwiLCIkIiwiZmFkZVRvIiwic2xpZGVVcCIsInNldFRpbWVvdXQiLCJmb3JFYWNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvbGxvdyIsImZvbGxvd3MiLCJnZXRFbGVtZW50QnlJZCIsImZvbGxvd2VycyIsImlubmVySFRNTCIsInBhcnNlSW50IiwidG9TdHJpbmciLCJ1bmZvbGxvdyIsInVuZm9sbG93cyIsImZvbGxvd2VyQmxvY2siLCJpZCIsInNwbGl0IiwicG9wIiwiY2FuY2VsQnV0dG9uSWQiLCJjbGljayIsImZlYXR1cmVkIiwiZmVhdHVyZWRQb3N0IiwibGlrZSIsImxpa2VQb3N0IiwicG9zdExpa2VDb3VudGVyIiwicmVwbGFjZSIsImN1cnJlbnRMaWtlcyIsImdsb2JhbCIsImpRdWVyeSIsImtleXMiLCJlIiwicHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzIiwia2V5Q29kZSIsInN1cHBvcnRzUGFzc2l2ZSIsIndpbmRvdyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid2hlZWxPcHQiLCJwYXNzaXZlIiwid2hlZWxFdmVudCIsImNyZWF0ZUVsZW1lbnQiLCJkaXNhYmxlU2Nyb2xsIiwiZW5hYmxlU2Nyb2xsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNpZGVOYXYiLCJzaWRlTmF2T3BlbmVyIiwic2lkZU5hdkNsb3NlciIsInNpZGVOYXZMb2dvdXRDbG9zZXIiLCJzaWRlTmF2QmFjayIsIm9wZW5OYXYiLCJ0cmFuc2Zvcm0iLCJvcGFjaXR5Iiwid2lkdGgiLCJjbG9zZU5hdiIsInJlYWR5IiwibWVkaWFlbGVtZW50cGxheWVyIiwic3VjY2VzcyIsInBsYXllciIsIm5vZGUiLCJjbG9zZXN0IiwiYXR0ciIsIm1lanMiLCJpMThuIiwibGFuZ3VhZ2UiLCJzdGFydFZvbHVtZSIsImF1dG9SZXdpbmQiLCJlbmFibGVQcm9ncmVzc1Rvb2x0aXAiLCJmZWF0dXJlcyIsImNvbW1lbnRXcml0ZSIsImNvbW1lbnRUZXh0QXJlYSIsImNvbW1lbnRSZXBseSIsInJlcGx5VG8iLCJyZXBseUZvciIsImNvbW1lbnRSZXBseVVzZXIiLCJyZXBseWluZ0RlbGV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInJlcGx5IiwicmVwbHlVc2VyIiwicmVwbHlDb21tZW50IiwidmFsdWUiLCJmb2N1cyIsInNlYXJjaElucHV0cyIsIm5hdmJhclNlYXJjaCIsIm5hdmJhclNlYXJjaElucHV0IiwibmF2YmFyU2VhcmNoT3BlbmVyIiwibmF2YmFyU2VhcmNoQ2xvc2VyIiwib3Blbk5hdmJhclNlYXJjaCIsImRpc3BsYXkiLCJjbG9zZU5hdmJhclNlYXJjaCIsImlucHV0Qm94Iiwia2V5IiwiaW5wdXQiLCJ0YXJnZXQiLCJjb2RlIiwidG9vbHRpcCIsInRyaWdnZXIiLCJmaWxlSW5wdXQiLCJwb3N0SW1nT3V0cHV0Iiwib25jaGFuZ2UiLCJzcmMiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJmaWxlcyIsIm1hcmdpbkJvdHRvbSIsIm91dHB1dENvbnRlbnQiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJ0ZXh0YXJlYSIsIm9uaW5wdXQiLCJoZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJvbiIsInJlZ2V4IiwiUmVnRXhwIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGUiLCJ3aGljaCIsInRlc3QiXSwic291cmNlUm9vdCI6IiJ9