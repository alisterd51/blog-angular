import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdComponent } from './ad/ad.component';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { bootstrapGithub } from '@ng-icons/bootstrap-icons';
import { CubeComponent } from './cube/cube.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MarkdownComponent } from './markdown/markdown.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TetrisComponent } from './tetris/tetris.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIconsModule } from '@ng-icons/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    AdComponent,
    ArticleComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
    CubeComponent,
    FooterComponent,
    HomeComponent,
    MarkdownComponent,
    NavbarComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    TetrisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatTreeModule,
    MatSidenavModule,
    MatCardModule,
    NgIconsModule.withIcons({ bootstrapGithub }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
