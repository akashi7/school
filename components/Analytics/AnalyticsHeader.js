import CustomImage from '../../components/Shared/CustomImage'
import { toLocalString } from '../../helpers/numbers'
import { useGetEmployeesQuery } from '../../lib/api/Employees/employeesEndpoints'
import { useGetParentsQuery } from '../../lib/api/Parent/childrenEndpoints'
import { useGetSchoolsQuery } from '../../lib/api/Schools/schoolsEndpoints'
import { useGetStudentsQuery } from '../../lib/api/Students/studentsEndpoints'

const AnalyticsHeader = ({isAdmin}) => {
  const { data: schools, isLoading, isFetching } = useGetSchoolsQuery()
  const { data: employees } = useGetEmployeesQuery({})

  const { data: students } = useGetStudentsQuery({})
  const { data: parents } = useGetParentsQuery({})

  return (
    <div className='gap-4 lg:gap-6 xl:gap-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-3'>
      {/* <div
				className="col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-1 p-10 rounded items-start flex gap-4"
				style={{
					background:
						"linear-gradient(0deg, rgba(11, 11, 11, 1), rgba(51, 73, 97, 1))",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="rounded-full border-primary border-2 w-[60px] h-[60px] flex items-center justify-center mt-2">
					<CustomImage src="/icons/children-active.svg" className="w-[40px]" />
				</div>

				<div>
					<h1 className="text-[52px] font-bold text-white">
						{toLocalString(7865)}
					</h1>
					<p className="text-white">Parents</p>
				</div>
			</div> */}

      {isAdmin&&<div
        className='col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-1 p-10 rounded items-start flex gap-4'
        style={{
          background:
            'linear-gradient(0deg, rgba(11, 11, 11, 1), rgba(51, 73, 97, 1))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='rounded-full border-primary border-2 w-[60px] h-[60px] flex items-center justify-center mt-2'>
          <CustomImage src='/icons/children-active.svg' className='w-[40px]' />
        </div>

        <div>
          <h1 className='text-[52px] font-bold text-white'>
            {toLocalString(schools?.payload?.length)}
          </h1>
          <p className='text-white'>Schools</p>
        </div>
      </div>}
      <div
        className='col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-1 p-10 rounded items-start flex gap-4'
        style={{
          background:
            'linear-gradient(0deg, rgba(11, 11, 11, 1), rgba(51, 73, 97, 1))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='rounded-full border-primary border-2 w-[60px] h-[60px] flex items-center justify-center mt-2'>
          <CustomImage src='/icons/children-active.svg' className='w-[40px]' />
        </div>

        <div>
          <h1 className='text-[52px] font-bold text-white'>
            {toLocalString((employees?.payload?.length)||(employees?.payload?.items?.length))}
          </h1>
          <p className='text-white'>Employees</p>
        </div>
      </div>
      <div
        className='col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-1 p-10 rounded items-start flex gap-4'
        style={{
          background:
            'linear-gradient(0deg, rgba(11, 11, 11, 1), rgba(51, 73, 97, 1))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='rounded-full border-primary border-2 w-[60px] h-[60px] flex items-center justify-center mt-2'>
          <CustomImage src='/icons/children-active.svg' className='w-[40px]' />
        </div>

        <div>
          <h1 className='text-[52px] font-bold text-white'>
            {toLocalString((students?.payload?.length)||(students?.payload?.items?.length))}
          </h1>
          <p className='text-white'>Students</p>
        </div>
      </div>
			<div
        className='col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-1 p-10 rounded items-start flex gap-4'
        style={{
          background:
            'linear-gradient(0deg, rgba(11, 11, 11, 1), rgba(51, 73, 97, 1))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='rounded-full border-primary border-2 w-[60px] h-[60px] flex items-center justify-center mt-2'>
          <CustomImage src='/icons/children-active.svg' className='w-[40px]' />
        </div>

        <div>
          <h1 className='text-[52px] font-bold text-white'>
            {toLocalString(parents?.payload?.length)}
          </h1>
          <p className='text-white'>Parents</p>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsHeader
