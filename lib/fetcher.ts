import axios from "axios";

const fetcher = <T>(url: string) => axios.get<T>(url).then((res) => res.data);

export default fetcher;
