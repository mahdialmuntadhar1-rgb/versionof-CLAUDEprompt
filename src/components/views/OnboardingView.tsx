import React, { useState } from 'react'

const cities = ['Baghdad', 'Erbil', 'Sulaymaniyah', 'Basra', 'Najaf', 'Karbala', 'Mosul']
const interests = ['Restaurants', 'Cafés', 'Shisha', 'Shopping', 'Hotels', 'Cultural', 'Events', 'Deals']

export const OnboardingView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0)
  const [city, setCity] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const toggleInterest = (i: string) =>
    setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-6 text-white">
      <div className="flex gap-2 mb-10">
        {[0,1,2].map(i => (
          <div key={i} className={h-1.5 w-8 rounded-full transition-all } />
        ))}
      </div>

      {step === 0 && (
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">What's your city?</h2>
          <p className="text-white/50 mb-6 text-sm">We'll show you the best places nearby</p>
          <div className="grid grid-cols-2 gap-3">
            {cities.map(c => (
              <button key={c} onClick={() => setCity(c)}
                className={py-3 rounded-xl border text-sm font-medium transition-all }>
                {c}
              </button>
            ))}
          </div>
          <button disabled={!city} onClick={() => setStep(1)}
            className="mt-8 w-full py-3 rounded-full bg-yellow-500 text-black font-bold disabled:opacity-30 transition-all">
            Continue
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">What are you into?</h2>
          <p className="text-white/50 mb-6 text-sm">Pick your interests</p>
          <div className="flex flex-wrap gap-2">
            {interests.map(i => (
              <button key={i} onClick={() => toggleInterest(i)}
                className={px-4 py-2 rounded-full border text-sm font-medium transition-all }>
                {i}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)}
            className="mt-8 w-full py-3 rounded-full bg-yellow-500 text-black font-bold transition-all">
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <div className="text-6xl mb-6">🇮🇶</div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-3">You're all set!</h2>
          <p className="text-white/60 mb-10">Let's explore {city}</p>
          <button onClick={onComplete}
            className="px-10 py-3 rounded-full bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 transition-all">
            Explore Iraq
          </button>
        </div>
      )}
    </div>
  )
}
