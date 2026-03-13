 // ── Form localStorage Persistence ──
        const FORM_KEY = 'dreymoe_form_draft';

        const form = document.querySelector('.contact-form');

        // Fields to save: name, email, phone, service, package, preferred_date, message
        const textFields = ['name', 'email', 'phone', 'preferred_date', 'message'];
        const selectFields = ['service', 'package'];
        const checkboxFields = ['email_updates', 'whatsapp_updates'];

        // Restore saved draft on page load
        function restoreFormDraft() {
            const saved = localStorage.getItem(FORM_KEY);
            if (!saved) return;

            try {
                const draft = JSON.parse(saved);

                textFields.forEach(name => {
                    const el = form.querySelector(`[name="${name}"]`);
                    if (el && draft[name] !== undefined) el.value = draft[name];
                });

                selectFields.forEach(name => {
                    const el = form.querySelector(`[name="${name}"]`);
                    if (el && draft[name] !== undefined) el.value = draft[name];
                });

                checkboxFields.forEach(name => {
                    const el = form.querySelector(`[name="${name}"]`);
                    if (el && draft[name] !== undefined) el.checked = draft[name];
                });
            } catch (e) {
                localStorage.removeItem(FORM_KEY);
            }
        }

        // Save current form state to localStorage
        function saveFormDraft() {
            const draft = {};

            textFields.forEach(name => {
                const el = form.querySelector(`[name="${name}"]`);
                if (el) draft[name] = el.value;
            });

            selectFields.forEach(name => {
                const el = form.querySelector(`[name="${name}"]`);
                if (el) draft[name] = el.value;
            });

            checkboxFields.forEach(name => {
                const el = form.querySelector(`[name="${name}"]`);
                if (el) draft[name] = el.checked;
            });

            localStorage.setItem(FORM_KEY, JSON.stringify(draft));
        }

        // Clear draft on submit
        function clearFormDraft() {
            localStorage.removeItem(FORM_KEY);
        }

        // Listen for any input change and save
        form.addEventListener('input', saveFormDraft);
        form.addEventListener('change', saveFormDraft);

        // Clear on submit
        form.addEventListener('submit', clearFormDraft);

        // Restore on load
        restoreFormDraft();

        // ── Hamburger Menu ──
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const overlay = document.getElementById('nav-overlay');

        function openMenu() {
            hamburger.classList.add('open');
            navMenu.classList.add('open');
            overlay.classList.add('show');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
            overlay.classList.remove('show');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', () => {
            navMenu.classList.contains('open') ? closeMenu() : openMenu();
        });

        overlay.addEventListener('click', closeMenu);

        // Close menu when a nav link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });