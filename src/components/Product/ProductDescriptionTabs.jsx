const ProductDescriptionTabs = ({ 
  description, 
  specifications 
}) => {
  return (
    <div className="mt-8 flex flex-col md:flex-row gap-4">
      {/* Details Section */}
      <div className="flex-1 p-4 rounded-lg bg-black bg-opacity-75 transition duration-300 md:hover:shadow-lg">
        <h2 className="text-2xl font-bold mb-2 font-rasta-heading">
          Detalles
        </h2>
        <p className="text-gray-400">{description}</p>
      </div>

      {/* Specifications Section */}
      {specifications && (
        <div className="flex-1 p-4 rounded-lg bg-black bg-opacity-75 transition duration-300 md:hover:shadow-lg">
          <h2 className="text-2xl font-bold mb-2 font-rasta-heading">
            Especificaciones
          </h2>
          <table className="table-fixed w-full max-w-full md:max-w-full bg-black bg-opacity-50 rounded-lg">
            <tbody>
              {Object.entries(specifications).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td className="border px-4 py-2 font-bold text-gray-300 break-words">
                      {key}
                    </td>
                    <td className="border px-4 py-2 text-gray-400 break-words">
                      {typeof value === 'object' ? JSON.stringify(value) : value}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionTabs;
