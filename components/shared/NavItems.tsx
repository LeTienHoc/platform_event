'use client'
import { headerLinks } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavItems = () => {

  const pathName = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start
    gap-5 md:flex-row">
      {headerLinks.map(item=>{
        const isActive = pathName === item.route
        return (
          <li
          key={item.route}
          className={`${
          isActive && 'text-indigo-400'}
          flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={item.route}>{item.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems