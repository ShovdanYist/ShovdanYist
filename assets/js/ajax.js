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

        let alertBox = document.querySelector('main');
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
                alertBox.insertAdjacentHTML('afterbegin', message);
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

let unfollow = document.querySelectorAll('.unfollow-toggle');

follow.forEach((follow) => {
    follow.addEventListener('click', follows);
});

function unfollows(event) {
    event.preventDefault();
    let url = this.href;
    let followerBlock = 'u' + this.id.split('u').pop().split('t')[0] + 'l';
    let cancelButtonId = 'userUnfollow' + this.id.split('u').pop().split('t')[0];
    document.getElementById(cancelButtonId).click();

    axios.get(url).then((response) => {
        let status = String(response.data.response.status);
        if (status === 'removed') {
            document.getElementById(followerBlock).remove();
        }
    })
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

// Post double-click like

document.querySelectorAll('.md-post').forEach((post) => {
    let postId = post.id.replace('postId', '');
    post.querySelector('.post-image').addEventListener('dblclick',(event) => {
        let postLiker = post.querySelector('.like-toggle');
        let url = postLiker.href;

        axios.get(url).then((response) => {
            let status = String(response.data.response.status);
            (status === 'added') ? postLiker.classList.add('added') : postLiker.classList.remove('added');

            let postLikeCounter = 'post-like-counter-' + postLiker.id.replace('post-like-','');
            let currentLikes = parseInt(document.getElementById(postLikeCounter).innerHTML);

            if (status === 'added') {
                post.querySelector('.post-liker').classList.add('like');
                setTimeout(() => {
                    post.querySelector('.post-liker').classList.remove('like');
                }, 1000);
                document.getElementById(postLikeCounter).innerHTML = currentLikes + 1;
            } else  {
                post.querySelector('.post-liker').classList.add('dislike');
                setTimeout(() => {
                    post.querySelector('.post-liker').classList.remove('dislike');
                }, 1000);
                document.getElementById(postLikeCounter).innerHTML = currentLikes - 1;
            }

            setTimeout(() => {
                [postLiker].forEach((switcher) => {
                    switcher.style.pointerEvents = 'auto';
                })
            }, 100);
        })
    });
});
