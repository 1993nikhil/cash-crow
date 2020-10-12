import { Injectable } from '@angular/core';

export interface UserDetails {
    userId: string;
    email: string;
}

@Injectable({providedIn: 'root'})
export class UserDetailServices {
    private _userDetails?: UserDetails;

    get userDetails(): UserDetails | undefined {
        const details = this._userDetails;
        return details;
    }

    set userDetails(userDetails: UserDetails | undefined) {
        this._userDetails = userDetails;
    }
}  