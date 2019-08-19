// libs
import axios from 'axios';
// stores
import { errorsStore, requestStore, usersStore } from 'stores';
import { NUMBER_OF_USERS, REQUEST_TYPES, USERS_URL } from 'constants/index';

export const getUsers = () => {
  const url = `${USERS_URL}?results=${NUMBER_OF_USERS}`;

  if (requestStore.getRequestByType(REQUEST_TYPES.getUsers)) {
    return false;
  }

  requestStore.setRequestInProcess(REQUEST_TYPES.getUsers, true);

  return axios.get(url).then(({ data }) => {
    const { results } = data;

    usersStore.initialize(results);
    requestStore.setRequestInProcess(REQUEST_TYPES.getUsers, false);
  }).catch(() => {
    errorsStore.setError('Something went wrong');
    requestStore.setRequestInProcess(REQUEST_TYPES.getUsers, false);
  });
};
