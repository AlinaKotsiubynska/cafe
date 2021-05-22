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

const addGalleryItems = async () => {
  await getGallery().then(markup => {
    refs.list.insertAdjacentHTML('beforeend', markup);
  });
  window.addEventListener('scroll', addNextGalleryItems);
};

const getLastElOfGallery = () => {
  const listItems = refs.list.querySelectorAll('li');
  return listItems[listItems.length - 1];
};

refs.body.append(refs.list);
refs.list.classList.add('list');

addGalleryItems();

const getDiffSizes = () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  const hiddenDiff = scrollHeight - (scrollTop + clientHeight);
  return hiddenDiff;
};

const getIsLoad = () => {
  const heightItem = refs.list.querySelector('li').clientHeight;
  return getDiffSizes() < heightItem;
};

const addNextGalleryItems = () => {
  const isLoad = getIsLoad();

  if (isLoad) {
    window.removeEventListener('scroll', addNextGalleryItems);
    addGalleryItems();
  }
};