const addOrders = (body, orders) => {
  const fragment = document.createDocumentFragment();

  orders.forEach(order => {
    const tr = document.createElement('tr');
    const dateFormat = new Date(+order.date).toLocaleString('en-US');
    const cardNumber = `${order.cardNumber.slice(0, 2)}${'*'.repeat(order.cardNumber.length - 6)}${order.cardNumber.slice(-4)}`;
    const userBirthday = new Date(+order.user.birthday).toLocaleDateString('en-US');

    tr.setAttribute('id', `order_${order.id}`);
    tr.innerHTML =  `
      <td>${order.transactionId}</td>
      <td class="user-data">
        <a href="#">
          ${(order.user.gender === 'Male')
      ? 'Mr.'
      : 'Ms.'
      } ${order.user.firstName} ${order.user.lastName}
        </a>
        <div class="user-details user-details-not-shown">
          <p>Birthday: ${userBirthday}</p>
          <p><img src="${order.user.avatar}" width="100px"></p>
          <p>Company: <a href=${order.user.company.url} target="_blank">${order.user.company.title}</a></p>
          <p>Industry: ${order.user.company.industry} / ${order.user.company.sector}</p>
        </div>
      </td>
      <td>${dateFormat}</td>
      <td data-base=${order.amount}>\$${order.amount}</td>
      <td>${cardNumber}</td>
      <td>${order.cardType}</td>
      <td>${order.orderCountry} (${order.orderIp})</td>
    `;
    fragment.appendChild(tr);
  });

  body.appendChild(fragment);
};

export default addOrders;