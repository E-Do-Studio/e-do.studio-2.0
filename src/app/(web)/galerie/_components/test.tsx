"use server"
import { getPayload } from "payload"
import config from "@/payload.config"

export const Test = async () => {
  const payload = await getPayload({ config })
  const categories = await payload.find({
    collection: 'categories',
    depth: 2,
    locale: 'all',
  })

  console.log(categories)

  return <div>Test</div>

}