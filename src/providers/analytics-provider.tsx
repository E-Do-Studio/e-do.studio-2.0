'use client'

import { useEffect } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import ReactGA from 'react-ga4'
import ReactPixel from 'react-facebook-pixel'
import { useCookieStore } from '@/store/use-cookies'

const GOOGLE_ANALYTICS_ID = 'UA-188295266-1'
const GTM_ID = 'GTM-NRW8789'
const FB_PIXEL_ID = '954077195374591'
const LINKEDIN_ID = '3009260'

export function AnalyticsProvider() {
  const { cookieConsent } = useCookieStore()

  useEffect(() => {
    // Log l'état initial
    console.log('Analytics Provider - Cookie Consent:', cookieConsent)
    console.log('Local Storage:', localStorage.getItem('edo-studio-storage'))

    if (!cookieConsent) {
      console.log('Analytics disabled - no consent')
      return
    }


    try {
      // Google Analytics 4
      ReactGA.initialize(GOOGLE_ANALYTICS_ID)
      ReactGA.send({ hitType: 'pageview', page: window.location.pathname })
      console.log('GA initialized')

      // Facebook Pixel
      const fbOptions = {
        autoConfig: true,
        debug: true
      }
      ReactPixel.init(FB_PIXEL_ID, undefined, fbOptions)
      ReactPixel.pageView()
      console.log('FB Pixel initialized')

      // LinkedIn Pixel
      const script = document.createElement('script')
      script.innerHTML = `
        _linkedin_partner_id = "${LINKEDIN_ID}";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
      `
      document.body.appendChild(script)

      const linkedInScript = document.createElement('script')
      linkedInScript.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
      document.body.appendChild(linkedInScript)
      console.log('LinkedIn Pixel initialized')
    } catch (error) {
      console.error('Error initializing analytics:', error)
    }
  }, [cookieConsent])

  if (!cookieConsent) return null

  return <GoogleTagManager gtmId={GTM_ID} />
} 