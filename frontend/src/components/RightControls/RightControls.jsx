import "./RightControls.css";
export function RightControls({
  busqueda,
  setBusqueda,
  clickCurrency,
  currency,
}) {
  return (
    <div className="rigth__controls">
      <div className="productSearchDiv  ">
        <input
          className="productSearch"
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <div className="priceSelector ">
        <select
          onChange={(e) => {
            clickCurrency(e);
          }}
          value={currency}
          name="currency"
          id="currency-select"
        >
          <option value="1">$</option>
          <option value="2">Bs</option>
        </select>
      </div>
    </div>
  );
}
