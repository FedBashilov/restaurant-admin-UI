import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {


  constructor(private authService: AuthService, public router: Router) {

    let lineMenuItems: any = null;
    let current: any = null;

    router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){

        current = document.getElementsByClassName("current")[0];
        lineMenuItems = document.getElementsByClassName("nav_elem");

        if( current ){
          current.classList.remove("current");
        }

        switch (router.url) {
          case "/orders":
            lineMenuItems[0].classList.add("current");
            break;
          case "/products":
            lineMenuItems[1].classList.add("current");
            break;
          default:
            break;
        }

      }
    });
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
