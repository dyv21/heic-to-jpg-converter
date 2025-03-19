import {GridLoader} from "react-spinners"

export const Loader = () => (
  <div className={"fixed inset-0 bg-gray-500/75 transition-opacity w-full h-full flex justify-center items-center z-10"}>
      <GridLoader size={20} color="#1a80e5" />
  </div>
)