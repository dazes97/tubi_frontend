import { PAGE } from "helpers";
const MenuItems: any[] = [
  {
    name: "",
    elements: [
      {
        url: PAGE.INDEX.URL,
        name: PAGE.INDEX.NAME,
        icon: "DashboardIcon",
      },
    ],
  },
  {
    name: "Administracion",
    elements: [
      {
        url: PAGE.COMPANY.INDEX.URL,
        name: PAGE.COMPANY.INDEX.NAME,
        icon: "LocationCityIcon",
      },
      {
        url: PAGE.PERSONAL_TYPE.INDEX.URL,
        name: PAGE.PERSONAL_TYPE.INDEX.NAME,
        icon: "AccessibilityIcon",
      },
      {
        url: PAGE.PERSONAL.INDEX.NAME,
        name: PAGE.PERSONAL.INDEX.NAME,
        icon: "PersonIcon",
      },
    ],
  },
];
export default MenuItems;
