import Image from "next/image"

export const Introduction = () => {
    return (
        <div className="bg-background-footer w-full relative h-[550px] mb-[300px]">
            <div className="container text-primary-foreground">
                <h1 className="text-5xl font-bold pt-28">
                    Lorem ipsum dolor sit, amet consectetur adipisicing.
                </h1>

                {/* Espace pour les futurs boutons */}
                <div className="mt-8">
                    {/* Boutons à venir */}
                </div>

                <Image
                    src="/studio.webp"
                    alt="Logo"
                    width={1920}
                    height={1080}
                    quality={95}
                    priority
                    className="w-11/12 h-[500px] object-cover rounded-lg absolute bottom-[-250px] "
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
            </div>
        </div>
    )
}