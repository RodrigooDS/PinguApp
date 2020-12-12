import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  nuevoProfesor() {
    this.router.navigate(['/tablinks/profesor/agregar-profesor']);
  }

}
