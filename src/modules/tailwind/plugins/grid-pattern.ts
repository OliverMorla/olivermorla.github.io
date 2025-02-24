import plugin from 'tailwindcss/plugin'

interface GridPatternOptions {
  sizes?: Record<string, string>;
  lineWeight?: string;
  maskGradient?: {
    start: string;
    middle: string;
    end: string;
  };
}

export default function gridPattern(options: GridPatternOptions = {}) {
  const {
    sizes = {
      sm: '2rem',
      md: '4rem',
      lg: '6rem',
      xl: '8rem',
    },
    lineWeight = '1px',
    maskGradient = {
      start: '0',
      middle: '1',
      end: '0',
    },
  } = options;

  return plugin(function({ addBase, addUtilities, theme }) {
    // Add configurable base properties
    addBase({
      ':root': {
        '--grid-size': sizes.md,
        '--grid-line-weight': lineWeight,
        '--grid-mask-opacity-start': maskGradient.start,
        '--grid-mask-opacity-middle': maskGradient.middle,
        '--grid-mask-opacity-end': maskGradient.end,
      }
    })

    // Add base grid pattern
    addBase({
      '.bg-grid-pattern': {
        backgroundImage: `
          linear-gradient(to bottom, var(--grid-color) var(--grid-line-weight), transparent var(--grid-line-weight)),
          linear-gradient(to right, var(--grid-color) var(--grid-line-weight), transparent var(--grid-line-weight))
        `,
        backgroundSize: 'var(--grid-size) var(--grid-size)',
        backgroundPosition: '-1px -1px',
        maskImage: `linear-gradient(
          to bottom,
          rgba(0,0,0,var(--grid-mask-opacity-start)),
          rgba(0,0,0,var(--grid-mask-opacity-middle)),
          rgba(0,0,0,var(--grid-mask-opacity-end))
        )`
      }
    })

    // Define color scales to support
    const colorScales = ['neutral', 'gray', 'slate', 'zinc']

    // Generate utilities for all supported color scales
    const utilities = colorScales.reduce((acc, scaleName) => {
      const colors = theme(`colors.${scaleName}`)
      if (!colors) return acc

      return {
        ...acc,
        ...Object.entries(colors).reduce((scaleAcc, [shade, color]) => ({
          ...scaleAcc,
          [`.bg-grid-pattern-${scaleName}-${shade}`]: {
            '--grid-color': color
          }
        }), {})
      }
    }, {})

    // Add size variants
    const sizeUtilities = Object.entries(sizes).reduce((acc, [size, value]) => ({
      ...acc,
      [`.bg-grid-pattern-${size}`]: {
        '--grid-size': value
      }
    }), {})

    // Add all utilities with variants
    addUtilities(
      { ...utilities, ...sizeUtilities },
      {
        variants: ['dark', 'responsive']
      }
    )
  })
}