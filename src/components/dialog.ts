import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import './_dialog.scss';

@Component({
  selector: 'app-dialog',
  template: `<div *ngIf="settings.isVisible" class="c-dialog">
    <div class="c-dialog__close">
      <button
        class="c-dialog__close_button"
        (click)="settings.onClose()">
      </button>
    </div>
    <header class="c-dialog__header">
      <h3 class="c-dialog__header--title">{{ settings.title }}</h3>
    </header>
    <section class="c-dialog__body">
      <ng-content></ng-content>
    </section>
    <footer class="c-dialog__footer">
      <button
        class="c-dialog__button c-dialog__button--create"
        (click)="settings.onCreate()">
        {{ settings.createText }}
      </button>
    </footer>
  </div>
  <div *ngIf="settings.isVisible" class="c-overlay" (click)="settings.onClose()"></div>`,
})
export class DialogComponent implements OnInit {
  @Input() settings: any;
  @Input() data: any;

  ngOnInit() {
    console.log('init', this.settings);
  }
}
