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
              icon: "DirectionsBikeIcon",
            },
            {
              url: PAGE.PACKAGE.INDEX.URL,
              name: PAGE.PACKAGE.INDEX.NAME,
              icon: "CreateNewFolderIcon",
            },
            {
              url: PAGE.BRANCH.INDEX.URL,
              name: PAGE.BRANCH.INDEX.NAME,
              icon: "LocationCityIcon",
            },
          ],
        },
      ];
    case ROLE_ID.ASISTENTE:
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
          name: "Servicios",
          elements: [
            {
              url: PAGE.REQUEST.INDEX.URL,
              name: PAGE.REQUEST.INDEX.NAME,
              icon: "AssignmentIcon",
            },
            {
              url: PAGE.QUOTE.INDEX.URL,
              name: PAGE.QUOTE.INDEX.NAME,
              icon: "AssignmentReturnedIcon",
            },
          ],
        },
      ];
    default:
      return [];
  }
};
export default MenuItems;
