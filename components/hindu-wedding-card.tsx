
"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronDown, X, Play } from "lucide-react"

interface HinduWeddingCardProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  currentPage: number
  setCurrentPage: (page: number) => void
}

export default function HinduWeddingCard({ isOpen, setIsOpen, currentPage, setCurrentPage }: HinduWeddingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX)
    handleSwipe()
  }

  const handleSwipe = () => {
    if (!isOpen) return
    if (touchStart - touchEnd > 50) {
      setCurrentPage((prev) => Math.min(4, prev + 1))
    }
    if (touchEnd - touchStart > 50) {
      setCurrentPage((prev) => Math.max(0, prev - 1))
    }
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>

      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full max-w-3xl mx-auto perspective"
        style={{ perspective: "1000px" }}
      >
        {/* 3D Card Container */}
        <div
          className={`relative w-full rounded-xl md:rounded-2xl shadow-2xl transition-all duration-700 ${
            isOpen ? "scale-100" : "scale-95"
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isOpen ? "rotateY(0deg)" : "rotateY(-180deg)",
          }}
        >
          {/* FRONT COVER - Closed View */}
          <div
            className={`w-full bg-gradient-to-b from-amber-50 via-rose-50 to-amber-100 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 min-h-96 sm:min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-between ${
              !isOpen ? "block" : "hidden"
            }`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4 sm:mb-6" />

            <div className="flex-1 flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center">
              <div className="text-3xl sm:text-4xl">🙏</div>

              <div>
                <p className="text-xs sm:text-sm text-amber-700 tracking-widest mb-2 sm:mb-3 font-serif uppercase">
                  With blessings of the almighty
                </p>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-amber-900 mb-1">Wedding Celebration</h1>
                <p className="text-sm sm:text-base text-amber-700 font-serif">A Divine Union</p>
              </div>

              <div className="space-y-2">
                <p className="text-lg sm:text-2xl font-serif text-amber-900">Bhavani</p>
                <p className="text-amber-600">&amp;</p>
                <p className="text-lg sm:text-2xl font-serif text-amber-900">Sharath Chandra</p>
              </div>

              <div className="bg-white bg-opacity-70 rounded-lg px-4 sm:px-8 py-3 sm:py-4 backdrop-blur-sm border border-amber-200">
                <p className="text-xs text-amber-600 tracking-wide">Date</p>
                <p className="text-xl sm:text-2xl font-serif text-amber-900">7th November 2025</p>
                <p className="text-xs sm:text-sm text-amber-700">Friday, 9:35 AM</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="text-xs sm:text-sm text-amber-700 font-serif animate-bounce">Tap to open invitation</p>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 animate-bounce" />
            </div>

            <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-4 sm:mt-6" />
          </div>

          {/* BACK INTERIOR - Open View */}
          <div
            className={`w-full bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 min-h-96 sm:min-h-[500px] md:min-h-[600px] flex flex-col ${
              isOpen ? "block" : "hidden"
            } overflow-y-auto`}
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* PAGE 0: Couple Welcome */}
            {currentPage === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 sm:space-y-6 animate-fade-in">
                <div className="space-y-4 sm:space-y-6 w-full max-w-md text-center">
                  <div>
                    <p className="text-xs sm:text-sm text-amber-700 tracking-widest mb-2 font-serif uppercase">
                      Celebrate with us
                    </p>
                    <h2 className="text-2xl sm:text-4xl font-serif text-amber-900 mb-1">Bhavani & Sharath</h2>
                    <p className="text-xs sm:text-sm text-amber-600">A journey of love begins</p>
                  </div>

                  <div className="relative w-56 h-64 sm:w-64 sm:h-72 mx-auto rounded-xl overflow-hidden border-4 border-amber-200 shadow-xl bg-amber-50">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TiWIs2TiuuBMpAWHspNEtgVNhnjypc.png"
                      alt="Bhavani and Sharath Chandra - Couple Photo"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "center 45%" }}
                      priority
                      sizes="(max-width: 640px) 224px, 256px"
                    />
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-lg px-4 sm:px-6 py-3 sm:py-4 border border-amber-100">
                    <p className="text-xs sm:text-sm text-amber-600 mb-1">Auspicious Ceremony</p>
                    <p className="text-lg sm:text-xl font-serif text-amber-900">Friday, 7th November 2025</p>
                    <p className="text-xs sm:text-sm text-amber-700 mt-1">9:35 AM Onwards</p>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 1: Wedding Details */}
            {currentPage === 1 && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 sm:space-y-6 animate-fade-in">
                <div className="w-full max-w-md space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-serif text-amber-900">Invitation Details</h2>
                  </div>

                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                    {/* Bride */}
                    <div className="bg-amber-50 rounded-lg p-4 sm:p-5 border-l-4 border-amber-600 animate-slide-up">
                      <p className="text-xs text-amber-600 font-serif tracking-wide uppercase mb-1">Bride</p>
                      <p className="font-serif text-amber-900 text-lg sm:text-xl">Chi.La.Sow. Bhavani</p>
                      <p className="text-xs text-amber-700 mt-1">Daughter of smt,sri Gaddam Shoba Rani - Krishna Murthy</p>
                    </div>

                    {/* Groom */}
                    <div
                      className="bg-rose-50 rounded-lg p-4 sm:p-5 border-l-4 border-rose-600 animate-slide-up"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <p className="text-xs text-rose-600 font-serif tracking-wide uppercase mb-1">Groom</p>
                      <p className="font-serif text-rose-900 text-lg sm:text-xl">Chi. Sharath Chandra</p>
                      <p className="text-xs text-rose-700 mt-1">Son of Smt, Sri Ande Sunitha - Satyanarayana</p>
                    </div>

                    {/* Wedding Ceremony */}
                    <div
                      className="bg-amber-50 rounded-lg p-4 sm:p-5 border-l-4 border-amber-600 animate-slide-up"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <p className="text-xs text-amber-600 font-serif tracking-wide uppercase mb-1">Wedding Ceremony</p>
                      <p className="font-serif text-amber-900 text-lg">Friday, 7th November 2025</p>
                      <p className="text-xs text-amber-700 mt-1">9:35 AM Onwards</p>
                    </div>
                  </div>

                  <div className="text-center text-xs sm:text-sm text-amber-600 p-3 sm:p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="font-serif italic">May the divine bless this sacred union</p>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 2: Venue & Location */}
            {currentPage === 2 && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 sm:space-y-6 animate-fade-in">
                <div className="w-full max-w-md space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-serif text-amber-900">Events & Venue</h2>
                  </div>

                  <div className="space-y-4 sm:space-y-5">
                    {/* Wedding Ceremony */}
                    <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-lg p-4 sm:p-6 border-2 border-amber-200 animate-slide-up">
                      <p className="text-xs text-amber-600 mb-2 tracking-wide font-serif uppercase">Wedding Ceremony</p>
                      <h3 className="font-serif text-amber-900 text-lg sm:text-xl mb-2">Friday, 7th November 2025</h3>
                      <p className="text-xs sm:text-sm text-amber-700 mb-3">9:35 AM Onwards</p>
                      <h3 className="font-serif text-amber-900 text-lg sm:text-xl mb-2">
                        Sri Durga Gardens (Function Hall)
                      </h3>
                      <div className="text-xs sm:text-sm text-amber-700 space-y-1 mb-4">
                        <p>S.R.R. Thota, Kareemabad</p>
                        <p>Warangal, Telangana</p>
                      </div>
                      <a
                        href="https://maps.google.com/?q=Sri+Durga+Gardens+Warangal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-amber-600 text-white text-xs sm:text-sm rounded-lg hover:bg-amber-700 transition-all inline-block text-center font-medium"
                      >
                        View on Google Maps
                      </a>
                    </div>

                    <div
                      className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-4 sm:p-6 border-2 border-rose-200 animate-slide-up"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <p className="text-xs text-rose-600 mb-2 tracking-wide font-serif uppercase">Reception</p>
                      <h3 className="font-serif text-rose-900 text-lg sm:text-xl mb-2">Sunday, 9th November 2025</h3>
                      <p className="text-xs sm:text-sm text-rose-700 mb-3">12:30 PM Onwards</p>
                      <h3 className="font-serif text-rose-900 text-lg sm:text-xl mb-2">
                        Girijana Bhavan
                      </h3>
                      <div className="text-xs sm:text-sm text-rose-700 space-y-1">
                        <p>Vasavi Nagar, Ashok Nagar</p>
                        <p>Near Durgaamma Temple, Manugur</p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div
                      className="text-center text-xs sm:text-sm text-amber-700 p-3 sm:p-4 bg-white rounded-lg border border-amber-200 animate-slide-up"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <p className="font-serif mb-1">For any queries:</p>
                      <p className="font-medium">+91 97033 74245</p>
                      <p className="font-medium">+91 96524 60440</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 3: Gallery with 4 Real Photos */}
            {currentPage === 3 && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 sm:space-y-6 animate-fade-in">
                <div className="w-full max-w-md space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-serif text-amber-900">Our Wedding Invitation</h2>
                    <p className="text-xs sm:text-sm text-amber-600 mt-1">A blend of tradition and elegance</p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {/* Card 1 */}
                      <div
                        className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md border-2 border-amber-100 cursor-pointer hover:shadow-lg transition-shadow group"
                        onClick={() => setShowVideoModal(true)}
                      >
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20251031_080159-r1DQO55sDbg6V2F5vVZhZUm6YZtC9M.jpg"
                          alt="Traditional Telugu Wedding Invitation"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 150px, 180px"
                        />
                      </div>

                      {/* Card 2 */}
                      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md border-2 border-amber-100 cursor-pointer hover:shadow-lg transition-shadow group">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20251031_080347-jxlX779wB4uM55ACoNlEWyQI64h86J.jpg"
                          alt="Ganesha Wedding Design"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 150px, 180px"
                        />
                      </div>

                      {/* Card 3 */}
                      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md border-2 border-amber-100 cursor-pointer hover:shadow-lg transition-shadow group">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20251031_080549-a020f62Ia6y6pXqzNsTqelSYTfZawb.jpg"
                          alt="English Wedding Invitation"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 150px, 180px"
                        />
                      </div>

                      {/* Card 4 */}
                      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md border-2 border-amber-100 cursor-pointer hover:shadow-lg transition-shadow group">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20251031_080615-Mxhrm0FjjrugvkmRMVUTDaMjmYCFff.jpg"
                          alt="Wedding Invitation Details"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 150px, 180px"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="text-center text-xs sm:text-sm text-amber-600 p-3 sm:p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="font-serif">A heartfelt invitation designed with love and tradition</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

           {/* PAGE 4: Video - Wedding Invitation Details */}
           {currentPage === 4 && (
             <div className="flex-1 flex flex-col items-center justify-center space-y-4 sm:space-y-6 animate-fade-in">
               <div className="w-full max-w-md space-y-4 sm:space-y-6">
                 <div className="text-center">
                   <h2 className="text-2xl sm:text-3xl font-serif text-amber-900">Wedding Invitation Video</h2>
                   <p className="text-xs sm:text-sm text-amber-600 mt-1">A Glimpse of Our Special Day</p>
                 </div>
           
                 <div
                   className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border-2 border-amber-100 bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center cursor-pointer group hover:shadow-xl transition-shadow"
                   onClick={() => setShowVideoModal(true)}
                 >
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all flex items-center justify-center">
                     <div className="bg-white rounded-full p-4 sm:p-5 group-hover:scale-110 transition-transform">
                       <Play className="w-6 sm:w-8 h-6 sm:h-8 text-amber-600 fill-amber-600" />
                     </div>
                   </div>
                   <Image
                     src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TiWIs2TiuuBMpAWHspNEtgVNhnjypc.png"
                     alt="Wedding Invitation Video Thumbnail"
                     fill
                     className="object-cover group-hover:scale-105 transition-transform duration-300"
                     sizes="100vw"
                   />
                 </div>
           
                 {/* Video Info */}
                 <div className="space-y-3 sm:space-y-4">
                   <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-lg p-4 sm:p-6 border border-amber-100">
                     <p className="text-xs sm:text-sm text-amber-600 mb-2">Our Digital Invitation</p>
                     <p className="font-serif text-amber-900 text-lg sm:text-xl mb-2">
                       Bhavani & Sharath’s Wedding Details
                     </p>
                     <p className="text-xs sm:text-sm text-amber-700">
                       Watch our official wedding invitation — a heartfelt video capturing the
                       traditions, love, and joy of our upcoming celebration.
                     </p>
                   </div>          
                  <div className="flex justify-center">
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-amber-600 text-white text-sm sm:text-base rounded-full shadow-md hover:bg-amber-700 transition duration-300 font-serif flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" /> Watch Our Wedding Invitation Video
                    </button>
                  </div>
                 </div>
               </div>
             </div>
           )}
           
           {/* Video Modal */}
           {showVideoModal && (
             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 animate-fade-in">
               <div className="relative w-full max-w-2xl bg-black rounded-lg overflow-hidden shadow-2xl">
                 <button
                   onClick={() => setShowVideoModal(false)}
                   className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 bg-white rounded-full hover:bg-gray-200 transition-all hover:scale-110 active:scale-95"
                 >
                   <X className="w-5 h-5 sm:w-6 sm:h-6" />
                 </button>

                 <div className="aspect-video flex items-center justify-center relative overflow-hidden">
                    <video
                      src="https://cdmy6n7gqcrwetmq.public.blob.vercel-storage.com/wedding-invitation-video.mp4"
                      controls
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full rounded-2xl shadow-lg"
                      controlsList="nodownload"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
               </div>
             </div>
          )}
         </div>
       </div>
     </div>
   </>
  )
}
