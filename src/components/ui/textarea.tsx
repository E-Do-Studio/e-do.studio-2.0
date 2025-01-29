import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const textareaVariants = cva(
  'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        landing: 'bg-neutral-100 border-none',
      },
    },
  },
)

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & { variant?: 'landing' }
>(({ className, variant, ...props }, ref) => {
  return <textarea className={cn(textareaVariants({ variant }), className)} ref={ref} {...props} />
})
Textarea.displayName = 'Textarea'

export { Textarea }
