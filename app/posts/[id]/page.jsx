import axios from "axios";

export async function generateStaticParams() {
   const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");

  return data.slice(0, 5).map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetail({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await res.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}