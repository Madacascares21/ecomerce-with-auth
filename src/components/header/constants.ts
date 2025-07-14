import { ReactNode } from "react"

export const navConfig: NavItem[] = [{ label: "sex", link: "/sex" }]

export type NavItem = {
    label: string
    link: string
    icon?: ReactNode
    children?: NavItem[]
}