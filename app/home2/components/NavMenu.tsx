import NavLink, { NavLinkItem } from '../components/NavLink'


export interface NavMenuProps {
  layout: string
  spacing: string
  links: NavLinkItem[]
}

const NavMenu = ({ layout, spacing, links }: NavMenuProps) => {


  return (
    <nav className={` ${layout} ${spacing}`}>
      {links.map((link, index) => (
        <NavLink
          key={index}
          href={link.href}
          icon={link.icon}
          text={link.text}
          spaceX={link.spaceX}
        />
      ))}
    </nav>
  )
}

export default NavMenu
