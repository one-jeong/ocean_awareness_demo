// ===== Ocean Health State =====
let oceanHealth = 50;
let choiceHistory = [];

// ===== DOM Elements =====
const healthBarFill = document.getElementById('healthBarFill');
const healthScore = document.getElementById('healthScore');
const healthStatus = document.getElementById('healthStatus');
const feedbackMessage = document.getElementById('feedbackMessage');
const feedbackContainer = document.getElementById('feedbackContainer');
const choiceHistoryEl = document.getElementById('choiceHistory');
const toggleGameBtn = document.getElementById('toggleGameBtn');
const gameWrapper = document.getElementById('gameWrapper');
const ecosystemInfo = document.getElementById('ecosystemInfo');

// ===== Species Data =====
const speciesData = {
    orca: {
        name: 'Orca (Killer Whale)',
        emoji: '🐋',
        role: 'Apex Predator',
        description: 'Orcas are intelligent apex predators that help regulate populations of seals, sharks, and fish. They are crucial for maintaining ecosystem balance.',
        threat: 'Pollution, habitat loss, declining prey'
    },
    shark: {
        name: 'Shark',
        emoji: '🦈',
        role: 'Apex Predator',
        description: 'Sharks keep the ocean healthy by removing weak and sick animals. Without sharks, prey populations explode and overgraze on species below them.',
        threat: 'Overfishing, finning, bycatch'
    },
    seal: {
        name: 'Seal',
        emoji: '🦭',
        role: 'Secondary Consumer',
        description: 'Seals are important predators that help control fish and squid populations. They also serve as food for larger predators like orcas and sharks.',
        threat: 'Climate change, overfishing of prey'
    },
    tuna: {
        name: 'Tuna',
        emoji: '🐟',
        role: 'Secondary Consumer',
        description: 'Tuna are fast-swimming predators that help control populations of smaller fish and squid. They are also a vital food source for larger marine animals.',
        threat: 'Severe overfishing for human consumption'
    },
    squid: {
        name: 'Squid',
        emoji: '🦑',
        role: 'Secondary Consumer',
        description: 'Squid are important mid-level predators and prey. They eat smaller fish and plankton, and are eaten by almost everything larger.',
        threat: 'Climate change affecting their habitat'
    },
    fish: {
        name: 'Small Fish',
        emoji: '🐠',
        role: 'Primary Consumer',
        description: 'Small fish form the backbone of ocean food webs. They convert plankton into food for larger predators and are essential for ecosystem health.',
        threat: 'Overfishing, pollution, habitat destruction'
    },
    shrimp: {
        name: 'Shrimp',
        emoji: '🦐',
        role: 'Primary Consumer',
        description: 'Shrimp are important scavengers and prey animals. They help clean the ocean floor and transfer energy from producers to predators.',
        threat: 'Destructive farming practices, bycatch'
    },
    crab: {
        name: 'Crab',
        emoji: '🦀',
        role: 'Primary Consumer',
        description: 'Crabs are scavengers that help break down dead matter and recycle nutrients. They are important food for fish and other predators.',
        threat: 'Overharvesting, ocean acidification'
    },
    jellyfish: {
        name: 'Jellyfish',
        emoji: '🪼',
        role: 'Primary Consumer',
        description: 'Jellyfish eat plankton and small fish. When other predators decline due to overfishing, jellyfish populations can explode.',
        threat: 'Actually thriving due to climate change'
    },
    plankton: {
        name: 'Plankton',
        emoji: '🦠',
        role: 'Producer',
        description: 'Phytoplankton produce 50% of Earth\'s oxygen through photosynthesis. They are the foundation of nearly all ocean food webs.',
        threat: 'Ocean warming and acidification'
    },
    algae: {
        name: 'Algae',
        emoji: '🌿',
        role: 'Producer',
        description: 'Algae and seaweed produce oxygen and provide food and habitat for countless marine species. Kelp forests are as important as rainforests.',
        threat: 'Pollution, warming waters, overgrazing'
    },
    coral: {
        name: 'Coral',
        emoji: '🪸',
        role: 'Ecosystem Engineer',
        description: 'Coral reefs support 25% of all marine species despite covering less than 1% of the ocean floor. They provide shelter, food, and nurseries.',
        threat: 'Bleaching from warming, acidification'
    }
};

