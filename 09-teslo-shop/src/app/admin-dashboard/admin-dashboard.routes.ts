import { Routes } from "@angular/router";
import { AdminDashboradLayout } from "./layouts/admin-dashborad-layout/admin-dashborad-layout";
import { ProductAdminPage } from "./pages/product-admin-page/product-admin-page";
import { ProductsAdminPage } from "./pages/products-admin-page/products-admin-page";

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboradLayout,
    children: [
      {
        path: 'products',
        component: ProductsAdminPage
      },
      {
        path: 'products/:id',
        component: ProductAdminPage
      },
      {
        path: '**',
        redirectTo: 'products'
      }
    ]
  }
]

export default adminDashboardRoutes;
