import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bookmark } from '../../_models/data-models/bookmark.model';
import { FufService } from '../support-services/fuf.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  bookmarks: BehaviorSubject<Bookmark[]> = new BehaviorSubject<Bookmark[]>([]);

  constructor(
    private fufService: FufService
  ) {
    // load
  }

  addBookmark(newBookmark: Bookmark): void {
    const bookmarks: Bookmark[] = this.bookmarks.value;
    if (!newBookmark.id) {
      newBookmark.id = this.generateNewIdForBookmark();
    }
    bookmarks.push(newBookmark);
    this.bookmarks.next(bookmarks);
  }

  modifyBookmark(newBookmark: Bookmark): void {
    const index = this.bookmarks.value.map(bm => bm.id).indexOf(newBookmark.id);
    if (index > -1) {
      const bookmarks: Bookmark[] = this.bookmarks.value;
      bookmarks[index] = newBookmark;
      this.bookmarks.next(bookmarks);
    } else {
      console.log('NO BOOKMARK WITH THE SPECIFIC ID!');
    }
  }

  removeBookmark(bookmark: Bookmark): void {
    const bookmarks: Bookmark[] = this.bookmarks.value;
    const index = bookmarks.indexOf(bookmark);
    bookmarks.splice(index, 1);
    this.bookmarks.next(bookmarks);
  }

  generateNewIdForBookmark(): string {
    let generatedId = this.fufService.getRandomString(20);
    while (this.bookmarks.value.find(bm => bm.id === generatedId)) {
      console.log('duplicated random id');
      generatedId = this.fufService.getRandomString(20);
    }
    return generatedId;
  }
}
