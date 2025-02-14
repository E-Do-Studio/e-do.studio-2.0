import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Logo } from '@/components/commons/logo'
import { Header } from '@/components/layout/header'
export default function DocsPage() {
  return (
    <div className="">
      <section className="py-10 gap-4 flex flex-wrap container">
        <Button variant="default" size="sm">
          Default
        </Button>
        <Button variant="outline" size="sm">
          Outline
        </Button>
        <Button variant="link" size="sm">
          Link
        </Button>
        <Button variant="secondary" size="sm">
          Secondary
        </Button>
        <Button variant="ghost" size="sm">
          Ghost
        </Button>
        <Button variant="destructive" size="sm">
          Destructive
        </Button>
        <Button variant="outline" size="sm">
          Outline
        </Button>
      </section>

      <section className="flex flex-col gap-4 container">
        <Input placeholder="Search" />
        <Input placeholder="Search" disabled />
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit">Subscribe</Button>
        </div>
      </section>

      <Logo />
      <Header />
    </div>
  )
}
