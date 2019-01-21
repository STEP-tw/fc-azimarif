const getWaterJar = document => document.getElementById('waterJar');

const toggleWaterJar = function () {
  waterJar.style.visibility = 'hidden';
  setTimeout(() => {
    waterJar.style.visibility = 'visible';
  }, 1000);
};

const initialize = function () {
  getWaterJar(document).onclick = toggleWaterJar;
};

window.onload = initialize;