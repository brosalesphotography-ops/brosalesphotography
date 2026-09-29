const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const modal = document.getElementById("quoteModal");
const quoteForm = document.getElementById("quoteForm");
const selectedService = document.getElementById("selectedService");

menuToggle?.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

function openModal(service = "Servicio para evento") {
  selectedService.value = service;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => document.querySelector('#quoteForm input[name="name"]')?.focus(), 50);
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".service-card").forEach(card => {
  const service = card.dataset.service;
  card.querySelector(".service-link")?.addEventListener("click", () => openModal(service));
});

document.querySelectorAll("[data-close-modal]").forEach(el => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

quoteForm.addEventListener("submit", e => {
  e.preventDefault();

  const data = new FormData(quoteForm);
  const service = data.get("service") || "";
  const name = data.get("name") || "";
  const date = data.get("date") || "";
  const guests = data.get("guests") || "";
  const location = data.get("location") || "";
  const message = data.get("message") || "";

  const text =
`Hola PALOMITOPTY 👋

Quiero cotizar un evento.

*Servicio:* ${service}
*Nombre:* ${name}
*Fecha:* ${date || "Por confirmar"}
*Invitados:* ${guests || "Por confirmar"}
*Lugar:* ${location || "Por confirmar"}
*Detalles:* ${message || "Ninguno"}

Quedo atento/a a la cotización.`;

  window.open(`https://wa.me/50768170937?text=${encodeURIComponent(text)}`, "_blank");
  closeModal();
});

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
