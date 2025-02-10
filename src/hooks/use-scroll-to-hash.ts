// 'use client'

// import { useEffect } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { HEADER_HEIGHT } from '@/lib/constants'

// export function useScrollToHash() {
//   const searchParams = useSearchParams()

//   useEffect(() => {
//     // Récupérer le hash depuis l'URL
//     const hash = window.location.hash

//     if (hash) {
//       // Petit délai pour laisser le temps à la page de se charger
//       setTimeout(() => {
//         const element = document.querySelector(hash)
//         if (element) {
//           const elementPosition = element.getBoundingClientRect().top
//           const offsetPosition = elementPosition + window.scrollY - HEADER_HEIGHT - 24 // 24px extra padding

//           window.scrollTo({
//             top: offsetPosition,
//             behavior: 'smooth'
//           })
//         }
//       }, 100)
//     }
//   }, [searchParams])
// } 