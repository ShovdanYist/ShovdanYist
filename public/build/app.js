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
/******/ __webpack_require__.O(0, ["vendors-node_modules_fortawesome_fontawesome-free_js_all_js-node_modules_fortawesome_fontawes-5c4521"], () => (__webpack_exec__("./assets/js/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFFBQVEsQ0FBQ3BILGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDd0gsS0FBekM7QUFDSDtBQUNKLEdBSkw7QUFNSCxDQVhEOzs7Ozs7Ozs7Ozs7QUN4SEEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvYXBwLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcbiAqXG4gKiBXZSByZWNvbW1lbmQgaW5jbHVkaW5nIHRoZSBidWlsdCB2ZXJzaW9uIG9mIHRoaXMgSmF2YVNjcmlwdCBmaWxlXG4gKiAoYW5kIGl0cyBDU1MgZmlsZSkgaW4geW91ciBiYXNlIGxheW91dCAoYmFzZS5odG1sLnR3aWcpLlxuICovXG5cbi8vIGFueSBDU1MgeW91IGltcG9ydCB3aWxsIG91dHB1dCBpbnRvIGEgc2luZ2xlIHNjc3MgZmlsZSAoYXBwLnNjc3MgaW4gdGhpcyBjYXNlKVxuaW1wb3J0ICcuLi9zY3NzL2FwcC5zY3NzJztcblxuLy8gQXdlc29tZSBmb250c1xucmVxdWlyZSgnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5taW4uY3NzJyk7XG5yZXF1aXJlKCdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9qcy9hbGwuanMnKTtcblxuLy8gTmVlZCBqUXVlcnk/IEluc3RhbGwgaXQgd2l0aCBcInlhcm4gYWRkIGpxdWVyeVwiLCB0aGVuIHVuY29tbWVudCB0byBpbXBvcnQgaXQuXG4vLyBpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xubGV0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbmdsb2JhbC4kID0gZ2xvYmFsLmpRdWVyeSA9ICQ7XG5cbi8vIEJvb3RzdHJhcCBqc1xucmVxdWlyZSgnYm9vdHN0cmFwJyk7XG5cbi8vIE15IHNjcmlwdHNcbmltcG9ydCAnLi9zY3JpcHRzJztcblxuLy8gRW5hYmxlIHRvb2x0aXBcbiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtcbiAgICAgICAgdHJpZ2dlciA6ICdob3ZlcidcbiAgICB9KVxufSk7XG5cbi8vIE1lZGlhRWxlbWVudC5qcyBQbGF5ZXJcbmltcG9ydCAnLi9wbGF5ZXInO1xuXG4vLyBJbWFnZSBvbiBjaGFuZ2VcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLWZpbGUtaW5wdXQnKSkge1xuICAgIGxldCBmaWxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLWZpbGUtaW5wdXQnKTtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RJbWdPdXRwdXQnKSkge1xuICAgICAgICBsZXQgcG9zdEltZ091dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3N0SW1nT3V0cHV0Jyk7XG4gICAgICAgIGZpbGVJbnB1dC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHBvc3RJbWdPdXRwdXQuc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZUlucHV0LmZpbGVzWzBdKTtcbiAgICAgICAgICAgIHBvc3RJbWdPdXRwdXQuc3R5bGUubWFyZ2luQm90dG9tID0gJzhweCc7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0LWNvbnRlbnQnKSkge1xuICAgICAgICBsZXQgb3V0cHV0Q29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQtY29udGVudCcpO1xuICAgICAgICBmaWxlSW5wdXQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBvdXRwdXRDb250ZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXFwnJyArIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVJbnB1dC5maWxlc1swXSkgKyAnXFwnKSc7XG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vLyBUZXh0YXJlYSBhdXRvc2l6ZVxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hdXRvc2l6ZXInKSkge1xuICAgIGxldCB0ZXh0YXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hdXRvc2l6ZXInKTtcbiAgICB0ZXh0YXJlYS5vbmlucHV0ID0gKCkgPT4ge1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5oZWlnaHQgPSB0ZXh0YXJlYS5zY3JvbGxIZWlnaHQgKyAyICsgXCJweFwiO1xuICAgIH07XG59XG5cbi8vIEF1dG8gY2xvc2UgYWxlcnRzXG4kKFwiLm1kLWFsZXJ0LWF1dG9oaWRlXCIpLmZhZGVUbyg1MDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICQoXCIubWQtYWxlcnQtYXV0b2hpZGVcIikuc2xpZGVVcCg1MDApO1xufSk7XG5cbi8vIFByZXZlbnQgdXNlcm5hbWUgc3ltYm9sc1xuJCgnLnVzZXJuYW1lLWlucHV0Jykub24oJ2tleXByZXNzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Ll9dKyRcIik7XG4gICAgbGV0IGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIWV2ZW50LmNoYXJDb2RlID8gZXZlbnQud2hpY2ggOiBldmVudC5jaGFyQ29kZSk7XG4gICAgaWYgKCFyZWdleC50ZXN0KGtleSkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0pO1xuIiwicmVxdWlyZSgnbWVkaWFlbGVtZW50L2J1aWxkL21lZGlhZWxlbWVudC1hbmQtcGxheWVyLm1pbicpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKCcuYXVkaW8tcGxheWVyIGF1ZGlvJykubWVkaWFlbGVtZW50cGxheWVyKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocGxheWVyLCBub2RlKSB7XG4gICAgICAgICAgICAvLyBPcHRpb25hbFxuICAgICAgICAgICAgJChwbGF5ZXIpLmNsb3Nlc3QoJy5tZWpzX19jb250YWluZXInKS5hdHRyKCdsYW5nJywgbWVqcy5pMThuLmxhbmd1YWdlKCkpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmF0dHIoJ2xhbmcnLCBtZWpzLmkxOG4ubGFuZ3VhZ2UoKSk7XG4gICAgICAgICAgICAvLyBNb3JlIGNvZGVcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnRWb2x1bWU6IDEsXG4gICAgICAgIGF1dG9SZXdpbmQ6IHRydWUsXG4gICAgICAgIGVuYWJsZVByb2dyZXNzVG9vbHRpcDogZmFsc2UsXG4gICAgICAgIGZlYXR1cmVzOiBbJ3BsYXlwYXVzZScsJ1tmZWF0dXJlX25hbWVdJywnY3VycmVudCcsJ3Byb2dyZXNzJywnZHVyYXRpb24nXVxuICAgIH0pXG59KTtcblxuY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpLmRlZmF1bHQ7XG5cbmxldCBwbGF5bGlzdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXlsaXN0LXRvZ2dsZScpO1xubGV0IGJvb2ttYXJrZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9va21hcmstdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIHN3aXRjaGVyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gdGhpcy5jbGFzc0xpc3QuYWRkKCdhZGRlZCcpIDogdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhZGRlZCcpO1xuICAgICAgICB0aGlzLmRhdGFzZXQub3JpZ2luYWxUaXRsZSA9IHJlc3BvbnNlLmRhdGEucmVzcG9uc2UudGl0bGU7XG4gICAgICAgIHRoaXMuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblxuICAgICAgICBsZXQgYWxlcnRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYnJlYWRjcnVtYicpO1xuICAgICAgICBsZXQgYWxlcnRFeGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hbGVydCcpO1xuXG4gICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnJlc3BvbnNlLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGxldCBiYWRnZSA9ICcnO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzID09PSAnYWRkZWQnKSB7XG4gICAgICAgICAgICAgICAgYmFkZ2UgPSAnc3VjY2Vzcyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJhZGdlID0gJ2Rhbmdlcic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJtZC1hbGVydCBtZC1hbGVydC0nICsgYmFkZ2UgKyAnIG1kLWJveC1tYlwiPicgK1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEucmVzcG9uc2UubWVzc2FnZSArXG4gICAgICAgICAgICAgICAgJzwvZGl2Pic7XG5cbiAgICAgICAgICAgIGlmIChhbGVydEV4aXN0KSB7XG4gICAgICAgICAgICAgICAgYWxlcnRFeGlzdC5vdXRlckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydEJveC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgbWVzc2FnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoXCIubWQtYWxlcnRcIikuZmFkZVRvKDMwMDAsIDUwMCkuc2xpZGVVcCg1MDAsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJChcIi5tZC1hbGVydFwiKS5zbGlkZVVwKDUwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxucGxheWxpc3Rlci5mb3JFYWNoKChwbGF5bGlzdGVyKSA9PiB7XG4gICAgcGxheWxpc3Rlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaGVyKTtcbn0pO1xuXG5ib29rbWFya2VyLmZvckVhY2goKGJvb2ttYXJrZXIpID0+IHtcbiAgICBib29rbWFya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpdGNoZXIpO1xufSk7XG4iLCIvLyBQcmV2ZW50IHNjcm9sbFxuXG5sZXQga2V5cyA9IHszNzogMSwgMzg6IDEsIDM5OiAxLCA0MDogMX07XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyhlKSB7XG4gICAgaWYgKGtleXNbZS5rZXlDb2RlXSkge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxubGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xudHJ5IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgbnVsbCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7IH1cbiAgICB9KSk7XG59IGNhdGNoKGUpIHt9XG5cbmxldCB3aGVlbE9wdCA9IHN1cHBvcnRzUGFzc2l2ZSA/IHsgcGFzc2l2ZTogZmFsc2UgfSA6IGZhbHNlO1xubGV0IHdoZWVsRXZlbnQgPSAnb253aGVlbCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgPyAnd2hlZWwnIDogJ21vdXNld2hlZWwnO1xuXG5mdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7IC8vIG9sZGVyIEZGXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIod2hlZWxFdmVudCwgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTsgLy8gbW9kZXJuIGRlc2t0b3BcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTsgLy8gbW9iaWxlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlU2Nyb2xsKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIod2hlZWxFdmVudCwgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cywgZmFsc2UpO1xufVxuXG4vLyBNb2JpbGUgbmF2YmFyXG5cbmNvbnN0IHNpZGVOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdicpO1xuY29uc3Qgc2lkZU5hdk9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2T3BlbmVyJyk7XG5jb25zdCBzaWRlTmF2Q2xvc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZDbG9zZXInKTtcbmNvbnN0IHNpZGVOYXZCYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZCYWNrJyk7XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gICAgZGlzYWJsZVNjcm9sbCgpO1xuICAgIHNpZGVOYXYuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoMTAwJSknO1xuICAgIHNpZGVOYXZCYWNrLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgc2lkZU5hdkNsb3Nlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYoKSB7XG4gICAgZW5hYmxlU2Nyb2xsKCk7XG4gICAgc2lkZU5hdi5zdHlsZS50cmFuc2Zvcm0gPSAndW5zZXQnO1xuICAgIHNpZGVOYXZCYWNrLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgc2lkZU5hdkNsb3Nlci5zdHlsZS53aWR0aCA9ICcwJztcbn1cblxuaWYgKHNpZGVOYXYpIHtcbiAgICBzaWRlTmF2T3BlbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk5hdik7XG4gICAgc2lkZU5hdkNsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2KTtcbn1cblxuLy8gQ29tbWVudCByZXBseVxuXG5jb25zdCBjb21tZW50V3JpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtY29tbWVudC13cml0ZScpO1xuY29uc3QgY29tbWVudFRleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfbWVzc2FnZScpO1xuY29uc3QgY29tbWVudFJlcGx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnQtcmVwbHknKTtcbmNvbnN0IHJlcGx5VG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudF9yZXBseVRvJyk7XG5jb25zdCBjb21tZW50UmVwbHlVc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWNvbW1lbnQtcmVwbHktdXNlcicpO1xuY29uc3QgcmVwbHlpbmdEZWxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtcmVwbHlpbmctZGVsZXRlJyk7XG5cbmlmIChyZXBseWluZ0RlbGV0ZSkge1xuICAgIHJlcGx5aW5nRGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICByZXBseVRvLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ21kLXJlcGx5aW5nJyk7XG4gICAgfSk7XG59XG5cbmlmIChjb21tZW50UmVwbHkpIHtcbiAgICBjb21tZW50UmVwbHkuZm9yRWFjaCgocmVwbHkpID0+IHtcbiAgICAgICAgbGV0IHJlcGx5VXNlciA9IHJlcGx5LnF1ZXJ5U2VsZWN0b3IoJy5yZXBseS11c2VyJyk7XG4gICAgICAgIHJlcGx5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKHJlcGx5KSA9PiB7XG4gICAgICAgICAgICByZXBseVRvLnZhbHVlID0gcmVwbHlVc2VyLmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbW1lbnRUZXh0QXJlYS5mb2N1cygpO1xuXG4gICAgICAgICAgICBpZiAocmVwbHlUby52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBjb21tZW50V3JpdGUuY2xhc3NMaXN0LmFkZCgnbWQtcmVwbHlpbmcnKTtcbiAgICAgICAgICAgICAgICBjb21tZW50UmVwbHlVc2VyLmlubmVySFRNTCA9IHJlcGx5VG8udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5cbi8vIFNlYXJjaGVyXG5cbmxldCBzZWFyY2hJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWQtc2VhcmNoLWFsbC1pbnB1dCcpO1xuXG5jb25zdCBuYXZiYXJTZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyU2VhcmNoJyk7XG5jb25zdCBuYXZiYXJTZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZiYXJTZWFyY2hJbnB1dCcpO1xuY29uc3QgbmF2YmFyU2VhcmNoT3BlbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5OYXZiYXJTZWFyY2gnKTtcbmNvbnN0IG5hdmJhclNlYXJjaENsb3NlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZU5hdmJhclNlYXJjaCcpO1xuXG5mdW5jdGlvbiBvcGVuTmF2YmFyU2VhcmNoKCl7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1zZWFyY2gtbW9iaWxlJykuc3R5bGUuZGlzcGxheSA9ICd1bnNldCc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1zZWFyY2gtbW9iaWxlIGlucHV0JykuZm9jdXMoKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXZiYXJTZWFyY2goKXtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXNlYXJjaC1tb2JpbGUnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5pZiAobmF2YmFyU2VhcmNoKSB7XG4gICAgbmF2YmFyU2VhcmNoT3BlbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk5hdmJhclNlYXJjaCk7XG4gICAgbmF2YmFyU2VhcmNoQ2xvc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VOYXZiYXJTZWFyY2gpO1xuICAgIG5hdmJhclNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgY2xvc2VOYXZiYXJTZWFyY2gpO1xufVxuXG5zZWFyY2hJbnB1dHMuZm9yRWFjaCgoaW5wdXRCb3gsa2V5KSA9PiB7XG4gICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9pbnB1dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywoaW5wdXQpID0+IHtcbiAgICAgICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9idXR0b24nKS5ocmVmID0gJy9zZWFyY2gvJyArIGlucHV0LnRhcmdldC52YWx1ZTtcbiAgICB9KVxuXG4gICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9pbnB1dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC5jb2RlID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICBpbnB1dEJveC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX2J1dHRvbicpLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJnbG9iYWwiLCJqUXVlcnkiLCJ0b29sdGlwIiwidHJpZ2dlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZpbGVJbnB1dCIsImdldEVsZW1lbnRCeUlkIiwicG9zdEltZ091dHB1dCIsIm9uY2hhbmdlIiwic3JjIiwid2luZG93IiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiZmlsZXMiLCJzdHlsZSIsIm1hcmdpbkJvdHRvbSIsIm91dHB1dENvbnRlbnQiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJ0ZXh0YXJlYSIsIm9uaW5wdXQiLCJoZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJmYWRlVG8iLCJzbGlkZVVwIiwib24iLCJldmVudCIsInJlZ2V4IiwiUmVnRXhwIiwia2V5IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGUiLCJ3aGljaCIsInRlc3QiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwibWVkaWFlbGVtZW50cGxheWVyIiwic3VjY2VzcyIsInBsYXllciIsIm5vZGUiLCJjbG9zZXN0IiwiYXR0ciIsIm1lanMiLCJpMThuIiwibGFuZ3VhZ2UiLCJzdGFydFZvbHVtZSIsImF1dG9SZXdpbmQiLCJlbmFibGVQcm9ncmVzc1Rvb2x0aXAiLCJmZWF0dXJlcyIsImF4aW9zIiwicGxheWxpc3RlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJib29rbWFya2VyIiwic3dpdGNoZXIiLCJ1cmwiLCJocmVmIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzIiwiZGF0YSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRhdGFzZXQiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJwb2ludGVyRXZlbnRzIiwiYWxlcnRCb3giLCJhbGVydEV4aXN0IiwibWVzc2FnZSIsImJhZGdlIiwib3V0ZXJIVE1MIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwic2V0VGltZW91dCIsImZvckVhY2giLCJhZGRFdmVudExpc3RlbmVyIiwia2V5cyIsImUiLCJwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMiLCJrZXlDb2RlIiwic3VwcG9ydHNQYXNzaXZlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ3aGVlbE9wdCIsInBhc3NpdmUiLCJ3aGVlbEV2ZW50IiwiY3JlYXRlRWxlbWVudCIsImRpc2FibGVTY3JvbGwiLCJlbmFibGVTY3JvbGwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2lkZU5hdiIsInNpZGVOYXZPcGVuZXIiLCJzaWRlTmF2Q2xvc2VyIiwic2lkZU5hdkJhY2siLCJvcGVuTmF2IiwidHJhbnNmb3JtIiwib3BhY2l0eSIsIndpZHRoIiwiY2xvc2VOYXYiLCJjb21tZW50V3JpdGUiLCJjb21tZW50VGV4dEFyZWEiLCJjb21tZW50UmVwbHkiLCJyZXBseVRvIiwiY29tbWVudFJlcGx5VXNlciIsInJlcGx5aW5nRGVsZXRlIiwicmVtb3ZlQXR0cmlidXRlIiwicmVwbHkiLCJyZXBseVVzZXIiLCJ2YWx1ZSIsImlubmVySFRNTCIsImZvY3VzIiwic2VhcmNoSW5wdXRzIiwibmF2YmFyU2VhcmNoIiwibmF2YmFyU2VhcmNoSW5wdXQiLCJuYXZiYXJTZWFyY2hPcGVuZXIiLCJuYXZiYXJTZWFyY2hDbG9zZXIiLCJvcGVuTmF2YmFyU2VhcmNoIiwiZGlzcGxheSIsImNsb3NlTmF2YmFyU2VhcmNoIiwiaW5wdXRCb3giLCJpbnB1dCIsInRhcmdldCIsImNvZGUiLCJjbGljayJdLCJzb3VyY2VSb290IjoiIn0=