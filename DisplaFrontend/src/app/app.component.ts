import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
    private sessionService: SessionService,
    private router: Router
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
    this.matIconRegistry.addSvgIcon(
      'movimiento_venta',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/import_export-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'delete_outline',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/delete_outline-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'detail_outline',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/visibility-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'stock_uso',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/grid_on-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'stock_deposito',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/store_mall_directory-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'add_circle_outline',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/add_circle_outline-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'add',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/add-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/edit-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/delete-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'selection',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/near_me-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'close',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/clear-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'attach_money',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/attach_money-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'block',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/block-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'settings_backup_restore',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/settings_backup_restore-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'restore_from_trash',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/restore_from_trash-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'estadistica',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/leaderboard-24px.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'arrow_up',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/keyboard_arrow_up-white-24dp.svg')
    );
    
    // this.matIconRegistry.addSvgIcon(
    //   'error_outline',
    //   this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/error_outline.svg')
    // );
  }
}
