import createOrdersList from './createOrdersList';
import addTable from './addTable';
import addOrders from './addOrders';
import sortByColumn from './sortByColumn';
import addStatistics from './addStatistics';
import addExchange from './addExchange';
import addSearch from './addSearch';


export default (async function () {
  const app = document.getElementById('app');
  app.appendChild(await addExchange());
  app.appendChild(addTable());

  const head = document.querySelector('thead');
  const body = document.querySelector('tbody');
  const exchangeSection = document.querySelector('.exchange');
  const mainHeader = document.querySelector('.main-header');

  const ordersList = await createOrdersList();

  const handleShowUserDataInfo = (event) => {
    let currentNode = event.target;
    while(currentNode !== body) {
      if(currentNode.getAttribute('href') === '#') {
        event.preventDefault();
        currentNode.nextElementSibling.classList.toggle('user-details-not-shown');
        break;
      }
      else {
        currentNode = currentNode.parentElement;
      }
    }
  };

  const handleSort = (event) => {
    let currentNode = event.target;
    while(currentNode !== head) {
      const column = currentNode.textContent.toLowerCase();
      if(currentNode.nodeName.toLowerCase() === 'th' && column !== 'card number' && column !== 'search:') {
        const span = document.createElement('span');
        span.innerHTML = '&#8595;';
        if(currentNode.children.length !== 1) {
          currentNode.appendChild(span);
        }
        sortByColumn(ordersList, column);
        body.innerHTML = '';
        addOrders(body, ordersList);
        addStatistics(body, ordersList);
        break;
      }
      else {
        currentNode = currentNode.parentElement;
      }
    }
  };

  const handleExchange = (event) => {
    const currentNode = event.target.parentElement;
    const orderAmounts = document.querySelectorAll('td[data-base]');
    const rate = currentNode.getAttribute('data-rate');
    const money = currentNode.children[0].id;

    orderAmounts.forEach(amount => {
      amount.textContent = `${money} ${(amount.getAttribute('data-base') * rate).toFixed(2)}`;
    });
  };

  const handleSearch = (event) => {
    const ENTER = 13;
    const searchOption = event.target.value.toLowerCase();

    if(event.keyCode === ENTER){
      event.target.value = '';

      const sortNode = document.querySelector('th > span');
      const sortOption = (sortNode) ? sortNode.parentElement.firstChild.textContent.toLowerCase() : null;
      sortByColumn(ordersList, sortOption);
      const currentOrdersList = ordersList.filter(order => (
        order.user.firstName.toLowerCase() === searchOption
        || order.user.lastName.toLowerCase() === searchOption
        || order.amount === +searchOption
        || order.cardType.toLowerCase() === searchOption
        || order.orderCountry.toLowerCase() === searchOption
        || order.orderIp.toLowerCase() === searchOption
        || order.transactionId.toLowerCase() === searchOption
      ));

      body.innerHTML = '';
      addOrders(body, currentOrdersList);
      addStatistics(body, currentOrdersList);
    }

  };

  head.insertBefore(addSearch(), head.children[0]);
  addOrders(body, ordersList);
  addStatistics(body, ordersList);

  const search = document.getElementById('search');

  body.addEventListener('click', handleShowUserDataInfo);
  mainHeader.addEventListener('click', handleSort);
  exchangeSection.addEventListener('change', handleExchange);
  search.addEventListener('keyup', handleSearch);
}());
