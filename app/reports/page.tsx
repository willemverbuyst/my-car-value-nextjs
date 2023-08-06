import Link from "next/link";

async function getReports() {
  const response = await fetch("http://localhost:4000/reports/all");

  const reports = await response.json();

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
        {reports.map((report: any) => (
          <li key={report.id}>{report.make}</li>
        ))}
      </ul>
    </>
  );
}
