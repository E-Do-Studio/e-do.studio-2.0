export function VideoSection() {
  return (
    <section className="mt-12 hidden md:block">
      <div className="w-full">
        <div className="w-full">
          <video className="w-full h-auto" autoPlay muted loop playsInline preload="metadata">
            <source src="/VIDEOSCREEN_Clients.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      </div>
    </section>
  )
}
