export default function TagCheckbox() {
  return (
    <label className="flex h-10 w-full cursor-pointer items-center justify-between rounded-xl border border-gray-400 px-4 py-3">
      <span className="text-sm"> ㅎㅇㅎㅇ</span>
      <input type="checkbox" className="peer sr-only" />
      <span className="peer-checked:bg-primary-300 h-4 w-4 rounded-sm border-2 border-gray-400 peer-checked:border-none"></span>
    </label>
  )
}
