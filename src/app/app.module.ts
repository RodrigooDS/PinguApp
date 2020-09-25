import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//firebase config
import { AngularFirestoreModule } from "@angular/fire/firestore"; //Modulo Firestore (BD)
import { AngularFireAuthModule } from "@angular/fire/auth";  //Modulo de authenticacion
import { AngularFireModule } from "@angular/fire"; //Modulo para inicializar
import { AngularFireStorageModule} from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ModalRepasoPage } from './pages/modals-repaso/modal-repaso/modal-repaso.page';
// import { File } from '@ionic-native/file/ngx';
// import { Camera } from '@ionic-native/Camera/ngx';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [AppComponent,ModalRepasoPage],
  entryComponents: [ ModalRepasoPage],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Camera,
    // File,
  
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
