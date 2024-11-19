import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import DescriptionIcon from "@mui/icons-material/Description";
// import LayersIcon from "@mui/icons-material/Layers";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import type { Navigation } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet } from "react-router-dom";
import Logo from "../assets/images/small_logo.png";
import useDashboardLayout from "../hooks/useDashboardLayout";
import { dashboardTheme } from "../themes";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AdminNotificationProvider } from "../contexts/AdminNotificationContext";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Geral",
  },
  {
    segment: "admin/dashboard",
    title: "Painel",
    icon: <DashboardIcon />,
  },
  {
    segment: "admin/orders",
    title: "Pedidos",
    icon: <ShoppingCartIcon />,
    pattern: "admin/orders{/:segment}*",
  },
  {
    segment: "admin/users",
    title: "Usuários",
    icon: <GroupIcon />,
  },
  {
    segment: "admin/notifications",
    title: "Notificações",
    icon: <NotificationsIcon />,
  },
  // {
  //   kind: "divider",
  // },
  // {
  //   kind: "header",
  //   title: "Analytics",
  // },
  // {
  //   segment: "reports",
  //   title: "Reports",
  //   icon: <BarChartIcon />,
  //   children: [
  //     {
  //       segment: "sales",
  //       title: "Sales",
  //       icon: <DescriptionIcon />,
  //     },
  //     {
  //       segment: "traffic",
  //       title: "Traffic",
  //       icon: <DescriptionIcon />,
  //     },
  //   ],
  // },
  // {
  //   segment: "integrations",
  //   title: "Integrations",
  //   icon: <LayersIcon />,
  // },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Inventário",
  },
  {
    segment: "admin/products",
    title: "Produtos",
    icon: <InventoryIcon />,
    pattern: "admin/products{/:segment}*",
  },
  {
    segment: "admin/categories",
    title: "Categorias",
    icon: <CategoryIcon />,
    pattern: "admin/categories{/:segment}*",
  },
];

export default function AdminDashboardLayout() {
  const { router, authentication, session } = useDashboardLayout();

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={dashboardTheme}
      authentication={authentication}
      session={session}
      branding={{
        logo: <img src={Logo} alt="logo" />,
        title: "Apiários Azuis",
      }}
    >
      <AdminNotificationProvider>
        <DashboardLayout>
          <Box
            sx={{
              py: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: "100%",
            }}
          >
            <Outlet />
          </Box>
        </DashboardLayout>
      </AdminNotificationProvider>
    </AppProvider>
  );
}