// ===== Feedback Messages =====
const feedbackMessages = {
    plant: [
        "Excellent choice! Plant-based meals have minimal impact on marine ecosystems and reduce fishing pressure.",
        "Great decision! By choosing plants, you're giving fish populations time to recover.",
        "Smart move! Land-based foods help preserve ocean biodiversity."
    ],
    sustainable: [
        "Good choice! Sustainable seafood supports responsible fishing practices.",
        "Nice! MSC-certified fish come from well-managed fisheries that protect ocean health.",
        "Responsible choice! Supporting sustainable fishing encourages better practices industry-wide."
    ],
    farmed: [
        "Consider the impact: Shrimp farming often destroys mangroves that protect coastlines and nurture marine life.",
        "Food for thought: Farmed shrimp require wild fish as feed, depleting ocean resources.",
        "Worth knowing: Shrimp aquaculture can pollute coastal waters and harm local ecosystems."
    ],
    overfished: [
        "This choice harms ocean health. Shark finning kills 100 million sharks yearly, disrupting entire ecosystems.",
        "Sharks are crucial! Without them, prey populations explode and devastate species below them in the food chain.",
        "Critical impact: Removing apex predators causes a cascade effect that unbalances the whole ocean ecosystem."
    ]
};

// ===== Health Status Messages =====
const healthStatuses = [
    { threshold: 90, message: "The ocean ecosystem is thriving! Marine life is flourishing.", color: '#06d6a0' },
    { threshold: 70, message: "Ocean health is good. Ecosystems are well-balanced.", color: '#48cae4' },
    { threshold: 50, message: "The ocean ecosystem is under moderate stress.", color: '#ffd166' },
    { threshold: 30, message: "Warning: Ocean health is declining. Ecosystems are struggling.", color: '#f4a261' },
    { threshold: 0, message: "Critical: The ocean ecosystem is in serious danger!", color: '#ef476f' }
];

// ===== Choice Icons for History =====
const choiceIcons = {
    plant: '🥗',
    sustainable: '🐟',
    farmed: '🦐',
    overfished: '🦈'
};

// ===== Update Health Bar =====
function updateHealthBar() {
    oceanHealth = Math.max(0, Math.min(100, oceanHealth));

    healthBarFill.style.width = oceanHealth + '%';
    healthScore.textContent = oceanHealth;

    // Update color gradient position
    const position = 100 - oceanHealth;
    healthBarFill.style.backgroundPosition = position + '% 0';

    // Update status message
    for (const status of healthStatuses) {
        if (oceanHealth >= status.threshold) {
            healthStatus.textContent = status.message;
            healthScore.style.color = status.color;
            break;
        }
    }
}

// ===== Get Random Feedback =====
function getRandomFeedback(type) {
    const messages = feedbackMessages[type];
    return messages[Math.floor(Math.random() * messages.length)];
}

// ===== Update Choice History =====
function updateChoiceHistory() {
    if (choiceHistory.length === 0) {
        choiceHistoryEl.innerHTML = '<span class="history-placeholder">No choices made yet</span>';
        return;
    }

    choiceHistoryEl.innerHTML = choiceHistory
        .map(choice => `<span class="history-item">${choiceIcons[choice]}</span>`)
        .join('');
}

// ===== Handle Choice Click =====
function handleChoice(event) {
    const button = event.currentTarget;
    const choice = button.dataset.choice;
    const points = parseInt(button.dataset.points);

    // Update health
    oceanHealth += points;
    updateHealthBar();

    // Add to history
    choiceHistory.push(choice);
    updateChoiceHistory();

    // Show feedback
    const feedback = getRandomFeedback(choice);
    feedbackMessage.textContent = feedback;
    feedbackMessage.className = 'feedback-message ' + (points >= 0 ? 'positive' : 'negative');

    // Animate feedback
    feedbackMessage.style.animation = 'none';
    feedbackMessage.offsetHeight;
    feedbackMessage.style.animation = 'fadeIn 0.5s ease';
}

