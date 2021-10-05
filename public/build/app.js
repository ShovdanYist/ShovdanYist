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
var unfollow = document.querySelectorAll('.unfollow-toggle');

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

follow.forEach(function (follow) {
  follow.addEventListener('click', follows);
});

function unfollows(event) {
  event.preventDefault();

  if (confirm(this.title)) {
    var url = this.href;
    var followerBlock = 'u' + this.id.split('u').pop().split('t')[0] + 'l';
    axios.get(url).then(function (response) {
      var status = String(response.data.response.status);

      if (status === 'removed') {
        document.getElementById(followerBlock).remove();
      }
    });
  }
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
var commentReplyUser = document.querySelector('.md-comment-reply-user');
var replyingDelete = document.querySelector('.md-replying-delete');

if (replyingDelete) {
  replyingDelete.addEventListener('click', function () {
    replyTo.removeAttribute('value');
    commentWrite.classList.remove('md-replying');
  });
}

if (commentReply) {
  commentReply.forEach(function (reply) {
    var replyUser = reply.querySelector('.reply-user');
    reply.addEventListener('click', function (reply) {
      replyTo.value = replyUser.innerHTML;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ly8vLi9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzL2FwcC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKS5kZWZhdWx0O1xuXG4vLyBBZGQgc29uZyB0byBwbGF5bGlzdCBvciBhZGQgcG9zdCB0byBib29rbWFya3NcblxubGV0IHBsYXlsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXlsaXN0LXRvZ2dsZScpO1xubGV0IGJvb2ttYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvb2ttYXJrLXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBzd2l0Y2hlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVybCA9IHRoaXMuaHJlZjtcblxuICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBzdGF0dXMgPSBTdHJpbmcocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAoc3RhdHVzID09PSAnYWRkZWQnKSA/IHRoaXMuY2xhc3NMaXN0LmFkZCgnYWRkZWQnKSA6IHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWRkZWQnKTtcbiAgICAgICAgdGhpcy5kYXRhc2V0Lm9yaWdpbmFsVGl0bGUgPSByZXNwb25zZS5kYXRhLnJlc3BvbnNlLnRpdGxlO1xuICAgICAgICB0aGlzLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgbGV0IGFsZXJ0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWJyZWFkY3J1bWInKTtcbiAgICAgICAgbGV0IGFsZXJ0RXhpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYWxlcnQnKTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5tZXNzYWdlKSB7XG4gICAgICAgICAgICBsZXQgYmFkZ2UgPSAnJztcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyA9PT0gJ2FkZGVkJykge1xuICAgICAgICAgICAgICAgIGJhZGdlID0gJ3N1Y2Nlc3MnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiYWRnZSA9ICdkYW5nZXInO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICc8ZGl2IGNsYXNzPVwibWQtYWxlcnQgbWQtYWxlcnQtJyArIGJhZGdlICsgJyBtZC1ib3gtbWJcIj4nICtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLnJlc3BvbnNlLm1lc3NhZ2UgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICBpZiAoYWxlcnRFeGlzdCkge1xuICAgICAgICAgICAgICAgIGFsZXJ0RXhpc3Qub3V0ZXJIVE1MID0gbWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnRCb3guaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLmZhZGVUbygzMDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoXCIubWQtYWxlcnRcIikuc2xpZGVVcCg1MDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIFt0aGlzXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDApO1xuICAgIH0pXG59XG5cbnBsYXlsaXN0LmZvckVhY2goKHBsYXlsaXN0KSA9PiB7XG4gICAgcGxheWxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hlcik7XG59KTtcblxuYm9va21hcmsuZm9yRWFjaCgoYm9va21hcmspID0+IHtcbiAgICBib29rbWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaGVyKTtcbn0pO1xuXG4vLyBGb2xsb3cgYSB1c2VyIG9yIHVuZm9sbG93IGZyb20geW91cnNlbGZcblxubGV0IGZvbGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb2xsb3ctdG9nZ2xlJyk7XG5sZXQgdW5mb2xsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5mb2xsb3ctdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIGZvbGxvd3MoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcblxuICAgICAgICBpZiAoc3RhdHVzID09PSAnYWRkZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi1pbmZvJyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1saWdodCcpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdmb2xsb3dlZCcpO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKSkge1xuICAgICAgICAgICAgICAgIGxldCBmb2xsb3dlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyJykuaW5uZXJIVE1MID0gKHBhcnNlSW50KGZvbGxvd2VycywgMTApICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLWxpZ2h0Jyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2ZvbGxvd2VkJyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2J0bi1pbmZvJyk7XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvbGxvd2VycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykucXVlcnlTZWxlY3RvcignLm51bWJlcicpLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUwgPSAocGFyc2VJbnQoZm9sbG93ZXJzLCAxMCkgLSAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRhc2V0Lm9yaWdpbmFsVGl0bGUgPSByZXNwb25zZS5kYXRhLnJlc3BvbnNlLnRpdGxlO1xuICAgICAgICB0aGlzLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5mb2xsb3cuZm9yRWFjaCgoZm9sbG93KSA9PiB7XG4gICAgZm9sbG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZm9sbG93cyk7XG59KTtcblxuZnVuY3Rpb24gdW5mb2xsb3dzKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoY29uZmlybSh0aGlzLnRpdGxlKSkge1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuICAgICAgICBsZXQgZm9sbG93ZXJCbG9jayA9ICd1JyArIHRoaXMuaWQuc3BsaXQoJ3UnKS5wb3AoKS5zcGxpdCgndCcpWzBdICsgJ2wnO1xuXG4gICAgICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdyZW1vdmVkJykge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZvbGxvd2VyQmxvY2spLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cblxudW5mb2xsb3cuZm9yRWFjaCgodW5mb2xsb3cpID0+IHtcbiAgICB1bmZvbGxvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVuZm9sbG93cyk7XG59KTtcblxuLy8gTWFrZSBwb3N0IGZlYXR1cmVkXG5cbmxldCBmZWF0dXJlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mZWF0dXJlZC10b2dnbGUnKTtcblxuZnVuY3Rpb24gZmVhdHVyZWRQb3N0KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gdGhpcy5jbGFzc0xpc3QuYWRkKCdhZGRlZCcpIDogdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhZGRlZCcpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxuZmVhdHVyZWQuZm9yRWFjaCgoZmVhdHVyZWQpID0+IHtcbiAgICBmZWF0dXJlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZlYXR1cmVkUG9zdCk7XG59KTtcblxuLy8gUG9zdCBsaWtlXG5cbmxldCBsaWtlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpa2UtdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIGxpa2VQb3N0KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gdGhpcy5jbGFzc0xpc3QuYWRkKCdhZGRlZCcpIDogdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhZGRlZCcpO1xuXG4gICAgICAgIGxldCBwb3N0TGlrZUNvdW50ZXIgPSAncG9zdC1saWtlLWNvdW50ZXItJyArIHRoaXMuaWQucmVwbGFjZSgncG9zdC1saWtlLScsJycpO1xuICAgICAgICBsZXQgY3VycmVudExpa2VzID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zdExpa2VDb3VudGVyKS5pbm5lckhUTUwpO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvc3RMaWtlQ291bnRlcikuaW5uZXJIVE1MID0gY3VycmVudExpa2VzICsgMTtcbiAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3N0TGlrZUNvdW50ZXIpLmlubmVySFRNTCA9IGN1cnJlbnRMaWtlcyAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIFt0aGlzXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDApO1xuICAgIH0pXG59XG5cbmxpa2UuZm9yRWFjaCgobGlrZSkgPT4ge1xuICAgIGxpa2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsaWtlUG9zdCk7XG59KTtcbiIsIi8qXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXG4gKlxuICogV2UgcmVjb21tZW5kIGluY2x1ZGluZyB0aGUgYnVpbHQgdmVyc2lvbiBvZiB0aGlzIEphdmFTY3JpcHQgZmlsZVxuICogKGFuZCBpdHMgQ1NTIGZpbGUpIGluIHlvdXIgYmFzZSBsYXlvdXQgKGJhc2UuaHRtbC50d2lnKS5cbiAqL1xuXG4vLyBhbnkgQ1NTIHlvdSBpbXBvcnQgd2lsbCBvdXRwdXQgaW50byBhIHNpbmdsZSBzY3NzIGZpbGUgKGFwcC5zY3NzIGluIHRoaXMgY2FzZSlcbmltcG9ydCAnLi4vc2Nzcy9hcHAuc2Nzcyc7XG5cbi8vIEF3ZXNvbWUgZm9udHNcbnJlcXVpcmUoJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwubWluLmNzcycpO1xucmVxdWlyZSgnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvanMvYWxsLmpzJyk7XG5cbi8vIE5lZWQgalF1ZXJ5PyBJbnN0YWxsIGl0IHdpdGggXCJ5YXJuIGFkZCBqcXVlcnlcIiwgdGhlbiB1bmNvbW1lbnQgdG8gaW1wb3J0IGl0LlxuLy8gaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmxldCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5nbG9iYWwuJCA9IGdsb2JhbC5qUXVlcnkgPSAkO1xuXG4vLyBCb290c3RyYXAganNcbnJlcXVpcmUoJ2Jvb3RzdHJhcCcpO1xuXG4vLyBNeSBzY3JpcHRzXG5pbXBvcnQgJy4vc2NyaXB0cyc7XG5pbXBvcnQgJy4vYWpheCc7XG4iLCIvLyBQcmV2ZW50IHNjcm9sbFxuXG5jb25zdCAkID0gcmVxdWlyZShcImpxdWVyeVwiKTtcbmxldCBrZXlzID0gezM3OiAxLCAzODogMSwgMzk6IDEsIDQwOiAxfTtcblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzKGUpIHtcbiAgICBpZiAoa2V5c1tlLmtleUNvZGVdKSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5sZXQgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG50cnkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidGVzdFwiLCBudWxsLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTsgfVxuICAgIH0pKTtcbn0gY2F0Y2goZSkge31cblxubGV0IHdoZWVsT3B0ID0gc3VwcG9ydHNQYXNzaXZlID8geyBwYXNzaXZlOiBmYWxzZSB9IDogZmFsc2U7XG5sZXQgd2hlZWxFdmVudCA9ICdvbndoZWVsJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA/ICd3aGVlbCcgOiAnbW91c2V3aGVlbCc7XG5cbmZ1bmN0aW9uIGRpc2FibGVTY3JvbGwoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTsgLy8gb2xkZXIgRkZcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcih3aGVlbEV2ZW50LCBwcmV2ZW50RGVmYXVsdCwgd2hlZWxPcHQpOyAvLyBtb2Rlcm4gZGVza3RvcFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBwcmV2ZW50RGVmYXVsdCwgd2hlZWxPcHQpOyAvLyBtb2JpbGVcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cywgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBlbmFibGVTY3JvbGwoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcih3aGVlbEV2ZW50LCBwcmV2ZW50RGVmYXVsdCwgd2hlZWxPcHQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBwcmV2ZW50RGVmYXVsdCwgd2hlZWxPcHQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzLCBmYWxzZSk7XG59XG5cbi8vIE1vYmlsZSBuYXZiYXJcblxuY29uc3Qgc2lkZU5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2Jyk7XG5jb25zdCBzaWRlTmF2T3BlbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZPcGVuZXInKTtcbmNvbnN0IHNpZGVOYXZDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdkNsb3NlcicpO1xuY29uc3Qgc2lkZU5hdkJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdkJhY2snKTtcblxuZnVuY3Rpb24gb3Blbk5hdigpIHtcbiAgICBkaXNhYmxlU2Nyb2xsKCk7XG4gICAgc2lkZU5hdi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgxMDAlKSc7XG4gICAgc2lkZU5hdkJhY2suc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICBzaWRlTmF2Q2xvc2VyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBlbmFibGVTY3JvbGwoKTtcbiAgICBzaWRlTmF2LnN0eWxlLnRyYW5zZm9ybSA9ICd1bnNldCc7XG4gICAgc2lkZU5hdkJhY2suc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICBzaWRlTmF2Q2xvc2VyLnN0eWxlLndpZHRoID0gJzAnO1xufVxuXG5pZiAoc2lkZU5hdikge1xuICAgIHNpZGVOYXZPcGVuZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTmF2KTtcbiAgICBzaWRlTmF2Q2xvc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VOYXYpO1xufVxuXG4vLyBNZWRpYUVsZW1lbnQgUGxheWVyXG5cbnJlcXVpcmUoJ21lZGlhZWxlbWVudC9idWlsZC9tZWRpYWVsZW1lbnQtYW5kLXBsYXllci5taW4nKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmF1ZGlvLXBsYXllciBhdWRpbycpLm1lZGlhZWxlbWVudHBsYXllcih7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHBsYXllciwgbm9kZSkge1xuICAgICAgICAgICAgLy8gT3B0aW9uYWxcbiAgICAgICAgICAgICQocGxheWVyKS5jbG9zZXN0KCcubWVqc19fY29udGFpbmVyJykuYXR0cignbGFuZycsIG1lanMuaTE4bi5sYW5ndWFnZSgpKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5hdHRyKCdsYW5nJywgbWVqcy5pMThuLmxhbmd1YWdlKCkpO1xuICAgICAgICAgICAgLy8gTW9yZSBjb2RlXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0Vm9sdW1lOiAxLFxuICAgICAgICBhdXRvUmV3aW5kOiB0cnVlLFxuICAgICAgICBlbmFibGVQcm9ncmVzc1Rvb2x0aXA6IGZhbHNlLFxuICAgICAgICBmZWF0dXJlczogWydwbGF5cGF1c2UnLCdbZmVhdHVyZV9uYW1lXScsJ2N1cnJlbnQnLCdwcm9ncmVzcycsJ2R1cmF0aW9uJ11cbiAgICB9KVxufSk7XG5cbi8vIENvbW1lbnQgcmVwbHlcblxuY29uc3QgY29tbWVudFdyaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWNvbW1lbnQtd3JpdGUnKTtcbmNvbnN0IGNvbW1lbnRUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X21lc3NhZ2UnKTtcbmNvbnN0IGNvbW1lbnRSZXBseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LXJlcGx5Jyk7XG5jb25zdCByZXBseVRvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfcmVwbHlUbycpO1xuY29uc3QgY29tbWVudFJlcGx5VXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1jb21tZW50LXJlcGx5LXVzZXInKTtcbmNvbnN0IHJlcGx5aW5nRGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLXJlcGx5aW5nLWRlbGV0ZScpO1xuXG5pZiAocmVwbHlpbmdEZWxldGUpIHtcbiAgICByZXBseWluZ0RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcmVwbHlUby5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIGNvbW1lbnRXcml0ZS5jbGFzc0xpc3QucmVtb3ZlKCdtZC1yZXBseWluZycpO1xuICAgIH0pO1xufVxuXG5pZiAoY29tbWVudFJlcGx5KSB7XG4gICAgY29tbWVudFJlcGx5LmZvckVhY2goKHJlcGx5KSA9PiB7XG4gICAgICAgIGxldCByZXBseVVzZXIgPSByZXBseS5xdWVyeVNlbGVjdG9yKCcucmVwbHktdXNlcicpO1xuICAgICAgICByZXBseS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChyZXBseSkgPT4ge1xuICAgICAgICAgICAgcmVwbHlUby52YWx1ZSA9IHJlcGx5VXNlci5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb21tZW50VGV4dEFyZWEuZm9jdXMoKTtcblxuICAgICAgICAgICAgaWYgKHJlcGx5VG8udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5hZGQoJ21kLXJlcGx5aW5nJyk7XG4gICAgICAgICAgICAgICAgY29tbWVudFJlcGx5VXNlci5pbm5lckhUTUwgPSByZXBseVRvLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xufVxuXG4vLyBTZWFyY2hlclxuXG5sZXQgc2VhcmNoSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1kLXNlYXJjaC1hbGwtaW5wdXQnKTtcblxuY29uc3QgbmF2YmFyU2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhclNlYXJjaCcpO1xuY29uc3QgbmF2YmFyU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyU2VhcmNoSW5wdXQnKTtcbmNvbnN0IG5hdmJhclNlYXJjaE9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuTmF2YmFyU2VhcmNoJyk7XG5jb25zdCBuYXZiYXJTZWFyY2hDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VOYXZiYXJTZWFyY2gnKTtcblxuZnVuY3Rpb24gb3Blbk5hdmJhclNlYXJjaCgpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZScpLnN0eWxlLmRpc3BsYXkgPSAndW5zZXQnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZSBpbnB1dCcpLmZvY3VzKCk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2YmFyU2VhcmNoKCl7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1zZWFyY2gtbW9iaWxlJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuaWYgKG5hdmJhclNlYXJjaCkge1xuICAgIG5hdmJhclNlYXJjaE9wZW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5OYXZiYXJTZWFyY2gpO1xuICAgIG5hdmJhclNlYXJjaENsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2YmFyU2VhcmNoKTtcbiAgICBuYXZiYXJTZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGNsb3NlTmF2YmFyU2VhcmNoKTtcbn1cblxuc2VhcmNoSW5wdXRzLmZvckVhY2goKGlucHV0Qm94LGtleSkgPT4ge1xuICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsKGlucHV0KSA9PiB7XG4gICAgICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfYnV0dG9uJykuaHJlZiA9ICcvc2VhcmNoLycgKyBpbnB1dC50YXJnZXQudmFsdWU7XG4gICAgfSlcblxuICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQuY29kZSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9idXR0b24nKS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbn0pO1xuXG4vLyBFbmFibGUgdG9vbHRpcFxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe1xuICAgICAgICB0cmlnZ2VyIDogJ2hvdmVyJ1xuICAgIH0pXG59KTtcblxuLy8gSW1hZ2Ugb24gY2hhbmdlXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1maWxlLWlucHV0JykpIHtcbiAgICBsZXQgZmlsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1maWxlLWlucHV0Jyk7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0SW1nT3V0cHV0JykpIHtcbiAgICAgICAgbGV0IHBvc3RJbWdPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdEltZ091dHB1dCcpO1xuICAgICAgICBmaWxlSW5wdXQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBwb3N0SW1nT3V0cHV0LnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVJbnB1dC5maWxlc1swXSk7XG4gICAgICAgICAgICBwb3N0SW1nT3V0cHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc4cHgnO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dC1jb250ZW50JykpIHtcbiAgICAgICAgbGV0IG91dHB1dENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0LWNvbnRlbnQnKTtcbiAgICAgICAgZmlsZUlucHV0Lm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgb3V0cHV0Q29udGVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFxcJycgKyB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlSW5wdXQuZmlsZXNbMF0pICsgJ1xcJyknO1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8gVGV4dGFyZWEgYXV0b3NpemVcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYXV0by1zaXplcicpKSB7XG4gICAgbGV0IHRleHRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWF1dG8tc2l6ZXInKTtcbiAgICB0ZXh0YXJlYS5vbmlucHV0ID0gKCkgPT4ge1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5oZWlnaHQgPSB0ZXh0YXJlYS5zY3JvbGxIZWlnaHQgKyAyICsgXCJweFwiO1xuICAgIH07XG59XG5cbi8vIEF1dG8gY2xvc2UgYWxlcnRzXG4kKFwiLm1kLWFsZXJ0LWF1dG8taGlkZVwiKS5mYWRlVG8oNTAwMCwgNTAwKS5zbGlkZVVwKDUwMCwgZnVuY3Rpb24oKXtcbiAgICAkKFwiLm1kLWFsZXJ0LWF1dG8taGlkZVwiKS5zbGlkZVVwKDUwMCk7XG59KTtcblxuLy8gUHJldmVudCB1c2VybmFtZSBzeW1ib2xzXG4kKCcudXNlcm5hbWUtaW5wdXQnKS5vbigna2V5cHJlc3MnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKFwiXlthLXpBLVowLTkuX10rJFwiKTtcbiAgICBsZXQga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZSghZXZlbnQuY2hhckNvZGUgPyBldmVudC53aGljaCA6IGV2ZW50LmNoYXJDb2RlKTtcbiAgICBpZiAoIXJlZ2V4LnRlc3Qoa2V5KSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1aXJlIiwicGxheWxpc3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJib29rbWFyayIsInN3aXRjaGVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInVybCIsImhyZWYiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJTdHJpbmciLCJkYXRhIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZGF0YXNldCIsIm9yaWdpbmFsVGl0bGUiLCJ0aXRsZSIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsImFsZXJ0Qm94IiwicXVlcnlTZWxlY3RvciIsImFsZXJ0RXhpc3QiLCJtZXNzYWdlIiwiYmFkZ2UiLCJvdXRlckhUTUwiLCJpbnNlcnRBZGphY2VudEhUTUwiLCIkIiwiZmFkZVRvIiwic2xpZGVVcCIsInNldFRpbWVvdXQiLCJmb3JFYWNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvbGxvdyIsInVuZm9sbG93IiwiZm9sbG93cyIsImdldEVsZW1lbnRCeUlkIiwiZm9sbG93ZXJzIiwiaW5uZXJIVE1MIiwicGFyc2VJbnQiLCJ0b1N0cmluZyIsInVuZm9sbG93cyIsImNvbmZpcm0iLCJmb2xsb3dlckJsb2NrIiwiaWQiLCJzcGxpdCIsInBvcCIsImZlYXR1cmVkIiwiZmVhdHVyZWRQb3N0IiwibGlrZSIsImxpa2VQb3N0IiwicG9zdExpa2VDb3VudGVyIiwicmVwbGFjZSIsImN1cnJlbnRMaWtlcyIsImdsb2JhbCIsImpRdWVyeSIsImtleXMiLCJlIiwicHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzIiwia2V5Q29kZSIsInN1cHBvcnRzUGFzc2l2ZSIsIndpbmRvdyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid2hlZWxPcHQiLCJwYXNzaXZlIiwid2hlZWxFdmVudCIsImNyZWF0ZUVsZW1lbnQiLCJkaXNhYmxlU2Nyb2xsIiwiZW5hYmxlU2Nyb2xsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNpZGVOYXYiLCJzaWRlTmF2T3BlbmVyIiwic2lkZU5hdkNsb3NlciIsInNpZGVOYXZCYWNrIiwib3Blbk5hdiIsInRyYW5zZm9ybSIsIm9wYWNpdHkiLCJ3aWR0aCIsImNsb3NlTmF2IiwicmVhZHkiLCJtZWRpYWVsZW1lbnRwbGF5ZXIiLCJzdWNjZXNzIiwicGxheWVyIiwibm9kZSIsImNsb3Nlc3QiLCJhdHRyIiwibWVqcyIsImkxOG4iLCJsYW5ndWFnZSIsInN0YXJ0Vm9sdW1lIiwiYXV0b1Jld2luZCIsImVuYWJsZVByb2dyZXNzVG9vbHRpcCIsImZlYXR1cmVzIiwiY29tbWVudFdyaXRlIiwiY29tbWVudFRleHRBcmVhIiwiY29tbWVudFJlcGx5IiwicmVwbHlUbyIsImNvbW1lbnRSZXBseVVzZXIiLCJyZXBseWluZ0RlbGV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInJlcGx5IiwicmVwbHlVc2VyIiwidmFsdWUiLCJmb2N1cyIsInNlYXJjaElucHV0cyIsIm5hdmJhclNlYXJjaCIsIm5hdmJhclNlYXJjaElucHV0IiwibmF2YmFyU2VhcmNoT3BlbmVyIiwibmF2YmFyU2VhcmNoQ2xvc2VyIiwib3Blbk5hdmJhclNlYXJjaCIsImRpc3BsYXkiLCJjbG9zZU5hdmJhclNlYXJjaCIsImlucHV0Qm94Iiwia2V5IiwiaW5wdXQiLCJ0YXJnZXQiLCJjb2RlIiwiY2xpY2siLCJ0b29sdGlwIiwidHJpZ2dlciIsImZpbGVJbnB1dCIsInBvc3RJbWdPdXRwdXQiLCJvbmNoYW5nZSIsInNyYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImZpbGVzIiwibWFyZ2luQm90dG9tIiwib3V0cHV0Q29udGVudCIsImJhY2tncm91bmRJbWFnZSIsInRleHRhcmVhIiwib25pbnB1dCIsImhlaWdodCIsInNjcm9sbEhlaWdodCIsIm9uIiwicmVnZXgiLCJSZWdFeHAiLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZSIsIndoaWNoIiwidGVzdCJdLCJzb3VyY2VSb290IjoiIn0=