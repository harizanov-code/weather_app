
import NavbarLink from './NavbarLink'

const NavbarLinks = () => {
  return (
    <div>
      <div className="hidden lg:flex grow  align-middle  h-20 ">
        <NavbarLink route={'home'} name={'home'} />
        <NavbarLink route={'about'} name={'about'} />
        <NavbarLink route={'favorite'} name={'favorite'} />
        <NavbarLink route={'dashboard'} name={'dashboard'} />
      </div>
    </div>
  )
}
export default NavbarLinks
