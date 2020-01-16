import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DisplaFrontend';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private sessionService: SessionService
  ) {
    this.matIconRegistry.addSvgIcon(
      'edit_outline',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/edit_outline.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'logo_displa',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/logo-displa-01.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'movimiento',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/swap_horiz-24px.svg')
    );
  }
}
