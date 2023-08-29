import LeaderRow from './LeaderRow';
import LoadingRowsSkeleton from './LoadingRowsSkeleton';

const LeaderTable = ({ data }) => {
  return (
    <div className='flex flex-col'>
      <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
        <div className='border rounded-xl shadow-md overflow-x-scroll no-scrollbar'>
          <table className='min-w-full text-left text-sm font-light'>
            <thead className='border-b text-xs text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-4'>
                  Pos
                </th>
                <th scope='col' className='px-6 py-4'>
                  Name
                </th>
                <th scope='col' className='px-6 py-4'>
                  Score
                </th>
                <th scope='col' className='px-6 py-4'>
                  Workouts
                </th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((person, index) => (
                  <LeaderRow person={person} index={index} key={index} />
                ))
              ) : (
                <LoadingRowsSkeleton rows={8} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderTable;
