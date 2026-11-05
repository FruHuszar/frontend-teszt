// Díszítő hullámforma fix magasságú csíkokból (px), amíg nincs valódi Spectrum.
// Asztali nézetben kitölti a doboz szabad helyét, és össze is tud menni, így nem lesz görgetősáv.
const BARS = [17, 31, 22, 39, 50, 34, 25, 45, 36, 20, 28, 42, 53, 39, 22, 34, 48, 31, 17, 25, 39, 28, 20, 34]

interface WaveformProps {
  playing: boolean
}

function Waveform({ playing }: WaveformProps) {
  return (
    <div
      data-el="Waveform"
      aria-hidden="true"
      className={`flex h-14 shrink-0 items-center gap-0.5 overflow-hidden lg:h-auto lg:min-h-0 lg:flex-1 ${playing ? 'animate-pulse' : 'opacity-60'}`}
    >
      {BARS.map((height, i) => (
        <span key={i} className="min-w-0.5 flex-1 rounded-full bg-current" style={{ height: `${height}px` }} />
      ))}
    </div>
  )
}

export default Waveform
