import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllTimeCapsules } from "../service/allAPI";
import Swal from "sweetalert2";

function CapsuleDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [capsule, setCapsule] = useState(null);
  const [isLocked, setIsLocked] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapsule = async () => {
      setLoading(true);
      try {
        const result = await getAllTimeCapsules();

        const allCapsules = result?.capsules || result?.data || (Array.isArray(result) ? result : []);

        const found = allCapsules.find(c => c.id == id);
        if (!found) throw new Error("Capsule not found");

        setCapsule(found);
        setIsLocked(new Date(found.unlockDate) > new Date());
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Capsule not found", "error");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [id, navigate]);

  if (loading) return <p className="text-center mt-5">Loading capsule...</p>;
  if (!capsule) return null;

  return (
    <div className="container mt-5 mb-5">
      <h2 style={{ color: "#6f42c1", fontWeight: "bold" }}>{capsule.title}</h2>
      <p style={{ color: "#4b0082", fontWeight: "500" }}>
        <strong>Unlock Date:</strong> {capsule.unlockDate} <br />
        <strong>Status:</strong> {isLocked ? "🔒 Locked" : "✅ Unlocked"}
      </p>

      {isLocked ? (
        <div className="p-3 rounded-4" style={{ backgroundColor: "#f9f5ff", border: "2px solid #6f42c1" }}>
          This capsule is still locked. You can open it on {capsule.unlockDate}.
        </div>
      ) : (
        <div className="card mt-3 shadow-sm rounded-4" style={{ backgroundColor: "#f9f5ff", border: "2px solid #6f42c1" }}>
          <div className="card-body text-center">
            <p style={{ color: "#4b0082" }}>{capsule.description}</p>
            {capsule.mediaLink.match(/\.(jpeg|jpg|gif|png)(\?.*)?$/i) ? (
              <img
                src={capsule.mediaLink}
                alt="Capsule Media"
                className="img-fluid rounded-3 shadow-sm"
                style={{ maxHeight: "300px" }}
              />
            ) : (
              <iframe
                src={capsule.mediaLink}
                title="Capsule Video"
                width="100%"
                height="300"
                className="rounded-3 shadow-sm"
                style={{ border: "none" }}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}

          </div>
        </div>
      )}

      <button
        onClick={() => navigate("/dashboard")}
        className="btn mt-3"
        style={{ backgroundColor: "#6f42c1", color: "white", borderRadius: "20px" }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default CapsuleDetail;
