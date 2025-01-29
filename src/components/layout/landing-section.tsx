import { cn } from '@/lib/utils'

export const LandingSection = ({
  title,
  children,
  className,
  subtitle,
  description,
}: {
  title: string
  children: React.ReactNode
  className?: string
  subtitle?: string
  description: () => React.ReactNode
}) => {
  return (
    <section className={cn('flex flex-col gap-8 mt-16 md:mt-32', className)}>
      <div className={cn('flex-1 flex flex-col gap-1', description != null && 'justify-between')}>
        <div className="flex flex-col gap-2">
          <LandingTitle title={title} />
          {subtitle && <LandingSubtitle subtitle={subtitle} />}
        </div>
        {description != null && description()}
      </div>
      {children}
    </section>
  )
}

export const LandingTitle = ({ title, className }: { title: string; className?: string }) => {
  return <h2 className={cn('', className)}>{title}</h2>
}

export const LandingSubtitle = ({
  subtitle,
  className,
}: {
  subtitle: string
  className?: string
}) => {
  return <h2 className={cn('text-neutral-200', className)}>{subtitle}</h2>
}
