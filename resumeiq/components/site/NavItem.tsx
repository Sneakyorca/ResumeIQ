"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
type navitems = {
  name: string;
  route: string;
};
const NavItems: navitems[] = [
  {
    name: "Analyze",
    route: "/analyze",
  },
  {
    name: "My reports",
    route: "/reports",
  },
];

const NavItem = () => {
  const pathname = usePathname();
  return (
    <>
      {NavItems.map((item, index) => (
        <li key={index}>
          <Link
            href={item.route}
            className={`font-sans text-body-sm text-muted-gray font-semibold hover:text-black hover:font-bold ${pathname === item.route ? "text-primary hover:text-primary nav-active" : "nav"}`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavItem;
