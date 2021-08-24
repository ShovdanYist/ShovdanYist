/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single scss file (app.scss in this case)
import '../scss/app.scss';

// Awesome fonts
require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';
let $ = require('jquery');
global.$ = global.jQuery = $;

// Bootstrap js
require('bootstrap');

// My scripts
import './scripts';

// Enable tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        trigger : 'hover'
    })
});

// MediaElement.js Player
import './player';

// Image on change
if (document.querySelector('.custom-file-input')) {
    let fileInput = document.querySelector('.custom-file-input');
    if (document.getElementById('articleImgOutput')) {
        let articleImgOutput = document.getElementById('articleImgOutput');
        fileInput.onchange = () => {
            articleImgOutput.src = window.URL.createObjectURL(fileInput.files[0]);
            articleImgOutput.style.marginBottom = '8px';
        };
    } else if (document.getElementById('output-content')) {
        let outputContent = document.getElementById('output-content');
        fileInput.onchange = () => {
            outputContent.style.backgroundImage = 'url(\'' + window.URL.createObjectURL(fileInput.files[0]) + '\')';
        };
    }
}

// Textarea autosize
if (document.querySelector('.md-autosizer')) {
    let textarea = document.querySelector('.md-autosizer');
    textarea.oninput = () => {
        textarea.style.height = textarea.scrollHeight + 2 + "px";
    };
}

// Auto close alerts
$(".md-alert-autohide").fadeTo(5000, 500).slideUp(500, function(){
    $(".md-alert-autohide").slideUp(500);
});
