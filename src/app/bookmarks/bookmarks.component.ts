import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookmarkGroup } from '../_enums/bookmark-group.enum';
import { SelectOption } from '../_models/control-models/select-option.model';
import { Bookmark } from '../_models/data-models/bookmark.model';
import { BookmarksService } from '../_services/data-services/bookmarks.service';
import { FufService } from '../_services/support-services/fuf.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit, OnDestroy {
  bookmarksFG: FormGroup;
  groupSelectOptions: SelectOption[] = [];

  selectedBookmark: Bookmark;

  groups = Object.keys(Object(BookmarkGroup)).map(key => {
    return { key, label: BookmarkGroup[key] };
  });

  bookmarksByGroup = {};

  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    fufService: FufService,
    public bookmarksService: BookmarksService
  ) {
    console.log(this.groups);
    this.groupSelectOptions = fufService.getSelectOptionsByEnum(Object(BookmarkGroup));
    this.createForm();
    this.createSubscriptions();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private createSubscriptions(): void {
    this.subscriptions = [
      this.bookmarksService.bookmarks.subscribe((bookmarks: Bookmark[]) => {
        this.groups.forEach(group => {
          this.bookmarksByGroup[group.key] = bookmarks.filter(bm => bm.group === group.key);
        });
        // console.log(this.bookmarksByGroup);
      })
    ];
  }

  private createForm(): void {
    this.bookmarksFG = this.formBuilder.group({
      name: [null, [Validators.required]],
      url: [null, [Validators.required]],
      group: [null, [Validators.required]]
    });
  }

  select(bookmark: Bookmark): void {
    this.selectedBookmark = bookmark;
  }

  removeSelectedBookmark(): void {
    this.bookmarksService.removeBookmark(this.selectedBookmark);
    this.selectedBookmark = null;
  }

  addNewBookmark(): void {
    if (this.bookmarksFG.valid) {
      this.bookmarksService.addBookmark(new Bookmark({
        name: this.bookmarksFG.controls.name.value,
        url: this.bookmarksFG.controls.url.value,
        group: this.bookmarksFG.controls.group.value
      }));
    }
  }
}
