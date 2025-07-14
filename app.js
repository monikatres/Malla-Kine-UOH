fetch("malla.json")
  .then(response => response.json())
  .then(malla => {
    const contenedor = document.getElementById("malla");

    // Recuperar aprobados
    const aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

    // Agrupar por semestre
    const semestres = {};
    malla.forEach(ramo => {
      if (!semestres[ramo.semestre]) {
        semestres[ramo.semestre] = [];
      }
      semestres[ramo.semestre].push(ramo);
    });

    for (let semestre in semestres) {
      const divSem = document.createElement("div");
      divSem.className = "semestre";
      divSem.innerHTML = `<h2>Semestre ${semestre}</h2>`;

      semestres[semestre].forEach(ramo => {
        const divRamo = document.createElement("div");
        divRamo.className = "ramo";
        if (aprobados.includes(ramo.nombre)) {
          divRamo.classList.add("aprobado");
        }

        divRamo.innerHTML = `
          <span>${ramo.nombre}</span>
          <label>
            <input type="checkbox" ${aprobados.includes(ramo.nombre) ? "checked" : ""}>
            Aprobado
          </label>
        `;

        const checkbox = divRamo.querySelector("input");
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            divRamo.classList.add("aprobado");
            aprobados.push(ramo.nombre);
          } else {
            divRamo.classList.remove("aprobado");
            const idx = aprobados.indexOf(ramo.nombre);
            if (idx > -1) {
              aprobados.splice(idx, 1);
            }
          }
          localStorage.setItem("aprobados", JSON.stringify(aprobados));
        });

        divSem.appendChild(divRamo);
      });

      contenedor.appendChild(divSem);
    }
  });

