"use client"

import {  DollarSign, Gift, AlarmClockCheck, Truck } from "lucide-react"
import { ServiceInfoBox } from "./service-info-box"

export function ServiceInfoSection() {
  const services = [
    {
      icon:<Truck size={48} strokeWidth={1.5} />,
      title: "FREE DELIVERY",
      description: "Free shipping on all order",
    },
    {
      icon:<AlarmClockCheck size={48} strokeWidth={1.5} />,
      title: "ONLINE SUPPORT 24/7",
      description: "Support online 24 hours",
    },
    {
      icon: <DollarSign size={48} strokeWidth={1.5} />,
      title: "MONEY RETURN",
      description: "Back guarantee under 7 days",
    },
    {
      icon: <Gift size={48} strokeWidth={1.5} />,
      title: "MEMBER DISCOUNT",
      description: "Onevery order over $30.00",
    },
  ]

  return (
    <section className="bg-white py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <ServiceInfoBox key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
