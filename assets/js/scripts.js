// Prevent scroll

let keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

let supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch(e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

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
}

// Mobile navbar

const sideNav = document.getElementById('sideNav');
const sideNavOpener = document.getElementById('sideNavOpener');
const sideNavCloser = document.getElementById('sideNavCloser');
const sideNavBack = document.getElementById('sideNavBack');

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
}

// Comment reply

const commentWrite = document.querySelector('.md-comment-write');
const commentTextArea = document.getElementById('comment_message');
const commentReply = document.querySelectorAll('.comment-reply');
const replyTo = document.getElementById('comment_replyTo');
const commentReplyUser = document.querySelector('.md-comment-reply-user');
const replyingDelete = document.querySelector('.md-replying-delete');

if (replyingDelete) {
    replyingDelete.addEventListener('click', () => {
        replyTo.removeAttribute('value');
        commentWrite.classList.remove('md-replying');
    });
}

if (commentReply) {
    commentReply.forEach((reply) => {
        let replyUser = reply.querySelector('.reply-user');
        reply.addEventListener('click', (reply) => {
            replyTo.value = replyUser.innerHTML;
            commentTextArea.focus();

            if (replyTo.value !== '') {
                commentWrite.classList.add('md-replying');
                commentReplyUser.innerHTML = replyTo.value;
            }
        })
    });
}
