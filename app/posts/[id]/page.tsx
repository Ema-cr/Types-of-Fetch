import axios from "axios";


const fetchData = async (id:string) => {

  const data = await axios.get(`https://fakestoreapi.com/products/${id}`)
  console.log(data.data);
  return data.data;
}



async function Product ({ params }) {

  const { id } = await params;

  const product = await fetchData(id);

  return (
    <>
    <div>{product.title}</div>
    <div>{product.price}</div>
    <div>{product.description}</div>
    <img src={product.image} alt={product.title} width={200} height={200}/>
    </>
  )
}

export default Product;