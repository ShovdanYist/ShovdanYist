(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.url.js */ "./node_modules/core-js/modules/web.url.js");
/* harmony import */ var core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "./node_modules/core-js/modules/es.regexp.constructor.js");
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _scss_app_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../scss/app.scss */ "./assets/scss/app.scss");
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scripts */ "./assets/js/scripts.js");
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_scripts__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./player */ "./assets/js/player.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_player__WEBPACK_IMPORTED_MODULE_10__);









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


 // Enable tooltip

$(function () {
  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover'
  });
}); // MediaElement.js Player

 // Image on change

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


if (document.querySelector('.md-autosizer')) {
  var textarea = document.querySelector('.md-autosizer');

  textarea.oninput = function () {
    textarea.style.height = textarea.scrollHeight + 2 + "px";
  };
} // Auto close alerts


$(".md-alert-autohide").fadeTo(5000, 500).slideUp(500, function () {
  $(".md-alert-autohide").slideUp(500);
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

/***/ "./assets/js/player.js":
/*!*****************************!*\
  !*** ./assets/js/player.js ***!
  \*****************************/
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
});

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js").default;

var playlister = document.querySelectorAll('.playlist-toggle');
var bookmarker = document.querySelectorAll('.bookmark-toggle');
var follow = document.querySelectorAll('.follow-toggle');
var unfollow = document.querySelectorAll('.unfollow-toggle');

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

playlister.forEach(function (playlister) {
  playlister.addEventListener('click', switcher);
});
bookmarker.forEach(function (bookmarker) {
  bookmarker.addEventListener('click', switcher);
});

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
});

/***/ }),

