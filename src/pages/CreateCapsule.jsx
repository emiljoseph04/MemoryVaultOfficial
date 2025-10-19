import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { addTimeCapsule, updateTimeCapsule } from "../service/allAPI";

function CreateCapsule() {
  const navigate = useNavigate();
  const location = useLocation(); // Used to receive edit data from Dashboard

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaLink, setMediaLink] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Prefill data if editing
  useEffect(() => {
    const capsuleToEdit = location.state;
    if (capsuleToEdit) {
      setTitle(capsuleToEdit.title || "");
      setDescription(capsuleToEdit.description || "");
      setMediaLink(capsuleToEdit.mediaLink || "");
      setUnlockDate(capsuleToEdit.unlockDate || capsuleToEdit.unLockDate || "");
      setEditId(capsuleToEdit.id);
      setIsEdit(true);
    }
  }, [location.state]);

  // Reset form
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setMediaLink("");
    setUnlockDate("");
    setEditId(null);
    setIsEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const capsuleData = { title, description, mediaLink, unlockDate };

    try {
      if (isEdit) {
        const result = await updateTimeCapsule(editId, capsuleData);
        console.log("Update result:", result);
        Swal.fire("Success", "Capsule updated successfully!", "success");
      } else {
        const result = await addTimeCapsule(capsuleData);
        console.log("Add result:", result);
        Swal.fire("Success", "Capsule created successfully!", "success");
      }
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire("Error", "Failed to save capsule", "error");
    }
  };

  return (
    <div
      className="container my-5 p-4 rounded-4 shadow"
      style={{ backgroundColor: "#f9f5ff" }}
    >
      <h2
        className="text-center mb-4"
        style={{ color: "#6f42c1", fontWeight: "bold" }}
      >
        {isEdit ? "Edit Capsule" : "Create Your Digital Time Capsule"}
      </h2>

      <form onSubmit={handleSubmit}>
\        <div className="mb-3">
          <label
            className="form-label fw-semibold"
            style={{ color: "#6f42c1" }}
          >
            Title
          </label>
          <input
            type="text"
            className="form-control border-2"
            style={{ borderColor: "#6f42c1" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label
            className="form-label fw-semibold"
            style={{ color: "#6f42c1" }}
          >
            Description / Message
          </label>
          <textarea
            className="form-control border-2"
            rows="4"
            style={{ borderColor: "#6f42c1" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label
            className="form-label fw-semibold"
            style={{ color: "#6f42c1" }}
          >
            Add Photo / Video Link
          </label>
          <input
            type="url"
            className="form-control border-2"
            style={{ borderColor: "#6f42c1" }}
            value={mediaLink}
            onChange={(e) => setMediaLink(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            className="form-label fw-semibold"
            style={{ color: "#6f42c1" }}
          >
            Unlock Date
          </label>
          <input
            type="date"
            className="form-control border-2"
            style={{ borderColor: "#6f42c1" }}
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            required
          />
        </div>

        <div className="text-center d-flex flex-column flex-sm-row justify-content-center gap-2">
          <button
            type="submit"
            className="btn px-4 py-2 fw-semibold"
            style={{
              backgroundColor: "#6f42c1",
              color: "white",
              borderRadius: "25px",
              border: "none",
            }}
          >
            {isEdit ? "Update Capsule" : "Save Capsule"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="btn px-4 py-2 fw-semibold"
            style={{
              backgroundColor: "#d8c3ff",
              color: "#4b0082",
              borderRadius: "25px",
              border: "none",
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCapsule;
