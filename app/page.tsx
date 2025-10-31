"use client"

import { useState, useRef, useEffect } from "react"
import HinduWeddingCard from "@/components/hindu-wedding-card"
import ShareModal from "@/components/share-modal"
import { Share2, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    setShareUrl(typeof window !== "undefined" ? window.location.href : "")
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentPage((prev) => Math.max(0, prev - 1))
      if (e.key === "ArrowRight") setCurrentPage((prev) => Math.min(4, prev + 1))
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleShare = () => {
    const shareData = {
      title: "Bhavani & Sharath — Wedding Celebration",
      text: "You are cordially invited to our wedding! 🙏 7th November 2025",
      url: shareUrl,
    }

    if (navigator.share) {
      try {
        navigator.share(shareData).catch(() => {
          // Fallback to modal if share fails
          setShowShare(true)
        })
      } catch {
        setShowShare(true)
      }
    } else {
      setShowShare(true)
    }
  }

  const handleMusicToggle = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
        setIsMusicPlaying(false)
      } else {
        audioRef.current.play()
        setIsMusicPlaying(true)
      }
    }
  }

  const openVenue = () => {
    window.open("https://maps.google.com/?q=Sri+Durga+Gardens+Warangal", "_blank")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50 to-amber-50 flex flex-col items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
      <audio ref={audioRef} loop preload="auto" />

      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12 max-w-2xl animate-fade-in">
        <p className="text-xs sm:text-sm text-amber-700 tracking-widest mb-2">CELEBRATING LOVE</p>
        <h1 className="text-xl sm:text-3xl md:text-4xl font-serif text-amber-900 mb-1 sm:mb-2">Wedding Celebration</h1>
        <p className="text-xs sm:text-sm text-amber-600">Bhavani & Sharath - 7th November 2025</p>
      </div>

      {/* Main Card Area - Responsive */}
      <div className="w-full max-w-5xl mb-6 sm:mb-8 md:mb-12">
        <HinduWeddingCard
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Page Indicator */}
      <div className="flex justify-center gap-1 mb-4 sm:mb-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentPage ? "w-6 bg-amber-700" : "w-2 bg-amber-300"
            }`}
          />
        ))}
      </div>

      {/* Controls - Mobile Optimized */}
      <div className="w-full max-w-4xl space-y-3 sm:space-y-4">
        {/* Primary Controls */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="col-span-2 sm:col-span-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-serif text-sm sm:text-base hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {isOpen ? "Close Card" : "Open Invitation"}
          </button>

          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0 || !isOpen}
            className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-full border-2 border-amber-200 bg-white text-amber-700 font-medium text-sm sm:text-base hover:bg-amber-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            title="Previous"
          >
            <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>

          <button
            onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
            disabled={currentPage === 4 || !isOpen}
            className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-full border-2 border-amber-200 bg-white text-amber-700 font-medium text-sm sm:text-base hover:bg-amber-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            title="Next"
          >
            <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>

          <button
            onClick={handleShare}
            className="col-span-2 sm:col-span-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white border-2 border-amber-600 text-amber-600 font-medium text-sm sm:text-base hover:bg-amber-50 transition-all flex items-center justify-center gap-2 active:scale-95"
            title="Share"
          >
            <Share2 className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>Share</span>
          </button>
        </div>

        {/* Location Button */}
        <div className="flex justify-center">
          <button
            onClick={openVenue}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white border-2 border-emerald-200 text-emerald-600 font-medium text-sm sm:text-base hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 active:scale-95"
            title="View venue"
          >
            <MapPin className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>Venue Location</span>
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showShare && <ShareModal url={shareUrl} onClose={() => setShowShare(false)} />}

      {/* Footer */}
      <div className="mt-10 sm:mt-14 md:mt-16 text-center text-xs sm:text-sm text-amber-600 max-w-2xl">
        <p className="font-serif">Swipe, tap, or use arrow keys to navigate through our invitation</p>
        <p className="mt-1 sm:mt-2 text-amber-500 text-xs">Share the joy with your loved ones</p>
      </div>
    </main>
  )
}
