import React, { useMemo } from "react";
import { FaSearch, FaMapMarkerAlt, FaIndustry } from "react-icons/fa";

export default function Filters({ filters, companies, onChange }) {

  const locations = useMemo(
    () => ["All", ...new Set(companies.map((c) => c.location))],
    [companies]
  );

  const industries = useMemo(
    () => ["All", ...new Set(companies.map((c) => c.industry))],
    [companies]
  );

  return (
    <div className="filters">

      {/* Search Input */}
      <div className="input-wrapper">
        <FaSearch className="input-icon" />
        <input
          type="text"
          placeholder="Search by name..."
          value={filters.q}
          onChange={(e) => onChange({ q: e.target.value })}
        />
      </div>

      {/* Location Filter */}
      <div className="input-wrapper">
        <FaMapMarkerAlt className="input-icon" />
        <select
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Industry Filter */}
      <div className="input-wrapper">
        <FaIndustry className="input-icon" />
        <select
          value={filters.industry}
          onChange={(e) => onChange({ industry: e.target.value })}
        >
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* Sorting */}
      <select
        className="sorting-select"
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value })}
      >
        <option value="name_asc">Name ↑</option>
        <option value="name_desc">Name ↓</option>
        <option value="employees_asc">Employees ↑</option>
        <option value="employees_desc">Employees ↓</option>
      </select>
    </div>
  );
}

