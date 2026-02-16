import "./ProductCard.css";
import { CopyButtons } from "../CopyButtons/CopyButtons";
export function ProductCard(props) {
  const {
    active,
    colection,
    pinFunction,
    title: name,
    price,
    description,
    image_link,
    imgAltText,
    // copy,
  } = props;
  const descripcionFormateada = description
    ? description.replace(/\\n/g, "\n")
    : "";
  return (
    <div className="pCard">
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
          <input
            className="pinElement"
            type="checkbox"
            name=""
            id=""
            checked={active}
            onChange={() => pinFunction(props)}
          />
          <CopyButtons />
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
