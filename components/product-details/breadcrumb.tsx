"use client"

import Link from "next/link"

interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-gray-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="text-gray-600 hover:text-gray-900">
                {item.label}
              </Link>
            ) : (
              <span className="text-yellow-500 font-medium">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="text-gray-400">/</span>}
          </div>
        ))}
      </div>
    </nav>
  )
}
