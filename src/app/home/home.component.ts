import { Component, OnInit, ViewChild } from '@angular/core';

export interface iSanta {
  name: String;
  presentee?: String;
  hidden: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('box') inputName: any; // accessing the reference element
  santas: Array<iSanta> = [];
  torand: Array<String> = [];
  noshuffed: boolean = true;
  shuffled: boolean = false;

  constructor() { }

  ngOnInit() { }

  addSanta(name: String) {
    if (!name) {
      alert("enter name in form");
      console.error("enter name in form");
      return false;
    }
    if (this.santas.some(element => element.name == name)) {
      alert("user already exist: " + name);
      console.error("user already exist: " + name);
      return false;
    }

    this.santas.push({ name: name, hidden: true });
    this.inputName.nativeElement.value = ''; // clean input field
    return true;
  }


  shuffleSanta() {
    console.log(this.santas);
    loop: while (this.noshuffed) {
      console.log('shuffel loop')
      this.santas.map(item => {
          this.torand.push(item.name);
      })
      this.torand = this.torand.sort(function (a, b) { return 0.5 - Math.random() })
      this.noshuffed = false;
      this.santas.map(item => {
        var presentee = this.torand.pop()
        if (item.name == presentee) {
          this.noshuffed = true;
        } else {
          item.presentee = presentee
        }
      })
      // Error: Unused label.

    }
    this.noshuffed = true;
    this.shuffled = true;
  }


  removeItem(obj: any) {
    console.log('call removeItem');
    this.santas = this.santas.filter(item => item !== obj);
    if (this.santas.length == 0) {
      window.location.reload();
    }


  }
  showItem(obj: any) {
    console.log('call showItem');
    let index = this.santas.indexOf(obj);
    obj.hidden = false;
    this.santas[index] = obj;
  }

}
