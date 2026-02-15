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
          <div>
            <div className="pCard__divTitle">
              <h3 className="pCard__title">{name}</h3>
              <p className="pCard__price">${price}</p>
            </div>
            <p className="pCard__colection">{colection}</p>
          </div>
        </div>

        <p className="pCard__subTitle">Descripcion</p>
        <p className="pCard__text">{descripcionFormateada}</p>
        {/* <input type="button" value="Get info" onClick={() => copy()} /> */}
      </div>
      <div className="pCard__pin">
        <CopyButtons />
        <label htmlFor="">Pinnear</label>
        <input
          type="checkbox"
          name=""
          id=""
          checked={active}
          onChange={() => pinFunction(props)}
        />
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
