const createRate = (rootElement, rates, rate) => {
  const label = document.createElement('label');
  label.classList.add('btn');
  label.classList.add('btn-secondary');
  label.innerHTML = `
      ${rate}
      <input type="radio" name="money" id=${rate} autocomplete="off"}>
  `;
  label.setAttribute('data-rate', rates[rate]);
  rootElement.appendChild(label);
};

const addExchange = async() => {
  const money = await fetch('https://api.exchangeratesapi.io/latest?base=USD').then(res => res.json());

  const div = document.createElement('div');
  div.classList.add('exchange');
  div.classList.add('btn-group');
  div.classList.add('btn-group-toggle');
  createRate(div, money.rates, money.base);

  let rateCount = 0;
  for(const rate in money.rates){
    if (money.rates.hasOwnProperty(rate)){
      createRate(div, money.rates, rate);
      rateCount++;
    }
  }
  return div;
};

export default addExchange;