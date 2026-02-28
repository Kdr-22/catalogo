export const getProducts = async () => {
  const url = "/api/products";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Falló al conectar");
  return await res.json();
};

export const delProducts = async (id) => {
  const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Falló al borrar");
  return res.ok;
};
