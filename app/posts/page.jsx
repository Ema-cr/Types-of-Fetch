import axios from "axios";

export default async function PostsPage() {

 const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");

  return (
    <div>
      <h1>Posts (Server Component)</h1>
      <ul>
        {data.slice(0, 100).map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}