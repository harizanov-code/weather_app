type WeatherInfoProps = {
  detail: any
  kind: string
  colSpan?: string
}

const WeatherInfoBox = ({ detail, kind,colSpan }: WeatherInfoProps) => {
  return (
    <div className={`flex flex-col justify-center items-center h-full ${colSpan} bg-white shadow-md border-2 rounded-md `} >
      <div className="flex w-full justify-center  capitalize  font-bold border-b-2 border-b-gray-200  items-center p-4">
        {kind}

      </div>
      <div className="flex w-full justify-center   font-normal text-gray-800  items-center h-full">

      {detail}

      </div>
    </div>
  )
}
export default WeatherInfoBox
