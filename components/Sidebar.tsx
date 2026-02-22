"use client"

import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


const Sidebar = ({user}: SiderbarProps) => {

  const pathname = usePathname();

  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href="/" className="mb-12 flex cursor-pointer items-center gap-2">
            <Image src="/icons/logo.svg" width={34} height={34} alt="BCRA logo" className="max-xl:size-14 size-[24px]" />
<<<<<<< HEAD
            <h1 className="sidebar-logo">BRCA</h1>
=======
            <h1 className="sidebar-logo">BCRA</h1>
>>>>>>> 682ae20 (Tailwind version corrected, Added responsive and MobileNav, Chart and Animations.)
            </Link>

            {sidebarLinks.map((item) => {

                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                return(
                    <Link className={cn('sidebar-link', {'bg-bank-gradient': isActive})} href={item.route} key={item.label}>
                        <div className="relative size-6">
                            <Image 
                            src={item.imgURL} 
                            alt={item.label} 
                            fill 
                            className={cn({'brightness-[3] invert-0': isActive})}
                            />
                        </div>
                        <p className={cn('sidebar-label', {'!text-white' : isActive })}>
                            {item.label}
                        </p>
                    </Link>
                )
            })}

            USER

        </nav>

        FOOTER
    </section>
  )
}

export default Sidebar