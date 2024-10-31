import { Component } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menulanding',
  standalone: true,
  imports: [ToolbarComponent,RouterLink],
  templateUrl: './menulanding.component.html',
  styleUrl: './menulanding.component.css'
})
export class MenulandingComponent {

}
