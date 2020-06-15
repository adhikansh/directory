import { Component, ViewChild } from '@angular/core';
import { PersonDetails } from './person-details';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'phone-dir';
  public search: any
  public personDetailsList = new Array<PersonDetails>();
  public personDetailsListCopy = new Array<PersonDetails>();

  displayedColumns: string[] = ['name', 'phoneNumber'];
  dataSource = new MatTableDataSource(this.personDetailsList);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public personDetails: PersonDetails;
  public isClosed = false;
  private subscription: Subscription;
  selectedRowIndex: number = -1;
  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!router.navigated) {
          localStorage.clear();
        }
      }
    });
  }


  ngOnInit(): void {
    this.personDetailsList.push(new PersonDetails(1, 'Adi', 9658318989, 27, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(2, 'Aashish', 7508620523, 26, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(3, 'Ritesh', 9658318988, 26, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(4, 'Mayur', 9658318986, 30, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(5, 'Debby', 96583189877, 29, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(6, 'Amit', 9658318970, 28, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(7, 'ashutosh', 9788595959, 25, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(8, 'Priyanka', 9658318450, 29, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(9, 'Anurag', 9658315869, 27, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(10, 'Pankaj', 8897315863, 30, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(11, 'Sankara', 8877315865, 32, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(12, 'Ravi', 978731583, 26, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(13, 'Shubhra', 9988749584, 27, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(14, 'Anusha', 9867686768, 30, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(15, 'Sanjeev', 87665565656, 26, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(16, 'Vaishali', 7788667564, 29, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(17, 'Dinseh', 9988575857, 45, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(18, 'Nethra', 7465857585, 26, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(19, 'Vaibhav', 9989989989, 23, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(20, 'Rahul', 74847484834, 26, 'New Delhi'));
    this.personDetailsList.sort((person1, person2) => {
      if(person1.name > person2.name){
        return 1;
      }else if(person1.name < person2.name) {
        return -1;
      }else{
        return 0;
      }
    })
    this.personDetailsListCopy = this.personDetailsList;
    this.dataSource.sort = this.sort;

    if (localStorage.getItem("selected_index") && localStorage.getItem("selected_index") !== null) {
      this.selectedRowIndex  = Number(JSON.parse(localStorage.getItem("selected_index")));
    }

  }

  /**
   * Do search
   */
  public doSearch() {

    this.personDetailsList = this.personDetailsListCopy.filter((personDetails) => {
      return personDetails.name.toLowerCase().includes(this.search.toString().toLowerCase()) || personDetails.phoneNumber.toString().includes(this.search.toString());
    });
    this.dataSource = new MatTableDataSource(this.personDetailsList);
    this.dataSource.sort = this.sort;
  }

  /**
   * Shows person details
   * @param personDetails 
   */
  public showPersonDetails(personDetails: PersonDetails) {
    this.selectedRowIndex = personDetails.id;
    if (localStorage.getItem(personDetails.id.toString()) && localStorage.getItem(personDetails.id.toString()) !== null) {
      this.personDetails = JSON.parse(localStorage.getItem(personDetails.id.toString()));
    } else {
      this.personDetails = personDetails;
      localStorage.setItem(personDetails.id.toString(), JSON.stringify(personDetails));
      localStorage.setItem("selected_index", this.selectedRowIndex.toString());
    }
    this.isClosed = false;
  }

  /**
   * Do close
   */
  public doClose() {
    this.isClosed = true;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
