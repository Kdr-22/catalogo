import "./ProductPin.css"
export function ProductPIn (props){
    const {valery_name: name, price, pinFunction} = props
    return (
        <div>
          <p> {name} ${price}</p>
          <button onClick={()=> pinFunction(props)}>🔻</button>
        
        </div>
    )
}