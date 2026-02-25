import "./CopyButtons.css";
// Funciones para copiar la informaicon del producto y formatear el texto,
export function CopyButtons({ valery_name, price, description, elements }) {
  const tasa = 354.43;

  const masterhanddle = (name, description, price, target, elements = null) => {
    let textoACopiar = "";
    if (elements) {
      elements.forEach((p) => {
        const texturisado = createText(
          p.valery_name,
          p.description,
          priceFormat(p.price, target, tasa),
        );
        return (textoACopiar += texturisado);
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
      return `El precio del producto es de $: ${price}`;
    if (pressedbutton === "bs")
      return `El precio del producto es de Bs: ${price * tasa}`;
    if (pressedbutton === "all")
      return (
        `El precio del producto es de $: ${price}\n` +
        `El precio del producto es de Bs: ${price * tasa} `
      );
  };
  const createText = (name, description, price) => {
    const textoACopiar = `${name}*\n` + `${description}"}\n` + `${price}\n`;
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
