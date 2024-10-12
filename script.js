document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navigation a');

    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    changeLinkState();
    window.addEventListener('scroll', changeLinkState);
});

document.addEventListener('DOMContentLoaded', () => {
    const animateTexts = document.querySelectorAll('.animate-text');
    const skillBars = document.querySelectorAll('.skill-category li');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                if (entry.target.tagName === 'LI') {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, { threshold: 0.5 });

    animateTexts.forEach(text => observer.observe(text));
    skillBars.forEach(bar => observer.observe(bar));

    const animateElements = document.querySelectorAll('.animate-text, .contact-info, .contact-form');

            const observer1 = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, { threshold: 0.1 });

            animateElements.forEach(el => {
                el.style.animationPlayState = 'paused';
                observer1.observe(el);
            });
});