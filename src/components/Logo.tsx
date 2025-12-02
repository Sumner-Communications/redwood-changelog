import Image from 'next/image'

import logoDarkBg from '@/images/logo_dark_bg.svg'
import logoLightBg from '@/images/logo_light_bg.svg'

interface LogoProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: 'dark' | 'light'
}

export function Logo({ variant = 'dark', className, ...props }: LogoProps) {
  const logoSrc = variant === 'dark' ? logoDarkBg : logoLightBg

  return (
    <div className={className} {...props}>
      <Image
        src={logoSrc}
        alt="Wholesale Central"
        width={180}
        height={27}
        priority
      />
    </div>
  )
}
