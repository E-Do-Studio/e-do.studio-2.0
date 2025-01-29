import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const inputVariants = cva(
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-light file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        landing: 'bg-neutral-100 h-12 border-none',
      },
    },
  },
)

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { variant?: 'landing' }
>(({ className, type, variant, ...props }, ref) => {
  return (
    <input type={type} className={cn(inputVariants({ variant }), className)} ref={ref} {...props} />
  )
})
Input.displayName = 'Input'

export { Input }
