const getWaterJar = document => document.getElementById('waterJar');

const toggleWaterJar = function () {
  const waterJar = getWaterJar(document);
  waterJar.onclick = () => {
    waterJar.style.visibility = 'hidden';
    setTimeout(() => {
      waterJar.style.visibility = 'visible';
    }, 1000);
  };
}

window.onload = toggleWaterJar;