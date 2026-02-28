import { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { ProductPIn } from "./components/ProductPIn/ProductPin";
import { CopyButtons } from "./components/CopyButtons/CopyButtons";
import { CollectionButtons } from "./components/CollectionButtons/CollectionButtons";
// import { DATOS } from "./services/mokup";
import { getProducts } from "./services/api";

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

  const leftcontrols = (
    <div className="controls ">
      <div className="leftTopControlls">
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
      <div className="leftControlls__collections">
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
  );
  const rightControls = (
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
  // console.log(colectionSavedGroups);
  return (
    <main className="main">
      <div className="appContainer">
        <div className="appContainer__left ">
          {
            /* controles para la gestion de elementos pineados  */
            leftcontrols
          }
          <div className="pinElements">
            {colectionSavedGroups[colectionIndex].map((p) => (
              <ProductPIn key={p.id} {...p} pinFunction={pinearCard} />
            ))}
          </div>
        </div>

        <div className="appContainer__right">
          <div className="rigth">
            {
              /* Controles de busqueda de cartas y cambio en la muestra de precios */
              rightControls
            }

            <div className="cardContainer PM-internalPadding ">
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
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