// ===== Initialize Choice Buttons =====
document.querySelectorAll('.choice-card').forEach(btn => {
    btn.addEventListener('click', handleChoice);
});

// ===== Food Web Interactions =====
const creatures = document.querySelectorAll('.creature');

function clearHighlights() {
    creatures.forEach(c => {
        c.classList.remove('selected', 'eats', 'eaten-by');
    });
}

function handleCreatureClick(event) {
    const creature = event.currentTarget;
    const id = creature.dataset.id;
    const eats = creature.dataset.eats;
    const eatenBy = creature.dataset.eatenBy;

    clearHighlights();
    creature.classList.add('selected');

    // Highlight what this creature eats
    if (eats) {
        eats.split(',').forEach(preyId => {
            const prey = document.querySelector(`[data-id="${preyId}"]`);
            if (prey) prey.classList.add('eats');
        });
    }

    // Highlight what eats this creature
    if (eatenBy) {
        eatenBy.split(',').forEach(predatorId => {
            const predator = document.querySelector(`[data-id="${predatorId}"]`);
            if (predator) predator.classList.add('eaten-by');
        });
    }

    // Update info panel
    const data = speciesData[id];
    if (data) {
        const eatsNames = eats ? eats.split(',').map(e => speciesData[e]?.name || e).join(', ') : 'Sunlight and nutrients';
        const eatenByNames = eatenBy ? eatenBy.split(',').map(e => speciesData[e]?.name || e).join(', ') : 'None (apex predator)';

        ecosystemInfo.innerHTML = `
            <div class="species-info">
                <h4><span>${data.emoji}</span> ${data.name}</h4>
                <div class="info-section">
                    <div class="info-label">Role</div>
                    <div class="info-value">${data.role}</div>
                </div>
                <div class="info-section">
                    <div class="info-label">About</div>
                    <div class="info-value">${data.description}</div>
                </div>
                <div class="info-section">
                    <div class="info-label">Eats</div>
                    <div class="info-value" style="color: #06d6a0;">${eatsNames}</div>
                </div>
                <div class="info-section">
                    <div class="info-label">Eaten By</div>
                    <div class="info-value" style="color: #ffd166;">${eatenByNames}</div>
                </div>
                <div class="info-section">
                    <div class="info-label">Main Threat</div>
                    <div class="info-value" style="color: #ef476f;">${data.threat}</div>
                </div>
            </div>
        `;
    }
}

// Initialize creature click handlers
creatures.forEach(creature => {
    creature.addEventListener('click', handleCreatureClick);
});

// ===== Game Toggle =====
let gameVisible = false;

toggleGameBtn.addEventListener('click', () => {
    gameVisible = !gameVisible;

    if (gameVisible) {
        gameWrapper.style.display = 'block';
        toggleGameBtn.querySelector('.btn-text').textContent = 'Hide Game';
    } else {
        gameWrapper.style.display = 'none';
        toggleGameBtn.querySelector('.btn-text').textContent = 'Launch Game';
    }
});

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav-bar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navigation Active State =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Add CSS Animation =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .nav-links a.active {
        color: #0077b6;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// ===== Initialize =====
updateHealthBar();
updateChoiceHistory();

// ===== Custom Otter Cursor =====
function createOtterCursor() {
    const canvas = document.createElement('canvas');
    const size = 48;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Draw otter emoji on canvas
    ctx.font = '40px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🦦', size/2, size/2);

    // Convert to data URL and apply as cursor
    const cursorUrl = canvas.toDataURL('image/png');
    const cursorStyle = `url(${cursorUrl}) 24 24, auto`;

    document.documentElement.style.cursor = cursorStyle;
    document.body.style.cursor = cursorStyle;

    // Apply to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .choice-card, .creature, .cta-button, .game-toggle-btn, .nav-links a');
    interactiveElements.forEach(el => {
        el.style.cursor = `url(${cursorUrl}) 24 24, pointer`;
    });
}

// Initialize cursor
createOtterCursor();

console.log('🌊 Ocean Guardians loaded successfully!');
