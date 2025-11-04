document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[id^="theme-toggle"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      document.documentElement.classList.toggle("light");
      localStorage.setItem(
        "themeLight",
        document.documentElement.classList.contains("light")
      );
    });
  });
  if (localStorage.getItem("themeLight") === "true")
    document.documentElement.classList.add("light");

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const result = document.getElementById("formResult");

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        result.textContent = "Podaj poprawny adres e-mail.";
        result.style.color = "salmon";
        return;
      }
      if (message.length < 5) {
        result.textContent = "Wiadomość jest za krótka.";
        result.style.color = "salmon";
        return;
      }

      const submissions = JSON.parse(
        localStorage.getItem("cp_submissions") || "[]"
      );
      submissions.push({
        email,
        subject: form.subject.value,
        message,
        timestamp: Date.now(),
      });
      localStorage.setItem("cp_submissions", JSON.stringify(submissions));

      result.textContent = "Dziękujemy! Twoja wiadomość została zapisana.";
      result.style.color = "lightgreen";
      form.reset();
    });
  }
});
