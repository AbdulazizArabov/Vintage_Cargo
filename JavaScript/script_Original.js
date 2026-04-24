// js/script.js (updated with authentication, label generation, chat, faq)
document.addEventListener('DOMContentLoaded', function() {
    // Mobile toggle (existing)
    const toggleBtn = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = toggleBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    // Close mobile on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (toggleBtn) {
                    const icon = toggleBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // AUTHENTICATION SYSTEM (localStorage)
    function getUsers() { return JSON.parse(localStorage.getItem('vintageUsers') || '[]'); }
    function saveUsers(users) { localStorage.setItem('vintageUsers', JSON.stringify(users)); }
    function getCurrentUser() { return JSON.parse(sessionStorage.getItem('vintageCurrentUser') || 'null'); }
    function setCurrentUser(user) { sessionStorage.setItem('vintageCurrentUser', JSON.stringify(user)); }
    function clearCurrentUser() { sessionStorage.removeItem('vintageCurrentUser'); }

    // Update navigation based on login state
    function updateAuthNav() {
        const currentUser = getCurrentUser();
        const authLink = document.getElementById('authNavLink');
        if (!authLink) return;
        if (currentUser) {
            authLink.innerHTML = `<a href="account.html"><i class="fas fa-user-circle"></i> ${currentUser.name.split(' ')[0]}</a>`;
        } else {
            authLink.innerHTML = `<a href="login.html">Sign In</a>`;
        }
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const pwd = document.getElementById('regPassword').value;
            if (!name || !email || pwd.length < 4) {
                alert('Please fill all fields (password min 4 chars).');
                return;
            }
            const users = getUsers();
            if (users.find(u => u.email === email)) {
                alert('Email already registered. Please login.');
                return;
            }
            const newUser = { id: Date.now(), name, email, password: pwd };
            users.push(newUser);
            saveUsers(users);
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        });
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const pwd = document.getElementById('loginPassword').value;
            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === pwd);
            if (user) {
                setCurrentUser({ id: user.id, name: user.name, email: user.email });
                alert(`Welcome back, ${user.name}!`);
                window.location.href = 'account.html';
            } else {
                alert('Invalid credentials. Please register first.');
            }
        });
    }

    // Account page: display user name and logout
    const userNameSpan = document.getElementById('userNameDisplay');
    if (userNameSpan) {
        const current = getCurrentUser();
        if (current) {
            userNameSpan.innerText = current.name;
        } else {
            window.location.href = 'login.html';
        }
    }
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearCurrentUser();
            window.location.href = 'index.html';
        });
    }

    // Label creation
    const labelForm = document.getElementById('labelForm');
    if (labelForm) {
        labelForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const sender = document.getElementById('senderName').value + ', ' + document.getElementById('senderAddress').value;
            const recipient = document.getElementById('recipientName').value + ', ' + document.getElementById('recipientAddress').value;
            const weight = document.getElementById('weight').value;
            const service = document.getElementById('serviceType').value;
            const tracking = 'VINTAGE' + Math.floor(Math.random() * 1000000);
            const estDays = { 'Air Freight': 3, 'Ocean Freight': 22, 'Rail Freight': 12, 'Ground Shipping': 5 };
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + (estDays[service] || 7));
            document.getElementById('trackingNumber').innerText = tracking;
            document.getElementById('previewSender').innerText = sender;
            document.getElementById('previewRecipient').innerText = recipient;
            document.getElementById('previewWeight').innerText = weight;
            document.getElementById('previewService').innerText = service;
            document.getElementById('estDelivery').innerText = deliveryDate.toDateString();
            document.getElementById('labelPreview').style.display = 'block';
        });
    }
    const downloadBtn = document.getElementById('downloadLabelBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('Demo: Label would be downloaded as PDF. In production, this would generate a real shipping label.');
        });
    }

    // Live chat simulation
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    const chatWindow = document.getElementById('chatWindow');
    if (sendChatBtn && chatWindow) {
        function addMessage(text, isUser = false) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
            msgDiv.innerText = text;
            chatWindow.appendChild(msgDiv);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
        sendChatBtn.addEventListener('click', function() {
            const msg = chatInput.value.trim();
            if (!msg) return;
            addMessage(msg, true);
            chatInput.value = '';
            setTimeout(() => {
                addMessage("Thank you for your message! A Vintage Cargo agent will respond shortly (demo mode).");
            }, 800);
        });
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendChatBtn.click();
        });
    }

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            answer.classList.toggle('show');
            const icon = this.querySelector('i');
            if (answer.classList.contains('show')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });

    // Contact form (existing)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! A representative will contact you soon (demo).');
            contactForm.reset();
        });
    }

    updateAuthNav();
});