import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Subject } from 'rxjs';
import { LoadingIndicatorService } from '../../services/loading-indicator.service';

@Component({
  selector: 'nap-loading-indicator',
  template: '<mat-progress-bar *ngIf="isLoading | async" color="accent" [mode]="mode"></mat-progress-bar>',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {
  mode: ProgressBarMode = 'indeterminate';
  isLoading: Subject<boolean> = this.loadingIndicatorService.isLoading;

  constructor(private loadingIndicatorService: LoadingIndicatorService) {}

  ngOnInit(): void {}
}
