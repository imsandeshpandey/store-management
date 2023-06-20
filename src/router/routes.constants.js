const ROUTES = {
  ROOT: "/",
  LOGIN: {
    ROOT: "/login",
  },
  ORDERS: {
    ROOT: "/orders",
    SINGLE_ORDER: "/orders/:id",
  },
  CREATE_ORDER: {
    ROOT: "/create-order",
  },
  CUSTOMERS: {
    ROOT: "/customers",
    SINGLE_CUSTOMER: "/customer/:id",
  },
  MY_STORE: {
    ROOT: "/my-store",
  },
};
export default ROUTES;
