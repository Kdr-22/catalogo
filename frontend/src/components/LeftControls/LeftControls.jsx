import { CopyButtons } from "../CopyButtons/CopyButtons";
import { CollectionButtons } from "../CollectionButtons/CollectionButtons";
import "./LeftControls.css";

export function LeftControls({
  DelPin,
  colectionIndex,
  colectionSavedGroups,
  saveCurrentActiveIndex,
}) {
  return (
    <div className="controls I_P1rem ">
      <div className="leftControlls__collections">
        <div className="leftControlls_innerDiv I_BB I_PB1Rem">
          <p className="collections__text">Colecciones</p>

          <div
            onClick={(e) => {
              saveCurrentActiveIndex(e);
            }}
            className="collections__buttons"
          >
            {colectionSavedGroups.map((p, indice) => {
              return (
                <CollectionButtons
                  key={indice}
                  activeIndex={colectionIndex + 1}
                  textContent={indice + 1}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="leftControlls_innerDiv I_BB I_PB1Rem">
        <div className="leftTopControlls ">
          <div className="leftTopControlls__inner leftTopControlls__inner--top">
            <button>Exportar grupo</button>
            <button
              onClick={() => {
                DelPin(colectionIndex);
              }}
            >
              Borrar todo
            </button>
          </div>
          <div className="leftTopControlls__inner leftTopControlls__inner--bot">
            {<CopyButtons elements={colectionSavedGroups[colectionIndex]} />}
          </div>
        </div>
      </div>
    </div>
  );
}
