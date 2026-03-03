import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductGrid.css";
export function ProductGrid({
  productosFiltrados,
  colectionSavedGroups,
  colectionIndex,
  pinearCard,
}) {
  return (
    <div className="cardContainer">
      {productosFiltrados.length === 0 ? (
        <p>No hay elementos para cargar.</p>
      ) : (
        // Podemos pasar todos los props que queramos a un componente este los agrupara en un solo prop y podemos desestructurar para acceder a ellos
        productosFiltrados.map((p) => {
          const isChecked = colectionSavedGroups[colectionIndex].some(
            (item) => item.id === p.id,
          );

          return (
            <ProductCard
              key={p.id}
              {...p}
              pinFunction={pinearCard}
              active={isChecked}
            />
          );
        })
      )}
    </div>
  );
}
