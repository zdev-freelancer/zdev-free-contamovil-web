import * as React from 'react'

import { cn } from '@/shared/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-[38px] w-full rounded-[10px] border border-input bg-card px-3 py-2 text-[13px] shadow-sm transition-all duration-150 file:border-0 file:bg-transparent file:text-[13px] file:font-semibold file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[#5B4EDA] focus-visible:shadow-focus-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
