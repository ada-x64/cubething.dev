let timeout = null;
let mainNavMouseOver = false;
let articleNavMouseOver = false;
let navsHidden = false;
document.addEventListener("DOMContentLoaded", () => {
  const mainNav = document.getElementById("main-nav");
  const articleNav = document.getElementById("article-nav");

  const onMouseLeave = (nav) => {
    if (navsHidden === true) {
      nav.style.opacity = "0";
    }
    return false;
  };
  const onMouseOver = (nav) => {
    if (navsHidden === true) {
      nav.style.opacity = "1";
    }
    return true;
  };

  mainNav.onmouseover = () => {
    mainNavMouseOver = onMouseOver(mainNav);
  };
  mainNav.onmouseleave = () => {
    mainNavMouseOver = onMouseLeave(mainNav);
  };
  articleNav.onmouseover = () => {
    articleNavMouseOver = onMouseOver(articleNav);
  };
  articleNav.onmouseleave = () => {
    articleNavMouseOver = onMouseLeave(articleNav);
  };

  const hideNav = (nav, mouseover) => {
    if (mouseover === false) {
      nav.style.opacity = "0";
    }
    navsHidden = true;
  };

  const showNav = (nav) => {
    nav.style.opacity = "1";
    navsHidden = false;
  };

  const hideNavs = () => {
    hideNav(mainNav, mainNavMouseOver);
    hideNav(articleNav, articleNavMouseOver);
  };

  const showNavs = () => {
    showNav(mainNav);
    showNav(articleNav);
  };

  const onScroll = () => {
    if (timeout == null) {
      showNavs();
      timeout = setTimeout(() => {
        if (window.scrollY > 0 || document.scrollY > 0) {
          hideNavs();
        }
        timeout = null;
      }, 2000);
    }
  };

  window.onscroll = () => onScroll();
  mainNav.addEventListener("focusin", showNavs);
  articleNav.addEventListener("focusin", showNavs);
  showNavs();
});
