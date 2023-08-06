import Link from "next/link";

type Report = {
  id: number;
  make: string;
  model: string;
  price: number;
  year: number;
  lng: number;
  lat: number;
  mileage: number;
  approved: boolean;
};

async function getReports() {
  const response = await fetch("http://localhost:4000/reports/all", {
    next: { revalidate: 1000 },
  });

  const reports: Promise<Report[]> = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return reports;
}

export default async function Reports() {
  const reports = await getReports();
  console.log("reports :>> ", reports);

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
      <ul className="pl-4">
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
                  Year
                </th>
                <th scope="col" className="px-6 py-4">
                  Mileage
                </th>
                <th scope="col" className="px-6 py-4">
                  Approved
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b dark:border-neutral-500"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {report.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{report.make}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {report.model}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {report.price}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{report.year}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {report.mileage}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {report.approved ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ul>
    </>
  );
}
