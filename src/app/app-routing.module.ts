import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'legales',
    loadChildren: () => import('./legales/legales.module').then( m => m.LegalesPageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./tienda/tienda.module').then( m => m.TiendaPageModule)
  },
  {
    path: 'tiendas/:id',
    loadChildren: () => import('./tiendas/tiendas.module').then( m => m.TiendasPageModule),
  },
  {
    path: 'productos/:id',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule),

  },
  {
    path: 'producto/:id',
    loadChildren: () => import('./producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'pedidos/:id',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'historia',
    loadChildren: () => import('./historia/historia.module').then( m => m.HistoriaPageModule)
  },
  {
    path: 'comprar',
    loadChildren: () => import('./comprar/comprar.module').then( m => m.ComprarPageModule)
  },
  {
    path: 'compra-exitosa',
    loadChildren: () => import('./compra-exitosa/compra-exitosa.module').then( m => m.CompraExitosaPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'ruta',
    loadChildren: () => import('./ruta/ruta.module').then( m => m.RutaPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'search/:producto',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'final',
    loadChildren: () => import('./final/final.module').then( m => m.FinalPageModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./ayuda/ayuda.module').then( m => m.AyudaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
