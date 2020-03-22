const attachEventHandlers = () => {
    for (elem of document.querySelectorAll('nav')) {
        elem.onclick = () => {
            document.querySelector('nav').classList.remove('mobile');
        }
    }

    document.querySelector('.menu-toggle').onclick = (e) => {
        document.querySelector('nav').classList.toggle('mobile');
    };

    for (elem of document.querySelectorAll('nav a')) {
        elem.onclick = scrollToAnchor;
    }

    window.onscroll = stickyToggle;
};

const scrollToAnchor = (ev) => {
    const distanceToTop = (el) => {
        return Math.floor(el.getBoundingClientRect().top);
    };
	var targetID = ev.target.getAttribute('href');
	const targetAnchor = document.querySelector(targetID);
    window.scrollBy({ top: distanceToTop(targetAnchor), left: 0, behavior: 'smooth' });
    ev.preventDefault();
}


const nav = document.querySelector("nav");
const main = document.querySelector("main");
const sticky = nav.offsetTop;

const stickyToggle = () => {
    if (window.pageYOffset > sticky) {
        nav.classList.add("sticky");
        main.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
        main.classList.remove("sticky");
    }
};
attachEventHandlers();
