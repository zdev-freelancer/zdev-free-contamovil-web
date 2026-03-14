import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/shared/hooks/use-theme'

export function ThemeToggle() {
  const { toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-[36px] h-[36px] rounded-[10px] text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 overflow-hidden"
      aria-label="Toggle theme"
    >
      <Sun className="absolute h-[18px] w-[18px] transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[18px] w-[18px] transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </button>
  )
}
