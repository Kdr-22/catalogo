export const getProducts = async() => {
    const url = "https://script.google.com/macros/s/AKfycbwOCRGTYg3RlZvfit_5uC3jPEld26TJJVhh4RoQ_2L3lUo3jAhCoOmP6lW5sTKhIIs/exec"
    const res  = await fetch(url);
    if (!res.ok) throw new Error("Falló al conectar")
    return await res.json()
}

export const delProducts = async(id)=>{
    const res = await fetch(`/api/products/${id}`, {method: "DELETE"});
    if (!res.ok) throw new Error ("Falló al borrar");
    return res.ok
}