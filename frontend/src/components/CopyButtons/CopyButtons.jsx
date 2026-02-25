import "./CopyButtons.css";
// Funciones para copiar la informaicon del producto y formatear el texto,
export function CopyButtons({ valery_name, price, description, elements }) {
  const tasa = 596.07;

  const masterhanddle = (name, description, price, target, elements = null) => {
    let textoACopiar = "";
    if (elements) {
      elements.forEach((p) => {
        const texturisado = createText(
          p.valery_name,
          p.description,
          priceFormat(p.price, target, tasa),
        );
        return (textoACopiar += texturisado + `\n`);
      });
    } else {
      const texto = createText(
        name,
        description,
        priceFormat(price, target, tasa),
      );
      textoACopiar += texto;
    }
    clipboardFill(textoACopiar);
  };

  const priceFormat = (price, target, tasa) => {
    const pressedbutton = target.textContent.toLowerCase();

    if (pressedbutton === "$")
      return `El precio del producto para pagos en divisas es: ${price.toFixed(2)} $`;
    if (pressedbutton === "bs")
      return `El precio del producto para transferencias bancarias en Bs es ${(price * tasa).toFixed(2)} Bs.`;
    if (pressedbutton === "all")
      return (
        `El precio del producto para pagos en divisas es: ${price.toFixed(2)} $ \n` +
        `El precio del producto para transferencias bancarias en Bs es ${(price * tasa).toFixed(2)} Bs.`
      );
  };
  const createText = (name, description, price) => {
    const textoACopiar =
      `## ${name}\n` +
      `${description}\n\n` +
      `¿Qué método de pago estarías utilizando? Contamos con Zelle, pago móvil, Binance, transferencia electrónica y efectivo en divisas.\n\n` +
      `${price}\n`;
    return textoACopiar;
  };

  const clipboardFill = (textoPreparado) => {
    navigator.clipboard
      .writeText(textoPreparado)
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
        masterhanddle(valery_name, description, price, e.target, elements);
      }}
      className="CopyButtonsDiv"
    >
      <button className="CopyButtonsDiv__b">$</button>
      <button className="CopyButtonsDiv__b">Bs</button>
      <button className="CopyButtonsDiv__b">All</button>
    </div>
  );
}
