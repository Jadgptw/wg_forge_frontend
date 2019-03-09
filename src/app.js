import createOrdersList from './createOrdersList';
import addTable from './addTable';
import addOrders from './addOrders';
import sortByColumn from './sortByColumn';
import addStatistics from './addStatistics';
import addExchange from './addExchange';

export default (async function () {
  const app = document.getElementById('app');
  app.appendChild(await addExchange());
  app.appendChild(addTable());

  const head = document.querySelector('thead');
  const body = document.querySelector('tbody');
  const exchangeSection = document.querySelector('.exchange');

  const ordersList = await createOrdersList();

  console.log(ordersList);

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
      if(currentNode.nodeName.toLowerCase() === 'th' && column !== 'card number') {
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

  addOrders(body, ordersList);
  addStatistics(body, ordersList);

  body.addEventListener('click', handleShowUserDataInfo);
  head.addEventListener('click', handleSort);
  exchangeSection.addEventListener('change', handleExchange);
}());
