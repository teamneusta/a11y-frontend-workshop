(function () {
    const disclosures = document.querySelectorAll('[data-disclosure]');
    disclosures.forEach(disclosure => {
        const title = disclosure.querySelector('[data-disclosure-title]');
        const panel = disclosure.querySelector('[data-disclosure-panel]');
        title.classList.add('is-hidden');
        panel.hidden = true;
        title.addEventListener('click', (e) => {
            if (e.currentTarget.classList.contains('is-hidden')) {
                e.currentTarget.classList.remove('is-hidden');
                panel.hidden = false;
            } else {
                e.currentTarget.classList.add('is-hidden');
                panel.hidden = true;
            }
        })
    })
})();
