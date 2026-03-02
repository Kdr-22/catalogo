export function RightControls({
  busqueda,
  setBusqueda,
  clickCurrency,
  currency,
}) {
  return (
    <div className="rigth__controls PM-internalPadding PM-outline1pxsolidblack">
      <div className="productSearchDiv  PM-outline1pxsolidblack">
        <input
          className="productSearch"
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <div className="priceSelector PM-outline1pxsolidblack">
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
