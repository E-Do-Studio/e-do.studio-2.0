'use client'

import { LandingSection } from "@/components/layout/landing-section"
import { motion } from "framer-motion"

export function Accompagnement() {
    return (
        <LandingSection title="Accompagnement">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        className="space-y-6 p-6 bg-neutral-100 rounded-lg"
                        whileHover={{
                            scale: 1.03,
                            transition: {
                                duration: 0.2,
                            },
                        }}
                    >
                        <h2 className="text-2xl font-bold">Self-service</h2>
                        <p className="text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dolorem magni eveniet, odio earum rem modi voluptatum delectus harum. Odit earum dignissimos quidem ipsa expedita repellat quas quis cupiditate molestias?
                        </p>
                    </motion.div>

                    <motion.div
                        className="space-y-6 p-6 bg-neutral-100 rounded-lg"
                        whileHover={{
                            scale: 1.03,
                            transition: {
                                duration: 0.2,
                            },
                        }}
                    >
                        <h2 className="text-2xl font-bold">Full service</h2>
                        <p className="text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                        </p>
                    </motion.div>
                </div>
        </LandingSection>
    )
}