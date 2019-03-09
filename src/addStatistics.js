const addNewStat = (position, stat, sign = true) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${position}</td>
    <td colspan="6">${(sign) ? '$' : ''} ${stat}</td>
  `;

  return tr;
};

const findMedian = (ordersList) => {
  const sortedList = ordersList.slice().sort((a, b) => a.amount - b.amount);
  const middle = Math.floor((sortedList.length - 1) / 2);

  return (sortedList.length % 2)
    ? sortedList[middle].amount
    : (sortedList[middle].amount + sortedList[middle + 1].amount) / 2;
};

const addStatistics = (body, ordersList) => {
  const fragment = document.createDocumentFragment();
  const orders = Array.from(document.querySelectorAll('tbody tr'));
  const orderIds = Array.from(new Set(orders.map(order => +order.id.match(/\d+/)[0])));
  const currentOrderList = ordersList.filter(order => orderIds.indexOf(order.id) >= 0);

  const ordersCount = currentOrderList.length;
  const ordersTotal = currentOrderList.reduce((sum, order) => sum + order.amount, 0);
  const femaleOrders = currentOrderList.filter((order) => order.user.gender.toLowerCase() === 'female');
  const femaleOrdersTotal = femaleOrders.reduce((sum, order) => sum + order.amount, 0);
  const maleOrders = currentOrderList.filter((order) => order.user.gender.toLowerCase() === 'male');
  const maleOrdersTotal = femaleOrders.reduce((sum, order) => sum + order.amount, 0);
  const medianValue = findMedian(currentOrderList);
  const averageCheck = ordersTotal / ordersCount;
  const averageFemaleCheck = femaleOrdersTotal / femaleOrders.length;
  const averageMaleCheck = maleOrdersTotal / maleOrders.length;

  fragment.appendChild(addNewStat('Orders Count', ordersCount, false));
  fragment.appendChild(addNewStat('Orders Total', ordersTotal.toFixed(2)));
  fragment.appendChild(addNewStat('Median Value', medianValue.toFixed(2)));
  fragment.appendChild(addNewStat('Average Check', averageCheck.toFixed(2)));
  fragment.appendChild(addNewStat('Average Check (Female)', averageFemaleCheck.toFixed(2)));
  fragment.appendChild(addNewStat('Average Check (Male)', averageMaleCheck.toFixed(2)));

  body.appendChild(fragment);
};

export default addStatistics;