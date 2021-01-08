import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TabsService } from '../../services/tabs.service';

@Component({
  selector: 'app-tablinks',
  templateUrl: './tablinks.page.html',
  styleUrls: ['./tablinks.page.scss'],
})
export class TablinksPage implements OnInit {

  public estado : boolean;

  constructor(public tabStatus: TabsService) { }
  
  ngOnInit() {
    
  }



}
