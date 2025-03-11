"use client"

import Image from "next/image";
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from "react";

type ServicesProps = {
    imagesDescription: [string, string];
    serviceName: string;
    title: string;
    description: string;
    number: string | number;
    image: { src: string, alt: string };
}

export const Services = ({ imagesDescription, serviceName, title, description, number, image }: ServicesProps) => {
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentImageIndex((prev) => (prev + 1) % images.length);
    //     }, 1500);

    //     return () => clearInterval(interval);
    // }, [images.length]);

    return (
        <div className="mt-0 mb-3 lg:mt-10 lg:mb-10 flex lg:flex-row flex-col gap-2 justify-between lg:hover:cursor-pointer lg:transform lg:transition-transform lg:duration-500 lg:hover:scale-105">
            <span className="text-lg font-light lg:text-2xl lg:font-medium">{number}</span>
            <div className="flex flex-col gap-2 w-full lg:gap-5 lg:max-w-lg">
                <div className="flex justify-between items-center">
                    <h4 className="block lg:hidden">{serviceName}</h4>
                    <ChevronRight className="block lg:hidden border border-border rounded-full p-2 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-medium lg:hidden">{title}</h3>
                <h3 className="text-2xl font-medium hidden lg:block lg:h-14">{serviceName + " " + title}</h3>
                <div className="flex flex-col lg:flex-row gap-4 items-start">
                    <p className="text-base font-medium text-neutral-500 lg:flex-1">{description}</p>
                    <Image
                        src={imagesDescription[0]}
                        alt={imagesDescription[1]}
                        width={800}
                        height={600}
                        quality={80}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`w-full lg:w-[200px] object-contain transition-all duration-300 lg:flex-shrink-0
                            ${imagesDescription[1].includes('cyclorama')
                                ? 'lg:grayscale lg:contrast-110 lg:hover:grayscale-0 lg:hover:contrast-100'
                                : 'lg:grayscale lg:contrast-125 lg:hover:grayscale-0 lg:hover:contrast-100'
                            }`}
                        priority
                    />
                </div>
            </div>
            <Image
                src={image.src}
                alt={image.alt}
                width={300}
                height={300}
                className="hidden lg:block object-cover w-[200px] h-[260px] mt-7"
            />
            <div className="hidden lg:block">
                <ChevronRight className="border border-border rounded-full p-2 w-8 h-8 absolute right-0 top-1" />
            </div>
        </div>
    )
}
