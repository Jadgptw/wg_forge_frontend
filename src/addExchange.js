const createRate = (rootElement, rates, rate, base = false) => {
  const span = document.createElement('span');
  span.innerHTML = `
    <input type="radio" name="money" id=${rate} ${(base) ? 'checked' : ''}>
    <label for=${rate}>${rate}</label>
  `;
  span.setAttribute('data-rate', rates[rate]);
  rootElement.appendChild(span);
};

const addExchange = async() => {
  const money = await fetch('https://api.exchangeratesapi.io/latest?base=USD').then(res => res.json());

  const div = document.createElement('div');
  div.classList.add('exchange');
  createRate(div, money.rates, money.base, true);

  for(const rate in money.rates){
    if (money.rates.hasOwnProperty(rate)){
      createRate(div, money.rates, rate);
    }
  }
  return div;
};

export default addExchange;