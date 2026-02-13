import { useEffect, useState } from 'react'
import { ProductCard } from './components/ProductCard/ProductCard'
import { ProductPIn } from './components/ProductPIn/ProductPin'
import './App.css'
import { DATOS } from './services/mokup'
// import { getProducts } from './services/api'

function App() {
  const [products, setProducts] = useState([])
  const [productsPin, setProductsPin] = useState(()=>{
    const guardados = localStorage.getItem("mis-pines");
    return guardados ? JSON.parse(guardados):[];
  });
  const [busqueda, setBusqueda] = useState("")

  const pinFunction = (nuevoProducto) => {

    const yaExiste = productsPin.some(itemActual => itemActual.id === nuevoProducto.id)
    if (yaExiste){
      const nuevaLista = productsPin.filter(item => item.id !== nuevoProducto.id)
      setProductsPin(nuevaLista);
      console.log("Eliminado de pines");

    }else {
      setProductsPin([...productsPin, nuevoProducto])
      console.log("Agregado a pines");
    }
    
  }
  const copyPaper = (producto)=> {
    const textoACopiar = `📦 *${producto.valery_name}*\n` +
                          `💰 Precio: $${producto.price}\n` +
                          ` ℹ Detalle: ${producto.description || 'Consultar disponibilidad'}\n\n` +
                          `📍 *Catálogo Digital*`;

                          navigator.clipboard.writeText(textoACopiar).then(()=>{
                            console.log("texto copiado al portapales")
                          }).catch(err => {
      console.error("Error al copiar: ", err);
    });
  }

  useEffect(()=>{ 
    // Esta es una funcion auto ejecutable (Puedes tambier usar una funcion normal y llamarla)
    (async () => {
      try{
        // Las promesas deben ser esperadas "await" para que devuelvan un resultado que no sea "pending"
        // const datos = await getProducts() 
        setProducts(DATOS)        
       
      } catch(error){
        console.error("Error al cargar los productos: ", error);
      }
    })()
  },[]);

  useEffect(()=>{
    localStorage.setItem('mis-pines', JSON.stringify(productsPin));
    console.log("LocalStorage actualizado con éxito");
  }, [productsPin])

  const productosFiltrados = products.filter((p) => 
  p.valery_name.toLowerCase().includes(busqueda.toLowerCase())
);
 return (
    <main className='main'>
        <header className='mainHeader'>

          {/* <h1>Catalogo engine</h1> */}
          <p className="mainDescription">Herramienta para facilidade de envio de productos y precios By KDR-22</p>
          <div>

          </div>
        </header>
         
        <div className='mainContainer'>

          <div className='productContainer'> 
            <div className='productSearchDiv'>
              <input 
                className='productSearch'
                type="text" 
                placeholder="Buscar producto..." 
                value={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)} 
                />
            </div>


            <div className='cardContainer'>
                {
                  

                  productosFiltrados.length === 0 ?
                  <p>No hay elementos para cargar.</p> : (
                  // Podemos pasar todos los props que queramos a un componente este los agrupara en un solo prop y podemos desestructurar para acceder a ellos
                  productosFiltrados.map(p => {

                    const isChecked = productsPin.some(item => item.id === p.id);

                    return <ProductCard key={p.id} {...p} pinFunction={pinFunction} active={isChecked} copyPaper={copyPaper}/>
                  })
                  )
                }
            </div>
          </div>
            
          <div className='productPin'>
                {
                  productsPin.map(p=> <ProductPIn key={p.id}{...p} pinFunction={pinFunction} copyPaper={copyPaper}/>)
                }
          </div>
        </div>

    </main>
  )
}

export default App