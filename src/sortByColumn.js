const sortOrder = (orderList, element) => {
  orderList.sort((a, b) => {
    if (a[element] > b[element]) {
      return 1;
    }
    if (a[element] < b[element]) {
      return -1;
    }
    return 0;
  });
};

const sortUser = (orderList) => {
  orderList.sort((a, b) => {
    if (a.user.lastName > b.user.lastName) {
      return 1;
    }
    if (a.user.lastName < b.user.lastName) {
      return -1;
    }
    if (a.user.firstName > b.user.firstName) {
      return 1;
    }
    if (a.user.firstName < b.user.firstName) {
      return -1;
    }
    return 0;
  });
};

const sortLocation = (orderList) => {
  orderList.sort((a, b) => {
    if (a.orderCountry > b.orderCountry) {
      return 1;
    }
    if (a.orderCountry < b.orderCountry) {
      return -1;
    }
    if (a.orderIp > b.orderIp) {
      return 1;
    }
    if (a.orderIp < b.orderIp) {
      return -1;
    }
    return 0;
  });
};

const sortByColumn = (orderList, column) => {
  switch (column) {
    case 'transaction id':
      sortOrder(orderList, 'transactionId');
      break;
    case 'user info':
      sortUser(orderList);
      break;
    case 'order date':
      sortOrder(orderList, 'date');
      break;
    case 'order amount':
      sortOrder(orderList, 'amount');
      break;
    case 'card type':
      sortOrder(orderList, 'cardType');
      break;
    case 'location':
      sortLocation(orderList);
      break;
    default:
      break;
  }
};

export default sortByColumn;