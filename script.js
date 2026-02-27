const state = {
    data: null,
    lang: 'en',
    serviceFilter: 'all'
};

const DEFAULT_DATA = {
    meta: {
        name: 'Omar Maarouf',
        brand: 'ENTERPRISE.OS'
    },
    hero: {
        headline: {
            en: 'Security Engineering That Scales',
            ar: 'هندسة أمن سيبراني تتوسع بثقة'
        },
        subhead: {
            en: 'Offensive testing, hardening, and resilience for web, network, and mobile environments.',
            ar: 'اختبارات اختراق وتقوية الأنظمة والمرونة لتطبيقات الويب والشبكات وتطبيقات الجوال.'
        },
        ctaPrimary: {
            en: 'Explore services',
            ar: 'استكشف الخدمات'
        },
        ctaSecondary: {
            en: 'View projects',
            ar: 'عرض المشاريع'
        }
    },
    about: {
        title: {
            en: 'About Omar',
            ar: 'نبذة عن عمر'
        },
        body: {
            en: 'I am a security engineer focused on pentesting and practical defense. I work across web applications, networks, Active Directory, and mobile apps to uncover weaknesses and deliver clear remediation plans.',
            ar: 'أنا مهندس أمن سيبراني أركز على اختبارات الاختراق والدفاع العملي. أعمل على تطبيقات الويب والشبكات وActive Directory وتطبيقات الجوال لاكتشاف الثغرات وتقديم خطط معالجة واضحة.'
        }
    },
    stats: [
        { value: '3+', label: { en: 'Pentest domains', ar: 'مجالات اختبار اختراق' } },
        { value: 'AD', label: { en: 'Active Directory focus', ar: 'تركيز على Active Directory' } },
        { value: '100%', label: { en: 'Actionable reports', ar: 'تقارير قابلة للتنفيذ' } },
        { value: '24/7', label: { en: 'Security mindset', ar: 'عقلية أمنية دائمة' } }
    ],
    services: [
        {
            title: { en: 'Web App Pentesting', ar: 'اختبار اختراق تطبيقات الويب' },
            category: 'web',
            desc: {
                en: 'Authentication, authorization, injection, and business logic testing with clear remediation steps.',
                ar: 'اختبار المصادقة والتفويض والثغرات المنطقية مع خطوات معالجة واضحة.'
            }
        },
        {
            title: { en: 'Network & AD Security', ar: 'أمن الشبكات وActive Directory' },
            category: 'network',
            desc: {
                en: 'Active Directory assessment, lateral movement paths, and hardening for enterprise networks.',
                ar: 'تقييم Active Directory ومسارات الحركة الجانبية وتقوية الشبكات المؤسسية.'
            }
        },
        {
            title: { en: 'Mobile App Pentesting', ar: 'اختبار اختراق تطبيقات الجوال' },
            category: 'mobile',
            desc: {
                en: 'iOS/Android security reviews, API validation, and data protection checks.',
                ar: 'مراجعات أمن iOS وAndroid والتحقق من واجهات API وحماية البيانات.'
            }
        }
    ],
    projects: [
        {
            name: 'Mini System Manage',
            description: 'A lightweight management system project focused on clean structure and practical workflows.',
            github: 'https://github.com/omarmaarouf18/mini-system-manege',
            category: 'software'
        }
    ],
    projectEmpty: {
        title: { en: 'Projects coming soon', ar: 'المشاريع قيد الإعداد' },
        description: {
            en: 'I am preparing case studies and public write-ups. Check back soon.',
            ar: 'أقوم بتجهيز دراسات حالة وملخصات عامة. تابعني قريباً.'
        }
    },
    contact: {
        title: { en: 'Get in touch', ar: 'تواصل معي' },
        email: 'sec-eng@omar-maarouf.me',
        phone: '+201034165405',
        formNote: {
            en: 'For real messages, connect a service like Formspree.',
            ar: 'لإرسال رسائل حقيقية اربط الخدمة عبر Formspree.'
        }
    },
    socials: {
        github: 'https://github.com/omarmaarouf18',
        linkedin: 'https://www.linkedin.com/in/omar-maarouf-12776737a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initLanguageSwitcher();
    initServiceFilter();
    initContactForm();
    closeMobileMenuOnLinkClick();
    loadData();
});

