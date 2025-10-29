import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FOOTER_LINKS } from '../../constants/footer.constants';
import { FooterLink } from '../../models/app.models';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public links: FooterLink[] = FOOTER_LINKS;
}
