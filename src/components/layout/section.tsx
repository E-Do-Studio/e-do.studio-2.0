import { cn } from '@/lib/utils'

export const Section = ({
  title,
  children,
  className,
  subtitle,
  description,
  id,
  image,
}: {
  title?: string
  children: React.ReactNode
  className?: string
  subtitle?: string
  description?: () => React.ReactNode
  id?: string
  image?: () => React.ReactNode
}) => {
  return (
    <section
      className={cn(
        'flex flex-col gap-8 mt-24 md:mt-32',
        'scroll-mt-32',
        className
      )}
      id={id}
    >
      <div className={cn('flex-1 flex flex-col', description != null && 'justify-between')}>
        {image ? (
          <div className='flex flex-col gap-8 md:flex-row justify-between'>
            <div className="flex-1 flex flex-col w-full gap-1 md:gap-2">
              <div>
                {title && <Title title={title} />}
                {subtitle && <Subtitle subtitle={subtitle} />}
              </div>
              <div className='flex flex-col md:flex-row justify-between gap-8 mt-4'>
                <div>
                  {description != null && description()}
                </div>
                <div className='w-80 flex-1 md:w-full md:flex md:justify-end md:max-w-[50%]'>
                  {image && image()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            {title && <Title title={title} />}
            {subtitle && <Subtitle subtitle={subtitle} />}
            {description != null && description()}
          </div>
        )}
      </div>
      {children}
    </section>
  )
}

export const Title = ({ title, className }: { title: string; className?: string }) => {
  return <h1 className={cn('max-w-[46rem]', className)}>{title}</h1>
}

export const Subtitle = ({
  subtitle,
  className,
}: {
  subtitle: string
  className?: string
}) => {
  return <h2 className={cn('text-neutral-200', className)}>{subtitle}</h2>
}

export const Image = ({ image, className }: { image: () => React.ReactNode; className?: string }) => {
  return <div className={cn('', className)}>{image()}</div>
}
