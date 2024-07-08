(function () {
    // Get all disclosures on a page.
    const disclosures = document.querySelectorAll('[data-disclosure]');

    disclosures.forEach(disclosure => {
        // Get the panel.
        const panel = disclosure.querySelector('[data-disclosure-panel]');
        // Get the title.
        const title = disclosure.querySelector('[data-disclosure-title]');
        // Get the text string of the title.
        const titleText = title.innerHTML;
        // Create a unique id.
        const id = Math.random().toString(16).slice(2);

        // Wrap the title with a `<button>`.
        title.innerHTML = `
            <button type="button" aria-expanded="false" aria-controls="${id}">
                <span>${titleText}</span>
                <svg width="24" height="16" viewBox="-2 -2 14 12" aria-hidden="true">
                    <g fill="none" transform="rotate(-90 6 4)">
                        <path fill="currentColor" d="M1.41.59l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
                        <path d="M-6-8h24v24h-24z" />
                    </g>
                </svg>
            </button>
        `;

        // Get the trigger.
        const trigger = title.querySelector('button');

        // Assign the id to the panel and as `aria-controls` value to the trigger.
        panel.id = id;

        // Collapse the panel by default.
        panel.hidden = true;

        trigger.addEventListener('click', (e) => {
            const trigger = e.currentTarget;
            // Toggle `aria-expanded` attribute and hide/show corresponding panel
            if (trigger.getAttribute('aria-expanded') === 'true') {
                trigger.setAttribute('aria-expanded', 'false');
                panel.hidden = true;
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                panel.hidden = false;
            }
        });
    })
})();
