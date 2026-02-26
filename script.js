document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initSPA();
    handleContact();
});

async function loadData() {
    try {
        const res = await fetch('data.json');
        const data = await res.json();
        
        // تحميل المهارات
        const skillsContainer = document.getElementById('skills-list');
        skillsContainer.innerHTML = data.personalInfo.skills.map(s => `<span>${s}</span>`).join('');

        // تحميل المشاريع
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = data.projects.map(p => `
            <div class="ms-card">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <a href="${p.github}" target="_blank" style="color:var(--ms-blue); text-decoration:none; font-weight:600; font-size:13px; margin-top:10px; display:inline-block;">View on GitHub ></a>
            </div>
        `).join('');
    } catch (e) {
        console.error("Data load error:", e);
    }
}

function initSPA() {
    const links = document.querySelectorAll('.nav-links a');
    const pages = document.querySelectorAll('.page');

    links.forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            const target = link.dataset.section;

            pages.forEach(p => p.classList.remove('active'));
            const targetPage = document.getElementById(target);
            if (targetPage) targetPage.classList.add('active');

            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        };
    });
}

function handleContact() {
    document.getElementById('contact-form').onsubmit = async (e) => {
        e.preventDefault();
        const msgData = {
            name: document.getElementById('c-name').value,
            email: document.getElementById('c-email').value,
            message: document.getElementById('c-msg').value
        };

        const res = await fetch('/api/messages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(msgData)
        });

        if(res.ok) {
            alert('تم إرسال رسالتك بنجاح.');
            e.target.reset();
        }
    };
}