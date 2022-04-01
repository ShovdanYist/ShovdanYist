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

// Share song

function shareMediaRequest(event) {
    let username = this.querySelector('.md-username').innerHTML;
    let song = document.getElementById('shareSongId').innerHTML;
    let url = '/shareSong/' + song + '/' + username;

    document.getElementById('shareSendUsername').innerHTML = username;
    document.getElementById('shareSongConfirmModal').querySelector('a').href = url;

    document.getElementById('shareSongModal').click();
    document.getElementById('shareSongConfirm').click();
}

function shareMedia(event) {
    event.preventDefault();
    let url = this.href;

    axios.get(url).then((response) => {
        document.getElementById('shareSongConfirmModal').click();

        let message = '<div class="md-alert md-alert-success md-box-mb">' +
            response.data.response.message +
            '</div>';

        let alertBox = document.querySelector('main');
        let alertExist = document.querySelector('.md-alert');

        if (alertExist) {
            alertExist.outerHTML = message;
        } else {
            alertBox.insertAdjacentHTML('afterbegin', message);
        }

        $(".md-alert").fadeTo(3000, 500).slideUp(500, function(){
            $(".md-alert").slideUp(500);
        });
    })
}

function shareMediaCancel(event) {
    event.preventDefault();
    document.getElementById('shareSongConfirmModal').click();
    document.getElementById('shareSongOpener').click();
}

let shareSongUsers = document.querySelectorAll('.user-share-media .user-line');
shareSongUsers.forEach((user) => {
    user.addEventListener('click', shareMediaRequest)
});

let shareSendButton = document.getElementById('shareSongConfirmButton');
if (shareSendButton) {
    shareSendButton.addEventListener('click', shareMedia);
}

let shareSendCancel = document.getElementById('shareSongCancel');
if (shareSendCancel) {
    shareSendCancel.addEventListener('click', shareMediaCancel);
}

// Share post

let sharePostButton = document.querySelectorAll('.share-post-button');

function sharePostButtonFunction() {
    document.getElementById('sharePostId').innerHTML = this.id.replace('sharePostId', '');
}

sharePostButton.forEach((sharePostButton) => {
    sharePostButton.addEventListener('click', sharePostButtonFunction)
});

let sharePostUsers = document.querySelectorAll('.user-share-media .user-line');

function sharePostModalFunction(event) {
    let username = this.querySelector('.md-username').innerHTML;
    let post = document.getElementById('sharePostId').innerHTML;
    let url = '/sharePost/' + post + '/' + username;

    console.log(url);

    document.getElementById('sharePostUsername').innerHTML = username;
    document.getElementById('sharePostConfirmModal').querySelector('a').href = url;

    document.getElementById('sharePostModal').click();
    document.getElementById('sharePostConfirm').click();
}

sharePostUsers.forEach((sharePostUsers) => {
    sharePostUsers.addEventListener('click', sharePostModalFunction)
})

let sharePostCancel = document.getElementById('sharePostCancel');

function sharePostCancelFunction() {
    document.getElementById('sharePostConfirmModal').click();
    document.getElementById('sharePostId' + document.getElementById('sharePostId').innerHTML).click();
}

if (sharePostCancel) {
    sharePostCancel.addEventListener('click', sharePostCancelFunction);
}

let sharePostConfirmButton = document.getElementById('sharePostConfirmButton');

function sharePostConfirmButtonFunction(event) {
    event.preventDefault();
    let url = this.href;

    axios.get(url).then((response) => {
        document.getElementById('sharePostConfirmModal').click();

        let message = '<div class="md-alert md-alert-success md-box-mb">' +
            response.data.response.message +
            '</div>';

        let alertBox = document.querySelector('main');
        let alertExist = document.querySelector('.md-alert');

        if (alertExist) {
            alertExist.outerHTML = message;
        } else {
            alertBox.insertAdjacentHTML('afterbegin', message);
        }

        $(".md-alert").fadeTo(3000, 500).slideUp(500, function(){
            $(".md-alert").slideUp(500);
        });
    })
}

if (sharePostConfirmButton) {
    sharePostConfirmButton.addEventListener('click', sharePostConfirmButtonFunction)
}

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
