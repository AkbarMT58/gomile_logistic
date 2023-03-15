import { getMyTasks } from 'service/api';
import swal from 'sweetalert';

export const fetchData = async (date, setData, setIsLoading, page, limit, menu) => {
    setIsLoading(true);

    const startParams = date.start !== '' ? `start=${date.start}&` : '';
    const endParams = date.end !== '' ? `end=${date.end}&` : '';
    const status = date.status !== '' ? `status=${date.status}&` : '';
    const type = date.type !== '' ? `type=${date.type}&` : '';
    const idParams = date.id !== '' ? `id_so=${date.id}&` : '';

    const params =
      `page=${page}&limit=${limit}&menu=${menu}&` +
      startParams +
      endParams +
      status +
      type +
      idParams;

    const response = await getMyTasks(params);
    if (response?.status === 200) {
      setData(response?.data);
    } else if (response?.status === 500) {
      swal('Oops', `Server is Shutting Down`, 'error');
    } else {
      swal('Oops', `${response?.message}`, 'error');
    }
    setIsLoading(false);
}