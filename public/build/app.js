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

  if (document.getElementById('articleImgOutput')) {
    var articleImgOutput = document.getElementById('articleImgOutput');

    fileInput.onchange = function () {
      articleImgOutput.src = window.URL.createObjectURL(fileInput.files[0]);
      articleImgOutput.style.marginBottom = '8px';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2hESCxNQUFBQSxRQUFRLENBQUNwSCxhQUFULENBQXVCLGdCQUF2QixFQUF5Q3dILEtBQXpDO0FBQ0g7QUFDSixHQUpMO0FBTUgsQ0FYRDs7Ozs7Ozs7Ozs7O0FDeEhBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzL2FwcC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXG4gKlxuICogV2UgcmVjb21tZW5kIGluY2x1ZGluZyB0aGUgYnVpbHQgdmVyc2lvbiBvZiB0aGlzIEphdmFTY3JpcHQgZmlsZVxuICogKGFuZCBpdHMgQ1NTIGZpbGUpIGluIHlvdXIgYmFzZSBsYXlvdXQgKGJhc2UuaHRtbC50d2lnKS5cbiAqL1xuXG4vLyBhbnkgQ1NTIHlvdSBpbXBvcnQgd2lsbCBvdXRwdXQgaW50byBhIHNpbmdsZSBzY3NzIGZpbGUgKGFwcC5zY3NzIGluIHRoaXMgY2FzZSlcbmltcG9ydCAnLi4vc2Nzcy9hcHAuc2Nzcyc7XG5cbi8vIEF3ZXNvbWUgZm9udHNcbnJlcXVpcmUoJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwubWluLmNzcycpO1xucmVxdWlyZSgnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvanMvYWxsLmpzJyk7XG5cbi8vIE5lZWQgalF1ZXJ5PyBJbnN0YWxsIGl0IHdpdGggXCJ5YXJuIGFkZCBqcXVlcnlcIiwgdGhlbiB1bmNvbW1lbnQgdG8gaW1wb3J0IGl0LlxuLy8gaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmxldCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5nbG9iYWwuJCA9IGdsb2JhbC5qUXVlcnkgPSAkO1xuXG4vLyBCb290c3RyYXAganNcbnJlcXVpcmUoJ2Jvb3RzdHJhcCcpO1xuXG4vLyBNeSBzY3JpcHRzXG5pbXBvcnQgJy4vc2NyaXB0cyc7XG5cbi8vIEVuYWJsZSB0b29sdGlwXG4kKGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCh7XG4gICAgICAgIHRyaWdnZXIgOiAnaG92ZXInXG4gICAgfSlcbn0pO1xuXG4vLyBNZWRpYUVsZW1lbnQuanMgUGxheWVyXG5pbXBvcnQgJy4vcGxheWVyJztcblxuLy8gSW1hZ2Ugb24gY2hhbmdlXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1maWxlLWlucHV0JykpIHtcbiAgICBsZXQgZmlsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1maWxlLWlucHV0Jyk7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcnRpY2xlSW1nT3V0cHV0JykpIHtcbiAgICAgICAgbGV0IGFydGljbGVJbWdPdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJ0aWNsZUltZ091dHB1dCcpO1xuICAgICAgICBmaWxlSW5wdXQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBhcnRpY2xlSW1nT3V0cHV0LnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVJbnB1dC5maWxlc1swXSk7XG4gICAgICAgICAgICBhcnRpY2xlSW1nT3V0cHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc4cHgnO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dC1jb250ZW50JykpIHtcbiAgICAgICAgbGV0IG91dHB1dENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0LWNvbnRlbnQnKTtcbiAgICAgICAgZmlsZUlucHV0Lm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgb3V0cHV0Q29udGVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFxcJycgKyB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlSW5wdXQuZmlsZXNbMF0pICsgJ1xcJyknO1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8gVGV4dGFyZWEgYXV0b3NpemVcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYXV0b3NpemVyJykpIHtcbiAgICBsZXQgdGV4dGFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYXV0b3NpemVyJyk7XG4gICAgdGV4dGFyZWEub25pbnB1dCA9ICgpID0+IHtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuaGVpZ2h0ID0gdGV4dGFyZWEuc2Nyb2xsSGVpZ2h0ICsgMiArIFwicHhcIjtcbiAgICB9O1xufVxuXG4vLyBBdXRvIGNsb3NlIGFsZXJ0c1xuJChcIi5tZC1hbGVydC1hdXRvaGlkZVwiKS5mYWRlVG8oNTAwMCwgNTAwKS5zbGlkZVVwKDUwMCwgZnVuY3Rpb24oKXtcbiAgICAkKFwiLm1kLWFsZXJ0LWF1dG9oaWRlXCIpLnNsaWRlVXAoNTAwKTtcbn0pO1xuXG4vLyBQcmV2ZW50IHVzZXJuYW1lIHN5bWJvbHNcbiQoJy51c2VybmFtZS1pbnB1dCcpLm9uKCdrZXlwcmVzcycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOS5fXSskXCIpO1xuICAgIGxldCBrZXkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCFldmVudC5jaGFyQ29kZSA/IGV2ZW50LndoaWNoIDogZXZlbnQuY2hhckNvZGUpO1xuICAgIGlmICghcmVnZXgudGVzdChrZXkpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59KTtcbiIsInJlcXVpcmUoJ21lZGlhZWxlbWVudC9idWlsZC9tZWRpYWVsZW1lbnQtYW5kLXBsYXllci5taW4nKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmF1ZGlvLXBsYXllciBhdWRpbycpLm1lZGlhZWxlbWVudHBsYXllcih7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHBsYXllciwgbm9kZSkge1xuICAgICAgICAgICAgLy8gT3B0aW9uYWxcbiAgICAgICAgICAgICQocGxheWVyKS5jbG9zZXN0KCcubWVqc19fY29udGFpbmVyJykuYXR0cignbGFuZycsIG1lanMuaTE4bi5sYW5ndWFnZSgpKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5hdHRyKCdsYW5nJywgbWVqcy5pMThuLmxhbmd1YWdlKCkpO1xuICAgICAgICAgICAgLy8gTW9yZSBjb2RlXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0Vm9sdW1lOiAxLFxuICAgICAgICBhdXRvUmV3aW5kOiB0cnVlLFxuICAgICAgICBlbmFibGVQcm9ncmVzc1Rvb2x0aXA6IGZhbHNlLFxuICAgICAgICBmZWF0dXJlczogWydwbGF5cGF1c2UnLCdbZmVhdHVyZV9uYW1lXScsJ2N1cnJlbnQnLCdwcm9ncmVzcycsJ2R1cmF0aW9uJ11cbiAgICB9KVxufSk7XG5cbmNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKS5kZWZhdWx0O1xuXG5sZXQgcGxheWxpc3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5bGlzdC10b2dnbGUnKTtcbmxldCBib29rbWFya2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvb2ttYXJrLXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBzd2l0Y2hlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHVybCA9IHRoaXMuaHJlZjtcblxuICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBzdGF0dXMgPSBTdHJpbmcocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAoc3RhdHVzID09PSAnYWRkZWQnKSA/IHRoaXMuY2xhc3NMaXN0LmFkZCgnYWRkZWQnKSA6IHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWRkZWQnKTtcbiAgICAgICAgdGhpcy5kYXRhc2V0Lm9yaWdpbmFsVGl0bGUgPSByZXNwb25zZS5kYXRhLnJlc3BvbnNlLnRpdGxlO1xuICAgICAgICB0aGlzLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgbGV0IGFsZXJ0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWJyZWFkY3J1bWInKTtcbiAgICAgICAgbGV0IGFsZXJ0RXhpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYWxlcnQnKTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5tZXNzYWdlKSB7XG4gICAgICAgICAgICBsZXQgYmFkZ2UgPSAnJztcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyA9PT0gJ2FkZGVkJykge1xuICAgICAgICAgICAgICAgIGJhZGdlID0gJ3N1Y2Nlc3MnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiYWRnZSA9ICdkYW5nZXInO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICc8ZGl2IGNsYXNzPVwibWQtYWxlcnQgbWQtYWxlcnQtJyArIGJhZGdlICsgJyBtZC1ib3gtbWJcIj4nICtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLnJlc3BvbnNlLm1lc3NhZ2UgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICBpZiAoYWxlcnRFeGlzdCkge1xuICAgICAgICAgICAgICAgIGFsZXJ0RXhpc3Qub3V0ZXJIVE1MID0gbWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnRCb3guaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLmZhZGVUbygzMDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoXCIubWQtYWxlcnRcIikuc2xpZGVVcCg1MDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIFt0aGlzXS5mb3JFYWNoKChzd2l0Y2hlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDApO1xuICAgIH0pXG59XG5cbnBsYXlsaXN0ZXIuZm9yRWFjaCgocGxheWxpc3RlcikgPT4ge1xuICAgIHBsYXlsaXN0ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hlcik7XG59KTtcblxuYm9va21hcmtlci5mb3JFYWNoKChib29rbWFya2VyKSA9PiB7XG4gICAgYm9va21hcmtlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaGVyKTtcbn0pO1xuIiwiLy8gUHJldmVudCBzY3JvbGxcblxubGV0IGtleXMgPSB7Mzc6IDEsIDM4OiAxLCAzOTogMSwgNDA6IDF9O1xuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMoZSkge1xuICAgIGlmIChrZXlzW2Uua2V5Q29kZV0pIHtcbiAgICAgICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmxldCBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcbnRyeSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsIG51bGwsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlOyB9XG4gICAgfSkpO1xufSBjYXRjaChlKSB7fVxuXG5sZXQgd2hlZWxPcHQgPSBzdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IGZhbHNlIH0gOiBmYWxzZTtcbmxldCB3aGVlbEV2ZW50ID0gJ29ud2hlZWwnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpID8gJ3doZWVsJyA6ICdtb3VzZXdoZWVsJztcblxuZnVuY3Rpb24gZGlzYWJsZVNjcm9sbCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpOyAvLyBvbGRlciBGRlxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKHdoZWVsRXZlbnQsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7IC8vIG1vZGVybiBkZXNrdG9wXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7IC8vIG1vYmlsZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZVNjcm9sbCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKHdoZWVsRXZlbnQsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZlbnREZWZhdWx0LCB3aGVlbE9wdCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMsIGZhbHNlKTtcbn1cblxuLy8gTW9iaWxlIG5hdmJhclxuXG5jb25zdCBzaWRlTmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXYnKTtcbmNvbnN0IHNpZGVOYXZPcGVuZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdk9wZW5lcicpO1xuY29uc3Qgc2lkZU5hdkNsb3NlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2Q2xvc2VyJyk7XG5jb25zdCBzaWRlTmF2QmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2QmFjaycpO1xuXG5mdW5jdGlvbiBvcGVuTmF2KCkge1xuICAgIGRpc2FibGVTY3JvbGwoKTtcbiAgICBzaWRlTmF2LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDEwMCUpJztcbiAgICBzaWRlTmF2QmFjay5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgIHNpZGVOYXZDbG9zZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2KCkge1xuICAgIGVuYWJsZVNjcm9sbCgpO1xuICAgIHNpZGVOYXYuc3R5bGUudHJhbnNmb3JtID0gJ3Vuc2V0JztcbiAgICBzaWRlTmF2QmFjay5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgIHNpZGVOYXZDbG9zZXIuc3R5bGUud2lkdGggPSAnMCc7XG59XG5cbmlmIChzaWRlTmF2KSB7XG4gICAgc2lkZU5hdk9wZW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5OYXYpO1xuICAgIHNpZGVOYXZDbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU5hdik7XG59XG5cbi8vIENvbW1lbnQgcmVwbHlcblxuY29uc3QgY29tbWVudFdyaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWNvbW1lbnQtd3JpdGUnKTtcbmNvbnN0IGNvbW1lbnRUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X21lc3NhZ2UnKTtcbmNvbnN0IGNvbW1lbnRSZXBseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LXJlcGx5Jyk7XG5jb25zdCByZXBseVRvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfcmVwbHlUbycpO1xuY29uc3QgY29tbWVudFJlcGx5VXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1jb21tZW50LXJlcGx5LXVzZXInKTtcbmNvbnN0IHJlcGx5aW5nRGVsZXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLXJlcGx5aW5nLWRlbGV0ZScpO1xuXG5pZiAocmVwbHlpbmdEZWxldGUpIHtcbiAgICByZXBseWluZ0RlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcmVwbHlUby5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIGNvbW1lbnRXcml0ZS5jbGFzc0xpc3QucmVtb3ZlKCdtZC1yZXBseWluZycpO1xuICAgIH0pO1xufVxuXG5pZiAoY29tbWVudFJlcGx5KSB7XG4gICAgY29tbWVudFJlcGx5LmZvckVhY2goKHJlcGx5KSA9PiB7XG4gICAgICAgIGxldCByZXBseVVzZXIgPSByZXBseS5xdWVyeVNlbGVjdG9yKCcucmVwbHktdXNlcicpO1xuICAgICAgICByZXBseS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChyZXBseSkgPT4ge1xuICAgICAgICAgICAgcmVwbHlUby52YWx1ZSA9IHJlcGx5VXNlci5pbm5lckhUTUw7XG4gICAgICAgICAgICBjb21tZW50VGV4dEFyZWEuZm9jdXMoKTtcblxuICAgICAgICAgICAgaWYgKHJlcGx5VG8udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5hZGQoJ21kLXJlcGx5aW5nJyk7XG4gICAgICAgICAgICAgICAgY29tbWVudFJlcGx5VXNlci5pbm5lckhUTUwgPSByZXBseVRvLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xufVxuXG4vLyBTZWFyY2hlclxuXG5sZXQgc2VhcmNoSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1kLXNlYXJjaC1hbGwtaW5wdXQnKTtcblxuY29uc3QgbmF2YmFyU2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhclNlYXJjaCcpO1xuY29uc3QgbmF2YmFyU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyU2VhcmNoSW5wdXQnKTtcbmNvbnN0IG5hdmJhclNlYXJjaE9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuTmF2YmFyU2VhcmNoJyk7XG5jb25zdCBuYXZiYXJTZWFyY2hDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VOYXZiYXJTZWFyY2gnKTtcblxuZnVuY3Rpb24gb3Blbk5hdmJhclNlYXJjaCgpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZScpLnN0eWxlLmRpc3BsYXkgPSAndW5zZXQnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItc2VhcmNoLW1vYmlsZSBpbnB1dCcpLmZvY3VzKCk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmF2YmFyU2VhcmNoKCl7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1zZWFyY2gtbW9iaWxlJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuaWYgKG5hdmJhclNlYXJjaCkge1xuICAgIG5hdmJhclNlYXJjaE9wZW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5OYXZiYXJTZWFyY2gpO1xuICAgIG5hdmJhclNlYXJjaENsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2YmFyU2VhcmNoKTtcbiAgICBuYXZiYXJTZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGNsb3NlTmF2YmFyU2VhcmNoKTtcbn1cblxuc2VhcmNoSW5wdXRzLmZvckVhY2goKGlucHV0Qm94LGtleSkgPT4ge1xuICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsKGlucHV0KSA9PiB7XG4gICAgICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfYnV0dG9uJykuaHJlZiA9ICcvc2VhcmNoLycgKyBpbnB1dC50YXJnZXQudmFsdWU7XG4gICAgfSlcblxuICAgIGlucHV0Qm94LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQuY29kZSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgaW5wdXRCb3gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9idXR0b24nKS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbn0pO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInJlcXVpcmUiLCIkIiwiZ2xvYmFsIiwialF1ZXJ5IiwidG9vbHRpcCIsInRyaWdnZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJmaWxlSW5wdXQiLCJnZXRFbGVtZW50QnlJZCIsImFydGljbGVJbWdPdXRwdXQiLCJvbmNoYW5nZSIsInNyYyIsIndpbmRvdyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImZpbGVzIiwic3R5bGUiLCJtYXJnaW5Cb3R0b20iLCJvdXRwdXRDb250ZW50IiwiYmFja2dyb3VuZEltYWdlIiwidGV4dGFyZWEiLCJvbmlucHV0IiwiaGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiZmFkZVRvIiwic2xpZGVVcCIsIm9uIiwiZXZlbnQiLCJyZWdleCIsIlJlZ0V4cCIsImtleSIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlIiwid2hpY2giLCJ0ZXN0IiwicHJldmVudERlZmF1bHQiLCJyZWFkeSIsIm1lZGlhZWxlbWVudHBsYXllciIsInN1Y2Nlc3MiLCJwbGF5ZXIiLCJub2RlIiwiY2xvc2VzdCIsImF0dHIiLCJtZWpzIiwiaTE4biIsImxhbmd1YWdlIiwic3RhcnRWb2x1bWUiLCJhdXRvUmV3aW5kIiwiZW5hYmxlUHJvZ3Jlc3NUb29sdGlwIiwiZmVhdHVyZXMiLCJheGlvcyIsInBsYXlsaXN0ZXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYm9va21hcmtlciIsInN3aXRjaGVyIiwidXJsIiwiaHJlZiIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsInN0YXR1cyIsImRhdGEiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkYXRhc2V0Iiwib3JpZ2luYWxUaXRsZSIsInRpdGxlIiwicG9pbnRlckV2ZW50cyIsImFsZXJ0Qm94IiwiYWxlcnRFeGlzdCIsIm1lc3NhZ2UiLCJiYWRnZSIsIm91dGVySFRNTCIsImluc2VydEFkamFjZW50SFRNTCIsInNldFRpbWVvdXQiLCJmb3JFYWNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImtleXMiLCJlIiwicHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzIiwia2V5Q29kZSIsInN1cHBvcnRzUGFzc2l2ZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid2hlZWxPcHQiLCJwYXNzaXZlIiwid2hlZWxFdmVudCIsImNyZWF0ZUVsZW1lbnQiLCJkaXNhYmxlU2Nyb2xsIiwiZW5hYmxlU2Nyb2xsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNpZGVOYXYiLCJzaWRlTmF2T3BlbmVyIiwic2lkZU5hdkNsb3NlciIsInNpZGVOYXZCYWNrIiwib3Blbk5hdiIsInRyYW5zZm9ybSIsIm9wYWNpdHkiLCJ3aWR0aCIsImNsb3NlTmF2IiwiY29tbWVudFdyaXRlIiwiY29tbWVudFRleHRBcmVhIiwiY29tbWVudFJlcGx5IiwicmVwbHlUbyIsImNvbW1lbnRSZXBseVVzZXIiLCJyZXBseWluZ0RlbGV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInJlcGx5IiwicmVwbHlVc2VyIiwidmFsdWUiLCJpbm5lckhUTUwiLCJmb2N1cyIsInNlYXJjaElucHV0cyIsIm5hdmJhclNlYXJjaCIsIm5hdmJhclNlYXJjaElucHV0IiwibmF2YmFyU2VhcmNoT3BlbmVyIiwibmF2YmFyU2VhcmNoQ2xvc2VyIiwib3Blbk5hdmJhclNlYXJjaCIsImRpc3BsYXkiLCJjbG9zZU5hdmJhclNlYXJjaCIsImlucHV0Qm94IiwiaW5wdXQiLCJ0YXJnZXQiLCJjb2RlIiwiY2xpY2siXSwic291cmNlUm9vdCI6IiJ9