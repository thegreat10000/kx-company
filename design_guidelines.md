# KX Location - Premium Car Rental & Detailing Platform Design Guidelines

## Design Approach
**Reference-Based Luxury Strategy** drawing from:
- **Primary**: Rolls-Royce, Porsche configurators (premium automotive)
- **Secondary**: Four Seasons, The Ritz (luxury hospitality)
- **Tertiary**: Tesla rental platforms (modern premium car services)

Key principle: Sophisticated restraint - letting premium imagery breathe while maintaining refined typography hierarchy.

## Typography System

### Headline Fonts (Display)
**Primary Recommendation**: Playfair Display (Google Fonts)
- Elegant serif with contemporary proportions
- Use for H1/hero headlines, section titles
- Weights: Regular (400), SemiBold (600), Bold (700)

**Alternative**: Cormorant Garamond
- More classical luxury feel if ultra-premium positioning

### Body & Long-Form Text
**For Extended Introductory Content**: 
- **Font**: Inter or Source Sans 3 (Google Fonts)
- **Size**: 18-20px (desktop), 16-18px (mobile)
- **Line Height**: 1.7-1.8 (generous breathing room)
- **Weight**: Regular (400) for body, Medium (500) for emphasis
- **Max Width**: 65-75 characters (720px max-width)
- **Letter Spacing**: 0.01em (subtle openness)

**Rationale**: Pairing serif display with clean sans-serif body creates sophisticated contrast while maintaining exceptional readability for longer content.

### Typography Hierarchy
- H1: Playfair Display, 56-72px, Bold
- H2: Playfair Display, 40-48px, SemiBold  
- H3: Playfair Display, 28-32px, SemiBold
- Body: Inter, 18-20px, Regular
- Small/Meta: Inter, 14-16px, Medium

## Layout System
**Spacing Units**: Tailwind 4, 6, 8, 12, 16, 24 (premium breathing room)
- Section padding: py-24 md:py-32
- Component spacing: gap-12 to gap-16
- Card padding: p-8 to p-12

**Grid Strategy**: 
- 12-column base with generous gutters (gap-8)
- Asymmetric hero layouts (60/40 splits)
- Maximum container: max-w-7xl with px-6

## Core Components

### Hero Section
**Layout**: Full-viewport (min-h-screen) with 60% image, 40% content asymmetric split
**Image**: High-resolution luxury vehicle in elegant setting, professional photography with dramatic lighting
**Content positioning**: Offset to left or right third with generous padding

### Service Showcase
**Rental Section**: 
- Large card grid (2-3 columns desktop, 1 mobile)
- Each card: Featured vehicle image (16:10 ratio), model name, brief specs, subtle "View Details" link
- Hover: Gentle scale transform (1.02) with shadow elevation

**Detailing Section**:
- Before/after image sliders
- Service tier cards with luxury iconography
- Process timeline with elegant connecting lines

### Trust Elements
- Client testimonials with high-quality client photos (circular crops)
- Premium vehicle fleet showcase in masonry/carousel
- Service location imagery (showroom, detailing bay)

### Contact/CTA Sections
**Booking Form**: 
- Minimal fields with elegant spacing (gap-6)
- Date/time pickers with premium styling
- Blurred-background buttons when overlaying images
- Form width: max-w-2xl centered

### Footer
Rich footer with:
- Brand statement and social proof
- Service categories navigation
- Contact methods with icons
- Location/hours information
- Newsletter signup (inline, minimal)
- Trust badges (luxury affiliations)

## Images

**Hero Image**: 
Yes - Large, full-bleed hero image required. Luxury vehicle (Porsche, BMW, Mercedes) in dramatic lighting, preferably in motion or elegant static pose. Professional automotive photography quality.

**Section Images**:
- Fleet Showcase: 8-12 high-resolution vehicle images (exterior beauty shots)
- Detailing Gallery: 6-8 before/after transformations, close-up detail work
- Facility Images: 2-3 showroom/workspace shots showing premium environment
- About/Team: Professional staff portraits if applicable

**Image Treatment**: 
- Subtle vignettes on hero imagery
- Consistent aspect ratios (16:9 for vehicles, 1:1 for testimonials)
- High-quality compression maintaining luxury aesthetic

**Button Overlays**: When CTAs appear on images, implement backdrop-blur-md with bg-white/10 or bg-black/20 for glass-morphism effect

## Animations
Minimal, refined interactions only:
- Smooth scroll behavior
- Gentle hover states (scale, shadow elevation)
- Fade-in content on scroll (intersection observer)
- No flashy transitions - luxury = subtlety