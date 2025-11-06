import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Star } from "lucide-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function renderStars(rating: number) {
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <Star key={i} size={14} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
  ))

  return <div className="flex gap-1">{stars}</div>
}
