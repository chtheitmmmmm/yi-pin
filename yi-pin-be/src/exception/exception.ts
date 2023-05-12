import { HttpException } from '@nestjs/common';

export interface Exception {
  errCode: number;
  errMsg: string;
  statusCode: number;
}

// 所有的 service 必须返回的通用类型
// 所有调用了 service 的 controller 应该意识到自己将得到这种结构的数据
export class ServiceResult {
  protected constructor(
    public readonly errCode: number,
    public readonly errMsg: string,
    public readonly data?: any,
  ) {}

  static ok(data?: any) {
    return new ServiceResult(0, 'ok', data ?? null);
  }

  static collectionDontExists() {
    return new ServiceResult(1, '收藏不存在');
  }

  static commentDontExists() {
    return new ServiceResult(2, '评论不存在');
  }

  static forumDontExists() {
    return new ServiceResult(3, '帖子不存在');
  }

  static likeDontExists() {
    return new ServiceResult(4, '点赞不存在');
  }

  static userDontExists() {
    return new ServiceResult(5, '用户不存在');
  }

  static userUnauthorized() {
    return new ServiceResult(6, '用户无权限');
  }

  static collectionHasExisted() {
    return new ServiceResult(7, '收藏已存在');
  }

  static commentHasExisted() {
    return new ServiceResult(8, '评论已存在');
  }

  static forumHasExisted() {
    return new ServiceResult(9, '帖子已存在');
  }

  static likeHasExisted() {
    return new ServiceResult(10, '点赞已存在');
  }

  static userHasExisted() {
    return new ServiceResult(11, '用户已存在');
  }

  static userPasswordWrong() {
    return new ServiceResult(12, '密码错误');
  }

  static userHasLike() {
    return new ServiceResult(13, '用户已点赞');
  }

  static userHasCollected() {
    return new ServiceResult(14, '用户已收藏');
  }

  static forumTypeNotValid() {
    return new ServiceResult(15, '要获取的帖子 type 参数不正确');
  }
}

// 所有的 controller 应该返回这种格式的结构
export class Result extends ServiceResult {
  static withAuto(sr: ServiceResult) {
    switch (sr.errCode) {
      case 0:
        return sr;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return new HttpException(sr, 404); // 资源没找到
      case 6:
        return new HttpException(sr, 401); // 用户未授权
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 13:
      case 14:
        return new HttpException(sr, 409); // 要插入的资源已存在
      case 12:
        return new HttpException(sr, 403); // 用户密码错误
      case 15:
        return new HttpException(sr, 400); // 错误的请求格式
      default:
        return new HttpException(sr, 500); // 其他错误（不会触发）
    }
  }
}

export function WrapResult(
  target: any,
  name: string,
  descriptor: PropertyDescriptor,
) {
  // 将函数返回结果包装在 `Result.withAuto` 函数中
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    try {
      const result = await originalMethod.apply(this, args);
      return result instanceof ServiceResult ? Result.withAuto(result) : result;
    } catch (e) {
      throw e instanceof ServiceResult ? Result.withAuto(e) : e;
    }
  };
  return descriptor;
}
