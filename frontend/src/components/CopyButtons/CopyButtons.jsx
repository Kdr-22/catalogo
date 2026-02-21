import "./CopyButtons.css";
// Funciones para copiar la informaicon del producto y formatear el texto,
export function CopyButtons({ valery_name, price, description }) {
  const formatearPrecio = (price, target) => {
    if (target.textContent === "$")
      return `El precio del producto es de $: ${price}`;
    if (target.textContent === "Bs")
      return `El precio del producto es de Bs: ${price * 50}`;
    if (target.textContent === "All")
      return (
        `El precio del producto es de $: ${price}\n` +
        `El precio del producto es de Bs: ${price * 50} `
        // El numero de la tasa tiene que ser una variable, de momento vamos a dejarlo fijo en 50 para testing
      );
  };
  //  ‼️‼️Si el target apunta a algo entre los botonoes va a marcar undefined corregir
  const copyPaper = (name, description, price, target) => {
    const textoACopiar =
      `${name}*\n` +
      `${description}"}\n` +
      `💵${formatearPrecio(price, target, 50)}\n`;

    navigator.clipboard
      .writeText(textoACopiar)
      .then(() => {
        console.log("texto copiado al portapales");
      })
      .catch((err) => {
        console.error("Error al copiar: ", err);
      });
  };
  return (
    <div
      onClick={(e) => {
        copyPaper(valery_name, description, price, e.target);
      }}
      className="CopyButtonsDiv"
    >
      <button className="CopyButtonsDiv__b">$</button>
      <button className="CopyButtonsDiv__b">Bs</button>
      <button className="CopyButtonsDiv__b">All</button>
    </div>
  );
}
