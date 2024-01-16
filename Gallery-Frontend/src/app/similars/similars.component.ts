import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend} from 'chart.js/auto';

interface Image {
  id:string
  src: string;
  alt: string;
  themeId:string;
  moment:any;
  histogram:any;
  dominant:any;
  selected: boolean;
}

@Component({
  selector: 'app-similars',
  templateUrl: './similars.component.html',
  styleUrls: ['./similars.component.css']
})
export class SimilarsComponent implements OnInit {
  images: Image[] = [];
  ThemeImages : Image [] = [];
  image: any;
  imageSrc:string='';
  galleryImageUrl: string = '';
  value=0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const imageData = params['imageData'];   
      if (imageData) {
        this.image = JSON.parse(imageData);
      }
      console.log(this.image);
    });
  }
  toggleImageSelection(image: Image): void {
    image.selected = !image.selected;
  }
}
