"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface PortfolioGalleryProps {
  images: string[]
  title: string
}

export function PortfolioGallery({ images, title }: PortfolioGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  function prev() {
    setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : null))
  }
  function next() {
    setLightbox((i) => (i !== null ? (i + 1) % images.length : null))
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, idx) => (
          <button
            key={src + idx}
            onClick={() => setLightbox(idx)}
            className="overflow-hidden rounded-xl bg-gray-100 border border-black/5 hover:border-yellow-300/60 hover:shadow-sm transition-all group"
            style={{ aspectRatio: "4/5" }}
          >
            <img
              src={src}
              alt={`${title} ${idx + 2}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Counter */}
          <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
            {lightbox + 1} / {images.length}
          </span>

          {/* Prev */}
          {images.length > 1 && (
            <button
              className="absolute left-4 text-white/60 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              onClick={(e) => { e.stopPropagation(); prev() }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-lg w-full mx-16"
            style={{ aspectRatio: "4/5" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightbox]}
              alt={`${title} ${lightbox + 2}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              className="absolute right-4 text-white/60 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              onClick={(e) => { e.stopPropagation(); next() }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </>
  )
}
