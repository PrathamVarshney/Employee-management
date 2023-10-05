import React, { useState } from "react";

function List({ employees, handleEdit, handleDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedField, setSortedField] = useState(null);

  const filteredEmployees = employees.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmployees = sortedField
    ? [...filteredEmployees].sort((a, b) => {
        if (a[sortedField] < b[sortedField]) return -1;
        if (a[sortedField] > b[sortedField]) return 1;
        return 0;
      })
    : filteredEmployees;

  const handleSort = (field) => {
    setSortedField(field);
  };

  return (
    <div className="contain-table">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button style={{marginRight: "20px"}} onClick={() => handleSort("firstName")}>Sort By Name</button>
      <button onClick={() => handleSort("department")}>Department</button>
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th onClick={() => handleSort("firstName")}>First Name</th>
            <th onClick={() => handleSort("lastName")}>Last Name</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th onClick={() => handleSort("department")}>Department</th>
            <th onClick={() => handleSort("date")}>Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            sortedEmployees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
