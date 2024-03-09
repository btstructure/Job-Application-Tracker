import React, { useState } from "react";
import api from "../api/api";

const AddJobForm = ({ onAddJob, closeModal }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobLink: "",
    status: "", 
    response: "", 
    notes: "",
  });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem("yourAuthToken");

      const response = await fetch(`${api}/user/job-applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Notify the parent component to refresh job applications list
        onAddJob();
      } else {
        console.error("Failed to add job application:", response.statusText);
      }
    } catch (error) {
      console.error("Error during job application addition:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 bg-white p-6 rounded shadow-md w-96"
    >
      <h3 className="text-lg font-semibold mb-4">Add a New Job</h3>

      <div className="mb-4">
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700"
        >
          Company Name:
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter company name"
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="jobTitle"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title:
        </label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Enter job title"
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="jobLink"
          className="block text-sm font-medium text-gray-700"
        >
          Job Link:
        </label>
        <input
          type="text"
          name="jobLink"
          value={formData.jobLink}
          onChange={handleChange}
          placeholder="Enter job link"
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="flex space-x-4 mt-4">
        <select
          name="response"
          value={formData.response}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-1/2"
        >
          <option value="">No Response</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          name="status"
          value={formData.status || ""}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-1/2"
        >
          <option value="Not applied">Not applied</option>
          <option value="Applied">Applied</option>
        </select>
      </div>

      <div className="mt-4 mb-4">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Job Notes:
        </label>
        <input
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Enter job notes"
          className="border p-2 w-full"
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Job
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 ml-2"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default AddJobForm;
