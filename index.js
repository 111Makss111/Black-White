"use strict"

window.addEventListener("load", windowLoad);

function windowLoad() {
    const saveUserTheme = localStorage.getItem('user-theme');
    let userTheme;

    if (window.matchMedia) {
        userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        !saveUserTheme ? changeTheme() : null;
    });

    const themeButton = document.querySelector('.page-theme');
    const resetButton = document.querySelector('.page-reset');
    const htmlBlock = document.documentElement;

    if (themeButton) {
        themeButton.addEventListener("click", function(e) {
            resetButton.classList.add('active');
            changeTheme(true);
        });
    }

    if (resetButton) {
        resetButton.addEventListener("click", function(e) {
            resetButton.classList.remove("active");
            localStorage.setItem('user-theme', '');
            htmlBlock.classList.remove('dark', 'light');
            htmlBlock.classList.add(userTheme);
        });
    }

    function setThemeClass() {
        if (saveUserTheme) {
            htmlBlock.classList.add(saveUserTheme);
            resetButton.classList.add('active');
        } else {
            htmlBlock.classList.add(userTheme);
        }
    }

    setThemeClass();

    function changeTheme(saveTheme = false) {
        let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlBlock.classList.remove(currentTheme);
        htmlBlock.classList.add(newTheme);

        if (saveTheme) {
            localStorage.setItem('user-theme', newTheme);
        }
    }
}
