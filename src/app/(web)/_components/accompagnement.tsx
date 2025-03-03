'use client'

import { LandingSection } from "@/components/layout/landing-section"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

export function Accompagnement() {
    const { t } = useTranslation("home")

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
                        <h2 className="text-2xl font-bold"> {t("accompagnement.self_service.title")} </h2>
                        <p className="text-gray-600">
                            {t("accompagnement.self_service.description")}
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
                        <h2 className="text-2xl font-bold"> {t("accompagnement.full_service.title")} </h2>
                        <p className="text-gray-600">
                            {t("accompagnement.full_service.description")}
                        </p>
                    </motion.div>
                </div>
        </LandingSection>
    )
}