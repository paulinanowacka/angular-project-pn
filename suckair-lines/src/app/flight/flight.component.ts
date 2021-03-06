import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TimeoutService } from '../timeout.service';



@Component({
  selector: "app-flight",
  templateUrl: "./flight.component.html",
  styleUrls: ["./flight.component.scss"],
  providers: [TimeoutService]
})
export class FlightComponent implements OnInit {

  constructor(private router: Router, private timeoutService: TimeoutService) {
    this.showStorage = localStorage.getItem("flightdetails") || {};
  }

  ngOnInit() {
    this.timeoutService.resetTimer();
  }

  public time: any;
  public numberOfPassengers: number = 1;
  public departureDate: any;
  public returnDate: any;
  public departureAirport: string;
  public destinationAirport: string;
  public showStorage: any;
  public departureAPI;
  public arrivalAPI;
  public connection;
  public basePrice: number = 0;
  public today = new Date();
  public todayShort = new Date().toISOString().slice(0,10);

  public cities = ["Warsaw", "Paris", "New York"];
  public opts = [
    { key: "Warsaw", value: ["paris,new york"]},
    { key: "Paris", value: ["warsaw,new york"]},
    { key: "New York", value: ["warsaw, paris,"]}
  ];



    saving() {
      localStorage.removeItem("flightdetails");
      this.connection = this.departureAirport + this.destinationAirport
    if (this.departureAirport == "Warsaw") {
      this.departureAPI = "WAW-sky";
    } else if (this.departureAirport == "Paris") {
      this.departureAPI = "CDG-sky";
    } else if (this.departureAirport == "New York") {
      this.departureAPI = "JFK-sky";
    }
    if (this.destinationAirport == "Warsaw") {
      this.arrivalAPI = "WAW-sky";
    } else if (this.destinationAirport == "Paris") {
      this.arrivalAPI = "CDG-sky";
    } else if (this.destinationAirport == "New York") {
      this.arrivalAPI = "JFK-sky";
    }

      let dataStorage = {
        departureDate: this.departureDate,
        returnDate: this.returnDate,
        departureAirport: this.departureAirport,
        arrivalAirport: this.destinationAirport,
        passengersNumber: this.numberOfPassengers,
        departureAPI: this.departureAPI,
        arrivalAPI: this.arrivalAPI,
        basePrice: this.basePrice,
        connection: this.connection,
      };

      localStorage.setItem("flightdetails", JSON.stringify(dataStorage));
      this.showStorage = JSON.parse(localStorage.getItem("flightdetails"));
    } catch (err) {
      console.log(err);
    }
  }
