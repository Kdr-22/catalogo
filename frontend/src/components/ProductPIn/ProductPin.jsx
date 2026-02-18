import "./ProductPin.css";
import { CopyButtons } from "../CopyButtons/CopyButtons";
export function ProductPIn(props) {
  const { valery_name: name, price, pinFunction } = props;
  return (
    <div className="productPinned">
      <div className="productPinned__top productPinned__inner">
        <p>{name}</p>
        <button onClick={() => pinFunction(props)}>X</button>
      </div>
      <div className="productPinned__bot productPinned__inner">
        <p>$ {price}</p>
        <CopyButtons {...props} />
        {/* Averiguar si esto está pasando la declaracion de la constante de arriba o el props del padre ‼️‼️‼️‼️ */}
      </div>
    </div>
  );
}
