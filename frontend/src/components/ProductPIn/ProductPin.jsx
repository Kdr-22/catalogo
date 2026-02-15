import "./ProductPin.css";
import { CopyButtons } from "../CopyButtons/CopyButtons";
export function ProductPIn(props) {
  const { valery_name: name, price, pinFunction, copyPaper: copy } = props;
  return (
    <div>
      <p>
        {name} ${price}
      </p>
      <button onClick={() => pinFunction(props)}>X</button>
      <button onClick={() => copy(props)}>COpy</button>
      <CopyButtons />
    </div>
  );
}
