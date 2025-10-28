import axios from "axios";

export default async function FAQPage() {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts", {
    cache: 'force-cache', // Static Site Generation
  });

  return (
    <div>
      <h1>Preguntas Frecuentes (SSG)</h1>
      {data.slice(0, 20).map((p) => (
        <article key={p.id}>
          <h2>{p.title}</h2>
          <p>{p.body}</p>
        </article>
      ))}
    </div>
  );
}