import axios from "axios";

const Dashboard = async () => {

  const { data } = await axios.get("https://fakestoreapi.com/products");

  console.log(data)
  return (

    <>
      <div>Dashboard</div>
      {data.map((element: any) => (
        <div key={element.id}>
          <div>{element.title}</div>
        </div>
      ))}
    </>
  );
};

export default Dashboard;