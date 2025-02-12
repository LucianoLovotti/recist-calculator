document.getElementById('calcular').addEventListener('click', function() {
  let baselineLesions = [
    parseFloat(document.getElementById('b1').value) || 0,
    parseFloat(document.getElementById('b2').value) || 0,
    parseFloat(document.getElementById('b3').value) || 0,
    parseFloat(document.getElementById('b4').value) || 0,
    parseFloat(document.getElementById('b5').value) || 0
  ];

  let followupLesions = [
    parseFloat(document.getElementById('f1').value) || 0,
    parseFloat(document.getElementById('f2').value) || 0,
    parseFloat(document.getElementById('f3').value) || 0,
    parseFloat(document.getElementById('f4').value) || 0,
    parseFloat(document.getElementById('f5').value) || 0
  ];

  let baselineSum = baselineLesions.reduce((acc, val) => acc + val, 0);
  let followupSum = followupLesions.reduce((acc, val) => acc + val, 0);

  if (baselineSum <= 0) {
    alert("Error: Debes ingresar al menos una lesión en Baseline.");
    return;
  }

  let cambio = ((followupSum - baselineSum) / baselineSum) * 100;
  cambio = cambio.toFixed(2);

  let clasificacion = "";
  if (followupSum === 0) {
    clasificacion = "Respuesta Completa (RC)";
  } else if (cambio <= -30) {
    clasificacion = "Respuesta Parcial (RP)";
  } else if (cambio > -30 && cambio < 20) {
    clasificacion = "Enfermedad Estable (EE)";
  } else if (cambio >= 20) {
    clasificacion = "Progresión de la Enfermedad (PD)";
  }

  let reporte = `Evaluación RECIST 1.1:
- Suma de diámetros en baseline: ${baselineSum} mm
- Suma de diámetros en follow-up: ${followupSum} mm
- Cambio porcentual: ${cambio}%
- Clasificación: ${clasificacion}`;

  document.getElementById('reporte').value = reporte;
});

document.getElementById('copiar').addEventListener('click', function() {
  let reporteText = document.getElementById('reporte');
  reporteText.select();
  document.execCommand("copy");
});
