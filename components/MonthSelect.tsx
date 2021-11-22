import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface IMonthSelectProps {
  onMonthChange(number): void
  monthValue: number
}

const MonthSelect = ({ onMonthChange, monthValue }: IMonthSelectProps) => {
  const months = [...new Array(12)].map((x, index) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return new Date(currentYear, currentMonth + index)
  })
  return (
    <Select
      value={monthValue}
      onChange={({ target }) => onMonthChange(target.value)}
      sx={{ width: '8rem' }}
    >
      {months.map((monthDate) => (
        <MenuItem value={monthDate.getMonth()} key={monthDate.getMonth()}>
          {monthDate.toLocaleString('default', { month: 'long' })}
        </MenuItem>
      ))}
    </Select>
  )
}

export default MonthSelect