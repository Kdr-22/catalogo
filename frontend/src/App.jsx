import { useEffect, useState } from 'react'
import { ProductCard } from './components/ProductCard/ProductCard'
import './App.css'
import { getProducts } from './services/api'

function App() {
  const [products, setProducts] = useState([])

  useEffect(()=>{ 
    // Esta es una funcion auto ejecutable (Puedes tambier usar una funcion normal y llamarla)
    (async () => {
      try{
        // Las promesas deben ser esperadas "await" para que devuelvan un resultado que no sea "pending"
        const datos = await getProducts() 
        setProducts(datos)
      } catch(error){
        console.error("Error al cargar los productos: ", error);
      }
    })()
    
  },[]);

 return (
    <main className='main'>
        <header>

          <h1>Catalogo de cosas</h1>
          <p className='hero__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, architecto.</p>
        </header>
        <div className='mainContainer'>

          <div className='productContainer'> 
            {
              products.length === 0 ?
              <p>No hay elementos para cargar.</p> : (
              // Podemos pasar todos los props que queramos a un componente este los agrupara en un solo prop y podemos desestructurar para acceder a ellos
              products.map(p => <ProductCard key={p.id} {...p}/>)
              )
            }
          </div>

          <div className='productPin'>
            
          </div>
        </div>

    </main>
  )
}

export default App