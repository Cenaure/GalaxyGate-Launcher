import {makeAutoObservable} from "mobx";

interface UserInfo {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
}

export default class userStore {
  private _isAuth: boolean;
  private _info: UserInfo;

  constructor(){
    this._isAuth = true;
    this._info = {
      _id: '1',
      name: 'cenaure',
      email: '1',
      role: 'user'
    };
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean){ this._isAuth = bool; }
  setUser(user: UserInfo){ this._info = user; }

  get isAuth(): boolean { return this._isAuth; }
  get info(): UserInfo { return this._info; }
}

