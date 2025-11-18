import React from "react";
import CompanyCard from "./CompanyCard";

export default function CompanyList({ loading, error, companies }) {
  // Loading UI
  if (loading) {
    return <p>Loading companies...</p>;
  }

  // Error UI
  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  // No results
  if (!companies.length) {
    return <p>No companies found.</p>;
  }

  // Render company cards
  return (
    <div className="company-grid">
      {companies.map((c) => (
        <CompanyCard key={c.id} company={c} />
      ))}
    </div>
  );
}
