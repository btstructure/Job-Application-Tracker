import React, { useState } from "react";
import api from "../api/api";

function DeleteJob({ applicationId, token, onDeleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await fetch(
        `${api}/user/job-applications/${applicationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        onDeleteSuccess(applicationId);
      } else {
        console.error("Failed to delete job application:", response.statusText);
      }
    } catch (error) {
      console.error("Error during job application deletion:", error.message);
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };

  const showConfirmationDialog = () => {
    setShowConfirmation(true);
  };

  const hideConfirmationDialog = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={showConfirmationDialog}
        className="bg-red-500 text-white p-2 rounded cursor-pointer"
      >
        X
      </button>

      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-4 shadow-md rounded-md flex flex-col items-center">
            <p className="mb-4">
              Are you sure you want to delete this job application?
            </p>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 text-white p-2 rounded mr-2"
            >
              {isDeleting ? "Deleting..." : "Yes, delete"}
            </button>
            <button
              onClick={hideConfirmationDialog}
              disabled={isDeleting}
              className="bg-gray-300 text-gray-700 p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteJob;
