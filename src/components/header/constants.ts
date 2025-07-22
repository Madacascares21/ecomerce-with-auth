import { ReactNode } from "react"

export const navConfig: NavItem[] = [{ label: "Femei", link: "/femei" },
    { label: "Barbati", link: "/barbati" },
    { label: "Dropdown", link: "/drop" ,children:[{label:"Cusaturi manuale" ,link:"/s"},{label:"Artizanale" ,link:"/s"},{label:"Basini" ,link:"/s"}]},
]

export type NavItem = {
    label: string
    link: string
    icon?: ReactNode
    children?: NavItem[]
}