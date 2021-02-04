import { IUser } from './../../interface/user.interface';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITag } from 'src/app/modules/shared/component/tag-bar/tag.interface';
import { SortOrder } from 'src/app/modules/shared/enum/sort-order.enum';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Sort } from 'src/app/modules/shared/model/sort';
import { Page } from 'src/app/modules/shared/model/page';

@Component({
  selector: 'cbs-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public $tags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public $users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  public currentPageNumber: number;
  public currentPage: Page;

  constructor(private userService: UserService) {
    this.currentPage = new Page(10, 0, 0);
    this.currentPageNumber = this.currentPage.getPageNumber();
  }

  ngOnInit(): void {
    this.tagsChanged();
  }

  public tagsChanged(tags?: ITag[]): void{
    if (tags){
      this.$tags.next(tags);
    }
    const sort = [new Sort('surname', SortOrder.ASCEND)];

    const filter = this.$tags.value.map(tag => {
      switch (tag.category){
        case 'keyword3': return new Filter('surname', tag.value);
        case 'keyword2': return new Filter('forename', tag.value);
        case 'keyword1': return new Filter('contact', tag.value);
        case 'keyword0': return new Filter('email', tag.value);
        default: return new Filter('all', tag.value);
      }
    });
    this.userService.getUsers(filter, sort, this.currentPage.getPage(this.currentPageNumber)).toPromise().then(users => {
      this.$users.next(users.results);
      this.currentPage = new Page(users.page.limit, users.page.size, users.page.start);
      this.currentPageNumber = this.currentPage.getPageNumber();
    });
  }

  public searchChanged(searchText: string): void{

  }

}
