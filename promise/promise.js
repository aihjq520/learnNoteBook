var b = (resole, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    resole(3);
  }, 3000);
};

new Promise(b).then((res) => console.log(res));
