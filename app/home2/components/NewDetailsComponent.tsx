const NewDetailsComponent = () => {
  return (
    <>
     <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-sm font-medium">Humidity</h3>
                <p className="text-xl">79%</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-sm font-medium">Wind</h3>
                <p className="text-xl">2 m/s</p>
              </div>
              <div className="col-span-2 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-sm font-medium">Altitude / Pressure</h3>
                <p className="text-xl">1008 m / 1009 hPa</p>
              </div>
            </div>
          </div>
    </>
  )
}
export default NewDetailsComponent
