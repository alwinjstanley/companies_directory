import React from "react";
import { motion } from "framer-motion";
import { 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaIndustry, 
  FaUsers, 
  FaExternalLinkAlt 
} from "react-icons/fa";

export default function CompanyCard({ company }) {
  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="card-title">
        <FaBuilding className="icon-title" /> {company.name}
      </h3>

      <p className="card-field">
        <FaMapMarkerAlt className="icon" /> 
        <strong>Location:</strong> {company.location}
      </p>

      <p className="card-field">
        <FaIndustry className="icon" /> 
        <strong>Industry:</strong> {company.industry}
      </p>

      <p className="card-field">
        <FaUsers className="icon" /> 
        <strong>Employees:</strong> {company.employees}
      </p>

      <a href={company.website} className="card-link" target="_blank">
        <FaExternalLinkAlt className="icon-link" /> Visit Website
      </a>
    </motion.div>
  );
}
