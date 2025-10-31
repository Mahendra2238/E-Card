"use client"

import { useState } from "react"
import { Copy, X } from "lucide-react"

interface ShareModalProps {
  url: string
  onClose: () => void
}

export default function ShareModal({ url, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socialShares = [
    {
      name: "WhatsApp",
      icon: "💬",
      href: `https://wa.me/?text=${encodeURIComponent("Check out our wedding invitation! " + url)}`,
    },
    {
      name: "Email",
      icon: "✉️",
      href: `mailto:?subject=You're Invited!&body=${encodeURIComponent(
        "You are cordially invited to our wedding. Click here: " + url,
      )}`,
    },
    {
      name: "Facebook",
      icon: "👍",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      icon: "𝕏",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        "You are invited to our wedding celebration! " + url,
      )}`,
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-serif text-amber-900">Share Invitation</h3>
          <button onClick={onClose} className="p-2 hover:bg-amber-50 rounded-full transition-colors">
            <X className="w-5 h-5 text-amber-700" />
          </button>
        </div>

        {/* Copy Link Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-amber-900 mb-2">Share Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 px-3 py-2 border border-amber-200 rounded-lg bg-amber-50 text-sm text-amber-700 truncate"
            />
            <button
              onClick={copyToClipboard}
              className="px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-amber-900 mb-3">Share on Social</label>
          <div className="grid grid-cols-2 gap-2">
            {socialShares.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 rounded-lg hover:border-amber-400 transition-all hover:shadow-md flex items-center justify-center gap-2 text-sm font-medium text-amber-900"
              >
                <span className="text-lg">{social.icon}</span>
                <span className="hidden sm:inline">{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
        >
          Done
        </button>
      </div>
    </div>
  )
}
