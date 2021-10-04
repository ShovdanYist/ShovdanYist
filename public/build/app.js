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
/******/ __webpack_require__.O(0, ["vendors-node_modules_fortawesome_fontawesome-free_js_all_js-node_modules_fortawesome_fontawes-a498b2"], () => (__webpack_exec__("./assets/js/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFlBQVQsR0FBd0IsQ0FBeEIsR0FBNEIsSUFBcEQ7QUFDSCxHQUZEO0FBR0gsRUFFRDs7O0FBQ0F0RyxDQUFDLENBQUMscUJBQUQsQ0FBRCxDQUF5QkMsTUFBekIsQ0FBZ0MsSUFBaEMsRUFBc0MsR0FBdEMsRUFBMkNDLE9BQTNDLENBQW1ELEdBQW5ELEVBQXdELFlBQVU7QUFDOURGLEVBQUFBLENBQUMsQ0FBQyxxQkFBRCxDQUFELENBQXlCRSxPQUF6QixDQUFpQyxHQUFqQztBQUNILENBRkQsR0FJQTs7QUFDQUYsQ0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJ1RyxFQUFyQixDQUF3QixVQUF4QixFQUFvQyxVQUFVaEksS0FBVixFQUFpQjtBQUNqRCxNQUFJaUksS0FBSyxHQUFHLElBQUlDLE1BQUosQ0FBVyxrQkFBWCxDQUFaO0FBQ0EsTUFBSXZCLEdBQUcsR0FBR25HLE1BQU0sQ0FBQzJILFlBQVAsQ0FBb0IsQ0FBQ25JLEtBQUssQ0FBQ29JLFFBQVAsR0FBa0JwSSxLQUFLLENBQUNxSSxLQUF4QixHQUFnQ3JJLEtBQUssQ0FBQ29JLFFBQTFELENBQVY7O0FBQ0EsTUFBSSxDQUFDSCxLQUFLLENBQUNLLElBQU4sQ0FBVzNCLEdBQVgsQ0FBTCxFQUFzQjtBQUNsQjNHLElBQUFBLEtBQUssQ0FBQ0MsY0FBTjtBQUNBLFdBQU8sS0FBUDtBQUNIO0FBQ0osQ0FQRDs7Ozs7Ozs7Ozs7O0FDL0xBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2Nzcy9hcHAuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJykuZGVmYXVsdDtcblxuLy8gQWRkIHNvbmcgdG8gcGxheWxpc3Qgb3IgYWRkIHBvc3QgdG8gYm9va21hcmtzXG5cbmxldCBwbGF5bGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5bGlzdC10b2dnbGUnKTtcbmxldCBib29rbWFyayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib29rbWFyay10b2dnbGUnKTtcblxuZnVuY3Rpb24gc3dpdGNoZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgKHN0YXR1cyA9PT0gJ2FkZGVkJykgPyB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG4gICAgICAgIHRoaXMuZGF0YXNldC5vcmlnaW5hbFRpdGxlID0gcmVzcG9uc2UuZGF0YS5yZXNwb25zZS50aXRsZTtcbiAgICAgICAgdGhpcy5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXG4gICAgICAgIGxldCBhbGVydEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1icmVhZGNydW1iJyk7XG4gICAgICAgIGxldCBhbGVydEV4aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWFsZXJ0Jyk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVzcG9uc2UubWVzc2FnZSkge1xuICAgICAgICAgICAgbGV0IGJhZGdlID0gJyc7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgICAgICBiYWRnZSA9ICdzdWNjZXNzJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFkZ2UgPSAnZGFuZ2VyJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnPGRpdiBjbGFzcz1cIm1kLWFsZXJ0IG1kLWFsZXJ0LScgKyBiYWRnZSArICcgbWQtYm94LW1iXCI+JyArXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5yZXNwb25zZS5tZXNzYWdlICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JztcblxuICAgICAgICAgICAgaWYgKGFsZXJ0RXhpc3QpIHtcbiAgICAgICAgICAgICAgICBhbGVydEV4aXN0Lm91dGVySFRNTCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0Qm94Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJChcIi5tZC1hbGVydFwiKS5mYWRlVG8oMzAwMCwgNTAwKS5zbGlkZVVwKDUwMCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLnNsaWRlVXAoNTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5wbGF5bGlzdC5mb3JFYWNoKChwbGF5bGlzdCkgPT4ge1xuICAgIHBsYXlsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpdGNoZXIpO1xufSk7XG5cbmJvb2ttYXJrLmZvckVhY2goKGJvb2ttYXJrKSA9PiB7XG4gICAgYm9va21hcmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hlcik7XG59KTtcblxuLy8gRm9sbG93IGEgdXNlciBvciB1bmZvbGxvdyBmcm9tIHlvdXJzZWxmXG5cbmxldCBmb2xsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9sbG93LXRvZ2dsZScpO1xubGV0IHVuZm9sbG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuZm9sbG93LXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBmb2xsb3dzKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2FkZGVkJykge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdidG4taW5mbycpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdidG4tbGlnaHQnKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnZm9sbG93ZWQnKTtcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9sbG93ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyJykuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykucXVlcnlTZWxlY3RvcignLm51bWJlcicpLmlubmVySFRNTCA9IChwYXJzZUludChmb2xsb3dlcnMsIDEwKSArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi1saWdodCcpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdmb2xsb3dlZCcpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdidG4taW5mbycpO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKSkge1xuICAgICAgICAgICAgICAgIGxldCBmb2xsb3dlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyJykuaW5uZXJIVE1MID0gKHBhcnNlSW50KGZvbGxvd2VycywgMTApIC0gMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YXNldC5vcmlnaW5hbFRpdGxlID0gcmVzcG9uc2UuZGF0YS5yZXNwb25zZS50aXRsZTtcbiAgICAgICAgdGhpcy5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxuZm9sbG93LmZvckVhY2goKGZvbGxvdykgPT4ge1xuICAgIGZvbGxvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZvbGxvd3MpO1xufSk7XG5cbmZ1bmN0aW9uIHVuZm9sbG93cyhldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGNvbmZpcm0odGhpcy50aXRsZSkpIHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuaHJlZjtcbiAgICAgICAgbGV0IGZvbGxvd2VyQmxvY2sgPSAndScgKyB0aGlzLmlkLnNwbGl0KCd1JykucG9wKCkuc3BsaXQoJ3QnKVswXSArICdsJztcblxuICAgICAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChmb2xsb3dlckJsb2NrKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59XG5cbnVuZm9sbG93LmZvckVhY2goKHVuZm9sbG93KSA9PiB7XG4gICAgdW5mb2xsb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1bmZvbGxvd3MpO1xufSk7XG5cbi8vIE1ha2UgcG9zdCBmZWF0dXJlZFxuXG5sZXQgZmVhdHVyZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmVhdHVyZWQtdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIGZlYXR1cmVkUG9zdChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVybCA9IHRoaXMuaHJlZjtcblxuICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBzdGF0dXMgPSBTdHJpbmcocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAoc3RhdHVzID09PSAnYWRkZWQnKSA/IHRoaXMuY2xhc3NMaXN0LmFkZCgnYWRkZWQnKSA6IHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWRkZWQnKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIFt0aGlzXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDApO1xuICAgIH0pXG59XG5cbmZlYXR1cmVkLmZvckVhY2goKGZlYXR1cmVkKSA9PiB7XG4gICAgZmVhdHVyZWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmZWF0dXJlZFBvc3QpO1xufSk7XG4iLCIvKlxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxuICpcbiAqIFdlIHJlY29tbWVuZCBpbmNsdWRpbmcgdGhlIGJ1aWx0IHZlcnNpb24gb2YgdGhpcyBKYXZhU2NyaXB0IGZpbGVcbiAqIChhbmQgaXRzIENTUyBmaWxlKSBpbiB5b3VyIGJhc2UgbGF5b3V0IChiYXNlLmh0bWwudHdpZykuXG4gKi9cblxuLy8gYW55IENTUyB5b3UgaW1wb3J0IHdpbGwgb3V0cHV0IGludG8gYSBzaW5nbGUgc2NzcyBmaWxlIChhcHAuc2NzcyBpbiB0aGlzIGNhc2UpXG5pbXBvcnQgJy4uL3Njc3MvYXBwLnNjc3MnO1xuXG4vLyBBd2Vzb21lIGZvbnRzXG5yZXF1aXJlKCdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLm1pbi5jc3MnKTtcbnJlcXVpcmUoJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2pzL2FsbC5qcycpO1xuXG4vLyBOZWVkIGpRdWVyeT8gSW5zdGFsbCBpdCB3aXRoIFwieWFybiBhZGQganF1ZXJ5XCIsIHRoZW4gdW5jb21tZW50IHRvIGltcG9ydCBpdC5cbi8vIGltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5sZXQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuZ2xvYmFsLiQgPSBnbG9iYWwualF1ZXJ5ID0gJDtcblxuLy8gQm9vdHN0cmFwIGpzXG5yZXF1aXJlKCdib290c3RyYXAnKTtcblxuLy8gTXkgc2NyaXB0c1xuaW1wb3J0ICcuL3NjcmlwdHMnO1xuaW1wb3J0ICcuL2FqYXgnO1xuIiwiLy8gUHJldmVudCBzY3JvbGxcblxuY29uc3QgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5sZXQga2V5cyA9IHszNzogMSwgMzg6IDEsIDM5OiAxLCA0MDogMX07XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyhlKSB7XG4gICAgaWYgKGtleXNbZS5rZXlDb2RlXSkge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxubGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xudHJ5IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgbnVsbCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7IH1cbiAgICB9KSk7XG59IGNhdGNoKGUpIHt9XG5cbmxldCB3aGVlbE9wdCA9IHN1cHBvcnRzUGFzc2l2ZSA/IHsgcGFzc2l2ZTogZmFsc2UgfSA6IGZhbHNlO1xubGV0IHdoZWVsRXZlbnQgPSAnb253aGVlbCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgPyAnd2hlZWwnIDogJ21vdXNld2hlZWwnO1xuXG5mdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7IC8vIG9sZGVyIEZGXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIod2hlZWxFdmVudCwgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTsgLy8gbW9kZXJuIGRlc2t0b3BcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTsgLy8gbW9iaWxlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlU2Nyb2xsKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIod2hlZWxFdmVudCwgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cywgZmFsc2UpO1xufVxuXG4vLyBNb2JpbGUgbmF2YmFyXG5cbmNvbnN0IHNpZGVOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdicpO1xuY29uc3Qgc2lkZU5hdk9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2T3BlbmVyJyk7XG5jb25zdCBzaWRlTmF2Q2xvc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZDbG9zZXInKTtcbmNvbnN0IHNpZGVOYXZCYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZCYWNrJyk7XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gICAgZGlzYWJsZVNjcm9sbCgpO1xuICAgIHNpZGVOYXYuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoMTAwJSknO1xuICAgIHNpZGVOYXZCYWNrLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgc2lkZU5hdkNsb3Nlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYoKSB7XG4gICAgZW5hYmxlU2Nyb2xsKCk7XG4gICAgc2lkZU5hdi5zdHlsZS50cmFuc2Zvcm0gPSAndW5zZXQnO1xuICAgIHNpZGVOYXZCYWNrLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgc2lkZU5hdkNsb3Nlci5zdHlsZS53aWR0aCA9ICcwJztcbn1cblxuaWYgKHNpZGVOYXYpIHtcbiAgICBzaWRlTmF2T3BlbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk5hdik7XG4gICAgc2lkZU5hdkNsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2KTtcbn1cblxuLy8gTWVkaWFFbGVtZW50IFBsYXllclxuXG5yZXF1aXJlKCdtZWRpYWVsZW1lbnQvYnVpbGQvbWVkaWFlbGVtZW50LWFuZC1wbGF5ZXIubWluJyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICQoJy5hdWRpby1wbGF5ZXIgYXVkaW8nKS5tZWRpYWVsZW1lbnRwbGF5ZXIoe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihwbGF5ZXIsIG5vZGUpIHtcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsXG4gICAgICAgICAgICAkKHBsYXllcikuY2xvc2VzdCgnLm1lanNfX2NvbnRhaW5lcicpLmF0dHIoJ2xhbmcnLCBtZWpzLmkxOG4ubGFuZ3VhZ2UoKSk7XG4gICAgICAgICAgICAkKCdodG1sJykuYXR0cignbGFuZycsIG1lanMuaTE4bi5sYW5ndWFnZSgpKTtcbiAgICAgICAgICAgIC8vIE1vcmUgY29kZVxuICAgICAgICB9LFxuICAgICAgICBzdGFydFZvbHVtZTogMSxcbiAgICAgICAgYXV0b1Jld2luZDogdHJ1ZSxcbiAgICAgICAgZW5hYmxlUHJvZ3Jlc3NUb29sdGlwOiBmYWxzZSxcbiAgICAgICAgZmVhdHVyZXM6IFsncGxheXBhdXNlJywnW2ZlYXR1cmVfbmFtZV0nLCdjdXJyZW50JywncHJvZ3Jlc3MnLCdkdXJhdGlvbiddXG4gICAgfSlcbn0pO1xuXG4vLyBDb21tZW50IHJlcGx5XG5cbmNvbnN0IGNvbW1lbnRXcml0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1jb21tZW50LXdyaXRlJyk7XG5jb25zdCBjb21tZW50VGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudF9tZXNzYWdlJyk7XG5jb25zdCBjb21tZW50UmVwbHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudC1yZXBseScpO1xuY29uc3QgcmVwbHlUbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X3JlcGx5VG8nKTtcbmNvbnN0IGNvbW1lbnRSZXBseVVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtY29tbWVudC1yZXBseS11c2VyJyk7XG5jb25zdCByZXBseWluZ0RlbGV0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1yZXBseWluZy1kZWxldGUnKTtcblxuaWYgKHJlcGx5aW5nRGVsZXRlKSB7XG4gICAgcmVwbHlpbmdEZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHJlcGx5VG8ucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICBjb21tZW50V3JpdGUuY2xhc3NMaXN0LnJlbW92ZSgnbWQtcmVwbHlpbmcnKTtcbiAgICB9KTtcbn1cblxuaWYgKGNvbW1lbnRSZXBseSkge1xuICAgIGNvbW1lbnRSZXBseS5mb3JFYWNoKChyZXBseSkgPT4ge1xuICAgICAgICBsZXQgcmVwbHlVc2VyID0gcmVwbHkucXVlcnlTZWxlY3RvcignLnJlcGx5LXVzZXInKTtcbiAgICAgICAgcmVwbHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAocmVwbHkpID0+IHtcbiAgICAgICAgICAgIHJlcGx5VG8udmFsdWUgPSByZXBseVVzZXIuaW5uZXJIVE1MO1xuICAgICAgICAgICAgY29tbWVudFRleHRBcmVhLmZvY3VzKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXBseVRvLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGNvbW1lbnRXcml0ZS5jbGFzc0xpc3QuYWRkKCdtZC1yZXBseWluZycpO1xuICAgICAgICAgICAgICAgIGNvbW1lbnRSZXBseVVzZXIuaW5uZXJIVE1MID0gcmVwbHlUby52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblxuLy8gU2VhcmNoZXJcblxubGV0IHNlYXJjaElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZC1zZWFyY2gtYWxsLWlucHV0Jyk7XG5cbmNvbnN0IG5hdmJhclNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZiYXJTZWFyY2gnKTtcbmNvbnN0IG5hdmJhclNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhclNlYXJjaElucHV0Jyk7XG5jb25zdCBuYXZiYXJTZWFyY2hPcGVuZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbk5hdmJhclNlYXJjaCcpO1xuY29uc3QgbmF2YmFyU2VhcmNoQ2xvc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlTmF2YmFyU2VhcmNoJyk7XG5cbmZ1bmN0aW9uIG9wZW5OYXZiYXJTZWFyY2goKXtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXNlYXJjaC1tb2JpbGUnKS5zdHlsZS5kaXNwbGF5ID0gJ3Vuc2V0JztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXNlYXJjaC1tb2JpbGUgaW5wdXQnKS5mb2N1cygpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdmJhclNlYXJjaCgpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cbmlmIChuYXZiYXJTZWFyY2gpIHtcbiAgICBuYXZiYXJTZWFyY2hPcGVuZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTmF2YmFyU2VhcmNoKTtcbiAgICBuYXZiYXJTZWFyY2hDbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU5hdmJhclNlYXJjaCk7XG4gICAgbmF2YmFyU2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBjbG9zZU5hdmJhclNlYXJjaCk7XG59XG5cbnNlYXJjaElucHV0cy5mb3JFYWNoKChpbnB1dEJveCxrZXkpID0+IHtcbiAgICBpbnB1dEJveC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX2lucHV0JykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLChpbnB1dCkgPT4ge1xuICAgICAgICBpbnB1dEJveC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX2J1dHRvbicpLmhyZWYgPSAnL3NlYXJjaC8nICsgaW5wdXQudGFyZ2V0LnZhbHVlO1xuICAgIH0pXG5cbiAgICBpbnB1dEJveC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX2lucHV0JykuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzIHx8IGV2ZW50LmNvZGUgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfYnV0dG9uJykuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG59KTtcblxuLy8gRW5hYmxlIHRvb2x0aXBcbiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtcbiAgICAgICAgdHJpZ2dlciA6ICdob3ZlcidcbiAgICB9KVxufSk7XG5cbi8vIEltYWdlIG9uIGNoYW5nZVxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tZmlsZS1pbnB1dCcpKSB7XG4gICAgbGV0IGZpbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tZmlsZS1pbnB1dCcpO1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdEltZ091dHB1dCcpKSB7XG4gICAgICAgIGxldCBwb3N0SW1nT3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RJbWdPdXRwdXQnKTtcbiAgICAgICAgZmlsZUlucHV0Lm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgcG9zdEltZ091dHB1dC5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlSW5wdXQuZmlsZXNbMF0pO1xuICAgICAgICAgICAgcG9zdEltZ091dHB1dC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnOHB4JztcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQtY29udGVudCcpKSB7XG4gICAgICAgIGxldCBvdXRwdXRDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dC1jb250ZW50Jyk7XG4gICAgICAgIGZpbGVJbnB1dC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIG91dHB1dENvbnRlbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcXCcnICsgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZUlucHV0LmZpbGVzWzBdKSArICdcXCcpJztcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIFRleHRhcmVhIGF1dG9zaXplXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWF1dG8tc2l6ZXInKSkge1xuICAgIGxldCB0ZXh0YXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hdXRvLXNpemVyJyk7XG4gICAgdGV4dGFyZWEub25pbnB1dCA9ICgpID0+IHtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuaGVpZ2h0ID0gdGV4dGFyZWEuc2Nyb2xsSGVpZ2h0ICsgMiArIFwicHhcIjtcbiAgICB9O1xufVxuXG4vLyBBdXRvIGNsb3NlIGFsZXJ0c1xuJChcIi5tZC1hbGVydC1hdXRvLWhpZGVcIikuZmFkZVRvKDUwMDAsIDUwMCkuc2xpZGVVcCg1MDAsIGZ1bmN0aW9uKCl7XG4gICAgJChcIi5tZC1hbGVydC1hdXRvLWhpZGVcIikuc2xpZGVVcCg1MDApO1xufSk7XG5cbi8vIFByZXZlbnQgdXNlcm5hbWUgc3ltYm9sc1xuJCgnLnVzZXJuYW1lLWlucHV0Jykub24oJ2tleXByZXNzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Ll9dKyRcIik7XG4gICAgbGV0IGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIWV2ZW50LmNoYXJDb2RlID8gZXZlbnQud2hpY2ggOiBldmVudC5jaGFyQ29kZSk7XG4gICAgaWYgKCFyZWdleC50ZXN0KGtleSkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0pO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImF4aW9zIiwicmVxdWlyZSIsInBsYXlsaXN0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYm9va21hcmsiLCJzd2l0Y2hlciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ1cmwiLCJocmVmIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzIiwiU3RyaW5nIiwiZGF0YSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRhdGFzZXQiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJzdHlsZSIsInBvaW50ZXJFdmVudHMiLCJhbGVydEJveCIsInF1ZXJ5U2VsZWN0b3IiLCJhbGVydEV4aXN0IiwibWVzc2FnZSIsImJhZGdlIiwib3V0ZXJIVE1MIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiJCIsImZhZGVUbyIsInNsaWRlVXAiLCJzZXRUaW1lb3V0IiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb2xsb3ciLCJ1bmZvbGxvdyIsImZvbGxvd3MiLCJnZXRFbGVtZW50QnlJZCIsImZvbGxvd2VycyIsImlubmVySFRNTCIsInBhcnNlSW50IiwidG9TdHJpbmciLCJ1bmZvbGxvd3MiLCJjb25maXJtIiwiZm9sbG93ZXJCbG9jayIsImlkIiwic3BsaXQiLCJwb3AiLCJmZWF0dXJlZCIsImZlYXR1cmVkUG9zdCIsImdsb2JhbCIsImpRdWVyeSIsImtleXMiLCJlIiwicHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzIiwia2V5Q29kZSIsInN1cHBvcnRzUGFzc2l2ZSIsIndpbmRvdyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid2hlZWxPcHQiLCJwYXNzaXZlIiwid2hlZWxFdmVudCIsImNyZWF0ZUVsZW1lbnQiLCJkaXNhYmxlU2Nyb2xsIiwiZW5hYmxlU2Nyb2xsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNpZGVOYXYiLCJzaWRlTmF2T3BlbmVyIiwic2lkZU5hdkNsb3NlciIsInNpZGVOYXZCYWNrIiwib3Blbk5hdiIsInRyYW5zZm9ybSIsIm9wYWNpdHkiLCJ3aWR0aCIsImNsb3NlTmF2IiwicmVhZHkiLCJtZWRpYWVsZW1lbnRwbGF5ZXIiLCJzdWNjZXNzIiwicGxheWVyIiwibm9kZSIsImNsb3Nlc3QiLCJhdHRyIiwibWVqcyIsImkxOG4iLCJsYW5ndWFnZSIsInN0YXJ0Vm9sdW1lIiwiYXV0b1Jld2luZCIsImVuYWJsZVByb2dyZXNzVG9vbHRpcCIsImZlYXR1cmVzIiwiY29tbWVudFdyaXRlIiwiY29tbWVudFRleHRBcmVhIiwiY29tbWVudFJlcGx5IiwicmVwbHlUbyIsImNvbW1lbnRSZXBseVVzZXIiLCJyZXBseWluZ0RlbGV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInJlcGx5IiwicmVwbHlVc2VyIiwidmFsdWUiLCJmb2N1cyIsInNlYXJjaElucHV0cyIsIm5hdmJhclNlYXJjaCIsIm5hdmJhclNlYXJjaElucHV0IiwibmF2YmFyU2VhcmNoT3BlbmVyIiwibmF2YmFyU2VhcmNoQ2xvc2VyIiwib3Blbk5hdmJhclNlYXJjaCIsImRpc3BsYXkiLCJjbG9zZU5hdmJhclNlYXJjaCIsImlucHV0Qm94Iiwia2V5IiwiaW5wdXQiLCJ0YXJnZXQiLCJjb2RlIiwiY2xpY2siLCJ0b29sdGlwIiwidHJpZ2dlciIsImZpbGVJbnB1dCIsInBvc3RJbWdPdXRwdXQiLCJvbmNoYW5nZSIsInNyYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImZpbGVzIiwibWFyZ2luQm90dG9tIiwib3V0cHV0Q29udGVudCIsImJhY2tncm91bmRJbWFnZSIsInRleHRhcmVhIiwib25pbnB1dCIsImhlaWdodCIsInNjcm9sbEhlaWdodCIsIm9uIiwicmVnZXgiLCJSZWdFeHAiLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZSIsIndoaWNoIiwidGVzdCJdLCJzb3VyY2VSb290IjoiIn0=