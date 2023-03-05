let lastScrollY = window.scrollY;
let lastScrollDirection = 0;
let timeoutId = null;
document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    const header = document.getElementById("header");
    const mainNav = document.getElementById("main-nav");
    const articleNav = document.getElementById("article-nav");

    const setNavSmall = () => {
      // set header to text-3xl
      header.style.fontSize = "1.875rem";
      header.style.lineHeight = "2.25rem";
      // hide navs
      mainNav.style.opacity = "0";
      mainNav.style.visibility = "collapse";
      articleNav.style.opacity = "0";
      articleNav.style.visibility = "collapse";
    };

    const setNavBig = () => {
      // set header to text-4xl
      header.style.fontSize = "2.25rem";
      header.style.lineHeight = "2.5rem";
      // show navs
      mainNav.style.opacity = "1";
      mainNav.style.visibility = "visible";
      articleNav.style.opacity = "1";
      articleNav.style.visibility = "visible";
    };

    const onScroll = () => {
      if (timeoutId === null) {
        const scrollY = Math.floor(window.scrollY);
        const scrollDirection = Math.sign(scrollY - lastScrollY);
        if (lastScrollDirection != scrollDirection) {
          (scrollDirection > 0) ? setNavSmall() : setNavBig();
        }
        lastScrollY = scrollY;
        lastScrollDirection = scrollDirection;
        timeoutId = setTimeout(() => {
          timeoutId = null;
        }, 500);
      }
    };

    window.onscroll = () => onScroll();

    setNavBig();
  }
};
