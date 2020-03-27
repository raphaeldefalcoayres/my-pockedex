import api from '~/services/api';

export const getItemsList = (url, items, resolve, reject) => {
  api
    .get(url)
    .then(response => {
      const retrived = items.concat(response.data.results);
      if (response.data.next !== null) {
        getItemsList(response.data.next, retrived, resolve, reject);
      } else {
        resolve(retrived);
      }
    })
    .catch(error => {
      console.log(error);
      reject('Something wrong. Please refresh the page and try again.');
    });
};

export const getItemsListPaginate = (url, items, page, resolve, reject) => {
  if (page === 0) {
    items.total = 0;
    items.data = [];
  }

  api
    .get(url)
    .then(response => {
      items.data[page] = response.data.results;
      items.total += response.data.results.length;

      const retrived = items;

      if (response.data.next !== null) {
        page += 1;
        getItemsListPaginate(
          response.data.next,
          retrived,
          page,
          resolve,
          reject
        );
      } else {
        resolve(retrived);
      }
    })
    .catch(error => {
      console.log(error);
      reject('Something wrong. Please refresh the page and try again.');
    });
};

export const pad = (num, size) => {
  const s = `000${num}`;
  return s.substr(s.length - size);
};

export const Paginator = (items, page, per_page) => {
  const offset = (page - 1) * per_page;
  const paginatedItems = items.slice(offset).slice(0, per_page);
  const total_pages = Math.ceil(items.length / per_page);
  return {
    page,
    per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages,
    data: paginatedItems,
  };
};
