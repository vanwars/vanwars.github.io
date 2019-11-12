const attachEventHandlers = () => {
    for (elem of document.querySelectorAll('nav')) {
        elem.onclick = () => {
            document.querySelector('nav').classList.remove('mobile');
        }
    }

    document.querySelector('.menu-toggle').onclick = (e) => {
        document.querySelector('nav').classList.toggle('mobile');
    };
};

attachEventHandlers();
