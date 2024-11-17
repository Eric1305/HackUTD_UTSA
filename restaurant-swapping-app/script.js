const ethics = [
    { name: "Environment", image: "envr.png" },
    { name: "Innovation", image: "astroinno.jpeg" },
    { name: "Sustainability", image: "https://images.unsplash.com/photo-1611691546060-648c99157686?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&h=400&q=80" },
    { name: "Diversity", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&h=400&q=80" },
    { name: "Governance", image: "https://images.unsplash.com/photo-1590642919883-bf1b44bcd7bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&h=400&q=80" },
    { name: "Healthcare", image: "https://images.unsplash.com/photo-1580281658625-b0b41f600f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&h=400&q=80" },
    { name: "Global Reach", image: "https://images.unsplash.com/photo-1580281658625-b0b41f600f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&h=400&q=80" },
  ];
  
  let currentEthicIndex = 0;
  let startX = 0;
  let isDragging = false;
  let currentCard = null;
  
  const decisions = [];
  
  function renderCard() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; // Clear existing card
  
    if (currentEthicIndex >= ethics.length) {
      document.getElementById("review-button").style.display = "block";
      return;
    }
  
    const ethic = ethics[currentEthicIndex];
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundImage = `url(${ethic.image})`;
  
    card.innerHTML = `
      <h2>${ethic.name}</h2>
      <div class="overlay"></div>
    `;
  
    cardContainer.appendChild(card);
    currentCard = card;
    updateProgress();
  
    card.addEventListener("mousedown", handleStart);
    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseup", handleEnd);
    card.addEventListener("mouseleave", handleEnd);
  
    card.addEventListener("touchstart", (e) => handleStart(e.touches[0]));
    card.addEventListener("touchmove", (e) => handleMove(e.touches[0]));
    card.addEventListener("touchend", (e) => handleEnd(e.changedTouches[0]));
  }
  
  function handleStart(event) {
    startX = event.clientX;
    isDragging = true;
    currentCard.style.transition = "none";
  }
  
  function handleMove(event) {
    if (!isDragging) return;
    const moveX = event.clientX - startX;
    currentCard.style.transform = `translateX(${moveX}px) rotate(${moveX / 20}deg)`;
  }
  
  function handleEnd(event) {
    if (!isDragging) return;
  
    const moveX = event.clientX - startX;
    currentCard.style.transition = "transform 0.8s ease";
  
    const overlay = currentCard.querySelector(".overlay");
  
    if (moveX > 100) {
      currentCard.classList.add("liked");
      overlay.textContent = "❤️";
      decisions.push({ ethic: ethics[currentEthicIndex].name, liked: true });
      nextCard();
    } else if (moveX < -100) {
      currentCard.classList.add("disliked");
      overlay.textContent = "💔";
      decisions.push({ ethic: ethics[currentEthicIndex].name, liked: false });
      nextCard();
    } else {
      currentCard.style.transform = "";
    }
  
    isDragging = false;
  }
  
  function nextCard() {
    setTimeout(() => {
      currentEthicIndex++;
      renderCard();
    }, 500);
  }
  
  function updateProgress() {
    const progress = document.getElementById("progress");
    progress.textContent = `Card ${currentEthicIndex + 1} of ${ethics.length}`;
  }
  
  document.getElementById("review-button").onclick = () => {
    alert("Decisions:\n" + JSON.stringify(decisions, null, 2));
  };
  
  // Initialize
  renderCard();
  
  document.querySelectorAll('button, .card').forEach((element) => {
    element.classList.add('ripple-container'); // Add the ripple-container class
  
    element.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
  
      // Position the ripple at the click point
      const rect = this.getBoundingClientRect();
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
  
      // Add the ripple to the element
      this.appendChild(ripple);
  
      // Remove the ripple after animation finishes
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
  
  // Function to enable the glowing effect on all cards
function addGlowEffect() {
    // Select all cards
    const cards = document.querySelectorAll('.card');

    // Add mousemove listener to each card
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // X-coordinate within the card
            const y = e.clientY - rect.top;  // Y-coordinate within the card
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Call the function to attach the effect after rendering cards
addGlowEffect();

const quotes = [
    "Invest with purpose, grow with values.",
    "Your ethics are your wealth’s foundation.",
    "Swipe to build a better world, one investment at a time.",
    "The future belongs to those who align profit with purpose.",
    "Grow your portfolio, but never compromise your values.",
    "Ethical investing is smart investing.",
    "Your money, your morals, your impact.",
    "Swipe right for a better tomorrow.",
    "Building wealth while preserving your conscience.",
    "Investing made personal, ethical, and fun."
  ];
  
  let currentQuoteIndex = 0;
  
  function updateTicker() {
    const ticker = document.getElementById("stock-ticker");
    ticker.textContent = quotes[currentQuoteIndex];
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  }
  
  // Update the ticker every 5 seconds
  setInterval(updateTicker, 5000);
  document.addEventListener("DOMContentLoaded", updateTicker);
  // Initialize GSAP animations
document.addEventListener("DOMContentLoaded", () => {
    // Stagger animations for hero text
    gsap.from(".stagger-text", {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2, // Add stagger delay between items
      ease: "power2.out",
    });
  
    // Scroll-triggered animations for features and team section
    gsap.utils.toArray(".stagger-item").forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%", // Trigger when the item is 85% into the viewport
          toggleActions: "play none none reverse", // Replay on scroll back up
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out",
      });
    });
  });
  