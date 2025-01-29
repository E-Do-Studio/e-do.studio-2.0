"use client"

import Image from "next/image";
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from "react";

type ServicesProps = {
    imagesDescription: [image: string, alt: string];
    serviceName: string;
    title: string;
    description: string;
    number: string | number;
    images: { src: string, alt: string }[];
}

export const Services = ({ imagesDescription, serviceName, title, description, number, images }: ServicesProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 1500);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="mt-0 mb-3 md:mt-10 md:mb-10 flex md:flex-row flex-col gap-2 justify-between md:hover:cursor-pointer md:transform md:transition-transform md:duration-500 md:hover:scale-105">
            <span className="text-lg font-light md:text-2xl md:font-medium">{number}</span>
            <div className="flex flex-col gap-2 w-full md:gap-5 md:max-w-lg">
                <div className="flex justify-between items-center">
                    <h4 className="block md:hidden">{serviceName}</h4>
                    <ChevronRight className="block md:hidden border border-border rounded-full p-2 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-medium md:hidden">{title}</h3>
                <h3 className="text-2xl font-medium hidden md:block">{serviceName + " " + title}</h3>
                <p className="text-base font-medium text-neutral-500">{description}</p>
                <Image src={imagesDescription[0]} alt={imagesDescription[1]} width={100} height={100} className="w-full md:w-[270px]" />
            </div>
            <Image
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                width={300}
                height={300}
                className="hidden md:block object-cover w-[200px] h-[260px] mt-7"
            />
            <div className="hidden md:block">
                <ChevronRight className="border border-border rounded-full p-2 w-8 h-8 absolute right-0 top-1" />
            </div>
        </div>
    )
}
