import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from '../food.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  query : string;
  obsFood : Observable<Object>;
  prodName : any;
  foodServiceObs : Observable<Object>;

  constructor(public food : FoodService,
    private route: ActivatedRoute,
    private service: FoodService,
    private location : Location) { }

  ngOnInit(): void {
    this.obsFood = this.route.paramMap;
    this.obsFood.subscribe(this.getRouterParam);
  }

  getRouterParam = (params : ParamMap) =>
  {
    let foodId = params.get('id');
    console.log(foodId);

    this.foodServiceObs = this.service.getDetailsID(foodId);
    this.foodServiceObs.subscribe((data)=>this.prodName = data);
  }

  back() : void
  { this.location.back(); }
}
