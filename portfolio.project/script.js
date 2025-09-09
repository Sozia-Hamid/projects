// Vue App
const { createApp } = Vue;

createApp({
  data() {
    return {
      menuOpen: false,
      sent: false,
      form: { name: "", email: "", msg: "" },
      projects: [
        { title: "🌌 Cosmic Calculator", desc: "A galaxy-styled calculator.", link: "cosmic-calculator/index.html" },
        { title: "✅ Cosmic Task Manager", desc: "Organize tasks in a starry universe.", link: "task-manager/index.html" },
        { title: "🌤 Cosmic Weather", desc: "Check live weather under cosmic skies.", link: "weather-app/index.html" }
      ]
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    submitForm() {
      // Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY with EmailJS values
      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this.form, "YOUR_PUBLIC_KEY")
        .then(() => {
          this.sent = true;
          this.form = { name: "", email: "", msg: "" };
        })
        .catch(err => alert("Error: " + JSON.stringify(err)));
    }
  },
  mounted() {
    // Intersection Observer for animations
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".animate").forEach(el => obs.observe(el));
  }
}).mount("#app");


// Starfield Background
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
window.addEventListener("resize", resize);
resize();

function initStars(n = 250) {
  stars = [];
  for (let i = 0; i < n; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      s: Math.random() * 0.5 + 0.2
    });
  }
}
initStars();

function drawStars() {
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#fff";
    ctx.fill();
    s.y += s.s;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(drawStars);
}
drawStars();
