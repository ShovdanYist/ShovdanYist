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
  sideNav.style.transform = 'translateX(0)';
  sideNavBack.style.opacity = '1';
  sideNavCloser.style.width = '100%';
}

function closeNav() {
  enableScroll();
  sideNav.style.transform = 'translateX(-100%)';
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
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxPQUFPLENBQUNHLGVBQVIsQ0FBd0IsT0FBeEI7QUFDQU4sSUFBQUEsWUFBWSxDQUFDdkMsU0FBYixDQUF1QkUsTUFBdkIsQ0FBOEIsYUFBOUI7QUFDSCxHQUhEO0FBSUg7O0FBRUQsSUFBSXVDLFlBQUosRUFBa0I7QUFDZEEsRUFBQUEsWUFBWSxDQUFDM0IsT0FBYixDQUFxQixVQUFDZ0MsS0FBRCxFQUFXO0FBQzVCLFFBQUlDLFNBQVMsR0FBR0QsS0FBSyxDQUFDdkcsYUFBTixDQUFvQixhQUFwQixDQUFoQjtBQUNBdUcsSUFBQUEsS0FBSyxDQUFDL0IsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQytCLEtBQUQsRUFBVztBQUN2Q0osTUFBQUEsT0FBTyxDQUFDTSxLQUFSLEdBQWdCRCxTQUFTLENBQUNFLFNBQTFCO0FBQ0FULE1BQUFBLGVBQWUsQ0FBQ1UsS0FBaEI7O0FBRUEsVUFBSVIsT0FBTyxDQUFDTSxLQUFSLEtBQWtCLEVBQXRCLEVBQTBCO0FBQ3RCVCxRQUFBQSxZQUFZLENBQUN2QyxTQUFiLENBQXVCQyxHQUF2QixDQUEyQixhQUEzQjtBQUNBMEMsUUFBQUEsZ0JBQWdCLENBQUNNLFNBQWpCLEdBQTZCUCxPQUFPLENBQUNNLEtBQXJDO0FBQ0g7QUFDSixLQVJEO0FBU0gsR0FYRDtBQVlIOzs7Ozs7Ozs7Ozs7QUM5RkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvYXBwLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcbiAqXG4gKiBXZSByZWNvbW1lbmQgaW5jbHVkaW5nIHRoZSBidWlsdCB2ZXJzaW9uIG9mIHRoaXMgSmF2YVNjcmlwdCBmaWxlXG4gKiAoYW5kIGl0cyBDU1MgZmlsZSkgaW4geW91ciBiYXNlIGxheW91dCAoYmFzZS5odG1sLnR3aWcpLlxuICovXG5cbi8vIGFueSBDU1MgeW91IGltcG9ydCB3aWxsIG91dHB1dCBpbnRvIGEgc2luZ2xlIHNjc3MgZmlsZSAoYXBwLnNjc3MgaW4gdGhpcyBjYXNlKVxuaW1wb3J0ICcuLi9zY3NzL2FwcC5zY3NzJztcblxuLy8gQXdlc29tZSBmb250c1xucmVxdWlyZSgnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5taW4uY3NzJyk7XG5yZXF1aXJlKCdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9qcy9hbGwuanMnKTtcblxuLy8gTmVlZCBqUXVlcnk/IEluc3RhbGwgaXQgd2l0aCBcInlhcm4gYWRkIGpxdWVyeVwiLCB0aGVuIHVuY29tbWVudCB0byBpbXBvcnQgaXQuXG4vLyBpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xubGV0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbmdsb2JhbC4kID0gZ2xvYmFsLmpRdWVyeSA9ICQ7XG5cbi8vIEJvb3RzdHJhcCBqc1xucmVxdWlyZSgnYm9vdHN0cmFwJyk7XG5cbi8vIE15IHNjcmlwdHNcbmltcG9ydCAnLi9zY3JpcHRzJztcblxuLy8gRW5hYmxlIHRvb2x0aXBcbiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtcbiAgICAgICAgdHJpZ2dlciA6ICdob3ZlcidcbiAgICB9KVxufSk7XG5cbi8vIE1lZGlhRWxlbWVudC5qcyBQbGF5ZXJcbmltcG9ydCAnLi9wbGF5ZXInO1xuXG4vLyBJbWFnZSBvbiBjaGFuZ2VcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLWZpbGUtaW5wdXQnKSkge1xuICAgIGxldCBmaWxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLWZpbGUtaW5wdXQnKTtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FydGljbGVJbWdPdXRwdXQnKSkge1xuICAgICAgICBsZXQgYXJ0aWNsZUltZ091dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcnRpY2xlSW1nT3V0cHV0Jyk7XG4gICAgICAgIGZpbGVJbnB1dC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGFydGljbGVJbWdPdXRwdXQuc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZUlucHV0LmZpbGVzWzBdKTtcbiAgICAgICAgICAgIGFydGljbGVJbWdPdXRwdXQuc3R5bGUubWFyZ2luQm90dG9tID0gJzhweCc7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0LWNvbnRlbnQnKSkge1xuICAgICAgICBsZXQgb3V0cHV0Q29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQtY29udGVudCcpO1xuICAgICAgICBmaWxlSW5wdXQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBvdXRwdXRDb250ZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXFwnJyArIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVJbnB1dC5maWxlc1swXSkgKyAnXFwnKSc7XG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vLyBUZXh0YXJlYSBhdXRvc2l6ZVxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hdXRvc2l6ZXInKSkge1xuICAgIGxldCB0ZXh0YXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hdXRvc2l6ZXInKTtcbiAgICB0ZXh0YXJlYS5vbmlucHV0ID0gKCkgPT4ge1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5oZWlnaHQgPSB0ZXh0YXJlYS5zY3JvbGxIZWlnaHQgKyAyICsgXCJweFwiO1xuICAgIH07XG59XG5cbi8vIEF1dG8gY2xvc2UgYWxlcnRzXG4kKFwiLm1kLWFsZXJ0LWF1dG9oaWRlXCIpLmZhZGVUbyg1MDAwLCA1MDApLnNsaWRlVXAoNTAwLCBmdW5jdGlvbigpe1xuICAgICQoXCIubWQtYWxlcnQtYXV0b2hpZGVcIikuc2xpZGVVcCg1MDApO1xufSk7XG5cbi8vIFByZXZlbnQgdXNlcm5hbWUgc3ltYm9sc1xuJCgnLnVzZXJuYW1lLWlucHV0Jykub24oJ2tleXByZXNzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Ll9dKyRcIik7XG4gICAgbGV0IGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIWV2ZW50LmNoYXJDb2RlID8gZXZlbnQud2hpY2ggOiBldmVudC5jaGFyQ29kZSk7XG4gICAgaWYgKCFyZWdleC50ZXN0KGtleSkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0pO1xuIiwicmVxdWlyZSgnbWVkaWFlbGVtZW50L2J1aWxkL21lZGlhZWxlbWVudC1hbmQtcGxheWVyLm1pbicpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKCcuYXVkaW8tcGxheWVyIGF1ZGlvJykubWVkaWFlbGVtZW50cGxheWVyKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocGxheWVyLCBub2RlKSB7XG4gICAgICAgICAgICAvLyBPcHRpb25hbFxuICAgICAgICAgICAgJChwbGF5ZXIpLmNsb3Nlc3QoJy5tZWpzX19jb250YWluZXInKS5hdHRyKCdsYW5nJywgbWVqcy5pMThuLmxhbmd1YWdlKCkpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmF0dHIoJ2xhbmcnLCBtZWpzLmkxOG4ubGFuZ3VhZ2UoKSk7XG4gICAgICAgICAgICAvLyBNb3JlIGNvZGVcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnRWb2x1bWU6IDEsXG4gICAgICAgIGF1dG9SZXdpbmQ6IHRydWUsXG4gICAgICAgIGVuYWJsZVByb2dyZXNzVG9vbHRpcDogZmFsc2UsXG4gICAgICAgIGZlYXR1cmVzOiBbJ3BsYXlwYXVzZScsJ1tmZWF0dXJlX25hbWVdJywnY3VycmVudCcsJ3Byb2dyZXNzJywnZHVyYXRpb24nXVxuICAgIH0pXG59KTtcblxuY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpLmRlZmF1bHQ7XG5cbmxldCBwbGF5bGlzdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXlsaXN0LXRvZ2dsZScpO1xubGV0IGJvb2ttYXJrZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9va21hcmstdG9nZ2xlJyk7XG5cbmZ1bmN0aW9uIHN3aXRjaGVyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gdGhpcy5ocmVmO1xuXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN0cmluZyhyZXNwb25zZS5kYXRhLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIChzdGF0dXMgPT09ICdhZGRlZCcpID8gdGhpcy5jbGFzc0xpc3QuYWRkKCdhZGRlZCcpIDogdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhZGRlZCcpO1xuICAgICAgICB0aGlzLmRhdGFzZXQub3JpZ2luYWxUaXRsZSA9IHJlc3BvbnNlLmRhdGEucmVzcG9uc2UudGl0bGU7XG4gICAgICAgIHRoaXMuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblxuICAgICAgICBsZXQgYWxlcnRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtYnJlYWRjcnVtYicpO1xuICAgICAgICBsZXQgYWxlcnRFeGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1hbGVydCcpO1xuXG4gICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnJlc3BvbnNlLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGxldCBiYWRnZSA9ICcnO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzID09PSAnYWRkZWQnKSB7XG4gICAgICAgICAgICAgICAgYmFkZ2UgPSAnc3VjY2Vzcyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJhZGdlID0gJ2Rhbmdlcic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJzxkaXYgY2xhc3M9XCJtZC1hbGVydCBtZC1hbGVydC0nICsgYmFkZ2UgKyAnIG1kLWJveC1tYlwiPicgK1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEucmVzcG9uc2UubWVzc2FnZSArXG4gICAgICAgICAgICAgICAgJzwvZGl2Pic7XG5cbiAgICAgICAgICAgIGlmIChhbGVydEV4aXN0KSB7XG4gICAgICAgICAgICAgICAgYWxlcnRFeGlzdC5vdXRlckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydEJveC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgbWVzc2FnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoXCIubWQtYWxlcnRcIikuZmFkZVRvKDMwMDAsIDUwMCkuc2xpZGVVcCg1MDAsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJChcIi5tZC1hbGVydFwiKS5zbGlkZVVwKDUwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgW3RoaXNdLmZvckVhY2goKHN3aXRjaGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSlcbn1cblxucGxheWxpc3Rlci5mb3JFYWNoKChwbGF5bGlzdGVyKSA9PiB7XG4gICAgcGxheWxpc3Rlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXRjaGVyKTtcbn0pO1xuXG5ib29rbWFya2VyLmZvckVhY2goKGJvb2ttYXJrZXIpID0+IHtcbiAgICBib29rbWFya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpdGNoZXIpO1xufSk7XG4iLCIvLyBQcmV2ZW50IHNjcm9sbFxuXG5sZXQga2V5cyA9IHszNzogMSwgMzg6IDEsIDM5OiAxLCA0MDogMX07XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyhlKSB7XG4gICAgaWYgKGtleXNbZS5rZXlDb2RlXSkge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxubGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xudHJ5IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgbnVsbCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7IH1cbiAgICB9KSk7XG59IGNhdGNoKGUpIHt9XG5cbmxldCB3aGVlbE9wdCA9IHN1cHBvcnRzUGFzc2l2ZSA/IHsgcGFzc2l2ZTogZmFsc2UgfSA6IGZhbHNlO1xubGV0IHdoZWVsRXZlbnQgPSAnb253aGVlbCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgPyAnd2hlZWwnIDogJ21vdXNld2hlZWwnO1xuXG5mdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7IC8vIG9sZGVyIEZGXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIod2hlZWxFdmVudCwgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTsgLy8gbW9kZXJuIGRlc2t0b3BcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTsgLy8gbW9iaWxlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlU2Nyb2xsKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIod2hlZWxFdmVudCwgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgcHJldmVudERlZmF1bHQsIHdoZWVsT3B0KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cywgZmFsc2UpO1xufVxuXG4vLyBNb2JpbGUgbmF2YmFyXG5cbmNvbnN0IHNpZGVOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdicpO1xuY29uc3Qgc2lkZU5hdk9wZW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2T3BlbmVyJyk7XG5jb25zdCBzaWRlTmF2Q2xvc2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZDbG9zZXInKTtcbmNvbnN0IHNpZGVOYXZCYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZCYWNrJyk7XG5cbmZ1bmN0aW9uIG9wZW5OYXYoKSB7XG4gICAgZGlzYWJsZVNjcm9sbCgpO1xuICAgIHNpZGVOYXYuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoMCknO1xuICAgIHNpZGVOYXZCYWNrLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgc2lkZU5hdkNsb3Nlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbn1cblxuZnVuY3Rpb24gY2xvc2VOYXYoKSB7XG4gICAgZW5hYmxlU2Nyb2xsKCk7XG4gICAgc2lkZU5hdi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtMTAwJSknO1xuICAgIHNpZGVOYXZCYWNrLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgc2lkZU5hdkNsb3Nlci5zdHlsZS53aWR0aCA9ICcwJztcbn1cblxuaWYgKHNpZGVOYXYpIHtcbiAgICBzaWRlTmF2T3BlbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk5hdik7XG4gICAgc2lkZU5hdkNsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2KTtcbn1cblxuLy8gQ29tbWVudCByZXBseVxuXG5jb25zdCBjb21tZW50V3JpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtY29tbWVudC13cml0ZScpO1xuY29uc3QgY29tbWVudFRleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfbWVzc2FnZScpO1xuY29uc3QgY29tbWVudFJlcGx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnQtcmVwbHknKTtcbmNvbnN0IHJlcGx5VG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudF9yZXBseVRvJyk7XG5jb25zdCBjb21tZW50UmVwbHlVc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWNvbW1lbnQtcmVwbHktdXNlcicpO1xuY29uc3QgcmVwbHlpbmdEZWxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtcmVwbHlpbmctZGVsZXRlJyk7XG5cbmlmIChyZXBseWluZ0RlbGV0ZSkge1xuICAgIHJlcGx5aW5nRGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICByZXBseVRvLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ21kLXJlcGx5aW5nJyk7XG4gICAgfSk7XG59XG5cbmlmIChjb21tZW50UmVwbHkpIHtcbiAgICBjb21tZW50UmVwbHkuZm9yRWFjaCgocmVwbHkpID0+IHtcbiAgICAgICAgbGV0IHJlcGx5VXNlciA9IHJlcGx5LnF1ZXJ5U2VsZWN0b3IoJy5yZXBseS11c2VyJyk7XG4gICAgICAgIHJlcGx5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKHJlcGx5KSA9PiB7XG4gICAgICAgICAgICByZXBseVRvLnZhbHVlID0gcmVwbHlVc2VyLmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbW1lbnRUZXh0QXJlYS5mb2N1cygpO1xuXG4gICAgICAgICAgICBpZiAocmVwbHlUby52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBjb21tZW50V3JpdGUuY2xhc3NMaXN0LmFkZCgnbWQtcmVwbHlpbmcnKTtcbiAgICAgICAgICAgICAgICBjb21tZW50UmVwbHlVc2VyLmlubmVySFRNTCA9IHJlcGx5VG8udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJnbG9iYWwiLCJqUXVlcnkiLCJ0b29sdGlwIiwidHJpZ2dlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZpbGVJbnB1dCIsImdldEVsZW1lbnRCeUlkIiwiYXJ0aWNsZUltZ091dHB1dCIsIm9uY2hhbmdlIiwic3JjIiwid2luZG93IiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiZmlsZXMiLCJzdHlsZSIsIm1hcmdpbkJvdHRvbSIsIm91dHB1dENvbnRlbnQiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJ0ZXh0YXJlYSIsIm9uaW5wdXQiLCJoZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJmYWRlVG8iLCJzbGlkZVVwIiwib24iLCJldmVudCIsInJlZ2V4IiwiUmVnRXhwIiwia2V5IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGUiLCJ3aGljaCIsInRlc3QiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwibWVkaWFlbGVtZW50cGxheWVyIiwic3VjY2VzcyIsInBsYXllciIsIm5vZGUiLCJjbG9zZXN0IiwiYXR0ciIsIm1lanMiLCJpMThuIiwibGFuZ3VhZ2UiLCJzdGFydFZvbHVtZSIsImF1dG9SZXdpbmQiLCJlbmFibGVQcm9ncmVzc1Rvb2x0aXAiLCJmZWF0dXJlcyIsImF4aW9zIiwicGxheWxpc3RlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJib29rbWFya2VyIiwic3dpdGNoZXIiLCJ1cmwiLCJocmVmIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzIiwiZGF0YSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRhdGFzZXQiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJwb2ludGVyRXZlbnRzIiwiYWxlcnRCb3giLCJhbGVydEV4aXN0IiwibWVzc2FnZSIsImJhZGdlIiwib3V0ZXJIVE1MIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwic2V0VGltZW91dCIsImZvckVhY2giLCJhZGRFdmVudExpc3RlbmVyIiwia2V5cyIsImUiLCJwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMiLCJrZXlDb2RlIiwic3VwcG9ydHNQYXNzaXZlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ3aGVlbE9wdCIsInBhc3NpdmUiLCJ3aGVlbEV2ZW50IiwiY3JlYXRlRWxlbWVudCIsImRpc2FibGVTY3JvbGwiLCJlbmFibGVTY3JvbGwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2lkZU5hdiIsInNpZGVOYXZPcGVuZXIiLCJzaWRlTmF2Q2xvc2VyIiwic2lkZU5hdkJhY2siLCJvcGVuTmF2IiwidHJhbnNmb3JtIiwib3BhY2l0eSIsIndpZHRoIiwiY2xvc2VOYXYiLCJjb21tZW50V3JpdGUiLCJjb21tZW50VGV4dEFyZWEiLCJjb21tZW50UmVwbHkiLCJyZXBseVRvIiwiY29tbWVudFJlcGx5VXNlciIsInJlcGx5aW5nRGVsZXRlIiwicmVtb3ZlQXR0cmlidXRlIiwicmVwbHkiLCJyZXBseVVzZXIiLCJ2YWx1ZSIsImlubmVySFRNTCIsImZvY3VzIl0sInNvdXJjZVJvb3QiOiIifQ==