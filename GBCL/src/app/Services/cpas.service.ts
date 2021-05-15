import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpasService {

  constructor(private http: HttpClient) { }




  RunTheCOde(code: string):any[] {

    //
    var url = "https://ide.geeksforgeeks.org/main.php"


    console.log(code);

    var data = {
      "lang": "Python3",
      "code": "print('Hello Word!')",
      "input": "",
      "save": false
    };

    var c:string = "a=5\nprint(a)"
    console.log(c);

    const d  = {
      'lang': 'Python3',
      'code': code,
      'input': '',
      'save': true
  }



    //this.http.post<{ message: string; user: Usersmodel }>
    this.http.post(url, d)
      .subscribe((responseData) => {

        if(responseData != null){
          this.arr.push(responseData);
        }

      });
    // r = requests.post(url, data=data)
    return this.arr;
  }


  arr:any[] = [];
}
