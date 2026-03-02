import { LeftControls } from "../LeftControls/LeftControls";
import { ProductPIn } from "../ProductPIn/ProductPin";
export function SideBar({
  DelPin,
  colectionIndex,
  colectionSavedGroups,
  saveCurrentActiveIndex,
  pinearCard,
}) {
  return (
    <>
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
    </>
  );
}
