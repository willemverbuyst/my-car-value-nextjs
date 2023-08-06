import Link from "next/link";

type User = {
  id: number;
  email: string;
};

async function getUsers() {
  const response = await fetch("http://localhost:4000/auth", {
    next: { revalidate: 1000 },
  });

  const users: Promise<User[]> = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return users;
}

export default async function Users() {
  const users = await getUsers();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Users</h1>
        <div>
          <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none mx-2"
            href="/users"
          >
            home
          </Link>
          <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none mx-2"
            href="/reports"
          >
            reports
          </Link>
        </div>
      </header>
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">
                #
              </th>
              <th scope="col" className="px-6 py-4">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {user.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
