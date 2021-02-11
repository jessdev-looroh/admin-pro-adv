import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getimagen'
})
export class GetimagenPipe implements PipeTransform {

  transform(url:string="no-image",tipo:string="usuarios"): unknown {
    
    console.log(tipo);
    if(url.includes('https')){
      return url;
    }else{
      return `http://localhost:3005/api/upload/${tipo}/${url}`
    }
    
  }

}
