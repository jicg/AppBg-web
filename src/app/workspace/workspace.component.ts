import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  isCollapsed: Boolean = false;

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe((ret) => {
      console.log(ret);
    });
  }

  logout() {
    localStorage.token = '';
    this.router.navigate(['login']);
  }

}
