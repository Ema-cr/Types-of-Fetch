import axios from 'axios';
import { use } from 'react';

async function getUsers() {
 const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
 return data;
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