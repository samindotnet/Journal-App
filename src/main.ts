import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app'
import {provideAuth, getAuth, initializeAuth, indexedDBLocalPersistence} from '@angular/fire/auth'
import {provideFirestore, getFirestore} from '@angular/fire/firestore'
import { environment } from './environments/environment';
import { Capacitor } from '@capacitor/core';
import { getApp } from 'firebase/app';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const app = getApp()
      if(Capacitor.isNativePlatform()){
        return initializeAuth(app,{persistence:indexedDBLocalPersistence})
      }else{
        return getAuth()
      }
    }),
    provideFirestore(() => getFirestore()),
  ],
});
