const addSearch = () => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <th>Search:</th>
    <th colspan="6"><input type="text" id="search"></th>
  `;
  return tr;
};

export default addSearch;