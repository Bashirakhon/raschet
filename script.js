const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
 event.preventDefault(); // Предотвратить отправку по умолчанию

 // Проверка данных (например, с помощью регулярных выражений)
 const name = document.getElementById('name').value;
 const email = document.getElementById('email').value;
 const phone = document.getElementById('phone').value;
 const message = document.getElementById('message').value;

 if (!name || !email || !phone || !message) {
  alert('Пожалуйста, заполните все поля');
  return;
 }

 // Отправка данных на сервер
 fetch('/send-form', {
  method: 'POST',
  body: JSON.stringify({ name, email, phone, message })
 })
 .then(response => {
  if (response.ok) {
   alert('Ваша заявка отправлена успешно!');
   // Можно очистить форму
   form.reset();
  } else {
   alert('Произошла ошибка при отправке заявки. Попробуйте позже.');
  }
 });
});

  // Обработка ошибок
  console.error('Ошибка:', error);
 });
});

const smetaForm = document.getElementById('smeta-form');
const workTable = document.getElementById('work-table').getElementsByTagName('tbody')[0];
const materialTable = document.getElementById('material-table').getElementsByTagName('tbody')[0];
const totalCostValue = document.getElementById('total-cost-value');

smetaForm.addEventListener('submit', (event) => {
 event.preventDefault();

 let totalCost = 0;
 workTable.innerHTML = ''; // Очищаем таблицу работ
 materialTable.innerHTML = ''; // Очищаем таблицу материалов

 // Рассчет стоимости работ
 const workItems = document.querySelectorAll('input[name^="work-"]:checked');
 workItems.forEach(item => {
  const workQuantity = document.getElementById(`${item.id}-quantity`).value;
  const workCost = item.value * workQuantity;
  totalCost += workCost;

  // Добавление строки в таблицу работ
  const row = workTable.insertRow();
  const nameCell = row.insertCell(); // Добавляем ячейку для наименования
  const quantityCell = row.insertCell(); // Добавляем ячейку для количества
  const priceCell = row.insertCell(); // Добавляем ячейку для цены
  const costCell = row.insertCell(); // Добавляем ячейку для стоимости
  nameCell.textContent = item.nextElementSibling.textContent;
  quantityCell.textContent = workQuantity;
  priceCell.textContent = item.value;
  costCell.textContent = workCost;
 });

 // Рассчет стоимости материалов
 const materialItems = document.querySelectorAll('input[name^="material-"]:checked');
 materialItems.forEach(item => {
  const materialQuantity = document.getElementById(`${item.id}-quantity`).value;
  const materialCost = item.value * materialQuantity;
  totalCost += materialCost;

  // Добавление строки в таблицу материалов
  const row = materialTable.insertRow();
  const nameCell = row.insertCell(); // Добавляем ячейку для наименования
  const quantityCell = row.insertCell(); // Добавляем ячейку для количества
  const priceCell = row.insertCell(); // Добавляем ячейку для цены
  const costCell = row.insertCell(); // Добавляем ячейку для стоимости
  nameCell.textContent = item.nextElementSibling.textContent;
  quantityCell.textContent = materialQuantity;
  priceCell.textContent = item.value;
  costCell.textContent = materialCost;
 });

 // Вывод результата
 totalCostValue.textContent = totalCost;
});
