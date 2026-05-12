import React from 'react'
import Button from './Button'
import Input from './Input'
import SectionTitle from './Sectiontitle'

const CardExample = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="container-primary">
        {/* Hero Section Example */}
        <section className="mb-16 animate-fade-in">
          <SectionTitle 
            title="Enhanced Tailwind CSS"
            subtitle="Modern styling with custom shadows and animations"
            centered
          />
        </section>

        {/* Button Examples */}
        <section className="mb-16">
          <SectionTitle 
            title="Button Variants"
            subtitle="Different button styles using the new design system"
          />
          
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button disabled>Disabled Button</Button>
          </div>
        </section>

        {/* Card Examples */}
        <section className="mb-16">
          <SectionTitle 
            title="Card Components"
            subtitle="Enhanced cards with custom shadows and animations"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-primary card-hover p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Premium Card
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Using custom card-primary class with enhanced shadows and animations.
              </p>
              <Button variant="primary" size="sm">Learn More</Button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Standard Card
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Using utility classes directly with custom shadow effects.
              </p>
              <Button variant="secondary" size="sm">View Details</Button>
            </div>
            
            <div className="bg-gradient-to-br from-brand-red/10 to-brand-red-hover/20 dark:from-brand-red/5 dark:to-brand-red-hover/10 rounded-3xl p-6 border border-brand-red/20">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Gradient Card
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Using brand colors for gradient backgrounds.
              </p>
              <Button variant="outline" size="sm">Get Started</Button>
            </div>
          </div>
        </section>

        {/* Form Examples */}
        <section className="mb-16">
          <SectionTitle 
            title="Form Elements"
            subtitle="Enhanced inputs with custom styling"
          />
          
          <div className="max-w-md space-y-4">
            <Input 
              label="Email Address"
              type="email"
              placeholder="Enter your email"
            />
            <Input 
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <Input 
              label="Search"
              type="search"
              placeholder="Search listings..."
            />
            <Input 
              label="Error Input"
              type="text"
              placeholder="This field has an error"
              error="This field is required"
            />
          </div>
        </section>

        {/* Typography Examples */}
        <section className="mb-16">
          <SectionTitle 
            title="Typography"
            subtitle="Custom typography utilities"
          />
          
          <div className="space-y-6">
            <div>
              <h1 className="hero-title mb-4">Hero Title Example</h1>
              <p className="hero-subtitle">
                This is how the hero subtitle looks with the enhanced typography system.
              </p>
            </div>
            
            <div>
              <h2 className="section-title mb-3">Section Title</h2>
              <p className="section-subtitle">
                Section subtitle with proper spacing and color hierarchy.
              </p>
            </div>
          </div>
        </section>

        {/* Animation Examples */}
        <section className="mb-16">
          <SectionTitle 
            title="Animations"
            subtitle="Custom animations and transitions"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="animate-fade-in bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-card">
              <h3 className="text-lg font-semibold mb-2">Fade In</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Smooth fade-in animation
              </p>
            </div>
            
            <div className="animate-slide-up bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-card">
              <h3 className="text-lg font-semibold mb-2">Slide Up</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Slide up from bottom
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-card hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg font-semibold mb-2">Scale on Hover</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Scale effect on hover
              </p>
            </div>
          </div>
        </section>

        {/* Dark Mode Toggle Example */}
        <section className="mb-16">
          <SectionTitle 
            title="Dark Mode Support"
            subtitle="Seamless dark/light theme switching"
          />
          
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This card adapts to the current theme. Try toggling dark mode to see the smooth transition!
            </p>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-brand-red rounded-full"></div>
              <div className="w-8 h-8 bg-brand-red-hover rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CardExample
