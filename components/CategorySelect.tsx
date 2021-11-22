import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

interface ICategorySelectProps {
  availableCategories: string[]
  selectedCategories: string[]
  onCategoryToggle(caegoryName: string): void
}

const CategorySelect = ({
  availableCategories,
  selectedCategories,
  onCategoryToggle,
}: ICategorySelectProps) => (
  <Box sx={{display:'flex', gap: '0.5rem', alignItems: 'center'}}>
    {availableCategories.map((category) => (
      <Button
        key={category}
        onClick={() => onCategoryToggle(category)}
        variant={
          selectedCategories.includes(category) ? "contained" : "outlined"
        }
        color={category}
        sx={{
          borderRadius: '1rem',
          paddingX: '0.5rem',
          minWidth: '3rem',
          height: '2rem',
        }}
      >
        {category}
      </Button>
    ))}
  </Box>
)

export default CategorySelect