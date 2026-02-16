function irAWhatsApp(categoria) {
  const telefono = "584248549244"; // El número que vi en su IG
  const mensaje = encodeURIComponent(
    `Hola Luce Renacer ✨, vi su catálogo web y me encantaría ver los modelos disponibles de ${categoria}. ¿Me podrían dar más información?`,
  );
  window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
}
