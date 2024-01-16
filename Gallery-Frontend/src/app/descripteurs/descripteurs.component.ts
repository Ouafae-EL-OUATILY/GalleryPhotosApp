import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend} from 'chart.js/auto';
@Component({
  selector: 'app-descripteurs',
  templateUrl: './descripteurs.component.html',
  styleUrls: ['./descripteurs.component.css'],
})
export class DescripteursComponent implements OnInit {
  image: any;
  imageSrc:string='';
  galleryImageUrl: string = '';
  a_mean :string="";
  b_mean :string="";
  l_mean :string="";
  a_std :string="";
  b_std :string="";
  l_std :string="";
  a_skew :string="";
  b_skew :string="";
  l_skew :string="";
  a_kurtosis :string="";
  b_kurtosis :string="";
  l_kurtosis :string="";
  public chart: any;
  createChart(){
  
    // Add this array of labels
const xLabels = Array.from({ length: 251 }, (_, i) => i.toString()); // Creates an array from 0 to 250


    this.chart = new Chart("MyChart", {
      type: 'line', 

      data: {// values on X-Axis
        
	       datasets: [
          {
            label: "Blue",
            data: this.image.histogram.Blue,
            backgroundColor: 'blue',
            borderColor:'blue',
            pointRadius:0,
            fill: false,
            borderWidth:1.5
          },
          {
          label: "Green",
            data: this.image.histogram.Green,
            backgroundColor: 'green',
            borderColor:'green',
            pointRadius:0,
            fill: false,
            borderWidth:1.5
          },
          {
            label: "Red",
            data: this.image.histogram.Red,
            backgroundColor: 'red',
            borderColor:'red',
            pointRadius:0,
            fill: false,
            borderWidth:1.5
          }  
        ]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            position: 'bottom',
            title: {
              display: true,
              text: 'Value'
            },
            labels: xLabels 
          },
          
          y: {
              title: {
                  display: true,
                  text: 'Number of pixels'
              }
          }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart' 
      }
      
      }
      
      
    });
    
  }
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const imageData = params['imageData'];   
      if (imageData) {
        this.image = JSON.parse(imageData);
      }
      console.log(this.image);
    });
    this.createChart();
  }

}
