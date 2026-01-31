import { useEffect, useState } from 'react'
import { ProductCard } from './components/ProductCard'
import './App.css'

function App() {
  const [products, setProducts] = useState([])

  async function getProducts() {
    const res = await fetch('/api/products');
    const datos = await res.json()
    console.log(datos);
    setProducts(datos)
  }
  useEffect(()=>{
    getProducts()
  },[]);

 
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📦 Mi Catálogo</h1>
      <hr />
      
      {
        products.length === 0 ?
        <p>No hay elementos para cargar.</p> : (
          
          
            <div className='produt__container'>
              {
                products.map(p => <ProductCard key={p.id} {...p}/>)
              }
            </div>
        )
      }
    </div>
  )
}

export default App