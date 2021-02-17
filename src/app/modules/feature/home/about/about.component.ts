import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDictionary } from 'src/app/modules/core/dictionary/interface/dictionary.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cbs-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  public reported: {value: string, sn: number}[];
  public changelog: {value: string, sn: number}[];

  private languageSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.changeLanguage();
    this.languageSubscription = this.translateService.onLangChange.subscribe(() => this.changeLanguage());
  }

  ngOnDestroy(): void {
    if (this.languageSubscription){
      this.languageSubscription.unsubscribe();
    }
  }

  private changeLanguage(): void {
    const currentLanguage = this.translateService.currentLang;
    const reportedDictionary: IDictionary = this.activatedRoute.snapshot.data.dictionaries[0];
    const changelogDictionary: IDictionary = this.activatedRoute.snapshot.data.dictionaries[1];

    this.reported = reportedDictionary.items.reduce((result, item) => {
      const itemValueFound = item.values.find(itemValue => itemValue.languageKey === currentLanguage);
      if (itemValueFound) { result.push({sn: item.sn, value: itemValueFound.value}); }
      return result;
    }, []);

    this.changelog = changelogDictionary.items.reduce((result, item) => {
      const itemValueFound = item.values.find(itemValue => itemValue.languageKey === currentLanguage);
      if (itemValueFound) { result.push({sn: item.sn, value: itemValueFound.value}); }
      return result;
    }, []);

    this.reported.sort((e1, e2) => e1.sn < e2.sn ? 1 : -1);
    this.changelog.sort((e1, e2) => e1.sn < e2.sn ? 1 : -1);
  }

}
