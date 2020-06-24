import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from '../../shared/formation.service';
import { Besoin_Formation } from '../../Models/besoin_formation.model';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styles: []
})
export class IconsComponent implements OnInit {

  heading = 'Icons';
  subheading = 'Wide icons selection including from flag icons to FontAwesome and other icons libraries.';
  icon = 'pe-7s-phone icon-gradient bg-night-fade';

  constructor(private modalService: NgbModal,public formation: FormationService, private toastr: ToastrService) {
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open1(content) {
    this.modalService.open(content).result.then((result) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCentred(content) {
    this.modalService.open(content, {centered: true});
  }

  openSmall(content) {
    this.modalService.open(content, {
      size: 'sm'
    });
  }

  openLarge(content) {
    this.modalService.open(content, {
      size: 'lg'
    });
  }
  ngOnInit() {
    this.formation.getAllFormation();
    this.formation.refreshList();
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.formation.formData = {
      id:'',
      intitule_Formation: '',
      justification_du_besoin: '',
      nombre_de_participants:'',
      activite:'',
      priorite: ''

    }
  }
  populateForm(item: Besoin_Formation) {
    this.formation.formData = Object.assign({}, item);
    console.log(item.id);
  }
  //ici on doit enregistre la formation apres collecte de besoin par année
  envoyer(){
    console.log();
    this.formation.registerFormationAnnuelle().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.toastr.success('Formation Bien ajouté!','');
        } 
      },
     
    );
    this.formation.formeModel.reset();
  }

}
