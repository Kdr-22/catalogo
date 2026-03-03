import { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import { MainContent } from "./components/MainContent/MainContent";
import { getProducts } from "./services/api";
import { SideBar } from "./components/SideBar/SideBar";
import { ProductGrid } from "./components/ProductGrid/ProductGrid";
import { RightControls } from "./components/RightControls/RightControls";
import { useCollections } from "./hooks/useCollections";
function App() {
  const { groups, activeIndex, addPin, saveCurrentActiveIndex, DelPin } =
    useCollections();

  const [products, setProducts] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = products.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const [currency, setCurrency] = useState(() => {
    const guardado = localStorage.getItem("currency");
    return guardado ? JSON.parse(guardado) : 1;
  });

  const clickCurrency = (e) => {
    setCurrency(e.target.value);
  };
  useEffect(() => {
    // Esta es una funcion auto ejecutable (Puedes tambier usar una funcion normal y llamarla)
    (async () => {
      try {
        // Las promesas deben ser esperadas "await" para que devuelvan un resultado que no sea "pending"
        const datos = await getProducts();
        setProducts(datos);
      } catch (error) {
        console.error("Error al cargar los productos: ", error);
      }
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);

  return (
    <div className="relative">
      <div
        className="absolute"
        style={{
          backgroundImage: `
        radial-gradient(circle 600px at 0% 200px, #a99bf7, transparent),
        radial-gradient(circle 600px at 100% 200px, #a99bf7, transparent)
      `,
        }}
      />
      <main className="main">
        <section className="appContainer">
          <SideBar
            DelPin={DelPin}
            colectionIndex={activeIndex}
            colectionSavedGroups={groups}
            saveCurrentActiveIndex={saveCurrentActiveIndex}
            pinearCard={addPin}
          />

          <MainContent>
            <RightControls
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              clickCurrency={clickCurrency}
              currency={currency}
            />

            <ProductGrid
              productosFiltrados={productosFiltrados}
              colectionSavedGroups={groups}
              colectionIndex={activeIndex}
              pinearCard={addPin}
            />
          </MainContent>
        </section>
      </main>
    </div>
  );
}

export default App;
