import { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import { MainContent } from "./components/MainContent/MainContent";
import { getProducts } from "./services/api";
import { SideBar } from "./components/SideBar/SideBar";
import { ProductGrid } from "./components/ProductGrid/ProductGrid";
import { RightControls } from "./components/RightControls/RightControls";
function App() {
  //  // Socorro no entres aqui hay intentos Vanilla de crear la botonera de las colecciones
  // CollectionInfo tiene = Como primer elemento el numero de la seleccion activa en este momento y arreglos de objetos guardados en las colecciones

  // const colection = [1, [], [], [], []];
  // const colectionIndex = colection[0];

  // // recuperamos el "Colection selecionado"
  // const getCurrentActiveIndex = (e) => {
  //   const buttons = e.target.closest("button").parentElement.childNodes; //esto devuelve una coleccion de elementosHTML
  //   const buttonpulsado = e.target.closest("button");

  //   buttons.forEach((button) => {
  //     if (button !== buttonpulsado) {
  //       button.classList.remove("button--active");
  //     }
  //   });

  //   buttonpulsado.classList.contains("button--active")
  //     ? null
  //     : e.target.closest("button").classList.add("button--active");
  //   return e.target.closest("button").textContent;
  //   // return console.log(
  //   // e.target.closest("button").textContent, //Se usa closests para asegurar que al menos sea un boton al que le demos click
  //   // e.target.parentElement,
  //   // e,
  //   // Al volver vamos a seguir con la linea de pensamiento de ir armando la forma de mantener una coleccion activa para ello estamos recuperando el indice de coleccion activo
  // };
  // const getTrueActiveIndex = (a) => {
  //   window.localStorage.setItem("IndexActual", JSON.stringify(a));
  //   console.log(`guardado ${a} como indice actual`);
  // };
  // const ColectionButtons = () => {
  //   let getItemStored = localStorage.getItem("IndexActual");

  //   let idiceguardado = undefined;
  //   getItemStored ? (idiceguardado = JSON.parse(getItemStored)) : 1;
  //   let Div = document.createElement("div");

  //   function crearBotones(indice) {
  //     let newButon = document.createElement("button");
  //     if (indice === Number(idiceguardado)) {
  //       newButon.classList.add("button--active");
  //     }
  //     let newText = document.createTextNode(`${indice}`);
  //     newButon.appendChild(newText);

  //     Div.appendChild(newButon);
  //   }

  //   for (let i = 0; i <= 4; i++) {
  //     crearBotones(i);
  //   }

  //   return (
  //     <div
  //       onClick={(e) => {
  //         getTrueActiveIndex(getCurrentActiveIndex(e));
  //       }}
  //       className="collections__buttons"
  //     >
  //       {/* Botonoes 1 2 3 4 5 */}
  //     </div>
  //   );
  // };
  // // const currentActiveIndex = 1
  // // const formatearPrecio = (price, target) => {
  // //     if (target.textContent === "$")
  // //       return `El precio del producto es de $: ${price}`;
  // //     if (target.textContent === "Bs")
  // //       return `El precio del producto es de Bs: ${price * 50}`;
  // //     if (target.textContent === "All")
  // //       return (
  // //         `El precio del producto es de $: ${price}\n` +
  // //         `El precio del producto es de Bs: ${price * 50} `
  // //         // El numero de la tasa tiene que ser una variable, de momento vamos a dejarlo fijo en 50 para testing
  // //       );
  // //   };

  // const colectionSavedGroups = ;

  const [colectionSavedGroups, setColectionSavedGroups] = useState(() => {
    const guardado = localStorage.getItem("Colecciones");
    return guardado ? JSON.parse(guardado) : [[], [], [], [], []];
  });

  const [colectionIndex, setColectionIndex] = useState(() => {
    let savedIdenx = localStorage.getItem("CurrentActiveCollectionIndex");
    return savedIdenx ? Number(savedIdenx) : (savedIdenx = 0);
  });

  const [currency, setCurrency] = useState(() => {
    const guardado = localStorage.getItem("currency");
    return guardado ? JSON.parse(guardado) : 1;
  });
  const clickCurrency = (e) => {
    setCurrency(e.target.value);
  };
  const [products, setProducts] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  const pinearCard = (producto) => {
    const indice = colectionIndex; //Muestra el indice correctamente
    const colectionCopy = colectionSavedGroups; // Muestra correctamente la copia del local storage

    const existe = colectionCopy[indice].some((item) => item.id == producto.id);

    if (existe) {
      // const nuevalistafiltrada = colectionCopy[indice].filter(
      //   (item) => item.id !== producto.id,
      // );

      const nuevalista = colectionCopy.map((p, index) => {
        if (index === indice) {
          const filtrado = p.filter((item) => item.id !== producto.id);
          return filtrado;
        } else {
          return p;
        }
      });

      setColectionSavedGroups(nuevalista);
    } else {
      const nuevalista = colectionCopy.map((p, index) => {
        if (index === indice) {
          return [producto, ...p];
        } else {
          return p;
        }
      });
      // colectionCopy[indice].unshift(producto);
      // console.log(colectionCopy);

      setColectionSavedGroups(nuevalista);
    }
  };
  const DelPin = (indice) => {
    const nuevaLista = colectionSavedGroups.map((p, index) => {
      if (index === indice) {
        return (p = []);
      } else return p;
    });
    setColectionSavedGroups(nuevaLista);
  };

  const productosFiltrados = products.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const saveCurrentActiveIndex = (e) => {
    const button = e.target.closest("button");
    localStorage.setItem(
      "CurrentActiveCollectionIndex",
      button.textContent - 1,
    );
    setColectionIndex(button.textContent - 1);
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
    localStorage.setItem("Colecciones", JSON.stringify(colectionSavedGroups));
  }, [colectionSavedGroups]);
  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);

  // console.log(colectionSavedGroups);
  return (
    <main className="main">
      <section className="appContainer">
        <SideBar
          DelPin={DelPin}
          colectionIndex={colectionIndex}
          colectionSavedGroups={colectionSavedGroups}
          saveCurrentActiveIndex={saveCurrentActiveIndex}
          pinearCard={pinearCard}
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
            colectionSavedGroups={colectionSavedGroups}
            colectionIndex={colectionIndex}
            pinearCard={pinearCard}
          />
        </MainContent>
      </section>
    </main>
  );
}

export default App;
