import axios from "axios";

export default async function BlogPage() {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 10 }, // Revalida cada 10 segundos
  });


  return (
    <section>
      <h1>Blog con ISR</h1>
      <p>Esta página se revalida cada 10 segundos.</p>
      <ul>
        {data.slice(0, 100).map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </section>
  );
}