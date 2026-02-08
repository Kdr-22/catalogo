import "./ProductPin.css"
export function ProductPIn (props){
    const {name, price,pinFunction} = props
    return (
        <div>
          <p> {name} Lorem, ipsum. {price}</p>
          <button onClick={()=> pinFunction(props)}>🔻</button>
        
        </div>
    )
}