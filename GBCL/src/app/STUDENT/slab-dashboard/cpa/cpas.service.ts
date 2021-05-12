import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpasService {

  constructor(private http: HttpClient) { }



  RunResponse: any[] = [];


  runCode(code: string, input: string): any[] {

    //
    var CODE_EVALUATION_URL = 'https://api.hackerearth.com/v4/partner/code-evaluation/submissions/';
    var CLIENT_SECRET = '1f6418a4f1f691907bbab6d9eea66069e4f003ff'

    // def execute(source_file_name, language):
    //     source = open(source_file_name, "r")
    //     input_file = open("input.txt", "r")
    // callback = "https://client.com/callback/"

    var callback = 'http://xyz.com/callback/';

    var data = {
      'source': code,
      'lang': 'PYTHON3',
      'time_limit': 5,
      'memory_limit': 246323,
      'input': input,
      'callback': callback,
      'id': 'c9389a2d81b785605c04559361e3bfec2e890e6d9e30.api.hackerearth.com'
    }

    const options = {
      headers: { 'client-secret': CLIENT_SECRET,  'content-type': 'application/json'},
    };

    //     input_file.close()
    //     source.close()
    //     resp = requests.post(CODE_EVALUATION_URL, json=data, headers=headers)
    //     """
    //     This will also work:
    //     resp = requests.post(CODE_EVALUATION_URL, data=data, headers=headers)
    //     """
    //     dict = json.loads(resp.text)
    //     return dict
    this.http
    .post(CODE_EVALUATION_URL, data, options )
    .subscribe((responseData) => {
      // console.log(responseData.message);
      console.log(responseData);

      this.RunResponse.push(responseData);


    },
    (err)=>{
      console.log(err);

      // this.RunResponse.push(err.error);

    });

    return this.RunResponse;
  }

}
