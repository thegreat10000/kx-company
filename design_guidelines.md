# KX Location - Premium Car Rental Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from luxury automotive sites (Porsche, BMW configurators), high-end e-commerce (Net-a-Porter), and premium hospitality (Four Seasons). Focus on spaciousness, refined typography, and sophisticated vehicle presentation.

## Typography System
**Primary Font**: "Cormorant Garamond" (serif) - headlines, prices, elegant accents
**Secondary Font**: "Inter" (sans-serif) - body text, labels, UI elements

Hierarchy:
- Hero Headline: text-6xl, Cormorant, font-light
- Section Titles: text-4xl, Cormorant, font-normal
- Vehicle Names: text-2xl, Cormorant, font-medium
- Prices: text-3xl, Cormorant, font-semibold
- Body: text-base, Inter, font-normal
- Labels/Meta: text-sm, Inter, uppercase tracking-wider

## Spacing System
Consistent use of: **4, 6, 8, 12, 16, 20, 24** units
- Section padding: py-20 to py-32
- Card padding: p-8
- Element gaps: gap-8 to gap-12

## Layout Structure

### Hero Section (Full viewport, ~90vh)
Large hero image of luxury vehicle in premium setting (modern architectural background, golden hour lighting)
Centered overlay with blurred background button
Minimal text: "Louez l'excellence" + primary CTA with backdrop-blur-md

### Search/Filter Bar
Sticky below hero, backdrop-blur-lg with subtle shadow
Horizontal layout: Location | Dates | Vehicle Type | Search CTA
Refined inputs with minimal borders

### Vehicle Grid
3-column desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
max-w-7xl container with generous gap-8

### Additional Sections
- Premium Services (2-column feature grid)
- Customer Testimonials (single elegant carousel)
- Locations Map (full-width with overlay cards)
- Trust Badges (centered, minimal)

## Core Components

### Vehicle Card (Critical Component)
**Structure**:
- Image: aspect-ratio-[4/3], object-cover with subtle shadow
- Content padding: p-8
- Vehicle name at top
- Specifications row: transmission | seats | luggage (small icons + text)
- Price section (bottom): "À partir de" + price + "/jour" on single line, right-aligned
- CTA: Full-width elegant button "Réserver maintenant"

**Card Treatment**: Minimal border, large border-radius (rounded-2xl), hover shadow elevation

### Navigation
Minimal top bar with logo left, menu center, language/login right
Transparent over hero, solid on scroll

### Footer
4-column grid: Company | Locations | Vehicle Fleet | Legal
Newsletter signup prominent, social icons subtle

## Images Required

1. **Hero Image**: Luxury sports car (Porsche/Mercedes level) in sophisticated environment - architectural, minimal, golden hour lighting. Full-width, 90vh height.

2. **Vehicle Cards** (8-12 cards): High-quality automotive photography on neutral backgrounds - white/light gray studio shots showing vehicle at 3/4 angle. Professional dealership-quality images.

3. **Services Section**: 2-3 lifestyle images showing concierge service, delivery, premium interior details. Supporting imagery, not hero-scale.

4. **Location Images**: Modern city/airport environments for location cards (if applicable).

## Design Principles
- **Spacious**: Never cramped - generous whitespace = luxury
- **Restrained Animation**: Subtle hover elevations only, no distracting motion
- **Monochromatic Foundation**: Rely on photography for color, UI stays neutral and refined
- **Tactile Hierarchy**: Clear visual weight through size, not color gimmicks
- **Trust Through Polish**: Every detail perfect - shadows, radii, alignment

## Key Interactions
- Card hover: Gentle shadow lift (transition-all duration-300)
- Button states: Subtle opacity changes, no harsh effects
- Image loading: Elegant skeleton states matching card structure