import React, { useState, useEffect } from "react";
import api from "../api/api";
import AddJobForm from "./AddJobForm";
import DeleteJob from "./DeleteJob";

const Dashboard = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

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
        console.error("Failed to fetch job applications:", response.statusText);
      }
    } catch (error) {
      console.error("Error during job applications fetch:", error.message);
    }
  };

  const handleAddJob = () => {
    fetchJobApplications();
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (applicationId) => {
    setJobApplications((prevApplications) =>
      prevApplications.filter((app) => app._id !== applicationId)
    );
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  return (
    <div className="flex flex-col h-full container mx-auto p-8">
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
              <td className="py-2 px-4">
                <DeleteJob
                  applicationId={application._id}
                  token={localStorage.getItem("yourAuthToken")}
                  onDeleteSuccess={() => handleDelete(application._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center mt-auto mb-4 p-2">
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={openModal}
        >
          Add Job
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <AddJobForm onAddJob={handleAddJob} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
