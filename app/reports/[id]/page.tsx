"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const reportSchema = z
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

type Report = z.infer<typeof reportSchema>;

export default function Page() {
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    const getReport = async () => {
      const response = await fetch(`http://localhost:4000/reports/${id}`, {
        next: { revalidate: 1000 },
      });

      const reportJson = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const report = reportSchema.parse(reportJson);

      setReport(report);
    };

    getReport();
  }, [id]);

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Report {report?.id}</h1>
        <div>
          <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none mx-2"
            href="/"
          >
            home
          </Link>
          <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none mx-2"
            href="/reports"
          >
            reports
          </Link>
          <Link
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none mx-2"
            href="/users"
          >
            users
          </Link>
        </div>
      </header>
      {report && !!Object.keys(report).length ? (
        <div className="flex justify-center">
          <div className="flex flex-col w-60 bg-slate-100 rounded px-2 py-1 outline-none text-slate-800 px-5 py-5">
            <div className="flex justify-between">
              <p>make: </p>
              <p>{report.make}</p>
            </div>
            <div className="flex justify-between">
              <p>model: </p>
              <p>{report.model}</p>
            </div>
            <div className="flex justify-between">
              <p>price: </p>
              <p>{report.price}</p>
            </div>
            <div className="flex justify-between">
              <p>year: </p>
              <p>{report.year}</p>
            </div>
            <div className="flex justify-between">
              <p>longitude: </p>
              <p>{report.lng}</p>
            </div>
            <div className="flex justify-between">
              <p>latitude: </p>
              <p>{report.lat}</p>
            </div>
            <div className="flex justify-between">
              <p className="flex justify-between">mileage: </p>
              <p>{report.mileage}</p>
            </div>
            <div className="flex justify-between">
              <p>aprroved: </p>
              <p>{report.approved ? "true" : "false"}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500">no report found</p>
      )}
    </>
  );
}
