let lastScrollY = window.scrollY;
let lastScrollDirection = 0;
let timeoutId = null;
document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    const header = document.getElementById("header");
    const mainNav = document.getElementById("main-nav");
    const articleNav = document.getElementById("article-nav");

    const hideNav = (nav) => {
      nav.style.opacity = "0";
      nav.onmouseleave = () => {
        nav.style.opacity = "0";
      };
      nav.onmouseenter = () => {
        nav.style.opacity = "1";
      };
    };

    const showNav = (nav) => {
      nav.style.opacity = "1";
      nav.onmouseleave = null;
      nav.onmouseenter = null;
    };

    const setNavSmall = () => {
      // set header to text-3xl
      header.style.fontSize = "1.875rem";
      header.style.lineHeight = "2.25rem";
      // hide navs
      hideNav(mainNav);
      hideNav(articleNav);
    };

    const setNavBig = () => {
      // set header to text-4xl
      header.style.fontSize = "2.25rem";
      header.style.lineHeight = "2.5rem";
      // hide navs
      showNav(mainNav);
      showNav(articleNav);
    };

    const onScroll = () => {
      if (timeoutId === null) {
        const scrollY = Math.floor(window.scrollY);
        const scrollDirection = Math.sign(scrollY - lastScrollY);
        if (lastScrollDirection != scrollDirection) {
          scrollDirection > 0 ? setNavSmall() : setNavBig();
        }
        lastScrollY = scrollY;
        lastScrollDirection = scrollDirection;
        timeoutId = setTimeout(() => {
          timeoutId = null;
        }, 250);
      }
    };

    window.onscroll = () => onScroll();
    mainNav.onmouseenter = () => {
      mainNav.style.opacity = "1";
    };
    mainNav.onmouseexit = () => {
      mainNav.style.opacity = "1";
    };
  }
};
