import createOrdersList from './createOrdersList';
import addTable from './addTable';
import addOrders from './addOrders';
import sortByColumn from './sortByColumn';
import addStatistics from './addStatistics';

export default (async function () {
  const app = document.getElementById('app');
  app.appendChild(addTable());

  const head = document.querySelector('thead');
  const body = document.querySelector('tbody');

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

  addOrders(body, ordersList);
  addStatistics(body, ordersList);

  body.addEventListener('click', handleShowUserDataInfo);
  head.addEventListener('click', handleSort);
}());
