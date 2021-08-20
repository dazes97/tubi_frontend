import { PAGE } from "helpers";
import { AuthChecker, roleChecker } from "auth";
import { ROLE_ID } from "helpers";
const MenuItems = () => {
  if (!AuthChecker()) return [];
  switch (roleChecker()) {
    case ROLE_ID.ADMINISTRADOR:
      return [
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
              url: PAGE.COMPANY_OWNER.INDEX.URL,
              name: PAGE.COMPANY_OWNER.INDEX.NAME,
              icon: "PersonIcon",
            },
          ],
        },
      ];
    case ROLE_ID.PROPIETARIO:
      return [
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
              url: PAGE.PERSONAL.INDEX.URL,
              name: PAGE.PERSONAL.INDEX.NAME,
              icon: "PersonIcon",
            },
            {
              url: PAGE.SERVICE.INDEX.URL,
              name: PAGE.SERVICE.INDEX.NAME,
              icon: "LocationCityIcon",
            },
            {
              url: PAGE.PACKAGE.INDEX.URL,
              name: PAGE.PACKAGE.INDEX.NAME,
              icon: "PersonIcon",
            },
          ],
        },
      ];
    default:
      return [];
  }
};
export default MenuItems;