/***/ "./assets/js/scripts.js":
/*!******************************!*\
  !*** ./assets/js/scripts.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

// Prevent scroll
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
} // Comment reply


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z0JBQW5CLENBQW9DLE9BQXBDLEVBQTZDbUQsZ0JBQTdDO0FBQ0FELEVBQUFBLGtCQUFrQixDQUFDbEQsZ0JBQW5CLENBQW9DLE9BQXBDLEVBQTZDcUQsaUJBQTdDO0FBQ0FMLEVBQUFBLGlCQUFpQixDQUFDaEQsZ0JBQWxCLENBQW1DLFVBQW5DLEVBQStDcUQsaUJBQS9DO0FBQ0g7O0FBRURQLFlBQVksQ0FBQy9DLE9BQWIsQ0FBcUIsVUFBQ3VELFFBQUQsRUFBVXhHLEdBQVYsRUFBa0I7QUFDbkN3RyxFQUFBQSxRQUFRLENBQUNoSSxhQUFULENBQXVCLGVBQXZCLEVBQXdDMEUsZ0JBQXhDLENBQXlELE9BQXpELEVBQWlFLFVBQUN1RCxLQUFELEVBQVc7QUFDeEVELElBQUFBLFFBQVEsQ0FBQ2hJLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDcUQsSUFBekMsR0FBZ0QsYUFBYTRFLEtBQUssQ0FBQ0MsTUFBTixDQUFhWixLQUExRTtBQUNILEdBRkQ7QUFJQVUsRUFBQUEsUUFBUSxDQUFDaEksYUFBVCxDQUF1QixlQUF2QixFQUF3QzBFLGdCQUF4QyxDQUF5RCxPQUF6RCxFQUFpRSxVQUFDckQsS0FBRCxFQUFXO0FBQ3BFLFFBQUlBLEtBQUssQ0FBQ29FLE9BQU4sS0FBa0IsRUFBbEIsSUFBd0JwRSxLQUFLLENBQUM4RyxJQUFOLEtBQWUsT0FBM0MsRUFBb0Q7QUFDaERILE1BQUFBLFFBQVEsQ0FBQ2hJLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDb0ksS0FBekM7QUFDSDtBQUNKLEdBSkw7QUFNSCxDQVhEOzs7Ozs7Ozs7Ozs7QUN4SEEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvYXBwLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcbiAqXG4gKiBXZSByZWNvbW1lbmQgaW5jbHVkaW5nIHRoZSBidWlsdCB2ZXJzaW9uIG9mIHRoaXMgSmF2YVNjcmlwdCBmaWxlXG4gKiAoYW5kIGl0cyBDU1MgZmlsZSkgaW4geW91ciBiYXNlIGxheW91dCAoYmFzZS5odG1sLnR3aWcpLlxuICovXG5cbi8vIGFueSBDU1MgeW91IGltcG9ydCB3aWxsIG91dHB1dCBpbnRvIGEgc2luZ2xlIHNjc3MgZmlsZSAoYXBwLnNjc3MgaW4gdGhpcyBjYXNlKVxuaW1wb3J0ICcuLi9zY3NzL2FwcC5zY3NzJztcblxuLy8gQXdlc29tZSBmb250c1xucmVxdWlyZSgnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5taW4uY3NzJyk7XG5yZXF1aXJlKCdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9qcy9hbGwuanMnKTtcblxuLy8gTmVlZCBqUXVlcnk/IEluc3RhbGwgaXQgd2l0aCBcInlhcm4gYWRkIGpxdWVyeVwiLCB0aGVuIHVuY29tbWVudCB0byBpbXBvcnQgaXQuXG4vLyBpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xubGV0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbmdsb2JhbC4kID0gZ2xvYmFsLmpRdWVyeSA9ICQ7XG5cbi8vIEJvb3RzdHJhcCBqc1xucmVxdWlyZSgnYm9vdHN0cmFwJyk7XG5cbi8vIE15IHNjcmlwdHNcbmltcG9ydCAnLi9zY3JpcHRzJztcblxuLy8gRW5hYmxlIHRvb2x0aXBcbiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtcbiAgICAgICAgdHJpZ2dlciA6ICdob3ZlcidcbiAgICB9KVxufSk7XG5cbi8vIE1lZGlhRWxlbWVudC5qcyBQbGF5ZXJcbmltcG9ydCAnLi9wbGF5ZXInO1xuXG4vLyBJbWFnZSBvbiBjaGFuZ2VcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLWZpbGUtaW5wdXQnKSkge1xuICAgIGxldCBmaWxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLWZpbGUtaW5wdXQnKTtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RJbWdPdXRwdXQnKSkge1xuICAgICAgICBsZXQgcG9zdEltZ091dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0SW1nT3V0cHV0Jyk7XG4gICAgICAgIGZpbGVJbnB1dC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHBvc3RJbWdPdXRwdXQuc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZUlucHV0LmZpbGVzWzBdKTtcbiAgICAgICAgICAgIHBvc3RJbWdPdXRwdXQuc3R5bGUubWFyZ2luQm90dG9tID0gJzhweCc7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0LWNvbnRlbnQnKSkge1xuICAgICAgICBsZXQgb3V0cHV0Q29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQtY29udGVudCcpO1xuICAgICAgICBmaWxlSW5wdXQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBvdXRwdXRDb250ZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXFwnJyArIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVJbnB1dC5maWxlc1swXSkgKyAnXFwnKSc7XG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vLyBUZXh0YXJlYSBhdXRvc2l6ZVxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hdXRvc2l6ZXInKSkge1xuICAgIGxldCB0ZXh0YXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hdXRvc2l6ZXInKTtcbiAgICB0ZXh0YXJlYS5vbmlucHV0ID0gKCkgPT4ge1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5oZWlnaHQgPSB0ZXh0YXJlYS5zY3JvbGxIZWlnaHQgKyAyICsgXCJweFwiO1xuICAgIH07XG59XG5cbi8vIEF1dG8gY2xvc2UgYWxlcnRzXG4kKFwiLm1kLWFsZXJ0LWF1dG9oaWRlXCIpLmZhZGVUbyg1MDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICQoXCIubWQtYWxlcnQtYXV0b2hpZGVcIikuc2xpZGVVcCg1MDApO1xufSk7XG5cbi8vIFByZXZlbnQgdXNlcm5hbWUgc3ltYm9sc1xuJCgnLnVzZXJuYW1lLWlucHV0Jykub24oJ2tleXByZXNzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Ll9dKyRcIik7XG4gICAgbGV0IGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIWV2ZW50LmNoYXJDb2RlID8gZXZlbnQud2hpY2ggOiBldmVudC5jaGFyQ29kZSk7XG4gICAgaWYgKCFyZWdleC50ZXN0KGtleSkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0pO1xuIiwicmVxdWlyZSgnbWVkaWFlbGVtZW50L2J1aWxkL21lZGlhZWxlbWVudC1hbmQtcGxheWVyLm1pbicpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKCcuYXVkaW8tcGxheWVyIGF1ZGlvJykubWVkaWFlbGVtZW50cGxheWVyKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocGxheWVyLCBub2RlKSB7XG4gICAgICAgICAgICAvLyBPcHRpb25hbFxuICAgICAgICAgICAgJChwbGF5ZXIpLmNsb3Nlc3QoJy5tZWpzX19jb250YWluZXInKS5hdHRyKCdsYW5nJywgbWVqcy5pMThuLmxhbmd1YWdlKCkpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmF0dHIoJ2xhbmcnLCBtZWpzLmkxOG4ubGFuZ3VhZ2UoKSk7XG4gICAgICAgICAgICAvLyBNb3JlIGNvZGVcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnRWb2x1bWU6IDEsXG4gICAgICAgIGF1dG9SZXdpbmQ6IHRydWUsXG4gICAgICAgIGVuYWJsZVByb2dyZXNzVG9vbHRpcDogZmFsc2UsXG4gICAgICAgIGZlYXR1cmVzOiBbJ3BsYXlwYXVzZScsJ1tmZWF0dXJlX25hbWVdJywnY3VycmVudCcsJ3Byb2dyZXNzJywnZHVyYXRpb24nXVxuICAgIH0pXG59KTtcblxuY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpLmRlZmF1bHQ7XG5cbmxldCBwbGF5bGlzdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXlsaXN0LXRvZ2dsZScpO1xubGV0IGJvb2ttYXJrZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9va21hcmstdG9nZ2xlJyk7XG5sZXQgZm9sbG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvbGxvdy10b2dnbGUnKTtcbmxldCB1bmZvbGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmZvbGxvdy10b2dnbGUnKTtcblxuZnVuY3Rpb24gc3dpdGNoZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgKHN0YXR1cyA9PT0gJ2FkZGVkJykgPyB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG4gICAgICAgIHRoaXMuZGF0YXNldC5vcmlnaW5hbFRpdGxlID0gcmVzcG9uc2UuZGF0YS5yZXNwb25zZS50aXRsZTtcbiAgICAgICAgdGhpcy5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXG4gICAgICAgIGxldCBhbGVydEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1icmVhZGNydW1iJyk7XG4gICAgICAgIGxldCBhbGVydEV4aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWFsZXJ0Jyk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVzcG9uc2UubWVzc2FnZSkge1xuICAgICAgICAgICAgbGV0IGJhZGdlID0gJyc7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgICAgICBiYWRnZSA9ICdzdWNjZXNzJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFkZ2UgPSAnZGFuZ2VyJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnPGRpdiBjbGFzcz1cIm1kLWFsZXJ0IG1kLWFsZXJ0LScgKyBiYWRnZSArICcgbWQtYm94LW1iXCI+JyArXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5yZXNwb25zZS5tZXNzYWdlICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JztcblxuICAgICAgICAgICAgaWYgKGFsZXJ0RXhpc3QpIHtcbiAgICAgICAgICAgICAgICBhbGVydEV4aXN0Lm91dGVySFRNTCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0Qm94Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJChcIi5tZC1hbGVydFwiKS5mYWRlVG8oMzAwMCwgNTAwKS5zbGlkZVVwKDUwMCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLnNsaWRlVXAoNTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5wbGF5bGlzdGVyLmZvckVhY2goKHBsYXlsaXN0ZXIpID0+IHtcbiAgICBwbGF5bGlzdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpdGNoZXIpO1xufSk7XG5cbmJvb2ttYXJrZXIuZm9yRWFjaCgoYm9va21hcmtlcikgPT4ge1xuICAgIGJvb2ttYXJrZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hlcik7XG59KTtcblxuZnVuY3Rpb24gZm9sbG93cyhldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVybCA9IHRoaXMuaHJlZjtcblxuICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBzdGF0dXMgPSBTdHJpbmcocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMpO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLWluZm8nKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYnRuLWxpZ2h0Jyk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2ZvbGxvd2VkJyk7XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvbGxvd2VycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykucXVlcnlTZWxlY3RvcignLm51bWJlcicpLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZUZvbGxvd2VycycpLnF1ZXJ5U2VsZWN0b3IoJy5udW1iZXInKS5pbm5lckhUTUwgPSAocGFyc2VJbnQoZm9sbG93ZXJzLCAxMCkgKyAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdidG4tbGlnaHQnKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnZm9sbG93ZWQnKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYnRuLWluZm8nKTtcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9sbG93ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVGb2xsb3dlcnMnKS5xdWVyeVNlbGVjdG9yKCcubnVtYmVyJykuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlRm9sbG93ZXJzJykucXVlcnlTZWxlY3RvcignLm51bWJlcicpLmlubmVySFRNTCA9IChwYXJzZUludChmb2xsb3dlcnMsIDEwKSAtIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGFzZXQub3JpZ2luYWxUaXRsZSA9IHJlc3BvbnNlLmRhdGEucmVzcG9uc2UudGl0bGU7XG4gICAgICAgIHRoaXMuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIFt0aGlzXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDApO1xuICAgIH0pXG59XG5cbmZvbGxvdy5mb3JFYWNoKChmb2xsb3cpID0+IHtcbiAgICBmb2xsb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb2xsb3dzKTtcbn0pO1xuXG5mdW5jdGlvbiB1bmZvbGxvd3MoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChjb25maXJtKHRoaXMudGl0bGUpKSB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG4gICAgICAgIGxldCBmb2xsb3dlckJsb2NrID0gJ3UnICsgdGhpcy5pZC5zcGxpdCgndScpLnBvcCgpLnNwbGl0KCd0JylbMF0gKyAnbCc7XG5cbiAgICAgICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGF0dXMgPSBTdHJpbmcocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3JlbW92ZWQnKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZm9sbG93ZXJCbG9jaykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG51bmZvbGxvdy5mb3JFYWNoKCh1bmZvbGxvdykgPT4ge1xuICAgIHVuZm9sbG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdW5mb2xsb3dzKTtcbn0pO1xuIiwiLy8gUHJldmVudCBzY3JvbGxcblxubGV0IGtleXMgPSB7Mzc6IDEsIDM4OiAxLCAzOTogMSwgNDA6IDF9O1xuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMoZSkge1xuICAgIGlmIChrZXlzW2Uua2V5Q29kZV0pIHtcbiAgICAgICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmxldCBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcbnRyeSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsIG51bGwsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlOyB9XG4gICAgfSkpO1xufSBjYXRjaChlKSB7fVxuXG5sZXQgd2hlZWxPcHQgPSBzdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IGZhbHNlIH0gOiBmYWxzZTtcbmxldCB3aGVlbEV2ZW50ID0gJ29ud2hlZWwnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpID8gJ3doZWVsJyA6ICdtb3VzZXdoZWVsJztcblxuZnVuY3Rpb24gZGlzYWJsZVNjcm9sbCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpOyAvLyBvbGRlciBGRlxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKHdoZWVsRXZlbnQsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7IC8vIG1vZGVybiBkZXNrdG9wXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7IC8vIG1vYmlsZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZVNjcm9sbCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKHdoZWVsRXZlbnQsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMsIGZhbHNlKTtcbn1cblxuLy8gTW9iaWxlIG5hdmJhclxuXG5jb25zdCBzaWRlTmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXYnKTtcbmNvbnN0IHNpZGVOYXZPcGVuZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdk9wZW5lcicpO1xuY29uc3Qgc2lkZU5hdkNsb3NlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2Q2xvc2VyJyk7XG5jb25zdCBzaWRlTmF2QmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2QmFjaycpO1xuXG5mdW5jdGlvbiBvcGVuTmF2KCkge1xuICAgIGRpc2FibGVTY3JvbGwoKTtcbiAgICBzaWRlTmF2LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDEwMCUpJztcbiAgICBzaWRlTmF2QmFjay5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgIHNpZGVOYXZDbG9zZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2KCkge1xuICAgIGVuYWJsZVNjcm9sbCgpO1xuICAgIHNpZGVOYXYuc3R5bGUudHJhbnNmb3JtID0gJ3Vuc2V0JztcbiAgICBzaWRlTmF2QmFjay5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgIHNpZGVOYXZDbG9zZXIuc3R5bGUud2lkdGggPSAnMCc7XG59XG5cbmlmIChzaWRlTmF2KSB7XG4gICAgc2lkZU5hdk9wZW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5OYXYpO1xuICAgIHNpZGVOYXZDbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU5hdik7XG59XG5cbi8vIENvbW1lbnQgcmVwbHlcblxuY29uc3QgY29tbWVudFdyaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWNvbW1lbnQtd3JpdGUnKTtcbmNvbnN0IGNvbW1lbnRUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X21lc3NhZ2UnKTtcbmNvbnN0IGNvbW1lbnRSZXBseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LXJlcGx5Jyk7XG5jb25zdCByZXBseVRvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfcmVwbHlUbycpO1xuY29uc3QgY29tbWVudFJlcGx5VXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1jb21tZW50LXJlcGx5LXVzZXInKTtcbmNvbnN0IHJlcGx5aW5nRGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLXJlcGx5aW5nLWRlbGV0ZScpO1xuXG5pZiAocmVwbHlpbmdEZWxldGUpIHtcbiAgICByZXBseWluZ0RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcmVwbHlUby5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIGNvbW1lbnRXcml0ZS5jbGFzc0xpc3QucmVtb3ZlKCdtZC1yZXBseWluZycpO1xuICAgIH0pO1xufVxuXG5pZiAoY29tbWVudFJlcGx5KSB7XG4gICAgY29tbWVudFJlcGx5LmZvckVhY2goKHJlcGx5KSA9PiB7XG4gICAgICAgIGxldCByZXBseVVzZXIgPSByZXBseS5xdWVyeVNlbGVjdG9yKCcucmVwbHktdXNlcicpO1xuICAgICAgICByZXBseS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChyZXBseSkgPT4ge1xuICAgICAgICAgICAgcmVwbHlUby52YWx1ZSA9IHJlcGx5VXNlci5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb21tZW50VGV4dEFyZWEuZm9jdXMoKTtcblxuICAgICAgICAgICAgaWYgKHJlcGx5VG8udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5hZGQoJ21kLXJlcGx5aW5nJyk7XG4gICAgICAgICAgICAgICAgY29tbWVudFJlcGx5VXNlci5pbm5lckhUTUwgPSByZXBseVRvLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xufVxuXG4vLyBTZWFyY2hlclxuXG5sZXQgc2VhcmNoSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1kLXNlYXJjaC1hbGwtaW5wdXQnKTtcblxuY29uc3QgbmF2YmFyU2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhclNlYXJjaCcpO1xuY29uc3QgbmF2YmFyU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyU2VhcmNoSW5wdXQnKTtcbmNvbnN0IG5hdmJhclNlYXJjaE9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuTmF2YmFyU2VhcmNoJyk7XG5jb25zdCBuYXZiYXJTZWFyY2hDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VOYXZiYXJTZWFyY2gnKTtcblxuZnVuY3Rpb24gb3Blbk5hdmJhclNlYXJjaCgpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZScpLnN0eWxlLmRpc3BsYXkgPSAndW5zZXQnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZSBpbnB1dCcpLmZvY3VzKCk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2YmFyU2VhcmNoKCl7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1zZWFyY2gtbW9iaWxlJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuaWYgKG5hdmJhclNlYXJjaCkge1xuICAgIG5hdmJhclNlYXJjaE9wZW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5OYXZiYXJTZWFyY2gpO1xuICAgIG5hdmJhclNlYXJjaENsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2YmFyU2VhcmNoKTtcbiAgICBuYXZiYXJTZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGNsb3NlTmF2YmFyU2VhcmNoKTtcbn1cblxuc2VhcmNoSW5wdXRzLmZvckVhY2goKGlucHV0Qm94LGtleSkgPT4ge1xuICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsKGlucHV0KSA9PiB7XG4gICAgICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfYnV0dG9uJykuaHJlZiA9ICcvc2VhcmNoLycgKyBpbnB1dC50YXJnZXQudmFsdWU7XG4gICAgfSlcblxuICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQuY29kZSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9idXR0b24nKS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbn0pO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInJlcXVpcmUiLCIkIiwiZ2xvYmFsIiwialF1ZXJ5IiwidG9vbHRpcCIsInRyaWdnZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJmaWxlSW5wdXQiLCJnZXRFbGVtZW50QnlJZCIsInBvc3RJbWdPdXRwdXQiLCJvbmNoYW5nZSIsInNyYyIsIndpbmRvdyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImZpbGVzIiwic3R5bGUiLCJtYXJnaW5Cb3R0b20iLCJvdXRwdXRDb250ZW50IiwiYmFja2dyb3VuZEltYWdlIiwidGV4dGFyZWEiLCJvbmlucHV0IiwiaGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiZmFkZVRvIiwic2xpZGVVcCIsIm9uIiwiZXZlbnQiLCJyZWdleCIsIlJlZ0V4cCIsImtleSIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlIiwid2hpY2giLCJ0ZXN0IiwicHJldmVudERlZmF1bHQiLCJyZWFkeSIsIm1lZGlhZWxlbWVudHBsYXllciIsInN1Y2Nlc3MiLCJwbGF5ZXIiLCJub2RlIiwiY2xvc2VzdCIsImF0dHIiLCJtZWpzIiwiaTE4biIsImxhbmd1YWdlIiwic3RhcnRWb2x1bWUiLCJhdXRvUmV3aW5kIiwiZW5hYmxlUHJvZ3Jlc3NUb29sdGlwIiwiZmVhdHVyZXMiLCJheGlvcyIsInBsYXlsaXN0ZXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYm9va21hcmtlciIsImZvbGxvdyIsInVuZm9sbG93Iiwic3dpdGNoZXIiLCJ1cmwiLCJocmVmIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzIiwiZGF0YSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRhdGFzZXQiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJwb2ludGVyRXZlbnRzIiwiYWxlcnRCb3giLCJhbGVydEV4aXN0IiwibWVzc2FnZSIsImJhZGdlIiwib3V0ZXJIVE1MIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwic2V0VGltZW91dCIsImZvckVhY2giLCJhZGRFdmVudExpc3RlbmVyIiwiZm9sbG93cyIsImZvbGxvd2VycyIsImlubmVySFRNTCIsInBhcnNlSW50IiwidG9TdHJpbmciLCJ1bmZvbGxvd3MiLCJjb25maXJtIiwiZm9sbG93ZXJCbG9jayIsImlkIiwic3BsaXQiLCJwb3AiLCJrZXlzIiwiZSIsInByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyIsImtleUNvZGUiLCJzdXBwb3J0c1Bhc3NpdmUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsIndoZWVsT3B0IiwicGFzc2l2ZSIsIndoZWVsRXZlbnQiLCJjcmVhdGVFbGVtZW50IiwiZGlzYWJsZVNjcm9sbCIsImVuYWJsZVNjcm9sbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzaWRlTmF2Iiwic2lkZU5hdk9wZW5lciIsInNpZGVOYXZDbG9zZXIiLCJzaWRlTmF2QmFjayIsIm9wZW5OYXYiLCJ0cmFuc2Zvcm0iLCJvcGFjaXR5Iiwid2lkdGgiLCJjbG9zZU5hdiIsImNvbW1lbnRXcml0ZSIsImNvbW1lbnRUZXh0QXJlYSIsImNvbW1lbnRSZXBseSIsInJlcGx5VG8iLCJjb21tZW50UmVwbHlVc2VyIiwicmVwbHlpbmdEZWxldGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZXBseSIsInJlcGx5VXNlciIsInZhbHVlIiwiZm9jdXMiLCJzZWFyY2hJbnB1dHMiLCJuYXZiYXJTZWFyY2giLCJuYXZiYXJTZWFyY2hJbnB1dCIsIm5hdmJhclNlYXJjaE9wZW5lciIsIm5hdmJhclNlYXJjaENsb3NlciIsIm9wZW5OYXZiYXJTZWFyY2giLCJkaXNwbGF5IiwiY2xvc2VOYXZiYXJTZWFyY2giLCJpbnB1dEJveCIsImlucHV0IiwidGFyZ2V0IiwiY29kZSIsImNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==