async function loadData() {
    try {
        const response = await fetch(`data.json?v=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        state.data = await response.json();
        renderAll();
    } catch (error) {
        console.error('Data load error:', error);
        state.data = DEFAULT_DATA;
        renderAll();
        renderLoadError();
    }
}

function renderAll() {
    if (!state.data) return;
    renderMeta();
    renderHero();
    renderAbout();
    renderStats();
    renderServices();
    renderProjects();
    renderContact();
    renderFooter();
}

function getText(textObj) {
    if (!textObj) return '';
    if (typeof textObj === 'string') return textObj;
    return textObj[state.lang] || textObj.en || textObj.ar || '';
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function textDirection() {
    return state.lang === 'ar' ? 'rtl' : 'ltr';
}

function renderMeta() {
    const { meta } = state.data;
    const brandElement = document.getElementById('brand-name');
    if (brandElement) brandElement.textContent = meta?.brand || 'Portfolio';
    document.title = `${meta?.name || 'Portfolio'} | Security Portfolio`;
    document.documentElement.lang = state.lang;
    document.documentElement.dir = textDirection();
}

function renderHero() {
    const hero = state.data.hero || {};
    document.getElementById('hero-title').textContent = getText(hero.headline);
    document.getElementById('hero-subtitle').textContent = getText(hero.subhead);
    document.getElementById('cta-primary').textContent = getText(hero.ctaPrimary) || 'Explore services';
    document.getElementById('cta-secondary').textContent = getText(hero.ctaSecondary) || 'View projects';
}

function renderAbout() {
    const about = state.data.about || {};
    document.getElementById('about-title').textContent = getText(about.title) || 'About';
    document.getElementById('about-body').textContent = getText(about.body);
}

function renderStats() {
    const stats = Array.isArray(state.data.stats) ? state.data.stats : [];
    const container = document.getElementById('stats-grid');
    container.innerHTML = stats.map((item) => `
        <article class="rounded-xl bg-white/10 p-4">
            <p class="text-xl sm:text-2xl font-bold">${escapeHtml(item.value)}</p>
            <p class="text-xs sm:text-sm text-white/90 mt-1">${escapeHtml(getText(item.label))}</p>
        </article>
    `).join('');
}

function renderServices() {
    const services = Array.isArray(state.data.services) ? state.data.services : [];
    const container = document.getElementById('services-grid');
    const filtered = state.serviceFilter === 'all'
        ? services
        : services.filter((service) => service.category === state.serviceFilter);

    container.innerHTML = filtered.map((service) => `
        <article class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p class="text-xs uppercase tracking-widest font-semibold text-sky-600">${escapeHtml(service.category)}</p>
            <h3 class="mt-3 text-xl font-bold text-slate-900">${escapeHtml(getText(service.title))}</h3>
            <p class="mt-2 text-slate-600">${escapeHtml(getText(service.desc))}</p>
        </article>
    `).join('');
}

function renderProjects() {
    const projects = Array.isArray(state.data.projects) ? state.data.projects : [];
    const container = document.getElementById('projects-container');

    if (projects.length === 0) {
        const empty = state.data.projectEmpty || {};
        container.innerHTML = `
            <article class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 class="text-lg font-bold text-slate-900">${escapeHtml(getText(empty.title) || 'Projects coming soon')}</h3>
                <p class="mt-2 text-slate-600">${escapeHtml(getText(empty.description))}</p>
            </article>
        `;
        return;
    }

    container.innerHTML = projects.map((project) => `
        <article class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900">${escapeHtml(project.name)}</h3>
            <p class="mt-2 text-slate-600">${escapeHtml(project.description)}</p>
            <a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" class="inline-flex mt-4 text-sky-700 font-semibold hover:underline">View on GitHub →</a>
        </article>
    `).join('');
}

function getSocialLink(platform, url) {
    const safeUrl = escapeHtml(url);
    const baseClass = 'px-4 py-2 rounded-xl border border-slate-200 bg-white font-medium inline-flex items-center gap-2';

    if (platform === 'github') {
        return `<a class="${baseClass}" href="${safeUrl}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.25 9.27 7.76 10.77.57.1.77-.25.77-.55 0-.27-.01-1.16-.02-2.1-3.16.69-3.82-1.34-3.82-1.34-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.17 1.75 1.17 1.02 1.75 2.69 1.24 3.35.95.1-.74.4-1.24.73-1.52-2.52-.29-5.18-1.26-5.18-5.6 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.46.11-3.04 0 0 .95-.31 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.47 3.1-1.16 3.1-1.16.62 1.58.23 2.75.11 3.04.73.8 1.17 1.81 1.17 3.05 0 4.35-2.67 5.3-5.21 5.58.41.35.77 1.04.77 2.09 0 1.51-.01 2.72-.01 3.09 0 .3.2.65.78.54 4.5-1.5 7.74-5.74 7.74-10.76C23.25 5.48 18.27.5 12 .5Z"/>
            </svg>
            <span>GitHub</span>
        </a>`;
    }

    if (platform === 'linkedin') {
        return `<a class="${baseClass}" href="${safeUrl}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.05-1.86-3.05-1.87 0-2.16 1.46-2.16 2.96v5.66H9.31V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77A1.78 1.78 0 0 0 0 1.77v20.46C0 23.21.79 24 1.77 24h20.46A1.78 1.78 0 0 0 24 22.23V1.77A1.78 1.78 0 0 0 22.23 0Z"/>
            </svg>
            <span>LinkedIn</span>
        </a>`;
    }

    return '';
}

function renderContact() {
    const contact = state.data.contact || {};
    document.getElementById('contact-title').textContent = getText(contact.title) || 'Contact';
}

function renderFooter() {
    const footer = document.getElementById('footer-text');
    const footerSocials = document.getElementById('footer-socials');
    const name = state.data?.meta?.name || 'Portfolio';
    const contact = state.data?.contact || {};
    const socials = state.data?.socials || {};

    if (footerSocials) {
        const items = [];
        if (socials.github) {
            items.push(getSocialLink('github', socials.github));
        }
        if (socials.linkedin) {
            items.push(getSocialLink('linkedin', socials.linkedin));
        }
        footerSocials.innerHTML = items.join('');
    }

    if (footer) {
        footer.textContent = `© ${new Date().getFullYear()} ${name} · ${contact.phone || ''} · ${contact.email || ''}`;
    }
}

function initMobileMenu() {
    const button = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!button || !menu) return;

    button.addEventListener('click', () => {
        const opening = menu.classList.contains('hidden');
        menu.classList.toggle('hidden');
        button.setAttribute('aria-expanded', String(opening));
    });
}

function closeMobileMenuOnLinkClick() {
    const menu = document.getElementById('mobile-menu');
    const button = document.getElementById('menu-btn');
    if (!menu || !button) return;

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            button.setAttribute('aria-expanded', 'false');
        });
    });
}

function initLanguageSwitcher() {
    document.querySelectorAll('.lang-btn').forEach((button) => {
        button.addEventListener('click', () => {
            state.lang = button.dataset.lang || 'en';
            document.querySelectorAll('.lang-btn').forEach((item) => {
                item.classList.toggle('active', item.dataset.lang === state.lang);
            });
            renderAll();
        });
    });
}

function initServiceFilter() {
    const chips = document.querySelectorAll('.chip');
    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            state.serviceFilter = chip.dataset.filter || 'all';
            chips.forEach((item) => {
                item.classList.toggle('active', item.dataset.filter === state.serviceFilter);
            });
            renderServices();
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formNote = getText(state.data?.contact?.formNote) || 'Thank you. This static form is ready to connect to Formspree or Netlify Forms.';
        alert(formNote);
        form.reset();
    });
}

function renderLoadError() {
    console.warn('Running with built-in fallback data. Use Live Server to load data.json directly.');
}