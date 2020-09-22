import { Component, OnInit } from '@angular/core';
import { database } from 'firebase';
import { User } from '../../shared/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {

  constructor() { 
  }

  ngOnInit() {
  }

}
