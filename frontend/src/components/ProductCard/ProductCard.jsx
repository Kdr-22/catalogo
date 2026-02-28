import "./ProductCard.css";
import { CopyButtons } from "../CopyButtons/CopyButtons";
export function ProductCard(props) {
  const {
    active,
    colection,
    pinFunction,
    name, // Puedes renombrar la variable que viene del prop por la de tu
    price,
    description,
    image_link,
    imgAltText,

    // copy,
  } = props;
  const descripcionFormateada = description
    ? description.replace(/\\n/g, "\n")
    : "";

  // Con esta funcion envitamos la propagacion del evento de click hacia el padre al presionar algun boton en la tarjeta
  const handleclick = (e) => {
    if (e.target.tagName !== "BUTTON") {
      // console.log("clien en el cuerpo de la tarjeta");
      pinFunction(props);
    } else {
      // console.log("click en un boton");
    }
  };
  return (
    <div
      onClick={(e) => handleclick(e)}
      className={`pCard ${active ? "pCard--active" : null}`}
    >
      <div className="pCard__divImg">
        <img src={image_link} alt={imgAltText} />
      </div>
      <div className="pCard__show">
        <div className="pCard__mainView">
          <div className="pCard__preview">
            <h3 className="pCard__title">{name}</h3>
            <div className="pCard__divTitle">
              <p className="pCard__price">${price}</p>
              <p className="pCard__colection">{colection}</p>
            </div>
          </div>
        </div>

        <p className="pCard__subTitle">Descripcion</p>
        <p className="pCard__text">{descripcionFormateada}</p>
        {/* <input type="button" value="Get info" onClick={() => copy()} /> */}
      </div>
      <div className="pCard__actions">
        <div className="pCard__actionsInnerTop">
          <button>+</button>
        </div>
        <div className="pCard__actionsInnerBot">
          <button>Gallery</button>
          <CopyButtons {...props} />
          {/* Averiguar si esta implementacion tiene repercucion en rendimiento */}
        </div>
      </div>
    </div>
  );
}

// export function ProductCard(props){
//     console.log(props);
//     return (
//         <div>
//             <h3>{props.name}</h3>
//         </div>
//     );
// }

// Querido Keiber del futuro puedes pasar los props completos y dessestructurar dentor del componente, ya dependerá de ti si ves que es mejor o mas facil que pasar cada prop por separado
