import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

const useDispatchStore = () => useDispatch<AppDispatch>()

export default useDispatchStore