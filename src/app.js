import createOrdersList from './createOrdersList';
import addTable from './addTable';

export default (async function () {
  const app = document.getElementById('app');
  app.appendChild(addTable());

  const head = document.querySelector('thead');
  const body = document.querySelector('tbody');

  const ordersList = await createOrdersList();

  console.log(ordersList);
}());
