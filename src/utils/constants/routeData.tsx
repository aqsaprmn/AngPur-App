import { BiCart, BiUserCircle } from "react-icons/bi";
import { permissionFullExtractor } from "../Processor";
import { FaProductHunt } from "react-icons/fa";

export const defaultRoleV2 = {
  initialRoute: "/home",
  routes: [
    {
      id: 1,
      title: "Order",
      icon: <BiCart />,
      route: "/admin/order",
      expanded: false,
      translationKey: "Order",
      isHidden: !permissionFullExtractor({
        env: import.meta.env.VITE_ALLOWED_USER_MANAGEMENT,
        role: "",
      }),
    },
    {
      id: 2,
      title: "Product",
      icon: <FaProductHunt />,
      route: "/admin/product",
      expanded: false,
      translationKey: "Product",
      isHidden: !permissionFullExtractor({
        env: import.meta.env.VITE_ALLOWED_PRODUCT_MANAGEMENT,
        role: "",
      }),
    },
    {
      id: 3,
      title: "User",
      icon: <BiUserCircle />,
      route: "/admin/user",
      expanded: false,
      translationKey: "User",
      isHidden: !permissionFullExtractor({
        env: import.meta.env.VITE_ALLOWED_USER_MANAGEMENT,
        role: "",
      }),
    },
  ],
};
