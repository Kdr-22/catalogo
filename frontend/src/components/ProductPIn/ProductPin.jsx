import "./ProductPin.css";
import { CopyButtons } from "../CopyButtons/CopyButtons";
export function ProductPIn(props) {
  const {
    valery_name: name,
    price,
    pinFunction,
    //copyPaper: copy
  } = props;
  return (
    <div className="productPinned">
      <div className="productPinned__top productPinned__inner">
        <p>{name}</p>
        <button onClick={() => pinFunction(props)}>X</button>
      </div>
      <div className="productPinned__bot productPinned__inner">
        <p>$ {price}</p>
        <CopyButtons />
      </div>
    </div>
  );
}
