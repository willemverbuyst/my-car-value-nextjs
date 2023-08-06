import Link from "next/link";
import { z } from "zod";

const report = z
  .object({
    id: z.number(),
    make: z.string(),
    model: z.string(),
    price: z.number(),
    year: z.number(),
    lng: z.number(),
    lat: z.number(),
    mileage: z.number(),
    approved: z.boolean(),
  })
  .strict();

async function getReports() {
  const response = await fetch("http://localhost:4000/reports", {
    next: { revalidate: 1000 },
  });

  const reportJson = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const reports = z.array(report).parse(reportJson);

  return reports;
}

export default async function Page() {
  const reports = await getReports();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Reports</h1>
        <div>
          <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none mx-2"
            href="/"
          >
            home
          </Link>
          <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none mx-2"
            href="/users"
          >
            users
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
                Make
              </th>
              <th scope="col" className="px-6 py-4">
                Model
              </th>
              <th scope="col" className="px-6 py-4">
                Price
              </th>
              <th scope="col" className="px-6 py-4">
                Mileage
              </th>
              <th scope="col" className="px-6 py-4">
                Approved
              </th>
            </tr>
          </thead>
          {!!reports.length ? (
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b dark:border-neutral-500"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    <Link href={`/reports/${report.id}`}>{report.id}</Link>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{report.make}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {report.model}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {report.price}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {report.mileage}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {report.approved ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p>no reports</p>
          )}
        </table>
      </div>
    </>
  );
}
