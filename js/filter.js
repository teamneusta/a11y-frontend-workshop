(function () {
    const filters = document.querySelectorAll('[data-filter]');
    filters.forEach(filter => {
        const buttons = filter.querySelectorAll('[data-filter-target]');
        const filterId = filter.dataset.filter;
        const itemsContainer = document.getElementById(filterId);
        const items = itemsContainer.querySelectorAll('[data-filter-item]');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const target = button.dataset.filterTarget;
                buttons.forEach(button => {
                    button.setAttribute('aria-pressed', 'false');
                })
                button.setAttribute('aria-pressed', 'true');
                items.forEach(item => {
                    item.hidden = true;
                })
                let currentTargets = itemsContainer.querySelectorAll(`[data-filter-item="${target}"]`);
                if (target == "*") {
                    currentTargets = itemsContainer.querySelectorAll(`[data-filter-item]`);
                }
                currentTargets.forEach(currentTarget => {
                    currentTarget.hidden = false;
                })
            })
        })
    })
})();
