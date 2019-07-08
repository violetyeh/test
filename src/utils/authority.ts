//用户
export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly username: string;
  public readonly ext: {};

  constructor({ id, name, username, ext = {} }: User) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.ext = ext;
  }
}

//角色
export class Role {
  public readonly id: string;
  public readonly name: string;

  constructor({ id, name }: Role) {
    this.id = id;
    this.name = name;
  }
}

//权限
export class Permission {
  public id: string;
  public name: string;
  public actions: string[];
  public dataAccesses: DataAcctessConfig[];

  constructor({ id, name, actions, dataAccesses }: Permission) {
    this.id = id;
    this.name = name;
    this.actions = actions;
    this.dataAccesses = dataAccesses;
  }

  public hasAction(action: string): boolean {
    return this.actions.includes(action);
  }

  public hasAnyAction([...actionArr]): boolean {
    return (
      this.actions.filter(act => {
        return actionArr.includes(act);
      }).length > 0
    );
  }

  public hasActions([...actionArr]): boolean {
    const len = this.actions.filter(act => {
      return actionArr.includes(act);
    }).length;
    return len === actionArr.length;
  }
}

//数据权限配置
export class DataAcctessConfig {
  public action: string;
  public type: string;
  public config: any;

  constructor({ action, type, ...config }: DataAcctessConfig) {
    this.action = action;
    this.config = config;
    this.type = type;
  }
}

export class Authentication {
  public user: User;
  public roles: Role[];
  public permissions: Permission[];

  constructor({ user, roles, permissions }: Authentication) {
    this.user = user;
    this.roles = roles;
    this.permissions = permissions;
  }

  public getPermission(permission: string): Permission | undefined {
    return this.permissions.find(per => per.id === permission);
  }

  public getRole(roleId: string): Role | undefined {
    return this.roles.find(_role => _role.id === roleId);
  }

  public hasRole(roleId: string): boolean {
    return this.getRole(roleId) !== undefined;
  }

  public hasAnyRole([...roles]): boolean {
    return this.roles.find(_role => roles.includes(_role.id)) !== undefined;
  }

  public hasPermission([permission, ...actions]: string[]): boolean {
    return this.getPermission(permission)!.hasActions(actions);
  }

  public hasAnyPermission([...permission]: string[]): boolean {
    return this.permissions.find(per => permission.includes(per.id)) !== undefined;
  }
}

export function getAccessToken(): string {
  return sessionStorage.getItem('x-access-token') || new Date().getTime() + '';
}

export function setAccessToken(token: string) {
  sessionStorage.setItem('x-access-token', token);
}

export function getAutz(): Authentication | undefined {
  if (!window.top.__hsweb_autz) {
    const store = sessionStorage.getItem('hsweb-autz');
    if (store === null) {
      return undefined;
    }
    const authJson = JSON.parse(store);
    const autz = new Authentication(authJson);
    window.top.__hsweb_autz = autz;
  }
  return window.top.__hsweb_autz;
}

export function clearAutz() {
  window.top.__hsweb_autz = undefined;
  sessionStorage.removeItem('hsweb-autz');
}

export function setAutz(info: Authentication): Authentication {
  const autz = (window.top.__hsweb_autz = new Authentication(info));
  sessionStorage.setItem('hsweb-autz', JSON.stringify(info));
  return autz;
}

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): any {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  // const authorityString =
  //   typeof str === 'undefined' ? localStorage.getItem('hsweb-autz') : str;
  const autz = sessionStorage.getItem('hsweb-autz');

  if (autz !== null) {
    const authentication = new Authentication(
      JSON.parse(sessionStorage.getItem('hsweb-autz') || '{}'),
    );
    // authorityString could be admin, "admin", ["admin"]
    const authority = authentication.permissions.map(e => e.id);
    // try {
    //   authority = JSON.parse(authorityString!);
    // } catch (e) {
    //   authority = authorityString;
    // }
    // if (typeof authority === 'string') {
    //   return [authority];
    // }
    return authority;
  } else {
    return ['admin'];
  }
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return sessionStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
