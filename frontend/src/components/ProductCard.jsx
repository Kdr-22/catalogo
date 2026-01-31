export function ProductCard(props){
    console.log(props);
    const {name, price, description} = props
    return (
        <div>
            <h3>{name}</h3>
            <p>{price}</p>
            <p>{description}</p>
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