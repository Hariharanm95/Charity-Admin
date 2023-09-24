import React from "react";
import { useDonationsContext } from "../hooks/useDonationsContext";

const FundraiserDetails = ({ fundraiser }) => {
  const { dispatch } = useDonationsContext();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/fundraisers/${fundraiser._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch({ type: "DELETE_FUNDRAISER", payload: fundraiser._id });
      } 
    } catch (error) {
      console.error("Error deleting fundraiser:", error);
    }
  };

  return (
    <div className="fundraiser-details">
      <h4>Fundraiser: {fundraiser.name}</h4>
        <p>Email: {fundraiser.email}</p>
        <p>Mobile: {fundraiser.mobile}</p>
        <p>Fund: {fundraiser.fund}</p>
        <p>Goal Amount: {fundraiser.goalamt}</p>
      <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>
      <button style={{
        backgroundColor: "#142d4c",
        color: "white",
        marginTop: "7px",
        border:"none",
        borderRadius:"5px",
        cursor: "pointer",
        padding: "8px"
      }}>Approve</button>
    </div>
  );
};

export default FundraiserDetails;
