import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { HomeRoutingModule } from './home.routing';

/**
 * Services
 */
import { HomeService } from './home.service';

/**
 * import component
 */
import { LandingComponent } from './landing/landing.component';
import { LandingComponent2 } from './landing02/landing.component';
import { WordLimitPipe } from './pipes/word-limit.pipe';

/**
 * ENV file
 */
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey,
      libraries: ['places'],
    }),
    AutocompleteLibModule,
    ReactiveFormsModule,
    HomeRoutingModule,
  ],
  declarations: [LandingComponent, LandingComponent2, WordLimitPipe],
  exports: [LandingComponent],
  providers: [HomeService],
})
export class HomeModule {}
