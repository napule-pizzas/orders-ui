import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseUnsubscriber implements OnDestroy {
  protected onDestroy$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
