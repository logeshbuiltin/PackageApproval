import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DirectAccessGuard implements CanActivate {

    public userName = localStorage.getItem('userData');

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // If the previous URL was blank, then the user is directly accessing this page
    if (this.router.url === '/') {
      this.router.navigate(['/login']); // Navigate away to some other page
      return false;
    } else if(state.url === '/typography' && this.userName != 'admin') {
        this.router.navigate(['/login']); // Navigate away to some other page
        return false;
    }
    return true;
  }
}