import { Spinner } from "@chakra-ui/react"
import HomeSkeleton from "../components-new/UX-Components/HomeSkeleton"



const loading = () => {
  return (
    <div className="h-dvh flex justify-center items-center"><Spinner/></div>
  )
}
export default loading