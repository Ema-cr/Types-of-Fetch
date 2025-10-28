'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ClientPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/users", {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
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