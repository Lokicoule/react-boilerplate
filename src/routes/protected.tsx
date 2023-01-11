import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "~/components/Elements/Loader";
import { MainLayout } from "~/components/Layout/MainLayout";
import { lazyImport } from "~/utils/lazyImport";

const { ProductsRoutes } = lazyImport(
  () => import("~/features/products"),
  "ProductsRoutes"
);

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: "/app",
    element: <App />,
    children: [
      { path: "products/*", element: <ProductsRoutes /> },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
