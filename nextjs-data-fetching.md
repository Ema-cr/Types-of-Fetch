#  Ejercicios de Data Fetching en Next.js (App Router)

## 1. `fetch()` en Server Components (SSR por defecto)

> En el App Router, los componentes del servidor (Server Components) pueden usar `fetch()` directamente.  
> Esto **no bloquea el cliente** y los datos se obtienen **en el servidor antes de renderizar**.

###  Cuándo usarlo
Cuando necesitas **mostrar datos actualizados en cada request**, como en un dashboard o un listado dinámico.

###  Ejercicio

**Objetivo:** Mostrar una lista de posts obtenida desde una API pública.

**Ruta:** `app/posts/page.jsx`
```jsx
// app/posts/page.jsx
export default async function PostsPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return (
    <div>
      <h1>Posts (Server Component)</h1>
      <ul>
        {posts.slice(0, 5).map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

 **Nota:** Cada request al servidor volverá a hacer el fetch (SSR).

---

## 2. `fetch()` con revalidación (ISR - Incremental Static Regeneration)

> Puedes **cachear el resultado** del fetch y **revalidarlo cada cierto tiempo**.  
> Es ideal para datos que cambian ocasionalmente.

###  Cuándo usarlo
Cuando tus datos **no cambian con frecuencia**, como precios de productos o entradas de blog.

###  Ejercicio

**Ruta:** `app/blog/page.jsx`
```jsx
export default async function BlogPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 10 }, // Revalida cada 10 segundos
  });
  const posts = await res.json();

  return (
    <section>
      <h1>Blog con ISR</h1>
      <p>Esta página se revalida cada 10 segundos.</p>
      <ul>
        {posts.slice(0, 5).map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </section>
  );
}
```

---

## 3. `fetch()` con `cache: 'force-cache'` (SSG - Static Generation)

> Genera la página **una sola vez** al build.  
> Ideal para contenido estático (como landing pages o FAQs).

###  Cuándo usarlo
Cuando los datos **no cambian nunca o muy rara vez**.

###  Ejercicio

**Ruta:** `app/faq/page.jsx`
```jsx
export default async function FAQPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'force-cache', // Static Site Generation
  });
  const posts = await res.json();

  return (
    <div>
      <h1>Preguntas Frecuentes (SSG)</h1>
      {posts.slice(0, 3).map((p) => (
        <article key={p.id}>
          <h2>{p.title}</h2>
          <p>{p.body}</p>
        </article>
      ))}
    </div>
  );
}
```

---

## 4. `useEffect()` con `fetch()` (Client-Side Rendering - CSR)

> Si necesitas cargar datos **después de renderizar en el cliente**, usa `useEffect()`.  
> Esto evita el pre-renderizado y ejecuta el fetch **en el navegador**.

###  Cuándo usarlo
Cuando los datos dependen del **usuario actual**, o solo deben verse **después de una acción (clic, login, filtro)**.

###  Ejercicio

**Ruta:** `app/client/page.jsx`
```jsx
'use client';
import { useEffect, useState } from 'react';

export default function ClientPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUsers(data);
    }
    getUsers();
  }, []);

  return (
    <div>
      <h1>Usuarios (CSR)</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 5. `generateStaticParams()` (SSG dinámico)

> Genera rutas estáticas dinámicamente **basadas en datos externos**.

###  Cuándo usarlo
Cuando quieres **generar páginas dinámicas** al build (ej: `/products/[id]` o `/blog/[slug]`).

### 💻 Ejercicio

**Ruta:** `app/posts/[id]/page.jsx`
```jsx
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return posts.slice(0, 5).map((post) => ({
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
```

---

## 6. `use()` Hook (Server Components con promesas)

> Permite **esperar una promesa directamente en JSX** dentro de un componente del servidor.

###  Cuándo usarlo
Cuando necesitas **simplificar el manejo de datos asíncronos** en Server Components.

###  Ejercicio

**Ruta:** `app/users/page.jsx`
```jsx
import { use } from 'react';

async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
}

export default function UsersPage() {
  const users = use(getUsers());

  return (
    <div>
      <h1>Usuarios con use()</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

##  Resumen

| Tipo | Dónde corre | Hook / Método | Ejemplo ideal |
|------|--------------|----------------|----------------|
| SSR | Servidor | `fetch()` sin cache | Dashboard, datos frescos |
| ISR | Servidor | `fetch({ next: { revalidate: X } })` | Noticias, precios |
| SSG | Servidor | `fetch({ cache: 'force-cache' })` | Landing pages |
| CSR | Cliente | `useEffect()` | Datos del usuario, filtros |
| SSG dinámico | Servidor | `generateStaticParams()` | Blog, productos |
| Server Hooks | Servidor | `use()` | Simplificar promesas |
