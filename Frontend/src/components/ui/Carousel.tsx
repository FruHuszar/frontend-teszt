import { useState, type ReactNode } from 'react'
import Button from './Button'

interface CarouselProps {
  label: string
  slides: ReactNode[]
}

// Egyszerre egy dia látszik, nyilakkal és pöttyökkel lehet lapozni
function Carousel({ label, slides }: CarouselProps) {
  const [index, setIndex] = useState(0)

  function previous() {
    setIndex(index === 0 ? slides.length - 1 : index - 1)
  }

  function next() {
    setIndex(index === slides.length - 1 ? 0 : index + 1)
  }

  return (
    <section aria-roledescription="carousel" aria-label={label} className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <Button icon="chevron_left" label="Previous slide" onClick={previous} />
        {/* Minden dia a DOM-ban marad, csak az aktív látszik: így lapozáskor nem vész el pl. a feltöltött kép */}
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            hidden={i !== index}
            className="min-w-0 flex-1"
          >
            {slide}
          </div>
        ))}
        <Button icon="chevron_right" label="Next slide" onClick={next} />
      </div>

      <div className="flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className="size-2.5 rounded-full bg-current opacity-30 aria-current:opacity-100"
          />
        ))}
      </div>
    </section>
  )
}

export default Carousel
