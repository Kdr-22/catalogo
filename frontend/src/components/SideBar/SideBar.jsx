import { LeftControls } from "../LeftControls/LeftControls";
import { ProductPIn } from "../ProductPIn/ProductPin";
import "./SideBar.css";
export function SideBar({
  DelPin,
  colectionIndex,
  colectionSavedGroups,
  saveCurrentActiveIndex,
  pinearCard,
}) {
  return (
    <div className="appContainer__SideBar ">
      <LeftControls
        DelPin={DelPin}
        colectionIndex={colectionIndex}
        colectionSavedGroups={colectionSavedGroups}
        saveCurrentActiveIndex={saveCurrentActiveIndex}
      />
      <div className="pinElements">
        {colectionSavedGroups[colectionIndex].map((p) => (
          <ProductPIn key={p.id} {...p} pinFunction={pinearCard} />
        ))}
      </div>
    </div>
  );
}
