import SortingDropDown from '../common/SortingDropDown'
import StatusDropDown from '../common/StatusDropDown'

const RecManageFilter = () => {
  return (
    <div className="w-full max-w-[1216px] rounded-xl bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-medium text-[#374151]">상태</p>
          <StatusDropDown />
        </div>

        <div className="min-w-0">
          <p className="mb-2 text-sm font-medium text-[#374151]">정렬</p>
          <SortingDropDown />
        </div>
      </div>
    </div>
  )
}

export default RecManageFilter
