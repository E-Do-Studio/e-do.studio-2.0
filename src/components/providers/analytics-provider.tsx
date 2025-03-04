'use client'

import { useEffect } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import ReactGA from 'react-ga4'
import ReactPixel from 'react-facebook-pixel'
import { useStore } from '@/lib/store'

const GOOGLE_ANALYTICS_ID = 'UA-188295266-1'
const GTM_ID = 'GTM-NRW8789'
const FB_PIXEL_ID = '954077195374591'
const LINKEDIN_ID = '3009260'

export function AnalyticsProvider() {
  const { cookieConsent } = useStore()

  useEffect(() => {
    if (!cookieConsent) return

    try {
      // Google Analytics 4 avec configuration pour les cookies tiers
      ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
        gaOptions: {
          cookieFlags: 'SameSite=None;Secure'
        }
      })
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname
      })

      // Facebook Pixel avec configuration améliorée
      const fbOptions = {
        autoConfig: true,
        debug: false
      }
      ReactPixel.init(FB_PIXEL_ID, undefined, fbOptions)
      ReactPixel.pageView()

      // LinkedIn Pixel avec gestion des erreurs
      if (typeof window !== 'undefined') {
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []
        window._linkedin_data_partner_ids.push(LINKEDIN_ID)

        const script = document.createElement('script')
        script.async = true
        script.defer = true
        script.innerHTML = `
          _linkedin_partner_id = "${LINKEDIN_ID}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `
        document.body.appendChild(script)

        const linkedInScript = document.createElement('script')
        linkedInScript.async = true
        linkedInScript.defer = true
        linkedInScript.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
        document.body.appendChild(linkedInScript)
      }
    } catch (error) {
      console.error('Error initializing analytics:', error)
    }
  }, [cookieConsent])

  if (!cookieConsent) return null

  return <GoogleTagManager gtmId={GTM_ID} />
} 