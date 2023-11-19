import React from 'react'
import Slider from './Slider'
import Counter from './Counter'
import Features from './Features'
import Testimonials from './Testimonials'

export default function Home() {
  return (
    <div>
        <Slider/>
        <Counter />
        <Features />
        <Testimonials/>
    </div>
  )
}
