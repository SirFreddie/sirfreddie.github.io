AFRAME.registerComponent('init-game', {
  init: function () {
    const mensaje = document.getElementById("mensaje");
    const marcadores = ["m1", "m2", "m3"];
    let encontrados = new Set();

    const mostrarMensaje = (texto, tiempo = 2000) => {
      mensaje.innerText = texto;
      mensaje.style.display = "block";
      setTimeout(() => (mensaje.style.display = "none"), tiempo);
    };

    marcadores.forEach((id) => {
      const marker = document.getElementById(id);
      marker.addEventListener("markerFound", () => {
        if (!encontrados.has(id)) {
          encontrados.add(id);
          mostrarMensaje(`🔎 Pista ${encontrados.size} encontrada`);
        }

        if (encontrados.size === marcadores.length) {
          mostrarMensaje("🎉 ¡Tesoro encontrado! 🎉", 4000);
          const audio = new Audio("assets/sonidos/tesoro.mp3");
          audio.play();
        }
      });
    });

    mostrarMensaje("🧭 Escanea los marcadores para comenzar");
  },
});
