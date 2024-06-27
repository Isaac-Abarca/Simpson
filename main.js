document.addEventListener('DOMContentLoaded', function() {
  calculateInitialIntegrals([3, 6, 12, 24, 48, 3072]);

  document.getElementById('calculateButton').addEventListener('click', addSubintervals);
});

function f(h) {
  return Math.pow(h, 3) / (1 + Math.pow(h, 1/2));
}

function compositeSimpson13(a, b, n) {
  if (n % 2 !== 0) {
    throw new Error("n debe ser par para la regla de Simpson 1/3.");
  }

  const h = (b - a) / n;
  let suma = f(a) + f(b);

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    suma += (i % 2 === 0 ? 2 : 4) * f(x);
  }

  return (h / 3) * suma;
}

function compositeSimpson38(a, b, n) {
  if (n % 3 !== 0) {
    throw new Error("n debe ser múltiplo de 3 para la regla de Simpson 3/8.");
  }

  const h = (b - a) / n;
  let suma = f(a) + f(b);

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    suma += (i % 3 === 0 ? 2 : 3) * f(x);
  }

  return (3 * h / 8) * suma;
}

function addSubintervals() {
  const input = document.getElementById('subintervalsInput').value;
  const subintervals = parseInt(input, 10);

  if (isNaN(subintervals) || subintervals <= 0) {
    alert("Por favor, ingrese un número entero positivo.");
    return;
  }

  calculateIntegrals([subintervals]);
}

function calculateInitialIntegrals(subintervals) {
  const a = 1;
  const b = 2;
  const tableSimpson13Body = document.querySelector('#tableSimpson13 tbody');
  const tableSimpson38Body = document.querySelector('#tableSimpson38 tbody');

  subintervals.forEach(n => {
    try {
      const resultSimpson13 = compositeSimpson13(a, b, n);
      const resultRow = document.createElement('tr');
      resultRow.innerHTML = `<td>${n}</td><td>${resultSimpson13}</td>`;
      tableSimpson13Body.appendChild(resultRow);
    } catch (error) {
      const errorRow = document.createElement('tr');
      errorRow.innerHTML = `<td>${n}</td><td>${error.message}</td>`;
      tableSimpson13Body.appendChild(errorRow);
    }

    try {
      const resultSimpson38 = compositeSimpson38(a, b, n);
      const resultRow = document.createElement('tr');
      resultRow.innerHTML = `<td>${n}</td><td>${resultSimpson38}</td>`;
      tableSimpson38Body.appendChild(resultRow);
    } catch (error) {
      const errorRow = document.createElement('tr');
      errorRow.innerHTML = `<td>${n}</td><td>${error.message}</td>`;
      tableSimpson38Body.appendChild(errorRow);
    }
  });
}

function calculateIntegrals(subintervals) {
  const a = 1;
  const b = 2;
  const tableSimpson13Body = document.querySelector('#tableSimpson13 tbody');
  const tableSimpson38Body = document.querySelector('#tableSimpson38 tbody');

  subintervals.forEach(n => {
    try {
      const resultSimpson13 = compositeSimpson13(a, b, n);
      const resultRow = document.createElement('tr');
      resultRow.innerHTML = `<td>${n}</td><td>${resultSimpson13}</td>`;
      tableSimpson13Body.insertBefore(resultRow, tableSimpson13Body.firstChild);
    } catch (error) {
      const errorRow = document.createElement('tr');
      errorRow.innerHTML = `<td>${n}</td><td>${error.message}</td>`;
      tableSimpson13Body.insertBefore(errorRow, tableSimpson13Body.firstChild);
    }

    try {
      const resultSimpson38 = compositeSimpson38(a, b, n);
      const resultRow = document.createElement('tr');
      resultRow.innerHTML = `<td>${n}</td><td>${resultSimpson38}</td>`;
      tableSimpson38Body.insertBefore(resultRow, tableSimpson38Body.firstChild);
    } catch (error) {
      const errorRow = document.createElement('tr');
      errorRow.innerHTML = `<td>${n}</td><td>${error.message}</td>`;
      tableSimpson38Body.insertBefore(errorRow, tableSimpson38Body.firstChild);
    }
  });
}


