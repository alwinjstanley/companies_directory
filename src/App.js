import React, { useEffect, useReducer } from "react";
import { motion } from "framer-motion";
import { fetchCompanies } from "./api";
import Filters from "./components/Filters";
import CompanyList from "./components/CompanyList";
import Pagination from "./components/Pagination";
import "./App.css";

const initialState = {
  all: [],
  visible: [],
  loading: true,
  error: null,
  filters: {
    q: "",
    location: "All",
    industry: "All",
    sort: "name_asc",
  },
  page: 1,
  perPage: 6,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, all: action.payload };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        page: 1,
      };

    case "SET_PAGE":
      return { ...state, page: action.payload };

    case "SET_VISIBLE":
      return { ...state, visible: action.payload };

    default:
      return state;
  }
}

function applyFilters(list, filters) {
  let data = list;

  // search
  if (filters.q.trim() !== "") {
    data = data.filter((c) =>
      c.name.toLowerCase().includes(filters.q.toLowerCase())
    );
  }

  // location filter
  if (filters.location !== "All") {
    data = data.filter((c) => c.location === filters.location);
  }

  // industry filter
  if (filters.industry !== "All") {
    data = data.filter((c) => c.industry === filters.industry);
  }

  // sorting
  switch (filters.sort) {
    case "name_asc":
      data = [...data].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name_desc":
      data = [...data].sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "employees_asc":
      data = [...data].sort((a, b) => a.employees - b.employees);
      break;
    case "employees_desc":
      data = [...data].sort((a, b) => b.employees - a.employees);
      break;
    default:
      break;
  }

  return data;
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { all, filters, page, perPage } = state;

  // load API data ------------------------------------
  useEffect(() => {
    dispatch({ type: "FETCH_START" });

    fetchCompanies()
      .then((data) => {
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      });
  }, []);

  // reapply filters when data or filter changes -------
  useEffect(() => {
    const filtered = applyFilters(all, filters);
    dispatch({ type: "SET_VISIBLE", payload: filtered });
  }, [all, filters]);

  // Pagination logic ----------------------------------
  const visible = state.visible;
  const total = visible.length;
  const start = (page - 1) * perPage;
  const pageItems = visible.slice(start, start + perPage);


return (
  <>
    {/* Floating Particles Background */}
    <div className="particles">
      {Array.from({ length: 25 }).map((_, i) => (
        <span key={i} className="particle"></span>
      ))}
    </div>

     <div className="mesh"></div>

    {/* Main animated container */}
    <motion.div
      className="container"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="title">Companies Directory</h1>

      <Filters
        filters={filters}
        companies={all}
        onChange={(patch) =>
          dispatch({ type: "SET_FILTERS", payload: patch })
        }
      />

      <CompanyList
        loading={state.loading}
        error={state.error}
        companies={pageItems}
      />

      <Pagination
        page={page}
        perPage={perPage}
        total={total}
        onPage={(p) => dispatch({ type: "SET_PAGE", payload: p })}
      />
    </motion.div>
  </>
);
}
