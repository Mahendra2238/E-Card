"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Play } from "lucide-react"

interface WeddingCardProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  currentPage: number
  setCurrentPage: (value: number) => void
}

export default function WeddingCard({ isOpen, setIsOpen, currentPage, setCurrentPage }: WeddingCardProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [expandedImage, setExpandedImage] = useState<string | null>(null)
  const [showVideo, setShowVideo] = useState(false)

  // Mock data - replace with real images
  const pages = [
    {
      id: 0,
      type: "image",
      src: "/elegant-wedding-card-cover.jpg",
      title: "Page 1",
    },
    {
      id: 1,
      type: "image",
      src: "/wedding-event-details.jpg",
      title: "Page 2",
    },
    {
      id: 2,
      type: "image",
      src: "/wedding-venue-and-schedule.jpg",
      title: "Page 3",
    },
    {
      id: 3,
      type: "video",
      poster: "/wedding-video-thumbnail.png",
      title: "Video",
    },
  ]

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.changedTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentPage(Math.min(pages.length - 1, currentPage + 1))
      } else {
        setCurrentPage(Math.max(0, currentPage - 1))
      }
    }
    setTouchStart(null)
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentPage(Math.min(pages.length - 1, currentPage + 1))
      } else if (e.key === "ArrowLeft") {
        setCurrentPage(Math.max(0, currentPage - 1))
      } else if (e.key === "Escape") {
        setExpandedImage(null)
        setShowVideo(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentPage, pages.length, setCurrentPage])

  return (
    <>
      {/* 3D Card Container */}
      <div
        className={`relative w-full aspect-video md:aspect-auto md:h-96 max-h-[500px] transition-transform duration-700 ${
          isOpen ? "md:[transform-style:preserve-3d] md:[transform:rotateY(18deg)]" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isOpen ? "rotateY(8deg) rotateX(2deg)" : "rotateY(0deg)",
        }}
      >
        {/* Background Lights */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-tl from-amber-50 to-orange-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

        {/* Cover Side */}
        <div
          className={`absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-700 cursor-pointer ${
            isOpen
              ? "opacity-0 md:opacity-100 md:translate-x-4 pointer-events-none md:pointer-events-auto"
              : "opacity-100 pointer-events-auto"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backfaceVisibility: "hidden",
            transformOrigin: "left",
            transform: isOpen ? "rotateY(-18deg) translateX(10%)" : "rotateY(0deg)",
            transitionDuration: "700ms",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 md:p-8 flex flex-col items-center justify-center shadow-2xl border border-white">
            <div className="relative w-full h-2/3 mb-4 rounded-lg overflow-hidden shadow-lg">
              <img src="/wedding-couple-elegant.jpg" alt="Wedding cover" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <h2 className="text-xl md:text-3xl font-serif text-amber-900 font-bold">Bhavani & Sharath</h2>
              <p className="text-xs md:text-sm text-amber-700 mt-1">7th November 2025 • Sri Durga Gardens</p>
            </div>
          </div>
        </div>

        {/* Inner Pages */}
        <div
          className={`absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-700 ${
            !isOpen ? "opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto" : ""
          }`}
          style={{
            backfaceVisibility: "hidden",
            transform: isOpen ? "rotateY(0deg)" : "rotateY(-180deg)",
            transitionDuration: "700ms",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full h-full bg-gradient-to-b from-amber-50 to-white p-4 md:p-6 shadow-2xl border border-white flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Left Pane - Image Stack */}
            <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-white to-amber-50 rounded-xl p-3 md:p-4">
              <div className="relative w-full aspect-square md:aspect-auto md:flex-1 max-h-80 rounded-lg overflow-hidden shadow-md mb-3">
                <div className="relative w-full h-full">
                  {pages
                    .filter((p) => p.type === "image")
                    .map((page, idx) => (
                      <div
                        key={page.id}
                        className={`absolute inset-0 transition-all duration-500 cursor-pointer rounded-lg overflow-hidden ${
                          idx === Math.min(currentPage, 1) ? "opacity-100 scale-100 z-30" : "opacity-70 scale-95 z-20"
                        }`}
                        onClick={() => setExpandedImage(page.src)}
                        style={{
                          transform:
                            idx === Math.min(currentPage, 1)
                              ? "translateX(0px) scale(1)"
                              : `translateX(${idx * 12}px) scale(0.95)`,
                        }}
                      >
                        <img
                          src={page.src || "/placeholder.svg"}
                          alt={page.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              </div>
              <p className="text-xs text-amber-600 text-center">Tap to expand • Swipe to navigate</p>
            </div>

            {/* Right Pane - Details & Video */}
            <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-white to-rose-50 rounded-xl p-3 md:p-4">
              <div className="relative w-full aspect-square md:aspect-auto md:flex-1 max-h-80 rounded-lg overflow-hidden shadow-md mb-3">
                <div className="relative w-full h-full">
                  {/* Video Poster */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 cursor-pointer rounded-lg overflow-hidden ${
                      currentPage >= 3 ? "opacity-100 scale-100 z-30" : "opacity-60 scale-90 z-10"
                    }`}
                    onClick={() => setShowVideo(true)}
                  >
                    <img
                      src={pages[3].poster || "/placeholder.svg"}
                      alt="Video"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors">
                      <Play className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-rose-600 text-center">Click to play wedding highlights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Image Viewer */}
      {expandedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute -top-10 -right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={expandedImage || "/placeholder.svg"}
              alt="Expanded view"
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 -right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <video
              controls
              autoPlay
              playsInline
              className="w-full rounded-lg bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4" />
              Your browser does not support video playback
            </video>
          </div>
        </div>
      )}
    </>
  )
}
