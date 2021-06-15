/// <reference types="@types/googlemaps" />
import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { MapsAPILoader } from '@agm/core';

//
import { MsgHandelService } from '../../../shared/services/msg-handel.service';
import { NavBarService } from '../../../services/navBar.service';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

/**
 * config files
 */
import { mapStyles } from '../../../../assets/ts/mapStyleConfig';

/**
 * Import env
 */
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent2 implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  keyword = 'name';
  public doctors: Array<any> = [];
  public specialization: Array<any> = [
    {
      name: 'Kasun Madusanka',
      image:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
    },
    {
      name: 'Lahiru Perera',
      image:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
    },
    {
      name: 'Banuka',
      image:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
    },
    {
      name: 'Hello World',
      image:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
    },
  ];
  public medicalCenters: Array<any> = [];
  showModal: boolean;
  screenSize: number;
  doctorsResult: any = [
    {
      specializations: 'abc',
      full_name: 'Kasun Madusanka',
    },
    {
      specializations: 'abc',
      full_name: 'Kasun Madusanka',
    },
    {
      specializations: 'abc',
      full_name: 'Kasun Madusanka',
    },
    {
      specializations: 'abc',
      full_name: 'Kasun Madusanka',
    },
  ];
  minDate: any = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  addedDate: any = new Date(new Date().setDate(new Date().getDate() + 14));
  maxDate: any = {
    year: this.addedDate.getFullYear(),
    month: this.addedDate.getMonth() + 1,
    day: this.addedDate.getDate(),
  };
  imgPath: string = environment.imageUploadPath;

  searchDoctor: any;
  searchSpecialization: any;
  searchMedCenter: any;
  searchDate: any;
  searchLat: any;
  searchLng: any;

  lat: any = 31.9686;
  lng: any = 99.9018;
  zoom: number = 4;
  styles: any;
  mapIcon: any = {
    url: 'assets/img/icons/common/pin.svg',
    scaledSize: {
      width: 20,
      height: 40,
    },
  };

  constructor(
    private _NgZone: NgZone,
    private router: Router,
    private _HomeService: HomeService,
    private _NavBarService: NavBarService,
    private _MapsAPILoader: MapsAPILoader,
    private _MsgHandelService: MsgHandelService
  ) {
    this.loadStyles();
  }

  ngOnInit() {
    this.screenSize = screen.width;
    // this.setCurrentPosition();
    // load doctors
    // this.loadDoctors();
    // load medical centers
    // this.loadMedicalCenter();
    // load specialization
    // this.loadSpecialization();
    // map load
    this.autoCompleteMap();
  }

  selectDoctor(item) {
    this.searchDoctor = item.id;
  }
  selectSpecialization(item) {
    this.searchSpecialization = item.id;
  }
  selectMedicalCenter(item) {
    this.searchMedCenter = item.id;
  }
  selectDate(item) {
    this.searchDate = new Date(item.year, item.month - 1, item.day);
  }

  private loadStyles() {
    this.styles = mapStyles;
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.zoom = 11;
      });
    }
  }

  private autoCompleteMap() {
    this._MapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this._NgZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.searchLat = place.geometry.location.lat();
          this.searchLng = place.geometry.location.lng();
        });
      });
    });
  }

  private loadDoctors() {
    this._HomeService.getAllDoctors().subscribe(
      (response) => {
        this.doctors = response['data'].map((obj) => {
          return { id: obj._id, name: obj.full_name };
        });
      },
      (error) => {
        // show msg
        this._MsgHandelService.handleError(error);
      }
    );
  }

  private loadSpecialization() {
    this._HomeService.getAllSpecialization().subscribe(
      (response) => {
        this.specialization = response['data'].map((obj) => {
          return { id: obj._id, name: obj.name, image: obj.image };
        });
      },
      (error) => {
        // show msg
        // this._MsgHandelService.handleError(error);
      }
    );
  }

  private loadMedicalCenter() {
    this._HomeService.getAllMedicalCenters().subscribe(
      (response) => {
        this.medicalCenters = response['data'].map((obj) => {
          return { id: obj._id, name: obj.name };
        });
      },
      (error) => {
        // show msg
        // this._MsgHandelService.handleError(error);
      }
    );
  }

  advanceSearch() {
    const searchObj = {
      doctor: this.searchDoctor,
      date: this.searchDate,
      specialization: this.searchSpecialization,
      medical_center: this.searchMedCenter,
    };

    if (
      this.searchLat !== undefined &&
      this.searchLat !== null &&
      this.searchLng !== undefined &&
      this.searchLng !== null
    ) {
      searchObj['location'] = {
        latitude: this.searchLat,
        longitude: this.searchLng,
      };
    }

    this._HomeService.advanceSearch(searchObj).subscribe(
      (response) => {
        this.doctorsResult = response['data'];

        this.showModal = false;
      },
      (error) => {
        // show msg
        this.showModal = false;
        this._MsgHandelService.handleError(error);
      }
    );
  }

  filterSpecialization(id) {
    this._HomeService.advanceSearch({ specialization: id }).subscribe(
      (response) => {
        this.doctorsResult = response['data'];
        this.showModal = false;
      },
      (error) => {
        // show msg
        this.showModal = false;
        this._MsgHandelService.handleError(error);
      }
    );
  }

  addBooking(id) {
    this.router.navigateByUrl(`/booking?id=${id}`);
  }

  showDocInfo() {
    this.router.navigateByUrl('/info');
  }
}
