const addTable = () => {
  const table = document.createElement('table');
  table.classList.add('table');
  table.classList.add('table-striped');
  table.classList.add('table-bordered');
  table.innerHTML = `
    <thead>
      <tr class="main-header">
        <th>Transaction ID</th>
        <th>User Info</th>
        <th>Order Date</th>
        <th>Order Amount</th>
        <th>Card Number</th>
        <th>Card Type</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  return table;
};

export default addTable;