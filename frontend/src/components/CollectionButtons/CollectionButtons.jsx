import "./CollectionButtons.css";
export function CollectionButtons({ textContent, activeIndex }) {
  return (
    <button
      className={textContent == activeIndex ? "button--active" : "button"}
    >
      {textContent}
    </button>
  );
}
