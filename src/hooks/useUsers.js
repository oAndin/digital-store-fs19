import { useQuery } from "react-query"
import { API, queryClient } from "../service";
import { useMutation } from "react-query";

export const useGetUsers = () => {
  return useQuery(['get-users'], async () => {
    const response = await API.get('users');
    return response.data;
  });
}

export const useCreateUsers = () => {
  return useMutation(async (dados) => {
    const response = await API.post('users', dados);
    return response.data;
  }, {
    onSucess: () => {
      queryClient.invalidateQueries('get-users');
    }
  });
}

export const useDeleteUser = () => {
  return useMutation(async (id) => {
    const response = await API.delete('users', id)
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('get-users');
    }
  });
};