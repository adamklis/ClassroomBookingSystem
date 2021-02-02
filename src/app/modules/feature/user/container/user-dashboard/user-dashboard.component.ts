import { IUser } from './../../interface/user.interface';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITag } from 'src/app/modules/shared/component/tag-bar/tag.interface';
import { SortOrder } from 'src/app/modules/shared/enum/sort-order.enum';
import { Filter } from 'src/app/modules/shared/model/filter';
import { Sort } from 'src/app/modules/shared/model/sort';

@Component({
  selector: 'cbs-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public $tags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public $users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  constructor(private userService: UserService) { }

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
    this.userService.getUsers(filter, sort).toPromise().then(users => this.$users.next(users));
  }

  public searchChanged(searchText: string): void{

  }

}
