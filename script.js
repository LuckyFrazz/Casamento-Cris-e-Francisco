// Cris & Francisco — interações do convite
// 1) Troque o telefone abaixo pelo WhatsApp dos noivos, com código do país e DDD.
// Exemplo: 5511999999999 (somente números).
const WHATSAPP_NUMBER = "5586988835944";

// 2) Para ativar a confirmação online, cole o link publicado do Google Forms.
// Deixe vazio enquanto ainda não houver formulário.
const ONLINE_FORM_URL = "";

const weddingDate = new Date(2026, 11, 6, 19, 0, 0); // 6 dez 2026, horário provisório: 19h

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();
  const message = document.getElementById("countdown-message");

  if (diff <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
    message.textContent = "Chegou o grande dia! Que seja uma celebração inesquecível.";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const form = document.getElementById("rsvp-form");
form.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("guest-name").value.trim();
  const attending = document.getElementById("guest-attending").value;
  const count = document.getElementById("guest-count").value;
  const message = document.getElementById("guest-message").value.trim();

  if (!name || !attending) {
    alert("Por favor, preencha seu nome e sua resposta.");
    return;
  }

  const text = [
    "Olá! Minha confirmação para o casamento de Cris e Francisco:",
    `Nome: ${name}`,
    `Resposta: ${attending}`,
    `Quantidade de pessoas: ${count}`,
    message ? `Recado: ${message}` : ""
  ].filter(Boolean).join("\n");

  if (WHATSAPP_NUMBER === "5500000000000") {
    alert("O convite ainda precisa do número de WhatsApp dos noivos. No arquivo script.js, substitua WHATSAPP_NUMBER pelo número correto, com código do país e DDD.");
    return;
  }

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

const onlineLink = document.getElementById("online-form-link");
if (ONLINE_FORM_URL.trim()) {
  onlineLink.href = ONLINE_FORM_URL.trim();
  onlineLink.hidden = false;
}
