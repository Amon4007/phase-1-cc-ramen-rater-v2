

const handleClick = (ramen) => {

  const detailImage = document.querySelector('#ramen-detail img');
  const ramenName = document.querySelector('#ramen-detail h2');
  const ramenRestaurant = document.querySelector('#ramen-detail h3');
  const ramenRating = document.getElementById('rating-display');
  const ramenComment = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  ramenName.textContent = ramen.name;
  ramenRestaurant.textContent = ramen.restaurant;
  ramenRating.textContent = ramen.rating;
  ramenComment.textContent = ramen.comment;
};

const addSubmitListener = () => {

  const form = document.getElementById('new-ramen');

  if (!form) {
    console.error('Form element with id #new-ramen not found in DOM');
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target['new-comment'].value
    };

    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));
    document.getElementById('ramen-menu').appendChild(img);

    form.reset();
  });
}

const displayRamens = () => {

  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');

      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });


      handleClick(ramens[0]);
    })
    .catch(error => console.error('Error fetching ramen:', error));
};

const main = () => {

  displayRamens();
  addSubmitListener();
}


document.addEventListener('DOMContentLoaded', () => {
  main();
});

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
