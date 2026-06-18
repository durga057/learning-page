let body = document.body;

// Profile popup toggle
let profile = document.querySelector('.header .flex .profile');
let userBtn = document.querySelector('#user-btn');
if (userBtn) {
    userBtn.onclick = () => {
        profile.classList.toggle('active');
        if (searchForm) searchForm.classList.remove('active');
    };
}

// Search form popup toggle
let searchForm = document.querySelector('.header .flex .search-form');
let searchBtn = document.querySelector('#search-btn');
if (searchBtn) {
    searchBtn.onclick = () => {
        searchForm.classList.toggle('active');
        if (profile) profile.classList.remove('active');
    };
}

// Sidebar toggle (hamburger menu)
let sideBar = document.querySelector('.side-bar');
let menuBtn = document.querySelector('#menu-btn');
if (menuBtn) {
    menuBtn.onclick = () => {
        sideBar.classList.toggle('active');
        body.classList.toggle('active');
    };
}

// Close sidebar button
let closeSideBar = document.querySelector('.side-bar .close-side-bar');
if (closeSideBar) {
    closeSideBar.onclick = () => {
        sideBar.classList.remove('active');
        body.classList.remove('active');
    };
}

// Window scroll behaviors (dismiss overlays on scroll)
window.onscroll = () => {
    if (profile) profile.classList.remove('active');
    if (searchForm) searchForm.classList.remove('active');

    if (window.innerWidth < 1200) {
        if (sideBar) sideBar.classList.remove('active');
        body.classList.remove('active');
    }
};

// Dark Mode Toggle Logic
let toggleBtn = document.querySelector('#toggle-btn');
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
    if (toggleBtn) {
        toggleBtn.classList.replace('fa-sun', 'fa-moon');
    }
    body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
};

const disableDarkMode = () => {
    if (toggleBtn) {
        toggleBtn.classList.replace('fa-moon', 'fa-sun');
    }
    body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
};

if (darkMode === 'enabled') {
    enableDarkMode();
} else {
    disableDarkMode();
}

if (toggleBtn) {
    toggleBtn.onclick = () => {
        let currentDarkMode = localStorage.getItem('dark-mode');
        if (currentDarkMode === 'enabled') {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    };
}

// Shared download function for resources
function downloadResource(filename, title) {
    // Client-side download trigger using an anchor tag
    const link = document.createElement('a');
    link.href = filename;
    link.download = title || filename.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
