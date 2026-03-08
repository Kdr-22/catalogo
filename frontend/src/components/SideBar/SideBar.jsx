import { LeftControls } from "../LeftControls/LeftControls";
import { ProductPIn } from "../ProductPIn/ProductPin";
import "./SideBar.css";
export function SideBar({
  DelPin,
  colectionIndex,
  colectionSavedGroups,
  saveCurrentActiveIndex,
  pinearCard,
  listalaverdad,
}) {
  const listaARenderizar = listalaverdad.filter((item) =>
    colectionSavedGroups[colectionIndex].includes(item.id),
  );
  return (
    <div className="appContainer__SideBar  ">
      <LeftControls
        DelPin={DelPin}
        colectionIndex={colectionIndex}
        colectionSavedGroups={colectionSavedGroups}
        saveCurrentActiveIndex={saveCurrentActiveIndex}
      />
      <div className="pinElements">
        {listaARenderizar.map((p) => (
          <ProductPIn key={p.id} {...p} pinFunction={pinearCard} />
        ))}
      </div>
    </div>
  );
}
