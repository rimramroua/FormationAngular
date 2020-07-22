import {Component, OnInit} from '@angular/core';
import { CompetenceService } from '../../shared/competence.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styles: []
})
export class TimelineComponent implements OnInit {

  heading = 'Timelines';
  subheading = 'Timelines are used to show lists of notifications, tasks or actions in a beautiful way.';
  icon = 'pe-7s-light icon-gradient bg-malibu-beach';
 

  images = [1, 2, 3].map(() => `https://picsum.photos/1700/500?random&t=${Math.random()}`);

  slides = [
    {img: '1'},
    {img: '2'},
    {img: '3'},
    {img: '4'},
    {img: '5'},
    {img: '6'},
    {img: '7'},
    {img: '8'},

  ];
  slideConfig = {
    slidesToShow: 1,
    dots: true,
  };

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 100,
    dots: true,
  };

  slideConfig3 = {
    dots: true,
    infinite: false,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  slideConfig4 = {
    slidesToShow: 3,
    dots: true,
  };

  slideConfig5 = {
    className: 'slider variable-width',
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };

  slideConfig6 = {
    className: 'center',
    infinite: true,
    slidesToShow: 1,
    speed: 100,
    adaptiveHeight: true,
    dots: true,
  };
  constructor(public competence: CompetenceService) {
  }
  users = JSON.parse(localStorage.getItem('users')) ;
  payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  changeValueID(event){
    console.log(this.payLoad);
    console.log(this.payLoad.role);
    console.log(this.payLoad.UserID);
}
Id : string= this.competence.UserId;
  ngOnInit() {
    console.log(this.payLoad.UserID);
    this.competence.get(this.payLoad.UserID)
    this.competence.getUser(this.payLoad.UserID);
    this.competence.GetLabel(this.payLoad.UserID);
    this.competence.GetDomaineUser(this.payLoad.UserID);
  }

}
