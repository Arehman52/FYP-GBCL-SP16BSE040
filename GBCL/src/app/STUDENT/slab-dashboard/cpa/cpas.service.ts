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
    var CLIENT_SECRET = 'd75b8e47d897a73a76d9b2416c77ce936079a647';


    // def execute(source_file_name, language):
    //     source = open(source_file_name, "r")
    //     input_file = open("input.txt", "r")
    // callback = "https://client.com/callback/"

    var callback = 'https://fyp-gbcl.herokuapp.com/api/';

    var data = {
      'source': code,
      'lang': 'PYTHON3',
      'time_limit': 5,
      'memory_limit': 246323,
      'input': input,
      'callback': callback,
      'id': '81e0773d35a211483fb2426a47cfecce33e3b42f02d0.api.hackerearth.com'
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
