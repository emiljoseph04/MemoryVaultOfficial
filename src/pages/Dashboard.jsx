import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTimeCapsules, deleteTimeCapsule } from "../service/allAPI";

function Dashboard() {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const navigate = useNavigate();

  const fetchCapsules = async () => {
    try {
      const response = await getAllTimeCapsules();
      const allCapsules = response?.capsules || response?.data || (Array.isArray(response) ? response : []);
      setCapsules(allCapsules);
    } catch (err) {
      console.error("Error fetching capsules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapsules();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this capsule?")) {
      await deleteTimeCapsule(id);
      fetchCapsules();
    }
  };

  const handleEdit = (capsule) => {
    navigate(`/edit/${capsule.id}`, { state: capsule });
  };

  const filteredCapsules = capsules.filter((capsule) => {
    const unlockDate = capsule.unLockDate || capsule.unlockDate;
    const isLocked = new Date(unlockDate) > new Date();
    if (filter === "locked") return isLocked;
    if (filter === "unlocked") return !isLocked;
    return true;
  });

  const sortedCapsules = [...filteredCapsules].sort((a, b) => {
    const dateA = new Date(a.unLockDate || a.unlockDate);
    const dateB = new Date(b.unLockDate || b.unlockDate);
    return sort === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: "#4B0082" }}>
           My Time Capsules
        </h2>
      </div>

      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        <select className="form-select w-auto rounded-pill shadow-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Capsules</option>
          <option value="locked">Locked Capsules</option>
          <option value="unlocked">Unlocked Capsules</option>
        </select>

        <select className="form-select w-auto rounded-pill shadow-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Sort by Newest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-secondary" role="status"></div>
          <p className="mt-2 text-muted">Loading your capsules...</p>
        </div>
      ) : sortedCapsules.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <p>No capsules found. Create one to get started!</p>
          <button className="btn btn-outline-primary rounded-pill" onClick={() => navigate("/createcapsule")}>
            + Add New Capsule
          </button>
        </div>
      ) : (
        <div className="row">
          {sortedCapsules.map((capsule) => {
            const unlockDate = capsule.unLockDate || capsule.unlockDate;
            const isLocked = new Date(unlockDate) > new Date();

            return (
              <div className="col-md-4 mb-4" key={capsule.id}>
                <div className="card h-100 shadow-sm border-0 rounded-4" style={{ backgroundColor: "#f9f5ff" }}>
                  <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title mb-3" style={{ color: "#6f42c1", fontWeight: "bold" }}>
                      {capsule.title}
                    </h5>
                    <p className="card-text mb-3">
                      <strong>Unlock Date:</strong> <span style={{ color: "#4B0082" }}>{unlockDate}</span>
                      <br />
                      <strong>Status:</strong>{" "}
                      <span className="fw-semibold" style={{ color: isLocked ? "#d63384" : "#198754" }}>
                        {isLocked ? "Locked 🔒" : "Unlocked 🔓"}
                      </span>
                    </p>

                    <div className="mt-auto d-flex justify-content-center gap-2 flex-wrap">
                      <button className="btn btn-sm text-white" style={{ backgroundColor: "#6f42c1", borderRadius: "20px" }} onClick={() => navigate(`/capsule/${capsule.id}`)}>
                        View
                      </button>

                      <button className="btn btn-sm" style={{ backgroundColor: "#d8c3ff", color: "#4b0082", borderRadius: "20px" }} onClick={() => handleEdit(capsule)}>
                        Edit
                      </button>

                      <button className="btn btn-sm btn-danger" style={{ borderRadius: "20px" }} onClick={() => handleDelete(capsule.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
