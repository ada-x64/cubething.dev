let timeout = null;
let mainMouseover = false;
let articleMouseover = false;

document.addEventListener("DOMContentLoaded", () => {
  const mainNav = document.getElementById("main-nav");
  const articleNav = document.getElementById("article-nav");

  mainNav.onmouseover = () => {
    mainNav.style.opacity = "1";
    mainMouseover = true;
  };
  mainNav.onmouseleave = () => {
    mainNav.style.opacity = "0";
    mainMouseover = false;
  };

  articleNav.onmouseover = () => {
    articleNav.style.opacity = "1";
    articleMouseover = true;
  };
  articleNav.onmouseleave = () => {
    articleNav.style.opacity = "0";
    articleMouseover = false;
  };

  const showNavs = () => {
    mainNav.style.opacity = "1";
    articleNav.style.opacity = "1";
  };
  const hideNavs = () => {
    if (mainMouseover === false) {
      mainNav.style.opacity = "0";
    }
    if (articleMouseover === false) {
      articleNav.style.opacity = "0";
    }
    timeout = null;
  };
  window.onmousemove = () => {
    showNavs();
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    if (window.scrollY !== 0) {
      timeout = setTimeout(hideNavs, 1000);
    }
  };
  window.onscroll = () => {
    if (window.scrollY === 0) {
      showNavs();
    }
  };
});
