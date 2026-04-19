import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  public isToggled = signal(false);
}
