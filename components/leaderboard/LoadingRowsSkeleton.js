const LoadingRowsSkeleton = ({ rows }) =>
  [...Array(rows)].map((_, index) => (
    <tr
      className='border-b transition duration-300 ease-in-out hover:bg-neutral-100'
      key={index}
    >
      <td className='whitespace-nowrap px-6 py-4'>
        <div className='animate-pulse h-4 w-6 rounded-md bg-gray-200'></div>
      </td>
      <td className='whitespace-nowrap px-6 py-4'>
        <div className='animate-pulse h-4 w-20 rounded-md bg-gray-200'></div>
      </td>
      <td className='whitespace-nowrap px-6 py-4'>
        <div className='animate-pulse h-4 w-10 rounded-md bg-gray-200'></div>
      </td>
      <td className='whitespace-nowrap px-6 py-4'>
        <div className='animate-pulse h-4 w-24 rounded-md bg-gray-200'></div>
      </td>
    </tr>
  ));

export default LoadingRowsSkeleton;
