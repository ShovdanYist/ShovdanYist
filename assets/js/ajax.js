const axios = require('axios').default;

// Add song to playlist or add post to bookmarks

let playlist = document.querySelectorAll('.playlist-toggle');
let bookmark = document.querySelectorAll('.bookmark-toggle');

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

playlist.forEach((playlist) => {
    playlist.addEventListener('click', switcher);
});

bookmark.forEach((bookmark) => {
    bookmark.addEventListener('click', switcher);
});

// Follow a user or unfollow from yourself

let follow = document.querySelectorAll('.follow-toggle');
let unfollow = document.querySelectorAll('.unfollow-toggle');

function follows(event) {
    event.preventDefault();
    let url = this.href;

    axios.get(url).then((response) => {
        let status = String(response.data.response.status);

        if (status === 'added') {
            this.classList.remove('btn-info');
            this.classList.add('btn-light');
            this.classList.add('followed');

            if (document.getElementById('profileFollowers')) {
                let followers = document.getElementById('profileFollowers').querySelector('.number').innerHTML;
                document.getElementById('profileFollowers').querySelector('.number').innerHTML = (parseInt(followers, 10) + 1).toString();
            }
        } else {
            this.classList.remove('btn-light');
            this.classList.remove('followed');
            this.classList.add('btn-info');

            if (document.getElementById('profileFollowers')) {
                let followers = document.getElementById('profileFollowers').querySelector('.number').innerHTML;
                document.getElementById('profileFollowers').querySelector('.number').innerHTML = (parseInt(followers, 10) - 1).toString();
            }
        }

        this.dataset.originalTitle = response.data.response.title;
        this.style.pointerEvents = 'none';

        setTimeout(() => {
            [this].forEach((switcher) => {
                switcher.style.pointerEvents = 'auto';
            })
        }, 100);
    })
}

follow.forEach((follow) => {
    follow.addEventListener('click', follows);
});

function unfollows(event) {
    event.preventDefault();
    if (confirm(this.title)) {
        let url = this.href;
        let followerBlock = 'u' + this.id.split('u').pop().split('t')[0] + 'l';

        axios.get(url).then((response) => {
            let status = String(response.data.response.status);
            if (status === 'removed') {
                document.getElementById(followerBlock).remove();
            }
        })
    }
}

unfollow.forEach((unfollow) => {
    unfollow.addEventListener('click', unfollows);
});

// Make post featured

let featured = document.querySelectorAll('.featured-toggle');

function featuredPost(event) {
    event.preventDefault();
    let url = this.href;

    axios.get(url).then((response) => {
        let status = String(response.data.response.status);
        (status === 'added') ? this.classList.add('added') : this.classList.remove('added');

        setTimeout(() => {
            [this].forEach((switcher) => {
                switcher.style.pointerEvents = 'auto';
            })
        }, 100);
    })
}

featured.forEach((featured) => {
    featured.addEventListener('click', featuredPost);
});

// Post like

let like = document.querySelectorAll('.like-toggle');

function likePost(event) {
    event.preventDefault();
    let url = this.href;

    axios.get(url).then((response) => {
        let status = String(response.data.response.status);
        (status === 'added') ? this.classList.add('added') : this.classList.remove('added');

        let postLikeCounter = 'post-like-counter-' + this.id.replace('post-like-','');
        let currentLikes = parseInt(document.getElementById(postLikeCounter).innerHTML);

        if (status === 'added') {
            document.getElementById(postLikeCounter).innerHTML = currentLikes + 1;
        } else  {
            document.getElementById(postLikeCounter).innerHTML = currentLikes - 1;
        }

        setTimeout(() => {
            [this].forEach((switcher) => {
                switcher.style.pointerEvents = 'auto';
            })
        }, 100);
    })
}

like.forEach((like) => {
    like.addEventListener('click', likePost);
});
