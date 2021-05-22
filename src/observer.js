const refs = {
  body: document.body,
  list: document.createElement('ul'),
};

const createArray = () =>
  Array(15)
    .fill('')
    .map((el, idx) => idx + 1);

const createMarkup = el => `<li>${el}</li>`;

const createGalleryMarkup = createArray().reduce(
  (acc, el) => acc + createMarkup(el),
  '',
);

const getGallery = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(createGalleryMarkup);
    }, 1000);
  });

const addGalleryItems = () => {
  return getGallery().then(markup =>
    refs.list.insertAdjacentHTML('beforeend', markup),
  );
};

const getLastElOfGallery = () => {
  const listItems = refs.list.querySelectorAll('li');
  return listItems[listItems.length - 1];
};

refs.body.append(refs.list);
refs.list.classList.add('list');

const observerFunc = () => {
  let observedItem = getLastElOfGallery();
  const options = {
    root: null,
    rootMargin: '100px 0px 220px 0px',
    threshold: 1.0,
  };
  const callback = function (entries, observer) {
    entries.forEach(async entry => {
      if (entry.isIntersecting) {
        await addGalleryItems();
        const nextObsevedItem = getLastElOfGallery();
        toggleObserver(nextObsevedItem);
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);

  function toggleObserver(target) {
    if (observedItem !== target) {
      observer.unobserve(observedItem);
      observedItem = target;
    }
    observer.observe(target);
  }
  console.log(observedItem);
  toggleObserver(observedItem);
};

addGalleryItems().then(() => observerFunc());
