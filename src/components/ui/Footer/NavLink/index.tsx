import Link from "next/link";

const NavLink = ({ title, pathUrl }: NavLinkProps) => {
  return (
    <li>
      <Link href={pathUrl}>{title}</Link>
    </li>
  );
};

export default NavLink;
