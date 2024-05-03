(function () {
    const navigation = document.querySelector('[data-navigation]');
    const topLevelItems = navigation.querySelectorAll('[data-navigation-top-level-item]');

    const icon = `<svg width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.293 9.707l6 6c0.391 0.391 1.024 0.391 1.414 0l6-6c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path></svg>`;

    topLevelItems.forEach(item => {
        const text = item.innerText;
        const parent = item.parentElement;
        const subList = parent.querySelector('[data-navigation-sub-list]');
        const id = Math.floor(Math.random() * 999);

        subList.id = id;
        subList.hidden = true;

        let button = document.createElement('button');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', id);
        button.setAttribute('class', 'c-navigation__link');
        button.innerText = text;
        button.innerHTML += icon;

        item.replaceWith(button);

        button.addEventListener('click', (e) => {
            toggleDropdown(button, subList);
        })

        subList.addEventListener('keydown', (e) => {
            e.stopImmediatePropagation(); // so that only the list itself closes, not its parent list (in the case of 3+ levels deep nested links)
            if (e.code === 'Escape' && subList.contains(document.activeElement)) {
                toggleDropdown(button, subList);
                button.focus();
            }
        }, false );
    });

    const dropdowns = document.querySelectorAll('[data-navigation-sub-list]');

    // if user tabs out of the navigation, close all open dropdowns
    document.addEventListener('keyup', collapseDropdownsWhenTabbingOutsideNav);

    // if user clicks anywhere outside the navigation, close all open dropdowns
    window.addEventListener('click', collapseDropdownsWhenClickingOutsideNav);

    function toggleDropdown(trigger, dropdown) {
        if (trigger.getAttribute('aria-expanded') === 'true') {
            trigger.setAttribute('aria-expanded', 'false');
            dropdown.hidden = true;
        } else {
            trigger.setAttribute('aria-expanded', 'true');
            dropdown.hidden = false;
        }
    }

    function collapseDropdownsWhenTabbingOutsideNav(e) {
        let target = e.target;
        if (e.keyCode === 9 && !navigation.contains(document.activeElement)) {
            dropdowns.forEach(function (dropdown) {
                dropdown.setAttribute('hidden', '');
                let btn = dropdown.parentNode.querySelector('button');
                btn.setAttribute('aria-expanded', 'false');
            });
        }
    }

    function collapseDropdownsWhenClickingOutsideNav(e) {
        let target = e.target;
        dropdowns.forEach(function (dropdown) {
            if (!dropdown.parentNode.contains(target)) {
                dropdown.setAttribute('hidden', '');
                let btn = dropdown.parentNode.querySelector('button');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // small screen
    const navList = document.querySelector('[data-navigation-list]');
    const toggle = document.querySelector('[data-navigation-toggle]');

    toggle.addEventListener('click', (e) => {
        const trigger = e.currentTarget;
        if (trigger.getAttribute('aria-expanded') === 'true') {
            trigger.setAttribute('aria-expanded', 'false');
        } else {
            trigger.setAttribute('aria-expanded', 'true');
        }
    });
})();
