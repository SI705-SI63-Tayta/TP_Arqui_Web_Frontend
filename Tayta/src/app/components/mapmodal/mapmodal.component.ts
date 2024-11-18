import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Output, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mapmodal',
  standalone: true,
  imports: [GoogleMap, MapMarker, CommonModule,MatButtonModule],
  templateUrl: './mapmodal.component.html',
  styleUrl: './mapmodal.component.css'
})
export class MapmodalComponent implements AfterViewInit{

    mapOptions: google.maps.MapOptions = {
      center: { lat: -12.0464, lng: -77.0428 }, // Ubicación inicial (Lima)
      zoom: 15,
    };
    userMarkerOptions: google.maps.MarkerOptions = {
      draggable: true,
      title: 'Tu ubicación',
    };
    userLocation: { lat: number; lng: number } | undefined;

    // Referencia al elemento de búsqueda
    @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;

    constructor(public matDialogRed:MatDialogRef<MapmodalComponent>,
      private cdr: ChangeDetectorRef,
      @Inject(MAT_DIALOG_DATA) public data:{
        latitude:number,
        longtitude:number
      },

    ) {}

    ngAfterViewInit(): void {
      this.initializeAutocomplete();
      //console.log(this.data);
      if (this.data.latitude != 0 && this.data.longtitude != 0) {
        //console.log("Entre aqui");
        this.userLocation = {
          lat: this.data.latitude,
          lng: this.data.longtitude,
        };
        //console.log("Mostrando marcador");
        this.mapOptions = { ...this.mapOptions, center: this.userLocation };

        // Forzar la detección de cambios después de asignar los valores
        this.cdr.detectChanges();
      }
    }

    // Método para inicializar el autocompletado de Google
    initializeAutocomplete() {
      if (typeof google === 'undefined' || !google.maps.places) {
        console.error('Google Places API no está disponible.');
        return;
      }

      const input = this.searchInput.nativeElement;
      const autocomplete = new google.maps.places.Autocomplete(input);

      google.maps.event.addListener(autocomplete,'place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          this.mapOptions = { ...this.mapOptions, center: place.geometry.location.toJSON() };
          this.userLocation = place.geometry.location.toJSON();

        } else {
          alert('No se encontró la ubicación seleccionada.');
        }
      });
    }

    onMapClick(event: google.maps.MapMouseEvent) {
      if (event.latLng) {
        this.userLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      }
    }

    // Método para obtener la ubicación del usuario
    locateUser() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            this.mapOptions = { ...this.mapOptions, center: this.userLocation };
            //console.log(`Tu ubicación es: Latitud ${position.coords.latitude}, Longitud ${position.coords.longitude}`);
          },
          () => console.log('No se pudo obtener la ubicación.')
        );
      } else {
        console.log('La geolocalización no está soportada por tu navegador.');
      }
    }

    seleccionarUbicacion(): void {
      var lati =this.userLocation?.lat!;
      var long = this.userLocation?.lng!

      this.matDialogRed.close({ lat: lati, lng: long });

    }

}
