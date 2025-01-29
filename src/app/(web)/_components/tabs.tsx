import { cn } from '@/lib/utils'

type TabsProps = {
  tabs: string[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="flex gap-4 md:gap-8">
      {tabs.map((tab) => (
        <span
          key={tab}
          className={cn(
            'text-sm md:text-base cursor-pointer text-neutral-500 select-none',
            activeTab === tab && 'underline underline-offset-8 text-primary',
          )}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </span>
      ))}
    </div>
  )
}
