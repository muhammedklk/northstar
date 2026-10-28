(() => {
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];

    // Mobile navigation toggle
    const menu = $('.menu');
    const nav = $('.nav');
    if (menu && nav) {
        menu.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            menu.setAttribute('aria-expanded', String(open));
            menu.textContent = open ? '✕' : '☰';
        });
    }

    // Sticky header shadow on scroll
    const headerBar = $('.header-bar');
    if (headerBar) {
        const updateStickyShadow = () => {
            if (window.scrollY > 8) {
                headerBar.classList.add('scrolled');
            } else {
                headerBar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', updateStickyShadow, { passive: true });
        updateStickyShadow();
    }

    // Services dropdown: identical experience on hover AND click
    // Clicking the "Services" trigger toggles the dropdown, while clicking any inner service link navigates to that page
    $$('.has-dropdown').forEach(drop => {
        const trigger = drop.querySelector('.nav-link');
        if (trigger) {
            trigger.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                const isOpen = drop.classList.contains('open');
                // Close other dropdowns if any
                $$('.has-dropdown.open').forEach(d => {
                    if (d !== drop) d.classList.remove('open');
                });
                drop.classList.toggle('open', !isOpen);
            });
        }
    });

    // Clicking anywhere outside closes any open dropdown
    document.addEventListener('click', e => {
        if (!e.target.closest('.has-dropdown')) {
            $$('.has-dropdown.open').forEach(drop => drop.classList.remove('open'));
        }
    });

    // Pressing Escape closes open dropdowns
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            $$('.has-dropdown.open').forEach(drop => drop.classList.remove('open'));
        }
    });

    // Reveal animations on scroll
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('IntersectionObserver' in window && !reduced) {
        const ob = new IntersectionObserver(es => {
            es.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    ob.unobserve(e.target);
                }
            });
        }, { threshold: .12 });
        $$('.reveal').forEach(x => ob.observe(x));
    } else {
        $$('.reveal').forEach(x => x.classList.add('visible'));
    }

    // Metric counter animation
    const counters = $$('[data-count]');
    const animate = el => {
        let end = +el.dataset.count;
        let suffix = el.dataset.suffix || '';
        let dec = +(el.dataset.decimal || 0);
        let start = performance.now();
        function f(now) {
            let p = Math.min(1, (now - start) / 1200);
            let v = end * (1 - Math.pow(1 - p, 3));
            el.textContent = (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US')) + suffix;
            if (p < 1) requestAnimationFrame(f);
        }
        requestAnimationFrame(f);
    };

    if ('IntersectionObserver' in window) {
        let co = new IntersectionObserver(es => {
            es.forEach(e => {
                if (e.isIntersecting) {
                    animate(e.target);
                    co.unobserve(e.target);
                }
            });
        });
        counters.forEach(c => co.observe(c));
    } else {
        counters.forEach(animate);
    }

    // Tracking form
    const tf = $('#trackingForm');
    if (tf) {
        tf.addEventListener('submit', e => {
            e.preventDefault();
            let code = $('#trackingCode').value.trim();
            if (!code) return;
            let stages = ['Booking confirmed', 'Picked up', 'In transit', 'Delivered'];
            let n = [...code].reduce((a, c) => a + c.charCodeAt(0), 0) % 4;
            let cur = Math.max(1, Math.min(3, n));
            $('#resultCode').textContent = code.toUpperCase();
            $('#trackingStage').textContent = stages[cur];
            $('#trackingLocation').textContent = ['Rotterdam logistics hub', 'Singapore port', 'Dubai distribution centre', 'Destination facility'][n];
            $('#trackingETA').textContent = n === 3 ? 'Delivered — demo status' : 'Estimated arrival: ' + (3 + n * 2) + ' business days';
            $('#trackingProgress').innerHTML = stages.map((s, i) => `<span style="background:${i <= cur ? '#f05b35' : '#ffffff20'}"></span>`).join('');
            $('#trackingStages').innerHTML = stages.map((s, i) => `<div><strong>${i <= cur ? '✓' : '○'} ${s}</strong>${['Registered', 'Origin handling', 'Network transit', 'Final handoff'][i]}</div>`).join('');
            $('#trackingResult').classList.add('show');
        });
    }

    // Contact form
    const cf = $('#contactForm');
    if (cf) {
        cf.addEventListener('submit', e => {
            e.preventDefault();
            if (!cf.reportValidity()) return;
            let d = Object.fromEntries(new FormData(cf).entries());
            let subject = encodeURIComponent('Logistics enquiry — ' + (d.company || d.name));
            let body = encodeURIComponent(`Name: ${d.name}\nCompany: ${d.company || 'Not provided'}\nEmail: ${d.email}\nService: ${d.service}\nShipment: ${d.volume || 'Not provided'}\nMessage: ${d.message}`);
            $('#formNotice').textContent = 'Opening an email draft. This demo does not submit information to a server.';
            $('#formNotice').classList.add('show');
            location.href = `mailto:hello@northstar.example?subject=${subject}&body=${body}`;
        });
    }

    // Newsletter form
    const nf = $('#newsletterForm');
    if (nf) {
        nf.addEventListener('submit', e => {
            e.preventDefault();
            $('#newsletterNotice').textContent = 'Thanks! Connect this form to your email platform to collect subscribers.';
            nf.reset();
        });
    }
})();
