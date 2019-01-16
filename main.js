const waterJar = document.getElementById('waterJar');

waterJar.onclick = () => {
  waterJar.style.visibility = 'hidden';
  setTimeout(() => {
    waterJar.style.visibility = 'visible';
  }, 1000);
};
