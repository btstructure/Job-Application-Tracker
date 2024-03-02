import React, { useState, useEffect } from "react";
import api from "../api/api";

const Dashboard = () => {
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem("yourAuthToken");

        const response = await fetch(`${api}/user/job-applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setJobApplications(data);
        } else {
          console.error(
            "Failed to fetch job applications:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during job applications fetch:", error.message);
      }
    };

    fetchJobApplications();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 border-r">Company Name</th>
            <th className="py-2 px-4 border-r">Job Title</th>
            <th className="py-2 px-4 border-r">Job Link</th>
            <th className="py-2 px-4 border-r">Status</th>
            <th className="py-2 px-4 border-r">Response</th>
            <th className="py-2 px-4">Notes</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map((application) => (
            <tr key={application._id} className="border-b">
              <td className="py-2 px-4 border-r">{application.companyName}</td>
              <td className="py-2 px-4 border-r">{application.jobTitle}</td>
              <td className="py-2 px-4 border-r">
                <a
                  href={application.jobLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {application.jobLink}
                </a>
              </td>
              <td className="py-2 px-4 border-r">{application.status}</td>
              <td className="py-2 px-4 border-r">{application.response}</td>
              <td className="py-2 px-4">{application.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
