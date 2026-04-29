// js/script.js
document.addEventListener('DOMContentLoaded', function() {

  // ========== MOBILE TOGGLE ==========
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

  // ========== AUTHENTICATION SYSTEM ==========
  const embeddedRemoteUsers = [
    { id: 1, name: 'Demo User', email: 'demo@vintagecargo.com', password: 'demo1234' }
  ];
  let remoteUsersCache = null;

  async function fetchRemoteUsers() {
    if (remoteUsersCache !== null) return remoteUsersCache;
    try {
      const response = await fetch('data/users.json');
      if (!response.ok) throw new Error('Could not load remote users');
      remoteUsersCache = await response.json();
    } catch (error) {
      remoteUsersCache = embeddedRemoteUsers;
    }
    return remoteUsersCache;
  }

  function getLocalUsers() {
    return JSON.parse(localStorage.getItem('vintageUsers') || '[]');
  }

  async function getUsers() {
    const remoteUsers = await fetchRemoteUsers();
    return [...remoteUsers, ...getLocalUsers()];
  }

  function saveUsers(users) {
    localStorage.setItem('vintageUsers', JSON.stringify(users));
  }

  function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('vintageCurrentUser') || 'null');
  }

  function setCurrentUser(user) {
    sessionStorage.setItem('vintageCurrentUser', JSON.stringify(user));
  }

  function clearCurrentUser() {
    sessionStorage.removeItem('vintageCurrentUser');
  }

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

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const pwd = document.getElementById('regPassword').value;
      if (!name || !email || pwd.length < 4) {
        alert('Please fill all fields (password min 4 chars).');
        return;
      }
      const users = await getUsers();
      if (users.find(u => u.email === email)) {
        alert('Email already registered. Please login.');
        return;
      }
      const localUsers = getLocalUsers();
      localUsers.push({ id: Date.now(), name, email, password: pwd });
      saveUsers(localUsers);
      alert('Registration successful! Please login.');
      window.location.href = 'login.html';
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pwd = document.getElementById('loginPassword').value;
      const users = await getUsers();
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

  function parseDimensions(text) {
    const match = text.match(/(\d+\.?\d*)\s*[xX]\s*(\d+\.?\d*)\s*[xX]\s*(\d+\.?\d*)/);
    if (!match) return null;
    const length = parseFloat(match[1]);
    const width = parseFloat(match[2]);
    const height = parseFloat(match[3]);
    return { length, width, height, volume: (length * width * height) / 1000 };
  }

  function calculatePrice(service, weight, volume) {
    const multipliers = {
      'Air Freight': 0.35,
      'Ocean Freight': 0.12,
      'Rail Freight': 0.2,
      'Ground Shipping': 0.16
    };
    const rate = multipliers[service] || 0.15;
    const weightCharge = Math.max(weight * 2.2, 25);
    const volumeCharge = volume ? volume * 18 : 0;
    return Math.max(weightCharge, volumeCharge) * rate + 15;
  }

  function formatPrice(value) {
    return value.toFixed(2);
  }

  function getEstimatedDays(service) {
    const map = {
      'Air Freight': 3,
      'Ocean Freight': 22,
      'Rail Freight': 12,
      'Ground Shipping': 5
    };
    return map[service] || 7;
  }

  const labelForm = document.getElementById('labelForm');
  if (labelForm) {
    labelForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const dimensions = document.getElementById('dimensions')?.value.trim();
      const weightValue = parseFloat(document.getElementById('weight')?.value || '0');
      const origin = document.getElementById('originAddress')?.value.trim();
      const destination = document.getElementById('destinationAddress')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const service = document.getElementById('serviceType')?.value;

      if (!dimensions || !weightValue || !origin || !destination || !email || !service) {
        alert('Please complete all fields before generating your label.');
        return;
      }

      const dimensionValues = parseDimensions(dimensions);
      if (!dimensionValues) {
        alert('Please enter dimensions as Length x Width x Height, for example 40x30x20.');
        return;
      }

      const tracking = 'VINTAGE' + Math.floor(Math.random() * 1000000);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + getEstimatedDays(service));
      const price = calculatePrice(service, weightValue, dimensionValues.volume);

      document.getElementById('trackingNumber').innerText = tracking;
      document.getElementById('previewService').innerText = service;
      document.getElementById('previewOrigin').innerText = origin;
      document.getElementById('previewDestination').innerText = destination;
      document.getElementById('previewDimensions').innerText = dimensions;
      document.getElementById('previewWeight').innerText = weightValue;
      document.getElementById('previewEmail').innerText = email;
      document.getElementById('priceEstimate').innerText = formatPrice(price);
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
        addMessage('Thank you for your message! A Vintage Cargo agent will respond shortly (demo mode).');
      }, 800);
    });

    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') sendChatBtn.click();
    });
  }

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