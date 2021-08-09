import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import MenuItems from "./TemplateMenuItem";
// const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();
const getIcons = (iconName: string) => {
  switch (iconName) {
    case "AssignmentIcon": {
      return <AssignmentIcon />;
    }
    case "PeopleIcon": {
      return <PeopleIcon />;
    }
    case "LayersIcon": {
      return <LayersIcon />;
    }
    case "PersonIcon": {
      return <PersonIcon />;
    }
    case "AccessibilityIcon": {
      return <AccessibilityIcon />;
    }
    default: {
      return <DashboardIcon />;
    }
  }
};
export const MenuItemsList = () => {
  return (
    <>
      {MenuItems.map((packageElement: any, index: any) => {
        return (
          <div key={Math.random().toString(36).substr(2, 9)}>
            <ListSubheader key={Math.random().toString(36).substr(2, 9)} inset>
              {packageElement.name}
            </ListSubheader>
            {packageElement.elements.map((element: any, i: any) => {
              return (
                <Link
                  to={element.url}
                  key={Math.random().toString(36).substr(2, 9)}
                >
                  <ListItem key={Math.random().toString(36).substr(2, 9)}>
                    <ListItemIcon key={Math.random().toString(36).substr(2, 9)}>
                      {getIcons(element?.icon ?? "")}
                    </ListItemIcon>
                    <ListItemText
                      key={Math.random().toString(36).substr(2, 9)}
                      primary={element.name}
                    />
                  </ListItem>
                </Link>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
