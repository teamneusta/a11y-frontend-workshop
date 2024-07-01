(function () {
    // Get all tabbed components
    const allTabbed = document.querySelectorAll('[data-tabbed]');

    allTabbed.forEach(tabbed => {
        const tablist = tabbed.querySelector('ul');
        const listItems = tablist.querySelectorAll('li');
        const tabs = tablist.querySelectorAll('a');
        const panels = tabbed.querySelectorAll('section');



        // Assign ARIA roles
        tablist.setAttribute('role', 'tablist');
        listItems.forEach(listItem => {
            listItem.setAttribute('role', 'presentation');
        })
        tabs.forEach((tab, i) => {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('id', 'tab' + (i + 1));
            tab.setAttribute('tabindex', '-1');
        })
        panels.forEach((panel, i) => {
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('aria-labelledby', tabs[i].id);
            panel.setAttribute('tabindex', '-1');
            panel.hidden = true;
        })



        tabs.forEach((tab, i) => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                let currentTab = tablist.querySelector('[aria-selected]');
                if (e.currentTarget !== currentTab) {
                    switchTab(currentTab, e.currentTarget);
                }
            })

            tab.addEventListener('keydown', (e) => {
              // Get the index of the current tab in the tabs node list
              let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
              // Work out which key the user is pressing and
              // calculate the new tab's index where appropriate
              let dir = e.code === 'ArrowLeft' ? index - 1 : e.code === 'ArrowRight' ? index + 1 : e.code === 'ArrowDown' ? 'down' : null;
              if (dir !== null) {
                  e.preventDefault();
                  // If the down key is pressed, move focus to the open panel,
                  // otherwise switch to the adjacent tab
                  dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
              }
            });
        })



        // Initially activate the first tab and reveal the first tab panel
        tabs[0].removeAttribute('tabindex');
        tabs[0].setAttribute('aria-selected', 'true');
        panels[0].hidden = false;



        function switchTab(oldTab, newTab) {
            newTab.focus();
            // Make the active tab focusable by the user (Tab key)
            newTab.removeAttribute('tabindex');
            // Set the selected state
            newTab.setAttribute('aria-selected', 'true');
            oldTab.removeAttribute('aria-selected');
            oldTab.setAttribute('tabindex', '-1');
            // Get the indices of the new and old tabs to find the correct
            // tab panels to show and hide
            let index = Array.prototype.indexOf.call(tabs, newTab);
            let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
            panels[oldIndex].hidden = true;
            panels[index].hidden = false;
        }
    })
})();
