AFRAME.registerComponent('init-game', {
  init: function () {
    const mensaje = document.getElementById("mensaje");
    const title   = document.querySelector("h1");

    // Orden de marcadores y sus imágenes fijas
    const order    = ["m1", "m2", "m3"];            // IDs de <a-marker>
    const hintImgs = ["pista1", "pista2", "pista3"]; // IDs de <img> abajo-izquierda

    const encontrados = new Set();
    let currentIndex = 0; // Empezamos mostrando la pista 1

    const mostrarMensaje = (texto, tiempo = 2000) => {
      mensaje.innerText = texto;
      mensaje.style.display = "block";
      setTimeout(() => (mensaje.style.display = "none"), tiempo);
    };

    const actualizarUI = (idx) => {
      // Muestra solo la imagen de la pista correspondiente
      hintImgs.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.style.display = (i === idx) ? "block" : "none";
      });
      // Actualiza el texto del título
      if (title) title.textContent = `Pista ${idx + 1}`;
      currentIndex = idx;
    };

    // Estado inicial → mostrar Pista 1
    actualizarUI(0);
    mostrarMensaje("🧭 Escanea los marcadores para comenzar la aventura");

    // Listeners de cada marcador
    order.forEach((markerId, idx) => {
      const marker = document.getElementById(markerId);
      if (!marker) return;

      marker.addEventListener("markerFound", () => {
        if (!encontrados.has(markerId)) {
          encontrados.add(markerId);
          mostrarMensaje(`🔎 Pista ${idx + 1} encontrada`);
        }

        // Si encontramos la pista actual, pasamos a mostrar la siguiente
        if (idx < hintImgs.length - 1) {
          actualizarUI(idx + 1);
        }

        // Si se encontraron todas las pistas
        if (encontrados.size === order.length) {
          mostrarMensaje("🎉 ¡Tesoro encontrado! 🎉", 4000);
          const audio = new Audio("assets/sonidos/tesoro.mp3");
          audio.play().catch(() => {});
        }
      });
    });
  },
});
