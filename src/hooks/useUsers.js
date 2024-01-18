import { useQuery } from "react-query"
import { API } from "../service";

export const useGetUsers = () => {
  return useQuery(['get-users'], async () => {
    const response = await API.get('users');
    console.log(response);
    return response.data;
  });
}