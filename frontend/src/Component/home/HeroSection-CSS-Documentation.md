# HeroSection CSS Classes Documentation
## Line-by-Line CSS Classes Used in JSX

## Line 45: Main Section Container
```jsx
<section className={`w-full overflow-hidden ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
```
- **w-full**: Takes full width of viewport
- **overflow-hidden**: Prevents content overflow
- **bg-gray-900**: Dark mode background (when isDarkMode is true)
- **bg-white**: Light mode background (when isDarkMode is false)

## Line 46: Main Container
```jsx
<div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-18">
```
- **max-w-7xl**: Maximum width of 1280px (7xl = 80rem)
- **mx-auto**: Centers container horizontally
- **px-6**: Horizontal padding of 24px on mobile
- **lg:px-8**: Horizontal padding of 32px on desktop (1024px+)
- **py-14**: Vertical padding of 56px on mobile
- **lg:py-18**: Vertical padding of 72px on desktop (1024px+)

## Line 47: Flex Container
```jsx
<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
```
- **flex**: Enables flexbox layout
- **flex-col**: Stacks items vertically on mobile
- **lg:flex-row**: Arranges items horizontally on desktop (1024px+)
- **items-center**: Vertically centers flex items
- **gap-12**: Gap of 48px between items on mobile
- **lg:gap-20**: Gap of 80px between items on desktop (1024px+)

## Line 49: Left Content Container
```jsx
<div className="flex-1 flex flex-col gap-4 lg:gap-6">
```
- **flex-1**: Takes up available flex space
- **flex**: Enables flexbox layout
- **flex-col**: Stacks items vertically
- **gap-4**: Gap of 16px between items on mobile
- **lg:gap-6**: Gap of 24px between items on desktop (1024px+)

## Line 51: Tag Line Container
```jsx
<div className="flex items-center gap-2">
```
- **flex**: Enables flexbox layout
- **items-center**: Vertically centers items
- **gap-2**: Gap of 8px between items

## Line 52: Animated Dot
```jsx
<span className="w-2 h-2 rounded-full bg-[#FF385C] animate-pulse">
```
- **w-2**: Width of 8px
- **h-2**: Height of 8px
- **rounded-full**: Fully rounded (circle)
- **bg-[#FF385C]**: Background color #FF385C (brand red)
- **animate-pulse**: Pulsing animation

## Line 53: Tag Line Text
```jsx
<p className={`text-xs font-bold tracking-[2px] uppercase ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
```
- **text-xs**: Font size of 12px
- **font-bold**: Bold font weight (700)
- **tracking-[2px]**: Letter spacing of 2px
- **uppercase**: Uppercase text transformation
- **text-gray-400**: Dark mode text color
- **text-gray-500**: Light mode text color

## Line 58: Main Headline
```jsx
<h1 className={`text-2xl md:text-3xl lg:text-4xl font-[800] leading-[1.1] tracking-[-2px] ${isDarkMode ? "text-white" : "text-gray-900"}`}>
```
- **text-2xl**: Font size of 24px on mobile
- **md:text-3xl**: Font size of 30px on tablets (768px+)
- **lg:text-4xl**: Font size of 36px on desktop (1024px+)
- **font-[800]**: Extra bold font weight
- **leading-[1.1]**: Line height of 1.1
- **tracking-[-2px]**: Negative letter spacing of 2px
- **text-white**: Dark mode text color
- **text-gray-900**: Light mode text color

## Line 61: Highlighted "home" Text
```jsx
<span className="text-[#FF385C]">home</span>
```
- **text-[#FF385C]**: Text color #FF385C (brand red)

## Line 64: Sub-text
```jsx
<p className={`text-base leading-relaxed max-w-md ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
```
- **text-base**: Font size of 16px
- **leading-relaxed**: Line height of 1.625
- **max-w-md**: Maximum width of 28rem (448px)
- **text-gray-300**: Dark mode text color
- **text-gray-500**: Light mode text color

## Line 69: Button Container
```jsx
<div className="flex flex-wrap items-center gap-4">
```
- **flex**: Enables flexbox layout
- **flex-wrap**: Allows items to wrap to next line
- **items-center**: Vertically centers items
- **gap-4**: Gap of 16px between items

## Line 70: Primary Button
```jsx
<button className="flex items-center gap-2 h-12 px-6 rounded-full bg-[#FF385C] hover:bg-[#E31C5F] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
```
- **flex**: Enables flexbox layout
- **items-center**: Vertically centers items
- **gap-2**: Gap of 8px between items
- **h-12**: Height of 48px
- **px-6**: Horizontal padding of 24px
- **rounded-full**: Fully rounded corners (pill shape)
- **bg-[#FF385C]**: Background color #FF385C (brand red)
- **hover:bg-[#E31C5F]**: Hover background color #E31C5F
- **text-white**: White text color
- **font-semibold**: Semi-bold font weight (600)
- **shadow-md**: Medium box shadow
- **hover:shadow-lg**: Large box shadow on hover
- **transition-all**: Transition all properties
- **duration-300**: Transition duration of 300ms

## Line 78: Secondary Button
```jsx
<button className={`flex items-center justify-center h-12 px-6 rounded-full border font-semibold transition-all duration-300 ${isDarkMode ? "border-gray-600 bg-gray-800 text-white hover:border-white" : "border-gray-300 bg-white text-gray-900 hover:border-gray-900"}`}>
```
- **flex**: Enables flexbox layout
- **items-center**: Vertically centers items
- **justify-center**: Horizontally centers items
- **h-12**: Height of 48px
- **px-6**: Horizontal padding of 24px
- **rounded-full**: Fully rounded corners (pill shape)
- **border**: Adds border
- **font-semibold**: Semi-bold font weight (600)
- **transition-all**: Transition all properties
- **duration-300**: Transition duration of 300ms
- **border-gray-600**: Dark mode border color
- **bg-gray-800**: Dark mode background color
- **text-white**: Dark mode text color
- **hover:border-white**: Dark mode hover border
- **border-gray-300**: Light mode border color
- **bg-white**: Light mode background color
- **text-gray-900**: Light mode text color
- **hover:border-gray-900**: Light mode hover border

## Line 90: Trust Badges Container
```jsx
<div className="flex flex-wrap items-center gap-8 pt-4">
```
- **flex**: Enables flexbox layout
- **flex-wrap**: Allows items to wrap to next line
- **items-center**: Vertically centers items
- **gap-8**: Gap of 32px between items
- **pt-4**: Top padding of 16px

## Line 92: Individual Badge Container
```jsx
<div key={badge.label} className="flex items-center gap-3">
```
- **flex**: Enables flexbox layout
- **items-center**: Vertically centers items
- **gap-3**: Gap of 12px between items

## Line 93: Icon Container
```jsx
<div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? "bg-gray-800" : "bg-red-50"}`}>
```
- **w-10**: Width of 40px
- **h-10**: Height of 40px
- **rounded-full**: Fully rounded (circle)
- **flex**: Enables flexbox layout
- **items-center**: Vertically centers items
- **justify-center**: Horizontally centers items
- **flex-shrink-0**: Prevents flex item from shrinking
- **bg-gray-800**: Dark mode background color
- **bg-red-50**: Light mode background color

## Line 99: Badge Title
```jsx
<p className={`text-sm font-semibold leading-none ${isDarkMode ? "text-white" : "text-gray-900"}`}>
```
- **text-sm**: Font size of 14px
- **font-semibold**: Semi-bold font weight (600)
- **leading-none**: Line height of 1
- **text-white**: Dark mode text color
- **text-gray-900**: Light mode text color

## Line 102: Badge Subtitle
```jsx
<p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
```
- **text-xs**: Font size of 12px
- **mt-0.5**: Top margin of 2px
- **text-gray-400**: Text color for both modes

## Line 111: Right Content Container
```jsx
<div className="flex-1 w-full relative">
```
- **flex-1**: Takes up available flex space
- **w-full**: Takes full width of container
- **relative**: Establishes positioning context for absolute children

## Line 112: Image Container
```jsx
<div className="relative rounded-3xl overflow-hidden w-full aspect-[3/2] shadow-2xl">
```
- **relative**: Establishes positioning context
- **rounded-3xl**: Very large rounded corners (1.5rem)
- **overflow-hidden**: Hides overflowing content
- **w-full**: Takes full width of container
- **aspect-[3/2]**: Fixed aspect ratio of 3:2
- **shadow-2xl**: Large box shadow

## Line 116: Hero Image
```jsx
<img className="w-full h-full object-cover" />
```
- **w-full**: Takes full width of container
- **h-full**: Takes full height of container
- **object-cover**: Covers container while maintaining aspect ratio

## Line 120: Rating Badge Container
```jsx
<div className={`absolute top-3 right-3 rounded-2xl shadow-lg px-3 py-2 flex flex-col items-center min-w-[90px] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
```
- **absolute**: Absolute positioning relative to parent
- **top-3**: Top position of 12px
- **right-3**: Right position of 12px
- **rounded-2xl**: Large rounded corners (1rem)
- **shadow-lg**: Large box shadow
- **px-3**: Horizontal padding of 12px
- **py-2**: Vertical padding of 8px
- **flex**: Enables flexbox layout
- **flex-col**: Stacks items vertically
- **items-center**: Horizontally centers items
- **min-w-[90px]**: Minimum width of 90px
- **bg-gray-800**: Dark mode background color
- **bg-white**: Light mode background color

## Line 123: Star Rating Container
```jsx
<div className="flex items-center gap-1">
```
- **flex**: Enables flexbox layout
- **items-center**: Vertically centers items
- **gap-1**: Gap of 4px between items

## Line 125: Rating Number
```jsx
<span className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>4.8</span>
```
- **text-sm**: Font size of 14px
- **font-bold**: Bold font weight (700)
- **text-white**: Dark mode text color
- **text-gray-900**: Light mode text color

## Line 127: Review Count
```jsx
<p className={`text-[11px] mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>2,450 reviews</p>
```
- **text-[11px]**: Font size of 11px
- **mt-0.5**: Top margin of 2px
- **text-gray-400**: Text color for both modes

## Line 130: Happy Guests Badge Container
```jsx
<div className={`absolute bottom-3 right-3 rounded-2xl shadow-lg px-3 py-2 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
```
- **absolute**: Absolute positioning relative to parent
- **bottom-3**: Bottom position of 12px
- **right-3**: Right position of 12px
- **rounded-2xl**: Large rounded corners (1rem)
- **shadow-lg**: Large box shadow
- **px-3**: Horizontal padding of 12px
- **py-2**: Vertical padding of 8px
- **bg-gray-800**: Dark mode background color
- **bg-white**: Light mode background color

## Line 133: Guest Count
```jsx
<p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>10K+</p>
```
- **text-sm**: Font size of 14px
- **font-bold**: Bold font weight (700)
- **text-white**: Dark mode text color
- **text-gray-900**: Light mode text color

## Line 134: Happy Guests Text
```jsx
<p className={`text-[11px] ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>Happy Guests</p>
```
- **text-[11px]**: Font size of 11px
- **text-gray-400**: Text color for both modes

## Line 135: Avatar Container
```jsx
<div className="flex items-center mt-1 -space-x-1">
```
- **flex**: Enables flexbox layout
- **items-center**: Vertically centers items
- **mt-1**: Top margin of 4px
- **-space-x-1**: Negative horizontal gap of 4px (overlaps avatars)

## Line 141: Individual Avatar
```jsx
<img className={`w-6 h-6 rounded-full object-cover border-2 ${isDarkMode ? "border-gray-800" : "border-white"}`} />
```
- **w-6**: Width of 24px
- **h-6**: Height of 24px
- **rounded-full**: Fully rounded (circle)
- **object-cover**: Covers container while maintaining aspect ratio
- **border-2**: Border width of 2px
- **border-gray-800**: Dark mode border color
- **border-white**: Light mode border color
