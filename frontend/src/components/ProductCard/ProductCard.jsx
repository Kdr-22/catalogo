import './ProductCard.css'
export function ProductCard(props){
    const {name, price, description, imgLink, imgAltText, check, copy} = props
    return (
        <div className="pCard">
            <div className="pCard__divImg">
                <img src={imgLink} alt={imgAltText} />
            </div>
            <div className='pCard__divTitle'>
                <h3>{name}</h3>
                <p>{price}</p>
            </div>
            <p>{description}</p>
            <div className='pCard__pin'>
                <label htmlFor="">Pinnear</label>
                <input type="checkbox" name="" id="" onChange={check}/>
            </div>
            <input type="button" value="Copy" onClick={()=>{copy()}} />
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