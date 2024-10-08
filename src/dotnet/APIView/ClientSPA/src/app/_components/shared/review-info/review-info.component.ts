import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Review } from 'src/app/_models/review';
import { APIRevision } from 'src/app/_models/revision';
import { UserProfile } from 'src/app/_models/userProfile';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-review-info',
  templateUrl: './review-info.component.html',
  styleUrls: ['./review-info.component.scss']
})
export class ReviewInfoComponent {
  @Input() apiRevisions: APIRevision[] = [];
  @Input() activeApiRevisionId: string | null = '';
  @Input() diffApiRevisionId: string | null = '';
  @Input() userProfile: UserProfile | undefined;
  @Input() showPageoptionsButton: boolean = false;

  @Input() review : Review | undefined = undefined;
  @Output() pageOptionsEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();

  showPageOptions: boolean = true;

  assetsPath : string = environment.assetsPath;

  ngOnInit() {
    if (this.userProfile?.preferences.hideReviewPageOptions != undefined) {
      this.showPageOptions = !(this.userProfile?.preferences.hideReviewPageOptions);
    } else {
      this.showPageOptions = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userProfile']) {
      if (this.userProfile?.preferences.hideReviewPageOptions != undefined) {
        this.showPageOptions = !(this.userProfile?.preferences.hideReviewPageOptions);
      } else {
        this.showPageOptions = false;
      }
    }
  }

  onRightPanelCheckChange(event: any) {
    this.pageOptionsEmitter.emit(event.target.checked);
  }
}
