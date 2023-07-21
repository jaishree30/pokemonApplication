import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.scss']
})
export class PictureDetailsComponent {
  receivedId: any;
  receivedData: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.receivedData = navigation.extras.state;
    }
    this.route.params.subscribe(params => {
      this.receivedId = params['id'];
    });
  }
}
