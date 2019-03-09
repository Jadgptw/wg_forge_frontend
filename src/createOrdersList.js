const createOrdersList = async() => {
  const [orders, users, companies] =  await Promise.all([
    fetch('http://localhost:9000/api/orders.json')
      .then(response => response.json()),
    fetch('http://localhost:9000/api/users.json')
      .then(response => response.json()),
    fetch('http://localhost:9000/api/companies.json')
      .then(response => response.json())
  ]);

  return orders.map((order) => {
    const currentUser = users.filter(user => user.id === +order.user_id)[0];
    const currentCompany = companies.filter(company => company.id === currentUser.company_id)[0];

    return {
      id: order.id,
      transactionId: order.transaction_id,
      user: {
        id: currentUser.id,
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        gender: currentUser.gender,
        birthday: currentUser.birthday,
        avatar: currentUser.avatar,
        company: {
          url: (currentCompany) ? currentCompany.url : '',
          title: (currentCompany) ? currentCompany.title : '',
          industry: (currentCompany) ? currentCompany.industry : '',
          sector: (currentCompany) ? currentCompany.sector : ''
        }
      },
      date: +order.created_at,
      amount: +order.total,
      cardNumber: order.card_number,
      cardType: order.card_type,
      orderCountry: order.order_country,
      orderIp: order.order_ip
    };
  })
};

export default createOrdersList;