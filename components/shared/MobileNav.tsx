
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import MenuIcon from '../../public/assets/icons/menu.svg'
import LogoIcon from '../../public/assets/images/logo.svg'
import { Separator } from "../ui/separator"
import NavItem from "./NavItems"


const MobileNav = () => {
    return (
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger className="align-middle">
                    <Image 
                    src={MenuIcon}
                    alt="menu"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
                    <Image 
                    src={LogoIcon}
                    width={128}
                    height={38}
                    alt="logo"/>
                    <Separator className="border border-gray-50"/>
                    <NavItem />
                </SheetContent>
            </Sheet>
        </nav>
    )
}

export default MobileNav