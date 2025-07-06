import React from "react";
import Table from "../components/common/table";
import SideBar from "../components/sidebar";

function Home() {
  const tableData = {
    headers: ["Serial Number", "Name", "Last Update"],
    rows: [
      ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
      ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
      ["Row 3 Col 1", "Row 3 Col 2", "Row 3 Col 3"],
    ],
  };
  const tableData2 = {
    headers: ["Serial Number", "Name", "status"],
    rows: [
      ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
      ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
      ["Row 3 Col 1", "Row 3 Col 2", "Row 3 Col 3"],
      ["Row 4 Col 1", "Row 4 Col 2", "Row 4 Col 3"],
      ["Row 5 Col 1", "Row 5 Col 2", "Row 5 Col 3"],
      ["Row 6 Col 1", "Row 6 Col 2", "Row 6 Col 3"],
      ["Row 7 Col 1", "Row 7 Col 2", "Row 7 Col 3"],
      ["Row 8 Col 1", "Row 8 Col 2", "Row 8 Col 3"],
      ["Row 9 Col 1", "Row 9 Col 2", "Row 9 Col 3"],
      ["Row 10 Col 1", "Row 10 Col 2", "Row 10 Col 3"],
    ],
  };

  return (
    <div className="container row align-items-start justify-content-center mt-5 mb-5">
      <div className="col-8 d-flex flex-column gap-3">
        <div className="row bx-shadow px-3 py-3 justify-content-center border border-2 rounded-3">
          <Table headers={tableData.headers} rows={tableData.rows} />
        </div>
        <div className="row bx-shadow px-3 py-3 justify-content-center border border-2 rounded-3">
          <Table headers={tableData2.headers} rows={tableData2.rows} />

          <div className="col-md-6"></div>
        </div>
      </div>
      <SideBar />
    </div>
  );
}

export default Home;
