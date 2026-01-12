let body = document.querySelector('body'),
    toggle = document.querySelector('.toggle');

toggle.onclick = () => {
  body.classList.toggle('dark');

  if (body.classList.contains('dark')) {
    toggle.innerText = "Light Mode";
  } else {
    toggle.innerText = "Dark Mode";
  }
}

setInterval(() => {
  let date = new Date(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();

  let d = hour < 12 ? 'AM' : 'PM';
  hour = hour > 12 ? hour - 12 : hour;
  hour = hour == 0 ? 12 : hour;

  document.querySelector('.hour_num').innerText = hour;
  document.querySelector('.min_num').innerText = min;
  document.querySelector('.sec_num').innerText = sec;
  document.querySelector('.am_pm').innerText = d;

  let day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear();

  document.querySelector('.date').innerText = `${day}-${month}-${year}`;

}, 1000);
