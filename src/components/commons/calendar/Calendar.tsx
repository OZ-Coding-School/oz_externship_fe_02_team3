import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DateTriggerButton from './DateTriggerButton'

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={(d: Date | null) => setSelectedDate(d)}
      dateFormat="yyyy/MM/dd"
      customInput={
        <DateTriggerButton
          placeholder="-/-/-"
          size="md"
          variant="outline"
          fullWidth={false}
          width={300}
        />
      }
      popperPlacement="bottom-start"
      showPopperArrow
      withPortal
    />
  )
}
