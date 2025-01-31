var mybutton = document.getElementById("scrollTopBtn");

window.onscroll = function () {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        mybutton.classList.add("show");
    } else {
        mybutton.classList.remove("show");
    }
};

mybutton.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function revealBlocks() {
    let elements = document.querySelectorAll('.block, .login');
    let windowHeight = window.innerHeight;
    
    elements.forEach(el => {
        let elTop = el.getBoundingClientRect().top;
        if (elTop < windowHeight - 100) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealBlocks);
window.addEventListener('load', revealBlocks);