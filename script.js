// Cris & Francisco — interações do convite
// As confirmações são enviadas pelo WhatsApp escolhido pelo convidado.
const WHATSAPP_CRIS = "5586988548144";
const WHATSAPP_FRANCISCO = "5586988183089";

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

function sendConfirmation(phone) {
  const name = document.getElementById("guest-name").value.trim();
  const attending = document.getElementById("guest-attending").value;
  const count = document.getElementById("guest-count").value;
  const message = document.getElementById("guest-message").value.trim();

  if (!name || !attending) {
    alert("Por favor, preencha seu nome e selecione sua resposta.");
    return;
  }

  const text = [
    "Olá! Minha confirmação para o casamento de Cris e Francisco:",
    `Nome: ${name}`,
    `Resposta: ${attending}`,
    `Quantidade de pessoas: ${count}`,
    message ? `Recado: ${message}` : ""
  ].filter(Boolean).join("\n");

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.getElementById("confirm-cris").addEventListener("click", () => {
  sendConfirmation(WHATSAPP_CRIS);
});

document.getElementById("confirm-francisco").addEventListener("click", () => {
  sendConfirmation(WHATSAPP_FRANCISCO);
});
