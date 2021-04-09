require('mediaelement/build/mediaelement-and-player.min');

$(document).ready(function() {
    $('.audio-player audio').mediaelementplayer({
        success: function(player, node) {
            // Optional
            $(player).closest('.mejs__container').attr('lang', mejs.i18n.language());
            $('html').attr('lang', mejs.i18n.language());
            // More code
        },
        startVolume: 1,
        autoRewind: true,
        enableProgressTooltip: false,
        features: ['playpause','[feature_name]','current','progress','duration']
    })
});

const axios = require('axios').default;

let playlister = document.querySelectorAll('.playlist-toggle');
let bookmarker = document.querySelectorAll('.bookmark-toggle');

function switcher(event) {
    event.preventDefault();
    let url = this.href;

    axios.get(url).then((response) => {
        let status = String(response.data.response.status);
        (status === 'added') ? this.classList.add('added') : this.classList.remove('added');
        this.dataset.originalTitle = response.data.response.title;
        this.style.pointerEvents = 'none';

        let alertBox = document.querySelector('.md-breadcrumb');
        let alertExist = document.querySelector('.md-alert');

        if (response.data.response.message) {
            let badge = '';
            if (response.data.response.status === 'added') {
                badge = 'success';
            } else {
                badge = 'danger';
            }

            let message = '<div class="md-alert md-alert-' + badge + ' md-box-mb">' +
                response.data.response.message +
                '</div>';

            if (alertExist) {
                alertExist.outerHTML = message;
            } else {
                alertBox.insertAdjacentHTML('afterend', message);
            }

            $(".md-alert").fadeTo(3000, 500).slideUp(500, function(){
                $(".md-alert").slideUp(500);
            });
        }

        setTimeout(() => {
            [this].forEach((switcher) => {
                switcher.style.pointerEvents = 'auto';
            })
        }, 100);
    })
}

playlister.forEach((playlister) => {
    playlister.addEventListener('click', switcher);
});

bookmarker.forEach((bookmarker) => {
    bookmarker.addEventListener('click', switcher);
});
