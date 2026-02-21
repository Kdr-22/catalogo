import { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { ProductPIn } from "./components/ProductPIn/ProductPin";
import { CopyButtons } from "./components/CopyButtons/CopyButtons";
import { CollectionButtons } from "./components/CollectionButtons/CollectionButtons";
import { DATOS } from "./services/mokup";
// import { getProducts } from './services/api'

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

  const colectionSavedGroups = [
    [
      {
        id: "ACC-001",
        title: "Mini UPS DC",
        colection: "accesorio",
        valery_name: "Mini UPS 20000MaH",
        description:
          "• Capacidad: 20.000 mAh de alta duración. \n• Compatibilidad: Routers, Antenas POE, Cámaras de seguridad y dispositivos de red.\n• Salidas DC: 5V / 9V / 12V seleccionables.\n• Puerto POE: 15V / 24V para antenas y equipos específicos.\n• Indicadores: LEDs de estado de carga y encendido.\n",
        availability: "in stock",
        condition: "new",
        price: 23,
        link: "https://wa.me/584129230341?text=Hola%20Compucentro,%20me%20interesa%20el%20producto%20ID:%20ACC-001%20-%20Mini UPS DC",
        image_link:
          "https://raw.githubusercontent.com/KDR-2/compucentro-img/main/ACC-001.webp",
        additional_image_link: "",
        brand: "Olax",
        google_product_category:
          "Electronics > Networking > Network Hubs & Switches",
        product_type: "Accesorios > Energía",
        availability_circle_origin: "",
      },
      {
        id: "ACC-002",
        title: "Funda Protectora para Laptops",
        colection: "accesorio",
        valery_name: "Forro Laptop UP",
        description:
          'Funda Protectora U-products para Laptop 14"\n\nProtección esencial contra rayones, polvo y golpes leves. Diseño ligero y resistente.\n\n• Compatibilidad: Laptops y Tablets hasta 14 pulgadas. \n• Material: Neopreno / Tela acolchada de alta densidad. \n• Marca: U-products. \n• Uso: Ideal para morrales o transporte individual.\n\nOfrecemos precio al mayor disponible en divisas',
        availability: "in stock",
        condition: "new",
        price: 7.5,
        link: "https://wa.me/584129230341?text=Hola%20Compucentro,%20me%20interesa%20el%20producto%20ID:%20ACC-002%20-%20Funda Protectora para Laptops",
        image_link:
          "https://raw.githubusercontent.com/KDR-2/compucentro-img/main/ACC-002.webp",
        additional_image_link: "",
        brand: "U-products",
        google_product_category:
          "Electronics > Laptop Accessories > Laptop Cases",
        product_type: "Accesorios > Protección",
        availability_circle_origin: "",
      },
    ],
    [],
    [],
    [],
    [],
  ];

  const [colectionIndex, setColectionIndex] = useState(() => {
    const savedIdenx = localStorage.getItem("CurrentActiveCollectionIndex");

    return savedIdenx ? savedIdenx : 1;
  });

  const [products, setProducts] = useState([]);

  const [productsPin, setProductsPin] = useState(() => {
    const guardados = localStorage.getItem("mis-pines");
    return guardados ? JSON.parse(guardados) : [];
  });
  const [busqueda, setBusqueda] = useState("");
  const pinFunction = (nuevoProducto) => {
    const yaExiste = productsPin.some(
      (itemActual) => itemActual.id === nuevoProducto.id,
    );
    if (yaExiste) {
      const nuevaLista = productsPin.filter(
        (item) => item.id !== nuevoProducto.id,
      );
      setProductsPin(nuevaLista);
      console.log("Eliminado de pines");
    } else {
      setProductsPin([...productsPin, nuevoProducto]);
      console.log("Agregado a pines");
    }
  };
  const productosFiltrados = products.filter((p) =>
    p.valery_name.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const saveCurrentActiveIndex = (e) => {
    const button = e.target.closest("button");
    localStorage.setItem(
      "CurrentActiveCollectionIndex",
      Number(button.textContent),
    );
    setColectionIndex(button.textContent);
  };

  useEffect(() => {
    // Esta es una funcion auto ejecutable (Puedes tambier usar una funcion normal y llamarla)
    (async () => {
      try {
        // Las promesas deben ser esperadas "await" para que devuelvan un resultado que no sea "pending"
        // const datos = await getProducts()
        setProducts(DATOS);
      } catch (error) {
        console.error("Error al cargar los productos: ", error);
      }
    })();
  }, []);
  useEffect(() => {
    localStorage.setItem("Colecciones", JSON.stringify(productsPin));
  }, [productsPin]);

  const leftcontrols = (
    <div className="controls ">
      <div className="leftTopControlls">
        <div className="leftTopControlls__inner leftTopControlls__inner--top">
          <button>Exportar grupo</button>
          <button>Borrar todo</button>
        </div>
        <div className="leftTopControlls__inner leftTopControlls__inner--bot">
          {<CopyButtons />}
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
                activeIndex={colectionIndex}
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
        <p>Selector de $$ o Bs</p>
      </div>
    </div>
  );
  return (
    <main className="main">
      <div className="appContainer">
        <div className="appContainer__left ">
          {
            /* controles para la gestion de elementos pineados  */
            leftcontrols
          }
          <div className="pinElements">
            {colectionSavedGroups[colectionIndex - 1].map((p) => (
              <ProductPIn key={p.id} {...p} pinFunction={pinFunction} />
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
                  const isChecked = productsPin.some(
                    (item) => item.id === p.id,
                  );

                  return (
                    <ProductCard
                      key={p.id}
                      {...p}
                      pinFunction={pinFunction}
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
