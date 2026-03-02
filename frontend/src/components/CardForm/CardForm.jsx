import "./CardForm.css";
export function CardForm() {
  return (
    <div className="productConfig">
      <select name="elements" id="element-select">
        <option value="1">$</option>
        <option value="2">Bs</option>
        <option value="3">Bs</option>
        <option value="4">Bs</option>
        <option value="5">Bs</option>
      </select>
      <form action="">
        <label>
          <input type="text" />
        </label>
        <label>
          <input type="number" />
        </label>
        <textarea name="" id=""></textarea>
      </form>
    </div>
  );
}
