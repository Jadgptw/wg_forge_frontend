const addNewCount = (position, stat = 'n/a') => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${position}</td>
    <td colspan="6">${stat}</td>
  `;

  return tr;
};

const addNewStat = (position, stat = 'n/a') => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${position}</td>
    <td data-base=${stat} colspan="6">$ ${stat}</td>
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

const addStatistics = (body, currentOrderList) => {
  const fragment = document.createDocumentFragment();
  let ordersCount, ordersTotal, femaleOrders, femaleOrdersTotal,
    maleOrders, maleOrdersTotal, medianValue,
    averageCheck, averageFemaleCheck, averageMaleCheck;

  if(currentOrderList.length !== 0) {
    ordersCount = currentOrderList.length;
    ordersTotal = currentOrderList.reduce((sum, order) => sum + order.amount, 0).toFixed(2);
    femaleOrders = currentOrderList.filter((order) => order.user.gender.toLowerCase() === 'female');
    femaleOrdersTotal = femaleOrders.reduce((sum, order) => sum + order.amount, 0);
    maleOrders = currentOrderList.filter((order) => order.user.gender.toLowerCase() === 'male');
    maleOrdersTotal = maleOrders.reduce((sum, order) => sum + order.amount, 0);
    medianValue = findMedian(currentOrderList).toFixed(2);
    averageCheck = (ordersTotal / ordersCount).toFixed(2);
    averageFemaleCheck = ((femaleOrdersTotal / femaleOrders.length) || 0).toFixed(2);
    averageMaleCheck = ((maleOrdersTotal / maleOrders.length) || 0).toFixed(2);
  }

  fragment.appendChild(addNewCount('Orders Count', ordersCount));
  fragment.appendChild(addNewStat('Orders Total', ordersTotal));
  fragment.appendChild(addNewStat('Median Value', medianValue));
  fragment.appendChild(addNewStat('Average Check', averageCheck));
  fragment.appendChild(addNewStat('Average Check (Female)', averageFemaleCheck));
  fragment.appendChild(addNewStat('Average Check (Male)', averageMaleCheck));

  body.appendChild(fragment);
};

export default addStatistics;