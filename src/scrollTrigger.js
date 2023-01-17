gsap.registerPlugin(ScrollTrigger);

gsap.to(".portfolio-title-properties", {
  x: 0,
  scrollTrigger: {
    trigger: ".portfolio-container",
    start: "top center",
    end: "top 100px",
    scrub: true,
    // markers: true,
    id: "scrub"
  }
});

gsap.to(".blog-title-properties", {
    x: 0,
    scrollTrigger: {
      trigger: ".blog-container",
      start: "top center",
      end: "top 100px",
      scrub: true,
    //   markers: true,
      id: "scrub"
    }
});

gsap.to(".about-title-properties", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".about-container",
      start: "top center",
      end: "top 100px",
      scrub: true,
    //   markers: true,
      id: "scrub"
    }
});


