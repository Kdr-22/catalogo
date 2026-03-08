import { useState, useEffect } from "react";

export function useCollections() {
  // Memoria
  const [groups, setGroups] = useState(() => {
    const guardado = localStorage.getItem("Colecciones");
    return guardado ? JSON.parse(guardado) : [[], [], [], [], []];
  });
  const [activeIndex, setActiveIndex] = useState(() => {
    let saved = localStorage.getItem("CurrentActiveCollectionIndex");
    // return savedIdenx ? Number(savedIdenx) : (savedIdenx = 0);
    return saved ? Number(saved) : 0;
  });
  // Los efectos
  useEffect(() => {
    localStorage.setItem("Colecciones", JSON.stringify(groups));
  }, [groups]);
  //  Las funciones
  const addPin = (producto) => {
    const indice = activeIndex; //Muestra el indice correctamente
    const colectionCopy = groups; // Muestra correctamente la copia del local storage

    const existe = colectionCopy[indice].some((item) => item == producto.id);

    if (existe) {
      // const nuevalistafiltrada = colectionCopy[indice].filter(
      //   (item) => item.id !== producto.id,
      // );

      const nuevalista = colectionCopy.map((p, index) => {
        //Creamos una nueva lista que va a mapear la copia
        if (index === indice) {
          // Si el indice es igual al indice selecionado por el usuario
          const filtrado = p.filter((item) => item !== producto.id); //Va a filtrar de la lista "selecionada" el elemento que estamos quitando
          return filtrado;
        } else {
          return p;
        }
      });

      setGroups(nuevalista);
    } else {
      //Si no existe el elemento
      const nuevalista = colectionCopy.map((p, index) => {
        if (index === indice) {
          return [producto.id, ...p];
        } else {
          return p;
        }
      });
      // colectionCopy[indice].unshift(producto);
      // console.log(colectionCopy);

      setGroups(nuevalista);
    }
  };
  const DelPin = (indice) => {
    const nuevaLista = groups.map((p, index) => {
      if (index === indice) {
        return (p = []);
      } else return p;
    });
    setGroups(nuevaLista);
  };
  const saveCurrentActiveIndex = (e) => {
    const button = e.target.closest("button");
    localStorage.setItem(
      "CurrentActiveCollectionIndex",
      button.textContent - 1,
    );
    setActiveIndex(button.textContent - 1);
  };
  return {
    groups,
    activeIndex,
    addPin,
    saveCurrentActiveIndex,
    DelPin,
  };
}
