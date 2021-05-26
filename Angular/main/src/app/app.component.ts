import { Component, Pipe, PipeTransform, SecurityContext, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'main';
  input = "Here is your input";
  basic = "<script>alert('I am John in an annoying alert!')</script> test";
  image ="<img src='' onerror='alert(0)' />";
  link = `<a href="javascript:alert('Test')"> evil link </a>`;
  bypassBasic = false ;
  bypassImage = false ;
  bypassLink = false ;
}
