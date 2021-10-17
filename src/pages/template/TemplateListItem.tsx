import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import PersonIcon from "@mui/icons-material/Person";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
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
    case "LocationCityIcon": {
      return <LocationCityIcon />;
    }
    case "DirectionsBikeIcon": {
      return <DirectionsBikeIcon />;
    }
    case "CreateNewFolderIcon": {
      return <CreateNewFolderIcon />;
    }
    case "AssignmentReturnedIcon": {
      return <AssignmentReturnedIcon />;
    }
    default: {
      return <DashboardIcon />;
    }
  }
};
export const MenuItemsList = () => {
  return (
    <>
      {MenuItems().map((packageElement: any, index: any) => {
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
