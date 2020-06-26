import {Component, HostListener, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../theme-options';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompetenceService } from 'src/app/DemoPages/shared/competence.service';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;

  constructor(public globals: ThemeOptions,private Fb: FormBuilder, private http: HttpClient,public competence: CompetenceService, private router: Router,private activatedRoute: ActivatedRoute,private modalService: NgbModal) {

  }

  @select('config') public config$: Observable<any>;

  private newInnerWidth: number;
  private innerWidth: number;
  activeId = 'dashboardsMenu';

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }
  openSmall(content1) {
    this.modalService.open(content1, {
      size: 'sm'
    });
  }
  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }
  userId:string
  ValueChangeuser(event) {
    this.userId=event.target.value;
  console.log( this.userId);
}

Option = this.Fb.group({
  All: ['', Validators.required]
})
  ngOnInit() {


    this.competence.getAllUsersTrue();

    this.competence.GetAllDomaine();
    this.competence.GetAllLabels();
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });

    this.extraParameter = this.activatedRoute.snapshot.firstChild.data.extraParameter;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }

  }
  choix(){
    console.log(this.userId)
    console.log(this.Option.value.All)
    if(this.Option.value.All=="All"){
     
      this.router.navigate(['/tables/bootstrap']);
    }
    else{
    
      this.competence.GetLabel(this.userId);
      this.competence.getUser(this.userId);
      this.competence.GetDomaineUser(this.userId);
      this.competence.UserId=this.userId;
   //   this.http.post('https://localhost:44385/api/Metier/PostGet',metier).subscribe
      this.router.navigate(['/components/pagination']);
    }
    
  }
}
