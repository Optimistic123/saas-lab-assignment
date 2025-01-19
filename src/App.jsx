import { useEffect, useState } from "react";
import "./App.css";
import CustomTable from "./Component/CustomTable";

const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

function App() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Pagination logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = projects.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(projects.length / recordsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <div className="content-container">
        <h1>Kickstarter Projects</h1>
        <CustomTable
          currentRecords={currentRecords}
          firstIndex={firstIndex}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default App;
