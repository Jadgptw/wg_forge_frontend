import createOrdersList from './createOrdersList';
import addTable from './addTable';
import addOrders from './addOrders';

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

  addOrders(body, ordersList);

  body.addEventListener('click', handleShowUserDataInfo);
}());
