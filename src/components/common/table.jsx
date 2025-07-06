function Table({ headers, rows }) {
  // Ensure headers and rows are arrays with default values
  headers = Array.isArray(headers) ? headers : [];
  rows = Array.isArray(rows) ? rows : [];

  return (
    <table className="table table-striped table-bordered table-hover table-sm table-responsive rounded-3">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
