import "./ProductPin.css";
import { CopyButtons } from "../CopyButtons/CopyButtons";
export function ProductPIn(props) {
  const { name, price, pinFunction } = props;
  return (
    <div className="productPinned">
      <div className="productPinned__imgDiv">
        <img src="https://placehold.co/66x59" alt="" />
      </div>
      <div className="productPinned__elements">
        <div className="productPinned__top productPinned__inner">
          <p>{name}</p>
          <button onClick={() => pinFunction(props)}>X</button>
        </div>
        <div className="productPinned__bot productPinned__inner">
          <p>$ {price}</p>
          <CopyButtons {...props} variant="variant" />
          {/* Averiguar si esto está pasando la declaracion de la constante de arriba o el props del padre ‼️‼️‼️‼️ */}
        </div>
      </div>
    </div>
  );
}
