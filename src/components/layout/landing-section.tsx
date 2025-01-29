import { cn } from '@/lib/utils'

export const LandingSection = ({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <section className={cn('flex flex-col gap-8 mt-16', className)}>
      <LandingTitle title={title} />
      {children}
    </section>
  )
}

export const LandingTitle = ({ title, className }: { title: string; className?: string }) => {
  return <h2 className={cn('', className)}>{title}</h2>
}
