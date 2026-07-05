"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";
import GradientButton from "@/components/ui/GradientButton";
import BarChart from "@/components/ui/BarChart";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function ReportsPage() {
  const workspaceId =
    "6a2c2c86bd54aa6fdf34690a";

  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReports = async () => {
    try {
      const res = await fetch(
        `${API}/reports/workspace/${workspaceId}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setReports(data);
      } else if (data.data) {
        setReports(data.data);
      } else {
        setReports([]);
      }
    } catch (error) {
      console.log(error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={loadReports}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg p-6 shadow">
          Loading reports...
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-white rounded-lg p-6 shadow">
          No reports available.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reports.map((report: any) => (
            <div
              key={report._id}
              className="bg-white rounded-lg shadow border p-5"
            >
              <h2 className="text-lg font-semibold">
                {report.title || "Untitled Report"}
              </h2>

              <p className="text-gray-600 mt-2">
                {report.description ||
                  "No description"}
              </p>

              <div className="mt-4 text-sm text-gray-500">
                <p>
                  Type:{" "}
                  {report.type || "General"}
                </p>

                <p>
                  Created By:{" "}
                  {report.createdBy || "-"}
                </p>

                <p>
                  Created:
                  {" "}
                  {report.createdAt
                    ? new Date(
                        report.createdAt
                      ).toLocaleString()
                    : "-"}
                </p>
              </div>

              <button
                className="mt-5 w-full bg-green-600 text-white py-2 rounded"
                onClick={() =>
                  alert(
                    "Report Preview Coming Soon"
                  )
                }
              >
                View Report
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}