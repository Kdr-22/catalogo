import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Gracias al proxy, solo usamos '/api/products'
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error cargando productos:", err))
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📦 Mi Catálogo</h1>
      <hr />
      
      {products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {products.map(product => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              <h3>{product.name}</h3>
              <p>Precio: ${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App