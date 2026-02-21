import "./CollectionButtons.css";
export function CollectionButtons({ textContent, id }) {
  return (
    <button className={textContent === id ? "button--active" : "button"}>
      {textContent}
    </button>
  );
}
