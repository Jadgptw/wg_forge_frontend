import createOrdersList from './createOrdersList';

export default (async function () {
  const ordersList = await createOrdersList();

  console.log(ordersList);
}());
