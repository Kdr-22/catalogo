import "./ProductPin.css"
export function ProductPIn (props){
    const {valery_name: name, price, pinFunction, copyPaper : copy} = props
    return (
        <div>
          <p> {name} ${price}</p>
          <button onClick={()=> pinFunction(props)}>🔻</button>
            <button onClick={()=>copy(props)}>COpy</button>
        </div>
    )
}