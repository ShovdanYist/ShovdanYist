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
  sideNav.style.width = '240px';
  sideNavBack.style.opacity = '1';
  sideNavCloser.style.width = '100%';
}

function closeNav() {
  enableScroll();
  sideNav.style.width = '0';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU8sQ0FBQ0csZUFBUixDQUF3QixPQUF4QjtBQUNBTixJQUFBQSxZQUFZLENBQUN0QyxTQUFiLENBQXVCRSxNQUF2QixDQUE4QixhQUE5QjtBQUNILEdBSEQ7QUFJSDs7QUFFRCxJQUFJc0MsWUFBSixFQUFrQjtBQUNkQSxFQUFBQSxZQUFZLENBQUMxQixPQUFiLENBQXFCLFVBQUMrQixLQUFELEVBQVc7QUFDNUIsUUFBSUMsU0FBUyxHQUFHRCxLQUFLLENBQUN0RyxhQUFOLENBQW9CLGFBQXBCLENBQWhCO0FBQ0FzRyxJQUFBQSxLQUFLLENBQUM5QixnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDOEIsS0FBRCxFQUFXO0FBQ3ZDSixNQUFBQSxPQUFPLENBQUNNLEtBQVIsR0FBZ0JELFNBQVMsQ0FBQ0UsU0FBMUI7QUFDQVQsTUFBQUEsZUFBZSxDQUFDVSxLQUFoQjs7QUFFQSxVQUFJUixPQUFPLENBQUNNLEtBQVIsS0FBa0IsRUFBdEIsRUFBMEI7QUFDdEJULFFBQUFBLFlBQVksQ0FBQ3RDLFNBQWIsQ0FBdUJDLEdBQXZCLENBQTJCLGFBQTNCO0FBQ0F5QyxRQUFBQSxnQkFBZ0IsQ0FBQ00sU0FBakIsR0FBNkJQLE9BQU8sQ0FBQ00sS0FBckM7QUFDSDtBQUNKLEtBUkQ7QUFTSCxHQVhEO0FBWUg7Ozs7Ozs7Ozs7OztBQzlGRCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2Nzcy9hcHAuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxuICpcbiAqIFdlIHJlY29tbWVuZCBpbmNsdWRpbmcgdGhlIGJ1aWx0IHZlcnNpb24gb2YgdGhpcyBKYXZhU2NyaXB0IGZpbGVcbiAqIChhbmQgaXRzIENTUyBmaWxlKSBpbiB5b3VyIGJhc2UgbGF5b3V0IChiYXNlLmh0bWwudHdpZykuXG4gKi9cblxuLy8gYW55IENTUyB5b3UgaW1wb3J0IHdpbGwgb3V0cHV0IGludG8gYSBzaW5nbGUgc2NzcyBmaWxlIChhcHAuc2NzcyBpbiB0aGlzIGNhc2UpXG5pbXBvcnQgJy4uL3Njc3MvYXBwLnNjc3MnO1xuXG4vLyBBd2Vzb21lIGZvbnRzXG5yZXF1aXJlKCdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLm1pbi5jc3MnKTtcbnJlcXVpcmUoJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2pzL2FsbC5qcycpO1xuXG4vLyBOZWVkIGpRdWVyeT8gSW5zdGFsbCBpdCB3aXRoIFwieWFybiBhZGQganF1ZXJ5XCIsIHRoZW4gdW5jb21tZW50IHRvIGltcG9ydCBpdC5cbi8vIGltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5sZXQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuZ2xvYmFsLiQgPSBnbG9iYWwualF1ZXJ5ID0gJDtcblxuLy8gQm9vdHN0cmFwIGpzXG5yZXF1aXJlKCdib290c3RyYXAnKTtcblxuLy8gTXkgc2NyaXB0c1xuaW1wb3J0ICcuL3NjcmlwdHMnO1xuXG4vLyBFbmFibGUgdG9vbHRpcFxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe1xuICAgICAgICB0cmlnZ2VyIDogJ2hvdmVyJ1xuICAgIH0pXG59KTtcblxuLy8gTWVkaWFFbGVtZW50LmpzIFBsYXllclxuaW1wb3J0ICcuL3BsYXllcic7XG5cbi8vIEltYWdlIG9uIGNoYW5nZVxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tZmlsZS1pbnB1dCcpKSB7XG4gICAgbGV0IGZpbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tZmlsZS1pbnB1dCcpO1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJ0aWNsZUltZ091dHB1dCcpKSB7XG4gICAgICAgIGxldCBhcnRpY2xlSW1nT3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FydGljbGVJbWdPdXRwdXQnKTtcbiAgICAgICAgZmlsZUlucHV0Lm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgYXJ0aWNsZUltZ091dHB1dC5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlSW5wdXQuZmlsZXNbMF0pO1xuICAgICAgICAgICAgYXJ0aWNsZUltZ091dHB1dC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnOHB4JztcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQtY29udGVudCcpKSB7XG4gICAgICAgIGxldCBvdXRwdXRDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dC1jb250ZW50Jyk7XG4gICAgICAgIGZpbGVJbnB1dC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIG91dHB1dENvbnRlbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcXCcnICsgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZUlucHV0LmZpbGVzWzBdKSArICdcXCcpJztcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIFRleHRhcmVhIGF1dG9zaXplXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWF1dG9zaXplcicpKSB7XG4gICAgbGV0IHRleHRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWF1dG9zaXplcicpO1xuICAgIHRleHRhcmVhLm9uaW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLmhlaWdodCA9IHRleHRhcmVhLnNjcm9sbEhlaWdodCArIDIgKyBcInB4XCI7XG4gICAgfTtcbn1cblxuLy8gQXV0byBjbG9zZSBhbGVydHNcbiQoXCIubWQtYWxlcnQtYXV0b2hpZGVcIikuZmFkZVRvKDUwMDAsIDUwMCkuc2xpZGVVcCg1MDAsIGZ1bmN0aW9uKCl7XG4gICAgJChcIi5tZC1hbGVydC1hdXRvaGlkZVwiKS5zbGlkZVVwKDUwMCk7XG59KTtcblxuLy8gUHJldmVudCB1c2VybmFtZSBzeW1ib2xzXG4kKCcudXNlcm5hbWUtaW5wdXQnKS5vbigna2V5cHJlc3MnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKFwiXlthLXpBLVowLTkuX10rJFwiKTtcbiAgICBsZXQga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZSghZXZlbnQuY2hhckNvZGUgPyBldmVudC53aGljaCA6IGV2ZW50LmNoYXJDb2RlKTtcbiAgICBpZiAoIXJlZ2V4LnRlc3Qoa2V5KSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSk7XG4iLCJyZXF1aXJlKCdtZWRpYWVsZW1lbnQvYnVpbGQvbWVkaWFlbGVtZW50LWFuZC1wbGF5ZXIubWluJyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICQoJy5hdWRpby1wbGF5ZXIgYXVkaW8nKS5tZWRpYWVsZW1lbnRwbGF5ZXIoe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihwbGF5ZXIsIG5vZGUpIHtcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsXG4gICAgICAgICAgICAkKHBsYXllcikuY2xvc2VzdCgnLm1lanNfX2NvbnRhaW5lcicpLmF0dHIoJ2xhbmcnLCBtZWpzLmkxOG4ubGFuZ3VhZ2UoKSk7XG4gICAgICAgICAgICAkKCdodG1sJykuYXR0cignbGFuZycsIG1lanMuaTE4bi5sYW5ndWFnZSgpKTtcbiAgICAgICAgICAgIC8vIE1vcmUgY29kZVxuICAgICAgICB9LFxuICAgICAgICBzdGFydFZvbHVtZTogMSxcbiAgICAgICAgYXV0b1Jld2luZDogdHJ1ZSxcbiAgICAgICAgZW5hYmxlUHJvZ3Jlc3NUb29sdGlwOiBmYWxzZSxcbiAgICAgICAgZmVhdHVyZXM6IFsncGxheXBhdXNlJywnW2ZlYXR1cmVfbmFtZV0nLCdjdXJyZW50JywncHJvZ3Jlc3MnLCdkdXJhdGlvbiddXG4gICAgfSlcbn0pO1xuXG5jb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJykuZGVmYXVsdDtcblxubGV0IHBsYXlsaXN0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWxpc3QtdG9nZ2xlJyk7XG5sZXQgYm9va21hcmtlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib29rbWFyay10b2dnbGUnKTtcblxuZnVuY3Rpb24gc3dpdGNoZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSB0aGlzLmhyZWY7XG5cbiAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgc3RhdHVzID0gU3RyaW5nKHJlc3BvbnNlLmRhdGEucmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgKHN0YXR1cyA9PT0gJ2FkZGVkJykgPyB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJykgOiB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XG4gICAgICAgIHRoaXMuZGF0YXNldC5vcmlnaW5hbFRpdGxlID0gcmVzcG9uc2UuZGF0YS5yZXNwb25zZS50aXRsZTtcbiAgICAgICAgdGhpcy5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXG4gICAgICAgIGxldCBhbGVydEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC1icmVhZGNydW1iJyk7XG4gICAgICAgIGxldCBhbGVydEV4aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWFsZXJ0Jyk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVzcG9uc2UubWVzc2FnZSkge1xuICAgICAgICAgICAgbGV0IGJhZGdlID0gJyc7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5yZXNwb25zZS5zdGF0dXMgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgICAgICBiYWRnZSA9ICdzdWNjZXNzJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFkZ2UgPSAnZGFuZ2VyJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnPGRpdiBjbGFzcz1cIm1kLWFsZXJ0IG1kLWFsZXJ0LScgKyBiYWRnZSArICcgbWQtYm94LW1iXCI+JyArXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5yZXNwb25zZS5tZXNzYWdlICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JztcblxuICAgICAgICAgICAgaWYgKGFsZXJ0RXhpc3QpIHtcbiAgICAgICAgICAgICAgICBhbGVydEV4aXN0Lm91dGVySFRNTCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0Qm94Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJChcIi5tZC1hbGVydFwiKS5mYWRlVG8oMzAwMCwgNTAwKS5zbGlkZVVwKDUwMCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKFwiLm1kLWFsZXJ0XCIpLnNsaWRlVXAoNTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBbdGhpc10uZm9yRWFjaCgoc3dpdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KVxufVxuXG5wbGF5bGlzdGVyLmZvckVhY2goKHBsYXlsaXN0ZXIpID0+IHtcbiAgICBwbGF5bGlzdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpdGNoZXIpO1xufSk7XG5cbmJvb2ttYXJrZXIuZm9yRWFjaCgoYm9va21hcmtlcikgPT4ge1xuICAgIGJvb2ttYXJrZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2l0Y2hlcik7XG59KTtcbiIsIi8vIFByZXZlbnQgc2Nyb2xsXG5cbmxldCBrZXlzID0gezM3OiAxLCAzODogMSwgMzk6IDEsIDQwOiAxfTtcblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzKGUpIHtcbiAgICBpZiAoa2V5c1tlLmtleUNvZGVdKSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5sZXQgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG50cnkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidGVzdFwiLCBudWxsLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTsgfVxuICAgIH0pKTtcbn0gY2F0Y2goZSkge31cblxubGV0IHdoZWVsT3B0ID0gc3VwcG9ydHNQYXNzaXZlID8geyBwYXNzaXZlOiBmYWxzZSB9IDogZmFsc2U7XG5sZXQgd2hlZWxFdmVudCA9ICdvbndoZWVsJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA/ICd3aGVlbCcgOiAnbW91c2V3aGVlbCc7XG5cbmZ1bmN0aW9uIGRpc2FibGVTY3JvbGwoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTsgLy8gb2xkZXIgRkZcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcih3aGVlbEV2ZW50LCBwcmV2ZW50RGVmYXVsdCwgd2hlZWxPcHQpOyAvLyBtb2Rlcm4gZGVza3RvcFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBwcmV2ZW50RGVmYXVsdCwgd2hlZWxPcHQpOyAvLyBtb2JpbGVcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cywgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBlbmFibGVTY3JvbGwoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcih3aGVlbEV2ZW50LCBwcmV2ZW50RGVmYXVsdCwgd2hlZWxPcHQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBwcmV2ZW50RGVmYXVsdCwgd2hlZWxPcHQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzLCBmYWxzZSk7XG59XG5cbi8vIE1vYmlsZSBuYXZiYXJcblxuY29uc3Qgc2lkZU5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlTmF2Jyk7XG5jb25zdCBzaWRlTmF2T3BlbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGVOYXZPcGVuZXInKTtcbmNvbnN0IHNpZGVOYXZDbG9zZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdkNsb3NlcicpO1xuY29uc3Qgc2lkZU5hdkJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZU5hdkJhY2snKTtcblxuZnVuY3Rpb24gb3Blbk5hdigpIHtcbiAgICBkaXNhYmxlU2Nyb2xsKCk7XG4gICAgc2lkZU5hdi5zdHlsZS53aWR0aCA9ICcyNDBweCc7XG4gICAgc2lkZU5hdkJhY2suc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICBzaWRlTmF2Q2xvc2VyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5hdigpIHtcbiAgICBlbmFibGVTY3JvbGwoKTtcbiAgICBzaWRlTmF2LnN0eWxlLndpZHRoID0gJzAnO1xuICAgIHNpZGVOYXZCYWNrLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgc2lkZU5hdkNsb3Nlci5zdHlsZS53aWR0aCA9ICcwJztcbn1cblxuaWYgKHNpZGVOYXYpIHtcbiAgICBzaWRlTmF2T3BlbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk5hdik7XG4gICAgc2lkZU5hdkNsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTmF2KTtcbn1cblxuLy8gQ29tbWVudCByZXBseVxuXG5jb25zdCBjb21tZW50V3JpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtY29tbWVudC13cml0ZScpO1xuY29uc3QgY29tbWVudFRleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnRfbWVzc2FnZScpO1xuY29uc3QgY29tbWVudFJlcGx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnQtcmVwbHknKTtcbmNvbnN0IHJlcGx5VG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudF9yZXBseVRvJyk7XG5jb25zdCBjb21tZW50UmVwbHlVc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kLWNvbW1lbnQtcmVwbHktdXNlcicpO1xuY29uc3QgcmVwbHlpbmdEZWxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWQtcmVwbHlpbmctZGVsZXRlJyk7XG5cbmlmIChyZXBseWluZ0RlbGV0ZSkge1xuICAgIHJlcGx5aW5nRGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICByZXBseVRvLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgY29tbWVudFdyaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ21kLXJlcGx5aW5nJyk7XG4gICAgfSk7XG59XG5cbmlmIChjb21tZW50UmVwbHkpIHtcbiAgICBjb21tZW50UmVwbHkuZm9yRWFjaCgocmVwbHkpID0+IHtcbiAgICAgICAgbGV0IHJlcGx5VXNlciA9IHJlcGx5LnF1ZXJ5U2VsZWN0b3IoJy5yZXBseS11c2VyJyk7XG4gICAgICAgIHJlcGx5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKHJlcGx5KSA9PiB7XG4gICAgICAgICAgICByZXBseVRvLnZhbHVlID0gcmVwbHlVc2VyLmlubmVySFRNTDtcbiAgICAgICAgICAgIGNvbW1lbnRUZXh0QXJlYS5mb2N1cygpO1xuXG4gICAgICAgICAgICBpZiAocmVwbHlUby52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBjb21tZW50V3JpdGUuY2xhc3NMaXN0LmFkZCgnbWQtcmVwbHlpbmcnKTtcbiAgICAgICAgICAgICAgICBjb21tZW50UmVwbHlVc2VyLmlubmVySFRNTCA9IHJlcGx5VG8udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJnbG9iYWwiLCJqUXVlcnkiLCJ0b29sdGlwIiwidHJpZ2dlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZpbGVJbnB1dCIsImdldEVsZW1lbnRCeUlkIiwiYXJ0aWNsZUltZ091dHB1dCIsIm9uY2hhbmdlIiwic3JjIiwid2luZG93IiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiZmlsZXMiLCJzdHlsZSIsIm1hcmdpbkJvdHRvbSIsIm91dHB1dENvbnRlbnQiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJ0ZXh0YXJlYSIsIm9uaW5wdXQiLCJoZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJmYWRlVG8iLCJzbGlkZVVwIiwib24iLCJldmVudCIsInJlZ2V4IiwiUmVnRXhwIiwia2V5IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGUiLCJ3aGljaCIsInRlc3QiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwibWVkaWFlbGVtZW50cGxheWVyIiwic3VjY2VzcyIsInBsYXllciIsIm5vZGUiLCJjbG9zZXN0IiwiYXR0ciIsIm1lanMiLCJpMThuIiwibGFuZ3VhZ2UiLCJzdGFydFZvbHVtZSIsImF1dG9SZXdpbmQiLCJlbmFibGVQcm9ncmVzc1Rvb2x0aXAiLCJmZWF0dXJlcyIsImF4aW9zIiwicGxheWxpc3RlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJib29rbWFya2VyIiwic3dpdGNoZXIiLCJ1cmwiLCJocmVmIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwic3RhdHVzIiwiZGF0YSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRhdGFzZXQiLCJvcmlnaW5hbFRpdGxlIiwidGl0bGUiLCJwb2ludGVyRXZlbnRzIiwiYWxlcnRCb3giLCJhbGVydEV4aXN0IiwibWVzc2FnZSIsImJhZGdlIiwib3V0ZXJIVE1MIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwic2V0VGltZW91dCIsImZvckVhY2giLCJhZGRFdmVudExpc3RlbmVyIiwia2V5cyIsImUiLCJwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMiLCJrZXlDb2RlIiwic3VwcG9ydHNQYXNzaXZlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ3aGVlbE9wdCIsInBhc3NpdmUiLCJ3aGVlbEV2ZW50IiwiY3JlYXRlRWxlbWVudCIsImRpc2FibGVTY3JvbGwiLCJlbmFibGVTY3JvbGwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2lkZU5hdiIsInNpZGVOYXZPcGVuZXIiLCJzaWRlTmF2Q2xvc2VyIiwic2lkZU5hdkJhY2siLCJvcGVuTmF2Iiwid2lkdGgiLCJvcGFjaXR5IiwiY2xvc2VOYXYiLCJjb21tZW50V3JpdGUiLCJjb21tZW50VGV4dEFyZWEiLCJjb21tZW50UmVwbHkiLCJyZXBseVRvIiwiY29tbWVudFJlcGx5VXNlciIsInJlcGx5aW5nRGVsZXRlIiwicmVtb3ZlQXR0cmlidXRlIiwicmVwbHkiLCJyZXBseVVzZXIiLCJ2YWx1ZSIsImlubmVySFRNTCIsImZvY3VzIl0sInNvdXJjZVJvb3QiOiIifQ==