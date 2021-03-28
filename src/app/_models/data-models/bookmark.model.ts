import { BookmarkGroup } from '../../_enums/bookmark-group.enum';

export class Bookmark {
  id: string;
  name: string;
  url: string;
  group: BookmarkGroup;

  constructor(newBookmark?: {
    id?: string,
    name: string,
    url: string,
    group: BookmarkGroup
  }) {
    if (newBookmark) {
      this.id = newBookmark.id;
      this.name = newBookmark.name;
      this.url = newBookmark.url;
      this.group = newBookmark.group;
    }
  }
}
