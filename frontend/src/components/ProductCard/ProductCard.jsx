import './ProductCard.css'
export function ProductCard(props){
    const {active, pinFunction, valery_name: name, price, description, imgAltText, copy} = props
    const descripcionFormateada = description ? description.replace(/\\n/g, '\n') : '';
    return (
        <div className="pCard">
            <div className="pCard__divImg">
                <img src="#" alt={imgAltText} />
            </div>
            <div className='pCard__divTitle'>
                <h3>{name}</h3>
                <p>{price}</p>
            </div>
            <p className="pCard__text" >{descripcionFormateada}</p>
            <div className='pCard__pin'>
                <label htmlFor="">Pinnear</label>
                <input type="checkbox" name="" id="" checked={active} onChange={()=>pinFunction(props)}/>
            </div>
            <input type="button" value="Get info" onClick={()=>copy()} />
        </div>
    );
}

// export function ProductCard(props){
//     console.log(props);
//     return (
//         <div>
//             <h3>{props.name}</h3>
//         </div>
//     );
// }

// Querido Keiber del futuro puedes pasar los props completos y dessestructurar dentor del componente, ya dependerá de ti si ves que es mejor o mas facil que pasar cada prop por separado